# some bs

## some other bull shit

## tools for dev

#### node/npm dependencies

* [firebase cli](https://firebase.google.com/docs/cli?hl=en) - to run the prod deployment
* [webpack](https://webpack.js.org/guides/getting-started/) - to run bundling & minifcation of js for both dev & prod
* [sass]() - to run sass->css compilation & minification for prod


```npm
# install global things
npm install -g firebase-tools
npm install -g sass
npm install -g webpack-cli

# from the root of the project, install these two locally
npm install --save-dev webpack
npm install --save-dev webpack-merge
```

To run the firebase deployment, you need to first login:

```npm
# authenticate in order to deploy. only needs to be done once
firebase login

# deploy (or run the bundle-package-deploy.ps1 script)
firebase deploy
```

To manually run the web pack bundling:

```npm
# run the bundling using the default config
webpack

# using prod config
webpack --config webpack.prod.js
```

#### vscode extensions

* [Live Sass Compiler]() - click 'watch sass' to transpile on save
* [Live Server]() - running on localhost with live reload, or use ```firebase serve --only hosting``` as above
* [Run on Save]() - since vscode seems to have no js bundling extensions (that have more than a few hundred downloads)