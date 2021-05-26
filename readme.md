# some bs

## some other bull shit

## tools for dev

#### node/npm dependencies

* [firebase cli](https://firebase.google.com/docs/cli?hl=en) - to run the deployment & run localhost static http server

```npm
# install firebase cli
npm install -g firebase-tools

# run local hosting
firebase serve --only hosting

# authenticate in order to deploy. only needs to be done once
firebase login

# deploy (or run the package-and-deploy.ps1 script)
firebase deploy
```

* [webpack](https://webpack.js.org/guides/getting-started/) - to run bundling of js

```npm
# install
npm install -g webpack webpack-cli

# run the bundling
webpack
```

#### vscode extensions

* [Live Sass Compiler]() - click 'watch sass' to transpile on save
* [Live Server]() - running on localhost with live reload, or use ```firebase serve --only hosting``` as above
* [Run on Save]() - since vscode seems to have no js bundling extensions (that have more than a few hundred downloads)