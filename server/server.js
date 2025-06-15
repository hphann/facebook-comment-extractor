const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { ApifyClient } = require('apify-client');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const path = require('path');
const fs = require('fs');
const os = require('os');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware bảo mật
app.use(helmet());

// CORS configuration
const corsOptions = {
    origin: function (origin, callback) {
        // Cho phép requests không có origin (mobile apps, Postman, etc.)
        if (!origin) return callback(null, true);

        const allowedOrigins = [
            'http://localhost:3000',
            'https://localhost:3000',
            'https://facebook-comment-extractor.vercel.app',
            'https://facebook-comment-extractor-production.up.railway.app'
        ];

        // Cho phép domain Vercel và Railway với subdomain bất kỳ
        const isDevelopment = process.env.NODE_ENV !== 'production';
        const isVercelDomain = origin.includes('.vercel.app');
        const isRailwayDomain = origin.includes('.railway.app');

        if (isDevelopment || allowedOrigins.includes(origin) || isVercelDomain || isRailwayDomain) {
            return callback(null, true);
        }

        return callback(new Error('Không được phép bởi CORS'), false);
    },
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 phút
    max: 10, // Giới hạn 10 requests mỗi 15 phút
    message: 'Quá nhiều yêu cầu, vui lòng thử lại sau 15 phút.'
});
app.use('/api/extract', limiter);

// Tạo thư mục downloads nếu chưa có
const downloadsDir = path.join(__dirname, 'downloads');
try {
    if (!fs.existsSync(downloadsDir)) {
        fs.mkdirSync(downloadsDir, { recursive: true });
        console.log('✅ Đã tạo thư mục downloads');
    }
} catch (error) {
    console.error('⚠️  Không thể tạo thư mục downloads:', error.message);
    // Sử dụng thư mục tạm thời của hệ thống
    const downloadsDir = os.tmpdir();
    console.log('📁 Sử dụng thư mục tạm thời:', downloadsDir);
}

