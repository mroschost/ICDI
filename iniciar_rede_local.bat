@echo off
setlocal enabledelayedexpansion
title ICDI - Inicializacao online com ngrok

REM ======================================================
REM  ICDI - Inicializacao online com ngrok
REM  Projeto React/Vite em F:\NOVACAP\ICDI
REM ======================================================

set "PROJECT_ROOT=%~dp0"
set "FRONTEND_PORT=3000"
set "PORT=%FRONTEND_PORT%"
set "APP_TITLE=ICDI Frontend"
set "NGROK_TITLE=ICDI ngrok"
set "NGROK_MODE="
set "NGROK_URL="
set "NGROK_STATIC_DOMAIN="
set "NGROK_EXE="
set "NPM_EXE="
set "APP_READY="
set "LOCAL_IP="

cd /d "%PROJECT_ROOT%"

call :detect_npm
if errorlevel 1 exit /b 1

call :ensure_dependencies
if errorlevel 1 exit /b 1

call :detect_ngrok
if errorlevel 1 exit /b 1

call :detect_local_ip

echo.
echo ======================================================
echo   ICDI - SUBIDA LOCAL + ONLINE
echo ======================================================
echo.
if defined LOCAL_IP (
    echo [INFO] Rede local: http://!LOCAL_IP!:%FRONTEND_PORT%
)
echo [INFO] Porta local: http://127.0.0.1:%FRONTEND_PORT%
echo.

if not exist "%PROJECT_ROOT%.env" (
    echo [AVISO] Arquivo .env nao encontrado.
    echo [AVISO] Se o app depender de GEMINI_API_KEY, crie o .env antes de usar essa funcionalidade.
    echo.
)

set /p choice="Deseja atualizar/normalizar as fotos antes de iniciar? (S/N): "
if /I "%choice%"=="S" (
    echo [INFO] Normalizando fotos...
    powershell -ExecutionPolicy Bypass -File "%PROJECT_ROOT%normalize_assets.ps1"
)

echo.
echo Encerrando instancias anteriores do ngrok...
taskkill /IM ngrok.exe /F >nul 2>&1

echo Liberando a porta %PORT% para a aplicacao...
for /f "tokens=5" %%P in ('netstat -ano ^| findstr /r /c:":%PORT% .*LISTENING"') do (
    taskkill /PID %%P /F >nul 2>&1
)

echo.
echo Iniciando frontend em nova janela...
start "%APP_TITLE%" /D "%PROJECT_ROOT%" "!NPM_EXE!" run dev

echo Aguardando a aplicacao responder...
call :wait_app
if errorlevel 1 (
    echo [ERRO] A aplicacao nao respondeu na porta %PORT%.
    echo Verifique a janela "%APP_TITLE%".
    pause
    exit /b 1
)

echo.
set /p custom_domain="Dominio fixo do ngrok (opcional, Enter para URL aleatoria): "
if not "%custom_domain%"=="" (
    set "NGROK_STATIC_DOMAIN=%custom_domain%"
)

echo Iniciando tunel publico do ngrok...
call :start_ngrok
if errorlevel 1 (
    echo [ERRO] Nao foi possivel iniciar o ngrok.
    pause
    exit /b 1
)

echo Aguardando o link publico do ngrok...
call :wait_ngrok_url
if errorlevel 1 (
    echo [AVISO] O ngrok iniciou, mas o link publico ainda nao foi lido automaticamente.
    echo [AVISO] Consulte http://127.0.0.1:4040 para copiar a URL publica.
    pause
    exit /b 0
)

>"%PROJECT_ROOT%ngrok_url.txt" echo !NGROK_URL!

echo.
echo ======================================================
echo   ICDI ONLINE
echo ======================================================
echo.
echo   Projeto:      %PROJECT_ROOT%
echo   Local:        http://127.0.0.1:%FRONTEND_PORT%
if defined LOCAL_IP echo   Rede local:   http://!LOCAL_IP!:%FRONTEND_PORT%
echo   Painel ngrok: http://127.0.0.1:4040
echo   Modo ngrok:   !NGROK_MODE!
echo   Link publico: !NGROK_URL!
echo   Link salvo:   %PROJECT_ROOT%ngrok_url.txt
echo ======================================================
echo.

start "" "http://127.0.0.1:%FRONTEND_PORT%/"
start "" "!NGROK_URL!"

pause
exit /b 0

:detect_npm
for /f "delims=" %%P in ('where npm.cmd 2^>nul') do (
    if "!NPM_EXE!"=="" set "NPM_EXE=%%P"
)

if "!NPM_EXE!"=="" (
    for /f "delims=" %%P in ('where npm 2^>nul') do (
        if "!NPM_EXE!"=="" set "NPM_EXE=%%P"
    )
)

if "!NPM_EXE!"=="" (
    echo [ERRO] npm nao encontrado nesta maquina.
    echo Instale o Node.js e tente novamente.
    pause
    exit /b 1
)

echo npm encontrado: !NPM_EXE!
exit /b 0

