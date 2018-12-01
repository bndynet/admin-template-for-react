import { Theme, createMuiTheme } from '@material-ui/core/styles';
import { Palette } from '@material-ui/core/styles/createPalette';

import indigo from '@material-ui/core/colors/indigo';
import red from '@material-ui/core/colors/red';
import pink from '@material-ui/core/colors/pink';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import { PaletteType } from '@material-ui/core';

export interface IAppPalette extends Palette {
    success: string;
    warning: string;
}

export interface IAppTheme extends Theme {
    palette: IAppPalette;
    headerHeight: number;
    sidebarWidth: number;
}

// default theme at https://material-ui.com/customization/default-theme/
const themeConfig = {
    typography: {
        useNextVariants: true,
    },
    palette: {
        type: 'light' as PaletteType,  // or dark
        primary: indigo,
        secondary: pink,
        error: red,

        // custom colors
        success: green[500],
        warning: amber[500],
        // end custom colors
    },
    headerHeight: 60,
    sidebarWidth: 220,
}

const appTheme: IAppTheme = createMuiTheme(themeConfig) as IAppTheme;

export default appTheme;