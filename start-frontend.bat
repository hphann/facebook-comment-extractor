@echo off
echo 🚀 Starting Frontend Server...
echo.

cd client
echo 📦 Installing frontend dependencies...
if not exist "node_modules" (
    call npm install
)

echo.
echo 🔧 Starting frontend on http://localhost:3000
echo Make sure backend is running on http://localhost:5000
echo.

call npm run dev 