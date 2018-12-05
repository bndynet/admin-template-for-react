import { Theme } from '@material-ui/core/styles';
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
        useNextVariants: true
    },
    overrides: {
        // Name of the component
        MuiSvgIcon: {
            root: {
                fontSize: '1rem',
            },
            fontSizeSmall: {
                fontSize: '0.875rem',
            },
            fontSizeLarge: {
                fontSize: '1.5rem',
            },
        },
        MuiList: {
            padding: {
                paddingTop: 4,
                paddingBottom: 4,
            }
        },
        MuiListItem: {
            root: {
                paddingTop: 8,
                paddingBottom: 8,
                paddingLeft: 16,
                paddingRight: 16,
                '&$dense': {
                    fontSize: '0.875rem',
                },
            },
            dense: {
                paddingTop: 4,
                paddingBottom: 4,
                paddingLeft: 8,
                paddingRight: 8,
            }
        },
    },
    palette: {
        type: 'light' as PaletteType, // or dark
        primary: indigo,
        secondary: pink,
        error: red,

        // custom colors
        info: lightBlue[500],
        success: green[500],
        warning: amber[700]
        // end custom colors
    },
    headerHeight: 60,
    sidebarWidth: 200
};

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

export const ifTheme = (theme: Theme, lightResult: any, darkResult: any): any =>
    theme.palette.type === 'light' ? lightResult : darkResult;

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
        backgroundColor: themeConfig.palette.info
    },
    warning: {
        color: theme.palette.common.white,
        backgroundColor: themeConfig.palette.warning
    }
});

export const variantBorderColor = (theme: Theme) => ({
    success: {
        borderColor: themeConfig.palette.success
    },
    error: {
        borderColor: theme.palette.error.main
    },
    info: {
        borderColor: themeConfig.palette.info
    },
    warning: {
        borderColor: themeConfig.palette.warning
    }
});