:ensure_dependencies
if not exist "%PROJECT_ROOT%package.json" (
    echo [ERRO] package.json nao encontrado em:
    echo %PROJECT_ROOT%
    pause
    exit /b 1
)

if not exist "%PROJECT_ROOT%node_modules" (
    echo.
    echo Instalando dependencias Node...
    call "!NPM_EXE!" install
    if errorlevel 1 (
        echo [ERRO] Falha ao instalar dependencias do projeto.
        pause
        exit /b 1
    )
)
exit /b 0

:detect_ngrok
if exist "%PROJECT_ROOT%tools\ngrok.exe" set "NGROK_EXE=%PROJECT_ROOT%tools\ngrok.exe"

if "!NGROK_EXE!"=="" (
    for /f "delims=" %%P in ('where ngrok 2^>nul') do (
        if "!NGROK_EXE!"=="" set "NGROK_EXE=%%P"
    )
)

if "!NGROK_EXE!"=="" (
    for /f "delims=" %%P in ('dir /b /s "%LOCALAPPDATA%\Microsoft\WinGet\Packages\ngrok.ngrok_*\\ngrok.exe" 2^>nul') do (
        if "!NGROK_EXE!"=="" set "NGROK_EXE=%%P"
    )
)

if "!NGROK_EXE!"=="" (
    echo [ERRO] ngrok nao encontrado.
    echo Instale o ngrok ou coloque o executavel em:
    echo %PROJECT_ROOT%tools\ngrok.exe
    pause
    exit /b 1
)

echo ngrok encontrado: !NGROK_EXE!
exit /b 0

:detect_local_ip
for /f "tokens=4" %%A in ('route print ^| find " 0.0.0.0"') do (
    if "!LOCAL_IP!"=="" set "LOCAL_IP=%%A"
)
exit /b 0

:wait_app
set "APP_READY="
for /L %%I in (1,1,40) do (
    powershell -NoProfile -Command "try { Invoke-WebRequest -Uri 'http://127.0.0.1:%PORT%' -UseBasicParsing -TimeoutSec 2 > $null; exit 0 } catch { exit 1 }" >nul 2>&1
    if !errorlevel! == 0 (
        set "APP_READY=1"
        goto :app_done
    )
    timeout /t 1 /nobreak >nul
)
:app_done
if defined APP_READY exit /b 0
exit /b 1

:start_ngrok
set "NGROK_MODE="
set "NGROK_URL="

if defined NGROK_STATIC_DOMAIN (
    echo Tentando iniciar com dominio fixo: %NGROK_STATIC_DOMAIN%
    start "%NGROK_TITLE%" /D "%PROJECT_ROOT%" "!NGROK_EXE!" http --domain=%NGROK_STATIC_DOMAIN% %PORT%
    call :wait_ngrok_url_quick
    if /i "!NGROK_URL!"=="https://%NGROK_STATIC_DOMAIN%" (
        set "NGROK_MODE=fixo (%NGROK_STATIC_DOMAIN%)"
        exit /b 0
    )

    echo Dominio fixo indisponivel ou nao confirmado. Voltando para URL aleatoria...
    taskkill /IM ngrok.exe /F >nul 2>&1
    timeout /t 2 /nobreak >nul
    set "NGROK_URL="
)

start "%NGROK_TITLE%" /D "%PROJECT_ROOT%" "!NGROK_EXE!" http %PORT%
call :wait_ngrok_url_quick
if defined NGROK_URL (
    set "NGROK_MODE=aleatorio"
    exit /b 0
)

exit /b 1

:wait_ngrok_url_quick
set "NGROK_URL="
for /L %%I in (1,1,8) do (
    for /f "usebackq delims=" %%U in (`powershell -NoProfile -Command "$ProgressPreference='SilentlyContinue'; try { $json = Invoke-RestMethod -Uri 'http://127.0.0.1:4040/api/tunnels' -TimeoutSec 2; ($json.tunnels | Where-Object { $_.proto -eq 'https' } | Select-Object -First 1 -ExpandProperty public_url) } catch { '' }"`) do (
        if not "%%U"=="" set "NGROK_URL=%%U"
    )
    if defined NGROK_URL exit /b 0
    timeout /t 1 /nobreak >nul
)
exit /b 1

:wait_ngrok_url
set "NGROK_URL="
for /L %%I in (1,1,30) do (
    for /f "usebackq delims=" %%U in (`powershell -NoProfile -Command "$ProgressPreference='SilentlyContinue'; try { $json = Invoke-RestMethod -Uri 'http://127.0.0.1:4040/api/tunnels' -TimeoutSec 2; ($json.tunnels | Where-Object { $_.proto -eq 'https' } | Select-Object -First 1 -ExpandProperty public_url) } catch { '' }"`) do (
        if not "%%U"=="" set "NGROK_URL=%%U"
    )
    if defined NGROK_URL exit /b 0
    timeout /t 1 /nobreak >nul
)
exit /b 1
