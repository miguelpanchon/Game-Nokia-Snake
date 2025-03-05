@echo off
echo ====================================
echo BRUTAL COMMIT AND PUSH SCRIPT
echo ====================================
echo.

echo [1/4] Adding all changes...
git add .

echo.
echo [2/4] Ready to commit. 
set /p msg="Enter commit message: "

echo.
echo [3/4] Committing...
git commit -m "%msg%"

echo.
echo [4/4] Pushing to main branch...
git push origin main

echo.
echo ====================================
echo ALL DONE! Your code is safe on GitHub
echo ====================================
pause
