@echo off
setlocal EnableExtensions EnableDelayedExpansion

set "ROOT=%~dp0"
set "ROOT=%ROOT:~0,-1%"
set "PORT=4000"
set "URL=http://localhost:%PORT%"
set "LOG_DIR=%ROOT%\.sites-runtime"
set "DEV_LOG=%LOG_DIR%\dev.log"
set "VINEXT_CMD=%ROOT%\node_modules\.bin\vinext.cmd"

cd /d "%ROOT%" || (
  echo [erro] Nao foi possivel entrar na pasta do projeto.
  exit /b 1
)

where node >nul 2>&1 || (
  echo [erro] Node.js nao foi encontrado no PATH.
  exit /b 1
)

where npm >nul 2>&1 || (
  echo [erro] npm nao foi encontrado no PATH.
  exit /b 1
)

for /f "delims=" %%V in ('node -v') do set "NODE_VERSION=%%V"
echo [info] Node !NODE_VERSION!

if not exist "%VINEXT_CMD%" (
  echo [info] Dependencias incompletas ou vinext ausente. Rodando npm install...
  call npm install --no-package-lock
  if errorlevel 1 (
    echo [erro] Falha ao instalar dependencias.
    pause
    exit /b 1
  )
) else (
  echo [info] vinext disponivel. Pulando reinstalacao.
)

echo [info] Executando verificacao de tipos...
call npx tsc --noEmit
if errorlevel 1 (
  echo [erro] Verificacao falhou.
  pause
  exit /b 1
)

if not exist "%LOG_DIR%" mkdir "%LOG_DIR%" >nul 2>&1
if exist "%DEV_LOG%" del /q "%DEV_LOG%" >nul 2>&1

echo [info] Iniciando servidor de desenvolvimento na porta %PORT%...
start "ICDI Dev Server" cmd /c "cd /d ""%ROOT%"" && set WRANGLER_LOG_PATH=.wrangler\wrangler.log && npm run dev > ""%DEV_LOG%"" 2>&1"

set /a ATTEMPTS=0
:wait_loop
set /a ATTEMPTS+=1
powershell -NoProfile -Command "try { Invoke-WebRequest -Uri '%URL%' -TimeoutSec 2 | Out-Null; exit 0 } catch { exit 1 }" >nul 2>&1
if not errorlevel 1 goto open_browser
if !ATTEMPTS! geq 60 (
  echo [erro] O servidor nao respondeu em tempo habil.
  echo [info] Verifique o log em "%DEV_LOG%"
  pause
  exit /b 1
)
timeout /t 2 /nobreak >nul
goto wait_loop

:open_browser
echo [info] Servidor pronto. Abrindo navegador em %URL%...
start "" "%URL%"
echo [ok] Fluxo concluido.
pause

endlocal
