@echo off
echo Building Totodoro Web...
echo.

REM Check if node_modules exists, if not install dependencies
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo Error: npm install failed.
        pause
        exit /b %ERRORLEVEL%
    )
)

echo Running build...
call npm run build

if %ERRORLEVEL% EQU 0 (
    echo.
    echo Build successful! Output is in the 'dist' directory.
    echo.
    set /p run_app="Do you want to run the application now? (Y/N): "
    if /i "%run_app%"=="Y" (
        echo Starting preview server...
        echo Press Ctrl+C to stop the server.
        call npm run preview
    )
) else (
    echo.
    echo Build failed!
    pause
)
