Write-Host "start package"

Write-Host "copy html"
Get-Item *.html | Copy-Item -Destination .\deploy\ 

Write-Host "copy \js"
Copy-Item -Path .\js -Destination .\deploy\js -Force 

Write-Host "copy \app.min.css"
Copy-Item -Path .\css\app.min.css -Destination .\deploy\css\app.min.css -Force 

Write-Host "copy \img"
Copy-Item -Path .\img -Destination .\deploy -Recurse -Force 

Write-Host "end package"