// API endpoint để trích xuất bình luận
app.post('/api/extract', async (req, res) => {
    // Tăng timeout cho request dài - 15 phút cho posts có nhiều comment
    req.setTimeout(900000); // 15 phút
    res.setTimeout(900000);

    try {
        const { token, url, maxComments = 100 } = req.body;

        // Validate input
        if (!token) {
            return res.status(400).json({
                success: false,
                message: 'Token API Apify là bắt buộc'
            });
        }

        if (!url) {
            return res.status(400).json({
                success: false,
                message: 'URL bài đăng Facebook là bắt buộc'
            });
        }

        // Kiểm tra URL có phải Facebook không
        if (!url.includes('facebook.com')) {
            return res.status(400).json({
                success: false,
                message: 'URL phải là đường link Facebook hợp lệ'
            });
        }

        // Khởi tạo Apify client với timeout dài hơn
        const client = new ApifyClient({
            token,
            requestOptions: {
                timeout: 900000 // 15 phút
            }
        });

        // Cấu hình input cho scraper với timeout settings
        const runInput = {
            startUrls: [{ url }],
            resultsLimit: parseInt(maxComments),
            includeNestedComments: true,
            viewOption: "RANKED_UNFILTERED",
            // Thêm timeout cho Apify actor
            timeoutSecs: 900 // 15 phút
        };

        // Chạy actor với monitoring
        console.log('Bắt đầu trích xuất bình luận...');
        console.log('Max comments:', maxComments);
        console.log('Run input:', JSON.stringify(runInput, null, 2));

        const run = await client.actor("apify/facebook-comments-scraper").call(runInput, {
            // Chờ actor hoàn thành với timeout dài hơn
            waitSecs: 900 // 15 phút
        });

        console.log('Run completed:', run.id);
        console.log('Run status:', run.status);

        // Lấy dữ liệu từ dataset với retry mechanism
        console.log('Lấy dữ liệu từ dataset...');
        const datasetItems = [];

        try {
            // Sử dụng cách đúng để lấy dữ liệu từ Apify dataset với chunking
            const dataset = client.dataset(run.defaultDatasetId);

            // Lấy dữ liệu theo batch để tránh timeout
            let offset = 0;
            const limit = 1000; // Lấy 1000 items mỗi lần
            let hasMore = true;

            while (hasMore) {
                console.log(`Đang lấy batch ${Math.floor(offset / limit) + 1}...`);
                const { items } = await dataset.listItems({
                    offset,
                    limit
                });

                if (items.length === 0) {
                    hasMore = false;
                } else {
                    datasetItems.push(...items);
                    offset += items.length;

                    // Giới hạn số lượng comment theo maxComments
                    if (datasetItems.length >= parseInt(maxComments)) {
                        datasetItems.splice(parseInt(maxComments));
                        hasMore = false;
                    }
                }

                // Log progress
                console.log(`Đã lấy ${datasetItems.length} comments...`);
            }

        } catch (datasetError) {
            console.error('Lỗi khi lấy dữ liệu từ dataset:', datasetError);
            throw new Error('Không thể lấy dữ liệu từ dataset: ' + datasetError.message);
        }

        if (datasetItems.length === 0) {
            return res.json({
                success: false,
                message: 'Không tìm thấy bình luận nào. Có thể bài đăng không có comment hoặc đã bị ẩn.'
            });
        }

        // Tạo file CSV
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0] + '_' +
            new Date().toTimeString().split(' ')[0].replace(/:/g, '');
        const filename = `facebook_comments_${timestamp}.csv`;
        const filepath = path.join(downloadsDir, filename);

        const csvWriter = createCsvWriter({
            path: filepath,
            header: [
                { id: 'commentUrl', title: 'Comment URL' },
                { id: 'date', title: 'Ngày' },
                { id: 'facebookId', title: 'Facebook ID' },
                { id: 'facebookUrl', title: 'Facebook URL' },
                { id: 'feedbackId', title: 'Feedback ID' },
                { id: 'id', title: 'ID' },
                { id: 'inputUrl', title: 'Input URL' },
                { id: 'likesCount', title: 'Lượt thích' },
                { id: 'pageAdLibraryId', title: 'Page Ad Library ID' },
                { id: 'pageAdLibraryActive', title: 'Page Active' },
                { id: 'postTitle', title: 'Tiêu đề bài đăng' },
                { id: 'profileId', title: 'Profile ID' },
                { id: 'profileName', title: 'Tên profile' },
                { id: 'profilePicture', title: 'Ảnh đại diện' },
                { id: 'profileUrl', title: 'Profile URL' },
                { id: 'text', title: 'Nội dung bình luận' },
                { id: 'threadingDepth', title: 'Độ sâu thread' }
            ]
        });

        // Chuẩn bị dữ liệu để ghi vào CSV
        const csvData = datasetItems.map(item => ({
            commentUrl: item.commentUrl || '',
            date: item.date || '',
            facebookId: item.facebookId || '',
            facebookUrl: item.facebookUrl || '',
            feedbackId: item.feedbackId || '',
            id: item.id || '',
            inputUrl: item.inputUrl || '',
            likesCount: item.likesCount || '',
            pageAdLibraryId: item.pageAdLibrary?.id || '',
            pageAdLibraryActive: item.pageAdLibrary?.is_business_page_active || '',
            postTitle: item.postTitle || '',
            profileId: item.profileId || '',
            profileName: item.profileName || '',
            profilePicture: item.profilePicture || '',
            profileUrl: item.profileUrl || '',
            text: item.text || '',
            threadingDepth: item.threadingDepth || ''
        }));

        await csvWriter.writeRecords(csvData);

        res.json({
            success: true,
            message: `Đã trích xuất thành công ${datasetItems.length} bình luận`,
            count: datasetItems.length,
            filename: filename,
            downloadUrl: `/api/download/${filename}`
        });

    } catch (error) {
        console.error('Lỗi trích xuất:', error);

        let statusCode = 500;
        let errorMessage = 'Có lỗi xảy ra khi trích xuất bình luận';

        // Handle specific Apify errors
        if (error.message.includes('timeout') || error.code === 'ECONNABORTED') {
            statusCode = 504;
            errorMessage = 'Quá trình trích xuất mất quá nhiều thời gian. Hãy thử giảm số lượng comment hoặc thử lại sau.';
        } else if (error.message.includes('Actor run') && error.message.includes('failed')) {
            statusCode = 422;
            errorMessage = 'Không thể trích xuất từ URL này. Vui lòng kiểm tra URL có đúng và công khai không.';
        } else if (error.message.includes('dataset')) {
            statusCode = 503;
            errorMessage = 'Có lỗi khi lấy dữ liệu. Hãy thử lại sau vài phút.';
        } else if (error.message.includes('token')) {
            statusCode = 401;
            errorMessage = 'Token API không hợp lệ hoặc đã hết hạn.';
        }

        // Add specific guidance for large comment extraction
        if (req.body.maxComments > 1000) {
            errorMessage += '\n\nĐối với posts có nhiều comment (>1000), hãy:\n1. Thử giảm số lượng comment\n2. Đảm bảo post là công khai\n3. Thử lại vào thời điểm khác';
        }

        res.status(statusCode).json({
            success: false,
            message: errorMessage,
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// API endpoint để tải file
app.get('/api/download/:filename', (req, res) => {
    const filename = req.params.filename;
    const filepath = path.join(downloadsDir, filename);

    if (fs.existsSync(filepath)) {
        res.download(filepath, filename);
    } else {
        res.status(404).json({
            success: false,
            message: 'File không tồn tại'
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Server đang hoạt động',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
        version: require('./package.json').version
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy trên port ${PORT}`);
    console.log(`📁 Thư mục downloads: ${downloadsDir}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`⚙️  CORS origins configured for production`);
});

// Global error handler
app.use((error, req, res, next) => {
    console.error('Global error handler:', error);
    res.status(500).json({
        success: false,
        message: 'Lỗi server nội bộ',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
});

module.exports = app; 