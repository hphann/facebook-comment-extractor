@echo off
echo 🚀 Setting up deployment...

echo.
echo 📝 Copying environment files...
copy "client\env.local.example" "client\.env.local"
copy "server\env.example" "server\.env"

echo.
echo 📦 Installing dependencies for production...
cd client
npm install
npm run build
cd ..

cd server  
npm install --production
cd ..

echo.
echo ✅ Deployment setup complete!
echo.
echo 📋 Next steps:
echo 1. Fill in your APIFY_TOKEN in server\.env
echo 2. Push to GitHub: git add . && git commit -m "feat: prepare for deployment" && git push
echo 3. Follow DEPLOYMENT.md guide
echo.
pause 