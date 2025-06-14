# 🚀 Deployment Guide

Hướng dẫn deploy ứng dụng Facebook Comment Extractor lên web miễn phí.

## 🌐 Chiến lược Deploy

- **Frontend**: Vercel (miễn phí, tối ưu cho Next.js)
- **Backend**: Railway hoặc Render (miễn phí)

---

## 🎯 Option 1: Railway + Vercel (KHUYẾN NGHỊ)

### 📡 **Deploy Backend lên Railway**

#### 1. Chuẩn bị

- Đăng ký tài khoản tại [Railway.app](https://railway.app)
- Connect với GitHub account

#### 2. Deploy Backend

```bash
# Push code lên GitHub trước
git add .
git commit -m "feat: prepare for deployment"
git push origin main
```

1. **Tạo project mới trên Railway**

   - Vào [railway.app/new](https://railway.app/new)
   - Chọn "Deploy from GitHub repo"
   - Chọn repository `facebook-comment-extractor`

2. **Cấu hình build settings**

   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Thêm Environment Variables**

   ```
   PORT=5000
   NODE_ENV=production
   APIFY_TOKEN=your_actual_apify_token_here
   ```

4. **Deploy và lấy URL**
   - Railway sẽ tự động deploy
   - Lấy URL dạng: `https://your-app-name.railway.app`

### 🌐 **Deploy Frontend lên Vercel**

#### 1. Chuẩn bị

- Đăng ký tại [Vercel.com](https://vercel.com)
- Connect với GitHub

#### 2. Deploy Frontend

1. **Import Project**

   - Vào [vercel.com/new](https://vercel.com/new)
   - Import repository `facebook-comment-extractor`

2. **Cấu hình build settings**

   - Framework Preset: `Next.js`
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `.next`

3. **Thêm Environment Variables**

   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
   ```

4. **Deploy**
   - Vercel sẽ tự động deploy
   - Lấy URL: `https://your-app-name.vercel.app`

#### 3. Cập nhật CORS

Quay lại Railway, thêm domain Vercel vào CORS:

- Vào Environment Variables
- Sửa code trong server.js (qua GitHub):

```javascript
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://your-app-name.vercel.app", // Thêm dòng này
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};
```

---

## 🎯 Option 2: Render + Vercel

### 📡 **Deploy Backend lên Render**

1. **Đăng ký tại [Render.com](https://render.com)**
2. **Tạo Web Service mới**

   - Connect repository
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Environment Variables**

   ```
   PORT=5000
   NODE_ENV=production
   APIFY_TOKEN=your_actual_apify_token_here
   ```

4. **Deploy** - Render sẽ tự động deploy

### Frontend tương tự như Option 1

---

## 🎯 Option 3: All-in-One Solutions

### 🔥 **Vercel Full-Stack (Serverless)**

Có thể deploy cả frontend và backend trên Vercel bằng API Routes:

1. **Chuyển backend thành API routes**

   - Di chuyển logic từ `server/` vào `client/pages/api/`
   - Sử dụng Vercel Serverless Functions

2. **Ưu điểm**: Đơn giản, một deployment
3. **Nhược điểm**: Giới hạn timeout (10s), cold start

### 🌊 **Netlify + Netlify Functions**

Tương tự Vercel nhưng sử dụng Netlify Functions.

---

## 🔧 Custom Domains

### Thêm Custom Domain

1. **Mua domain** (Namecheap, GoDaddy, CloudFlare)
2. **Cấu hình DNS**:
   - Frontend: Point CNAME `www` → Vercel
   - Backend: Point CNAME `api` → Railway
3. **SSL/TLS**: Tự động với Vercel và Railway

---

## 📊 So sánh Platforms

| Platform                | Frontend   | Backend  | Miễn phí | Tốc độ     | Dễ dùng    |
| ----------------------- | ---------- | -------- | -------- | ---------- | ---------- |
| **Vercel + Railway**    | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ✅       | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Vercel + Render**     | ⭐⭐⭐⭐⭐ | ⭐⭐⭐   | ✅       | ⭐⭐⭐⭐   | ⭐⭐⭐⭐   |
| **Netlify + Functions** | ⭐⭐⭐⭐   | ⭐⭐⭐   | ✅       | ⭐⭐⭐     | ⭐⭐⭐     |

---

## 🚨 Lưu ý quan trọng

### 🔒 Bảo mật

- **KHÔNG bao giờ** commit `.env` file
- Luôn sử dụng Environment Variables
- Rotate API tokens định kỳ

### 📈 Monitoring

- Kiểm tra logs trên Railway/Render
- Monitor usage để tránh vượt limit miễn phí
- Set up alerts cho errors

### 🔄 Updates

- Push code mới → Auto deploy
- Test trên staging trước production
- Backup dữ liệu quan trọng

---

## 🆘 Troubleshooting

### ❌ Backend không chạy

- Kiểm tra Environment Variables
- Xem logs trên platform
- Verify APIFY_TOKEN

### ❌ Frontend không connect backend

- Kiểm tra `NEXT_PUBLIC_API_URL`
- Verify CORS settings
- Check network tab trong DevTools

### ❌ CORS errors

- Thêm domain frontend vào CORS
- Kiểm tra protocol (http vs https)

---

## 📞 Support

Nếu gặp vấn đề:

1. Check documentation của platform
2. Xem logs chi tiết
3. Google error message
4. Tạo issue trên GitHub repo

**Happy Deploying! 🚀✨**
