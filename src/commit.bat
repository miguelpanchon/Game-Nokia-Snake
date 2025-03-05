@echo off
echo Checking status before add...
git status
pause

echo.
echo Adding specific files...
cd ..
git add "game development plan.txt"
git add GUIDELINES.md
git add README.md
git add LICENCE.txt
git add package.json
git add package-lock.json
git add vite.config.js
git add src/*
echo Files added.
pause

echo.
echo Checking status after add...
git status
pause

echo.
set /p commit_message="Enter commit message: "
git commit -m "%commit_message%"
pause

echo.
echo Pushing to remote...
git push origin main
pause

echo.
echo Done!
cd scripts
pause
