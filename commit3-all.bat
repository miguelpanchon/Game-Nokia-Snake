@echo off
git add .
set /p msg="Commit message: "
git commit -m "%msg%"
git push origin main
echo Done!
pause
