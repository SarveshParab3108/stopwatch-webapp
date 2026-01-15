# Simple smoke test for GitHub Pages deployment
# Usage: powershell -ExecutionPolicy Bypass -File .\scripts\check_pages.ps1

$Url = 'https://SarveshParab3108.github.io/stopwatch-webapp/'
Write-Output "Checking: $Url"

try {
    $resp = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 15
    Write-Output "HTTP Status: $($resp.StatusCode)"
    if ($resp.StatusCode -eq 200) {
        Write-Output "OK: site is live"
        exit 0
    } else {
        Write-Output "WARN: unexpected status"
        exit 2
    }
} catch {
    Write-Output "ERROR: request failed - $($_.Exception.Message)"
    exit 1
}
