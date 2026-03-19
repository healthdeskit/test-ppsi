# PPSI: Convert images to WebP (requires Node.js + npm install sharp)
# Close IDE/file locks on images if conversion fails.
Set-Location $PSScriptRoot\..
if (-not (Test-Path "node_modules\sharp")) {
    Write-Host "Installing sharp..." -ForegroundColor Cyan
    npm install sharp --save-dev --no-fund
}
node scripts/convert-to-webp.mjs
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
Write-Host "`nTip: On Linux hosting, folder must match URL case. Use Location-photos or rename to location-photos and update HTML." -ForegroundColor Yellow
