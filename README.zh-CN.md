# Admin Template for React

[演示](https://admin-react.bndy.net/) - 输入任意字符，即可登录

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

这是一个基于 React 技术栈的项目，使用了 React Redux, Material UI 等组件。项目使用 TypeScript 为主要编程语言，同时使用了 Webpack 来打包。

![](https://raw.githubusercontent.com/bndynet/admin-template-for-react/master/docs/images/admin-home.png)

- AJAX 组件: **[axios](https://github.com/axios/axios)**
- UI 组件: **[material-ui](https://material-ui.com/)**
- React 组件: react, react-dom, react-redux, react-router-config, react-router-dom, redux, redux-saga
- 你可以在**./src/theme/config.tsx**文件中，定义自己的主题样式

## 本地启动项目

1. 通过命令下载源代码 `git clone <git-url>`
2. 运行`npm install`命令安装所有的依赖项
3. 运行`npm start`命令启动项目，或者运行`npm run build`命令来编译代码，最终产线的代码将会被编译至**dist**目录中。

## 开发

### 项目配置文件

- ./src/config/app.common.tsx - 公共配置项，以下所有配置文件，将继承与它
- ./src/config/app.dev.tsx - 本地开发项目配置文件
- ./src/config/app.prod.tsx - 产线环境配置文件
- ./src/config/app.github.tsx - 与 GitHub 集成的配置文件
- ./src/config/app.auth-code.tsx - 基于 OAuth Authorizaotn Code 的配置文件示例
- ./src/config/app.auth-password.tsx - 基于 OAuth Password Grant Type 的配置文件示例
- ./src/config/app.mock.tsx - 没有任何登录系统时，使用的配置文件。

### 自定义更多的配置文件

1. 创建名为 **./src/config/app.[env_name].tsx** 的配置文件

2. 在**app.dev.tsx**文件中，导入你新创建的配置文件。

    ```ts
    import config = require('./app.your-env');
    ```

    或者，你可以在 **./src/config/index.tsx** or **./index.html** 文件中，指定你需要使用的配置文件（此项会忽略其它设置，将会一直使用你指定的配置文件，无论本地环境，还是`npm run build`生成的线上环境），例如：

    ```ts
    window.__APP_ENV__ = 'your-env';
    ```

3. 运行`npm start`命令启动本地项目，此时，就会使用你新创建的配置文件项。

### 可用的 UI 组件如下，更多请见**/src/ui**文件夹

`Alert`, `Loading`, `MiniCard`, `Notifier`, `Overlay`, `Panel`, `Tag`, `DataTable`, ...

### 多语言支持

```tsx
import * as intl from 'react-intl-universal';

const message = intl.get('i18nKey');
```

### 可用的服务

- `import { service as resourceService } from "app/service/resource";` - 使用 **resourceService** 来调用所有的 API, 此方法将会将 Access Token 附加到请求的 Header 中
- `import { getState as getAuthState } from "app/service/auth";` - **getAuthState()** 获取当前登录用户信息
