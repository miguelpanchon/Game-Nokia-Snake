@echo off
echo Checking status before add...
git status
pause

echo.
echo Adding files...
git add .
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
pause
