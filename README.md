# Admin Template for React

![](https://img.shields.io/badge/Language-TypeScript-blue.svg?style=flat-square)
![](https://img.shields.io/badge/Language-SCSS-blue.svg?style=flat-square)
![](https://img.shields.io/badge/React-16.3-brightgreen.svg?style=flat-square&logo=react)
![](https://img.shields.io/badge/React-Redux-brightgreen.svg?style=flat-square&logo=react)
![](https://img.shields.io/badge/React-react--router--config-brightgreen.svg?style=flat-square&logo=react)
![](https://img.shields.io/badge/React-react--intl-brightgreen.svg?style=flat-square&logo=react)
![](https://img.shields.io/badge/React-connected--react--router-brightgreen.svg?style=flat-square&logo=react)
![](https://img.shields.io/badge/React-Redux%20Saga-brightgreen.svg?style=flat-square&logo=react)
[![code style: prettier](https://img.shields.io/badge/Code_Style-Prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)


A starter admin template with React, React Redux, Material UI and TypeScript that packages using Webpack and integrates a minimal project structure.

![](https://raw.githubusercontent.com/bndynet/admin-template-for-react/master/docs/images/admin-home.png)

- AJAX component: **[axios](https://github.com/axios/axios)**
- UI component: **[material-ui](https://material-ui.com/)**
- REACT stack: react, react-dom, react-redux, react-router-config, react-router-dom, redux, redux-saga

**Demo Address**: [http://admin-react.bndy.net/](http://admin-react.bndy.net/)

## Getting Started

1. Clone repo `git clone <git-url>`
2. `npm install` to install all dependencies
3. `npm start` to start web server
4. `npm run build` to build production code into **dist** folder

## Development

### Application Configurations

```ts
export interface Config {
    // following options used to log in
    clientId?: string;
    clientSecret?: string;
    oauthBaseUri?: string;
    // define your resource base url
    resourceBaseUri?: string;
    // default locale for language and datetime format
    defaultLocale?: LocaleType;
}
```

- ./src/config/app.dev.tsx
- ./src/config/app.prod.tsx
- ./src/config/app.common.tsx

### Customize more environments

1. New file **./src/config/app.[env_name].tsx** to override your configurations
2. Use below code to merge settings in **./src/config/index.tsx**
    ```ts
    switch (env) {
        case 'production':
            return (window.__APP_CONF__ = _merge(require('./app.common'), require('./app.[env_name]')));
    ```
3. Add below code in **./src/config/index.tsx** or **./index.html**
    ```ts
    window.__APP_ENV__ = 'your env';
    ```
4. `npm start` and `npm run build` will always use the environment you defined

### Components based on Material UI or some else

`Alert`, `Loading`, `MiniCard`, `Notifier`, `Overlay`, `Panel`, `Tag`, ...

### i18n/l10n Support

```tsx
<Formatter i18nKey='hi' value={{name: 'Bendy'}} description='This is a welcome message.' descriptionPlacement='top' />

<Formatter value={10000} />

<Formatter value={1459832991883} formatAs='date' />

<Formatter value={1459832991883} formatAs='time' />

<Formatter value={1459832991883} formatAs='fromNow' />
```

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