# 🔧 Cập nhật CORS sau khi deploy

## Sau khi có URLs thật từ Railway và Vercel:

### 1. Lấy URLs:

- **Backend Railway**: `https://facebook-comment-extractor-production-XXXX.up.railway.app`
- **Frontend Vercel**: `https://your-app-name.vercel.app`

### 2. Cập nhật CORS trong server/server.js:

```javascript
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://localhost:3000",
    "https://your-app-name.vercel.app", // ← Thay bằng URL Vercel thật
    "https://facebook-comment-extractor-production-XXXX.up.railway.app", // ← URL Railway (optional)
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};
```

### 3. Commit và push:

```bash
git add .
git commit -m "fix: update CORS with production URLs"
git push origin main
```

Railway sẽ tự động redeploy với CORS mới!

### 4. Test kết nối:

- Vào frontend Vercel
- Thử extract comments
- Kiểm tra Network tab không có CORS errors
