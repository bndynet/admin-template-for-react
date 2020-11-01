# Admin Template for React

[DEMO](https://bndynet.github.io/admin-template-for-react/) - Type any account to log in

![](https://github.com/bndynet/admin-template-for-react/workflows/CI/badge.svg)
![](https://img.shields.io/badge/Language-TypeScript-blue.svg)
![](https://img.shields.io/badge/Language-SCSS-blue.svg)
![](https://img.shields.io/badge/React-16.3-brightgreen.svg?logo=react)
![](https://img.shields.io/badge/React-Redux-brightgreen.svg?logo=react)
![](https://img.shields.io/badge/React-react--router--config-brightgreen.svg?logo=react)
![](https://img.shields.io/badge/React-react--intl-brightgreen.svg?logo=react)
![](https://img.shields.io/badge/React-connected--react--router-brightgreen.svg?logo=react)
![](https://img.shields.io/badge/React-Redux%20Saga-brightgreen.svg?logo=react)
[![code style: prettier](https://img.shields.io/badge/Code_Style-Prettier-ff69b4.svg)](https://github.com/prettier/prettier)

A starter admin template with React, React Redux, Material UI and TypeScript that packages using Webpack and integrates a minimal project structure.

**Classic Layout**
![screenshot](https://raw.githubusercontent.com/bndynet/admin-template-for-react/master/docs/images/admin-home.png)

**Popular Layout**
![screenshot](https://raw.githubusercontent.com/bndynet/admin-template-for-react/master/docs/images/admin-home-minimenu.png)

- AJAX component: **[axios](https://github.com/axios/axios)**
- UI component: **[material-ui](https://material-ui.com/)**
- REACT stack: react, react-dom, react-redux, react-router-config, react-router-dom, redux, redux-saga, react-intl-universal
- You can custom theme in **./src/theme/config.tsx** file

## ❯ Getting Started

1. Clone repo `git clone <git-url>`
2. `npm install` to install all dependencies
3. `npm start` to start web server or `npm run build` to build production code into **dist** folder

## ❯ Development

### Application Configuration Examples

- ./src/config/app.common.tsx - _all common configurations_
- ./src/config/app.dev.tsx - _configurations used in local_
- ./src/config/app.prod.tsx - _configurations used in production_
- ./src/config/app.github.tsx - _example for github authorization_
- ./src/config/app.auth-code.tsx - _example for authorization code grant type_
- ./src/config/app.auth-password.tsx - _example for password grant type_
- ./src/config/app.mock.tsx - _just for local development without login system_

### Customize more environments

1. New file **./src/config/app.[env_name].tsx** to override your configurations

2. Recommend to import configurations in **app.dev.tsx**

    ```ts
    import config = require('./app.your-env');
    ```

    Or add below code in **./src/config/index.tsx** or **./index.html** to freeze your environment

    ```ts
    window.__APP_ENV__ = 'your-env';
    ```

3. `npm start` and `npm run build` will always use the environment you defined

### Components based on Material UI or some else

`Alert`, `Loading`, `MiniCard`, `Notifier`, `Overlay`, `Panel`, `Tag`, `DataTable`, ...

### i18n/l10n Support

```tsx
import * as intl from 'react-intl-universal';

const message = intl.get('i18nKey');
```

### Available Services

- `import { service as resourceService } from "app/service/resource";` to call APIs which has appended access token in request header
- `import { getState as getAuthState } from "app/service/auth";` to get current user information

### Debug with **Chrome** in **Visual Studio Code**

1. Requires **[Visual Studio Code](https://code.visualstudio.com/)** as IDE and extension **[Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)**

1. `npm start` to run application

1. Click menu **Debug** > **Start Debugging** to debug with generated **.vscode/launch.json** file as below:

    ```json
    {
        "version": "0.2.0",
        "configurations": [
            {
                "type": "chrome",
                "request": "launch",
                "name": "Launch Chrome against localhost",
                "url": "http://localhost:8080",
                "webRoot": "${workspaceFolder}"
            }
        ]
    }
    ```

1. Set breakpoints in your **vscode** and operate in the new Chrome window **Start Debugging** opened

### Recommendatory extensions for **Chrome**

- React Developer Tools
- Redux DevTools

Above extensions will show you the **Actions**, **States** and **Reducers** in **Chrome** console.
