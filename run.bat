@echo off
title PPSI Server
cd /d "%~dp0"
if not exist "server\node_modules" (
  echo Installing server dependencies...
  cd server && call npm install && cd ..
)
echo Starting PPSI server...
echo.
echo  Site:  http://localhost:3000
echo  Admin: http://localhost:3000/admin
echo.
node server/server.js
pause
