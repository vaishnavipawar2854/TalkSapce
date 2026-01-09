@echo off
echo ========================================
echo Starting TalkSpace Backend Server
echo ========================================
echo.
echo Backend will run on http://localhost:5000
echo.
cd /d "%~dp0\backend"
npm run dev
