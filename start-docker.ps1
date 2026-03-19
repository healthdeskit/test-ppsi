# PPSI — Docker: Node site on :3000; optional PHP with -PhpLocal
# Usage: .\start-docker.ps1          → web only
#        .\start-docker.ps1 -PhpLocal → web + PHP on :8080

param([switch]$PhpLocal)

$ErrorActionPreference = "Stop"
$root = $PSScriptRoot
Set-Location $root

function Test-DockerDaemon {
    docker info 2>$null | Out-Null
    return ($LASTEXITCODE -eq 0)
}

if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: Docker not found. Install Docker Desktop: https://www.docker.com/products/docker-desktop/" -ForegroundColor Red
    exit 1
}

if (-not (Test-DockerDaemon)) {
    $dd = "${env:ProgramFiles}\Docker\Docker\Docker Desktop.exe"
    if (Test-Path $dd) {
        Write-Host "Starting Docker Desktop..." -ForegroundColor Cyan
        Start-Process -FilePath $dd
    }
    Write-Host "Waiting for Docker (up to ~2 min)..." -ForegroundColor Cyan
    $ok = $false
    for ($i = 0; $i -lt 60; $i++) {
        if (Test-DockerDaemon) { $ok = $true; break }
        Start-Sleep -Seconds 2
    }
    if (-not $ok) {
        Write-Host "ERROR: Docker daemon not ready. Open Docker Desktop and wait until it is running." -ForegroundColor Red
        exit 1
    }
}

if ($PhpLocal) {
    Write-Host "docker compose --profile php-local up -d --build ..." -ForegroundColor Cyan
    docker compose -f "$root\docker-compose.yml" --profile php-local up -d --build
} else {
    Write-Host "docker compose up -d --build (Node only) ..." -ForegroundColor Cyan
    docker compose -f "$root\docker-compose.yml" up -d --build
}

if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host ""
Write-Host "OK" -ForegroundColor Green
Write-Host "  Site:  http://localhost:3000/" -ForegroundColor White
Write-Host "  Admin: http://localhost:3000/admin" -ForegroundColor White
Write-Host "  Set ADMIN_PASSWORD and SESSION_SECRET in .env (see .env.example)" -ForegroundColor Yellow
if ($PhpLocal) {
    Write-Host "  PHP:   http://localhost:8080/" -ForegroundColor White
}
Write-Host "  Stop:  docker compose down" -ForegroundColor Gray
