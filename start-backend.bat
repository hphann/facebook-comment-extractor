@echo off
echo 🚀 Starting Backend Server...
echo.

cd server
echo 📦 Installing backend dependencies...
if not exist "node_modules" (
    call npm install
)

echo.
echo 🔧 Starting backend on http://localhost:5000
echo.

call npm run dev 