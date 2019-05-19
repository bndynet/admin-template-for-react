import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

import themeConfig from './config';
import { Palette } from '@material-ui/core/styles/createPalette';

export type AppPalette = Palette & {
    info: string;
    success: string;
    warning: string;
};

export type AppTheme = Theme & {
    palette: AppPalette;
    headerHeight: number;
    sidebarWidth: number;
    sidebarWidthMini: number;
};

export const ifTheme = (theme: Theme, lightResult: any, darkResult: any): any =>
    theme.palette.type === 'light' ? lightResult : darkResult;

export const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

export const variantColor = (theme: Theme) => ({
    primary: {
        color: theme.palette.common.white,
        backgroundColor: themeConfig.palette.primary[500],
    },
    secondary: {
        color: theme.palette.common.white,
        backgroundColor: themeConfig.palette.secondary[500],
    },
    success: {
        color: theme.palette.common.white,
        backgroundColor: themeConfig.palette.success,
    },
    error: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.error.main,
    },
    info: {
        color: theme.palette.common.white,
        backgroundColor: themeConfig.palette.info,
    },
    warning: {
        color: theme.palette.common.white,
        backgroundColor: themeConfig.palette.warning,
    },
});

export const variantBorderColor = (theme: Theme) => ({
    primary: {
        borderColor: themeConfig.palette.primary[500],
    },
    secondary: {
        borderColor: themeConfig.palette.secondary[500],
    },
    success: {
        borderColor: themeConfig.palette.success,
    },
    error: {
        borderColor: theme.palette.error.main,
    },
    info: {
        borderColor: themeConfig.palette.info,
    },
    warning: {
        borderColor: themeConfig.palette.warning,
    },
});

export { default as themeConfig } from './config';
