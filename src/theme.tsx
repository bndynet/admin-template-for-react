import { Theme, createMuiTheme } from '@material-ui/core/styles';
import { Palette } from '@material-ui/core/styles/createPalette';

import indigo from '@material-ui/core/colors/indigo';
import red from '@material-ui/core/colors/red';
import pink from '@material-ui/core/colors/pink';
import green from '@material-ui/core/colors/green';
import lightBlue from '@material-ui/core/colors/lightBlue';
import amber from '@material-ui/core/colors/amber';
import { PaletteType } from '@material-ui/core';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';

// default theme at https://material-ui.com/customization/default-theme/
export const themeConfig = {
    typography: {
        useNextVariants: true,
    },
    palette: {
        type: 'light' as PaletteType,  // or dark
        primary: indigo,
        secondary: pink,
        error: red,

        // custom colors
        info: lightBlue[500],
        success: green[500],
        warning: amber[700],
        // end custom colors
    },
    headerHeight: 60,
    sidebarWidth: 220,
}

export interface IAppPalette extends Palette {
    info: string;
    success: string;
    warning: string;
}

export interface IAppTheme extends Theme {
    palette: IAppPalette;
    headerHeight: number;
    sidebarWidth: number;
}

// const appTheme: IAppTheme = createMuiTheme(themeConfig) as IAppTheme;

// export default appTheme;

export const ifTheme = (theme: Theme, lightResult: any, darkResult: any): any => (
    theme.palette.type === 'light' ? lightResult : darkResult
);

export const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon
};

export const variantColor = (theme: Theme) => ({
    success: {
        color: theme.palette.common.white,
        backgroundColor: themeConfig.palette.success
    },
    error: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.error.main
    },
    info: {
        color: theme.palette.common.white,
        backgroundColor: themeConfig.palette.info,
    },
    warning: {
        color: theme.palette.common.white,
        backgroundColor: themeConfig.palette.warning
    }
});
