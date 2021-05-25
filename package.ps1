Write-Host "start package"

Copy-Item -Path .\ -Filter *.html -Destination .\deploy -Force

Write-Host "end package"