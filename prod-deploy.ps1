## build / bundle js for prod
write-host "webpack js"
webpack --config webpack.prod.js

## sass will already have been compiled and minified to deploy on last save
write-host "sass transpile"
sass 'src/sass/app.scss' 'deploy/css/app.css' -s compressed --no-source-map 

## copy a few other assets
Write-Host "copy html"
Get-Item -path .\dev\*.html | Copy-Item -Destination .\deploy\ 

Write-Host "copy \img"
Copy-Item -Path .\dev\img -Destination .\deploy -Recurse -Force 

## deploy
write-host "firebase deploy"
firebase deploy