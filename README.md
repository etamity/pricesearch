# Price Search

To fast install dependences, I recommend to use [yarn](https://yarnpkg.com/lang/en/). 

## Screenshots
![Test Instructions](https://raw.githubusercontent.com/etamity/pricesearch/master/screenshot.png?raw=true)

## Install 

`yarn` 

## Start

`yarn dev`

## Build
Your build version will be under `dist` folder.

`yarn build`

## Test

`yarn test`

`yarn test-watch`

Test report will be gernerated under project folder root `test-report.html`

##Otherwise, you can use `npm run` instead `yarn`.

For example:
    
    `npm i && npm run dev`
    
    `npm run test`
    
    `npm run build`

## Dependences
    [Coreui](https://coreui.io/)
    [Jest](https://jestjs.io/)
    [Webpack](https://webpack.js.org/)

## Dynamic page routing

The project able to generate routes base `Pages/index.js` file, as long as creating new page under `Pages` folder, and export it in `Pages/index.js`, the `Libs/RouterWrapper` will generate routes.
Please refer `AppContainer.js` file about dynamic routing.