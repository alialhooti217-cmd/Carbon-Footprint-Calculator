$nodePath = "C:\Program Files\nodejs"
if (Test-Path $nodePath) {
  $env:Path = "$nodePath;$env:Path"
}

Write-Host "Installing workspace dependencies..." -ForegroundColor Cyan

if (-not (Test-Path ".env")) {
  Copy-Item ".env.example" ".env"
  Write-Host "Created .env from .env.example" -ForegroundColor Green
}

Copy-Item ".env" "apps/api/.env" -Force
Copy-Item ".env" "apps/web/.env.local" -Force
Write-Host "Synced environment files for apps/api and apps/web" -ForegroundColor Green

corepack pnpm install
if ($LASTEXITCODE -ne 0) {
  exit $LASTEXITCODE
}

corepack pnpm db:generate
exit $LASTEXITCODE
