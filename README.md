# 🚀 Facebook Comment Extractor

> Một ứng dụng web hiện đại để trích xuất bình luận Facebook với giao diện đẹp mắt và animation mượt mà.

![Demo](https://img.shields.io/badge/Demo-Live-brightgreen)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Tính năng

- 🎨 **Giao diện đẹp**: Thiết kế hiện đại với Tailwind CSS và Framer Motion
- ⚡ **Hiệu suất cao**: Sử dụng Next.js và Node.js cho tốc độ tối ưu
- 📊 **Thống kê real-time**: Hiển thị số liệu trích xuất trực tiếp
- 📥 **Xuất CSV**: Tải về file CSV với đầy đủ thông tin bình luận
- 🔒 **Bảo mật**: Rate limiting và validation đầu vào
- 📱 **Responsive**: Hoạt động mượt mà trên mọi thiết bị

## 🛠️ Công nghệ sử dụng

### Backend

- **Node.js** - Runtime JavaScript
- **Express.js** - Web framework
- **Apify Client** - API để scraping Facebook
- **CSV Writer** - Tạo file CSV
- **Helmet** - Bảo mật header
- **Rate Limiting** - Giới hạn request

### Frontend

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **React Hot Toast** - Notification
- **Axios** - HTTP client

## 📋 Yêu cầu hệ thống

- Node.js 18+
- npm hoặc yarn
- Token API Apify (có thể đăng ký miễn phí)

## 🌐 **Live Demo & Deploy**

**📱 Sử dụng ngay:** [https://your-app.vercel.app](https://your-app.vercel.app)  
**🔧 Deploy Guide:** [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🚀 Cài đặt và chạy

### 1. Clone dự án

```bash
cd "GUI TOOLS"
```

### 2. Cài đặt dependencies

```bash
# Cài đặt dependencies cho root project
npm run install:all

# Hoặc cài đặt từng phần
npm install
cd server && npm install
cd ../client && npm install
```

### 3. Cấu hình environment

Tạo file `.env` trong thư mục `server` (copy từ `env.example`):

```bash
cd server
cp env.example .env
```

Sau đó chỉnh sửa file `.env` và thêm token API Apify của bạn:

```env
PORT=5000
APIFY_TOKEN=your_actual_apify_token_here
NODE_ENV=development
```

**🔑 Lấy Apify Token:**

1. Đăng ký tại [Apify.com](https://apify.com) (miễn phí)
2. Vào Settings → Integrations → API Token
3. Copy token và paste vào file `.env`

### 4. Chạy ứng dụng

#### Chạy cả Backend và Frontend cùng lúc:

```bash
npm run dev
```

#### Hoặc chạy riêng biệt:

```bash
# Terminal 1 - Backend
npm run server:dev

# Terminal 2 - Frontend
npm run client:dev
```

### 5. Truy cập ứng dụng

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📖 Cách sử dụng

1. **Lấy Token Apify**:

   - Đăng ký tài khoản tại [Apify.com](https://apify.com)
   - Vào Settings > Integrations để lấy API Token

2. **Sử dụng tool**:
   - Nhập Token API Apify
   - Dán URL bài đăng Facebook cần trích xuất
   - Chọn số lượng bình luận tối đa
   - Nhấn "Bắt đầu trích xuất"
   - Tải file CSV khi hoàn thành

## 🏗️ Cấu trúc dự án

```
GUI TOOLS/
├── client/                 # Frontend Next.js
│   ├── app/
│   │   ├── components/     # React components
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── next.config.js
├── server/                 # Backend Node.js
│   ├── server.js          # Main server file
│   ├── downloads/         # CSV files storage
│   └── package.json
├── package.json           # Root package.json
└── README.md
```

## 🔧 API Endpoints

### POST `/api/extract`

Trích xuất bình luận Facebook

**Request Body:**

```json
{
  "token": "apify_api_token",
  "url": "facebook_post_url",
  "maxComments": 100
}
```

**Response:**

```json
{
  "success": true,
  "message": "Đã trích xuất thành công 150 bình luận",
  "count": 150,
  "filename": "facebook_comments_20231201_143022.csv",
  "downloadUrl": "/api/download/facebook_comments_20231201_143022.csv"
}
```

### GET `/api/download/:filename`

Tải file CSV

### GET `/api/health`

Kiểm tra trạng thái server

## 🎨 Features UI/UX

- **Animations mượt mà**: Sử dụng Framer Motion cho các hiệu ứng chuyển động
- **Loading states**: Progress bar và loading indicators
- **Responsive design**: Tối ưu cho mobile và desktop
- **Toast notifications**: Thông báo user-friendly
- **Gradient backgrounds**: Thiết kế hiện đại với gradient
- **Glass morphism**: Hiệu ứng kính mờ cho các element

## 🔐 Bảo mật

- Rate limiting (10 requests/15 phút)
- Input validation
- CORS protection
- Helmet.js security headers
- Environment variables protection

## 📈 Performance

- Next.js optimization
- Image optimization
- Code splitting
- Server-side rendering
- Static file serving

## 🤝 Đóng góp

1. Fork dự án
2. Tạo feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Tạo Pull Request

## 📝 License

Dự án này được phân phối dưới giấy phép MIT. Xem file `LICENSE` để biết thêm chi tiết.

## 📞 Liên hệ

- Email: your-email@example.com
- GitHub: [@yourusername](https://github.com/yourusername)

## 🙏 Acknowledgments

- [Apify](https://apify.com) - Facebook Comments Scraper
- [Next.js](https://nextjs.org) - React Framework
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Framer Motion](https://framer.com/motion) - Animation
