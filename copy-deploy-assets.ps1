Write-Host "start package"

Write-Host "copy html"
Get-Item *.html | Copy-Item -Destination .\deploy\ 

Write-Host "copy \img"
Copy-Item -Path .\img -Destination .\deploy -Recurse -Force 

Write-Host "end package"