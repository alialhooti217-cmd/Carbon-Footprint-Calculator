$nodePath = "C:\Program Files\nodejs"
$dockerPath = "C:\Program Files\Docker\Docker\resources\bin"

if (Test-Path $nodePath) {
  $env:Path = "$nodePath;$env:Path"
}

if (Test-Path $dockerPath) {
  $env:Path = "$dockerPath;$env:Path"
}

Write-Host "Starting local infrastructure..." -ForegroundColor Cyan
docker compose -f .\docker-compose.yml up -d
if ($LASTEXITCODE -ne 0) {
  Write-Host "Docker is not ready yet. Make sure Docker Desktop is installed and running." -ForegroundColor Yellow
  exit $LASTEXITCODE
}

Write-Host "Starting web, API, and worker apps..." -ForegroundColor Cyan
corepack pnpm dev
