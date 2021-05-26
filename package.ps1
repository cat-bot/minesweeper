Write-Host "start package"

Write-Host "copy html"
Get-Item *.html | Copy-Item -Destination .\deploy\ 

Write-Host "copy \js"
Copy-Item -Path .\js -Destination .\deploy -Recurse -Force 

Write-Host "copy \dist\css\main.min.css"
Copy-Item -Path .\dist\css\main.min.css -Destination .\deploy\css\main.css -Force 

Write-Host "copy \img"
Copy-Item -Path .\img -Destination .\deploy -Recurse -Force 

Write-Host "end package"