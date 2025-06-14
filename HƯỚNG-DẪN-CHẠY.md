# 🚀 HƯỚNG DẪN CHẠY ỨNG DỤNG

## ⚠️ QUAN TRỌNG: Phải chạy Backend trước Frontend!

### 🔥 **CÁCH 1: Chạy tự động (KHUYẾN NGHỊ)**

1. **Mở terminal/cmd thứ nhất:**

   - Double-click file `start-backend.bat`
   - Đợi thấy dòng "🚀 Server đang chạy trên port 5000"

2. **Mở terminal/cmd thứ hai:**

   - Double-click file `start-frontend.bat`
   - Đợi thấy dòng "✓ Ready in..."

3. **Truy cập:** http://localhost:3000

---

### 🔧 **CÁCH 2: Chạy thủ công**

#### 🖥️ **Terminal 1 - Backend:**

```bash
cd server
npm install
npm run dev
```

**Đợi thấy:** `🚀 Server đang chạy trên port 5000`

#### 🌐 **Terminal 2 - Frontend:**

```bash
cd client
npm install
npm run dev
```

**Đợi thấy:** `✓ Ready in...`

---

### 🔍 **KIỂM TRA HOẠT ĐỘNG**

1. **Backend:** http://localhost:5000/api/health

   - Kết quả: `{"status":"OK","message":"Server đang hoạt động"}`

2. **Frontend:** http://localhost:3000
   - Thấy giao diện đẹp với form trích xuất

---

### ❌ **KHẮC PHỤC LỖI THƯỜNG GẶP**

#### 🔴 **Lỗi "socket hang up"**

- **Nguyên nhân:** Backend chưa chạy
- **Giải pháp:** Chạy backend trước, đợi sẵn sàng rồi mới chạy frontend

#### 🔴 **Lỗi "Port already in use"**

- **Backend:** Đổi PORT trong server/.env hoặc tắt tiến trình đang dùng port 5000
- **Frontend:** Đổi port bằng: `npm run dev -- -p 3001`

#### 🔴 **Lỗi "Cannot find module"**

- Chạy: `npm run install:all` ở thư mục gốc

---

### 🌟 **CÁCH SỬ DỤNG**

1. **Lấy Token Apify:**

   - Đăng ký tại: https://apify.com
   - Vào Settings > Integrations > API Token

2. **Trích xuất bình luận:**
   - Nhập Token API Apify
   - Paste URL bài đăng Facebook
   - Chọn số lượng bình luận
   - Nhấn "Bắt đầu trích xuất"
   - Tải file CSV khi hoàn thành

---

### 🆘 **HỖ TRỢ**

Nếu vẫn gặp lỗi, hãy:

1. Kiểm tra cả 2 terminal có đang chạy không
2. Refresh trang web
3. Kiểm tra URL backend: http://localhost:5000/api/health
