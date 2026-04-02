Write-Host "Preparing Carbon Footprint Calculator workspace..." -ForegroundColor Cyan

if (-not (Test-Path ".env")) {
  Copy-Item ".env.example" ".env"
  Write-Host "Created .env from .env.example" -ForegroundColor Green
} else {
  Write-Host ".env already exists, leaving it unchanged" -ForegroundColor Yellow
}

Copy-Item ".env" "apps/api/.env" -Force
Copy-Item ".env" "apps/web/.env.local" -Force
Write-Host "Synced environment files for apps/api and apps/web" -ForegroundColor Green

Write-Host ""
Write-Host "Prerequisites:" -ForegroundColor Cyan
Write-Host "1. Install Node.js 20 LTS or newer" -ForegroundColor White
Write-Host "2. Install dependencies: corepack pnpm install" -ForegroundColor White
Write-Host "3. Start infrastructure: docker compose up -d" -ForegroundColor White
Write-Host "4. Generate Prisma client: corepack pnpm db:generate" -ForegroundColor White
Write-Host "5. Start apps: corepack pnpm dev" -ForegroundColor White
