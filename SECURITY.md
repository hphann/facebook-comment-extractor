# 🔒 Security Policy

## 🛡️ Supported Versions

Chúng tôi hiện đang hỗ trợ bảo mật cho các phiên bản sau:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## 🚨 Reporting a Vulnerability

Nếu bạn phát hiện lỗ hổng bảo mật, vui lòng **KHÔNG** tạo public issue. Thay vào đó:

### 📧 Báo cáo riêng tư

- Email: [security@yourproject.com] (thay thế bằng email thật)
- Subject: `[SECURITY] Vulnerability Report`

### 📋 Thông tin cần cung cấp

1. **Mô tả chi tiết** về lỗ hổng
2. **Steps to reproduce**
3. **Potential impact** (mức độ nghiêm trọng)
4. **Suggested fix** (nếu có)
5. **Environment details** (OS, Browser, Node version)

### ⏱️ Response Timeline

- **Acknowledgment**: Trong vòng 48 giờ
- **Initial assessment**: Trong vòng 1 tuần
- **Fix timeline**: Tùy thuộc mức độ nghiêm trọng
  - Critical: 24-72 giờ
  - High: 1 tuần
  - Medium: 2 tuần
  - Low: 1 tháng

## 🔐 Security Measures

### Hiện tại đã implement:

- ✅ **Rate Limiting** - 10 requests/15 phút
- ✅ **Input Validation** - Kiểm tra URL và token
- ✅ **CORS Protection** - Chỉ cho phép origins hợp lệ
- ✅ **Helmet.js** - Security headers
- ✅ **Environment Variables** - API keys không hardcode
- ✅ **Error Handling** - Không expose sensitive info

### Planned Security Features:

- 🔄 **API Authentication** - JWT tokens
- 🔄 **Request Logging** - Monitor suspicious activity
- 🔄 **SQL Injection Protection** - Parameterized queries
- 🔄 **XSS Protection** - Content Security Policy
- 🔄 **HTTPS Enforcement** - SSL/TLS certificates

## ⚠️ Known Security Considerations

### API Token Security

- **Risk**: Apify API tokens có quyền truy cập tài khoản
- **Mitigation**: Luôn sử dụng .env file, không commit tokens
- **Recommendation**: Rotate tokens định kỳ

### Rate Limiting

- **Current**: 10 requests/15 phút
- **Risk**: Có thể bị abuse nếu rate limit quá cao
- **Recommendation**: Monitor usage patterns

### File Downloads

- **Risk**: Potential path traversal attacks
- **Current Protection**: Filename sanitization
- **Recommendation**: Implement file access logs

## 🛠️ Security Best Practices

### Cho Developers:

1. **Luôn validate input** từ users
2. **Không log sensitive data** (tokens, passwords)
3. **Sử dụng HTTPS** trong production
4. **Regular dependency updates** để patch vulnerabilities
5. **Code review** cho security issues

### Cho Users:

1. **Bảo vệ API tokens** như passwords
2. **Không share tokens** công khai
3. **Sử dụng strong passwords** cho Apify account
4. **Monitor API usage** để detect unauthorized access
5. **Report suspicious activity** ngay lập tức

## 📞 Contact

Cho security issues:

- Email: [security@yourproject.com]
- GPG Key: [Provide if available]

Cho general questions:

- GitHub Issues: [Create an issue](https://github.com/yourusername/facebook-comment-extractor/issues)
- Email: [general@yourproject.com]

---

**Lưu ý**: File này sẽ được cập nhật định kỳ khi có security measures mới.
