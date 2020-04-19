import { PaletteType } from '@material-ui/core';
import indigo from '@material-ui/core/colors/indigo';
import red from '@material-ui/core/colors/red';
import pink from '@material-ui/core/colors/pink';
import green from '@material-ui/core/colors/green';
import lightBlue from '@material-ui/core/colors/lightBlue';
import amber from '@material-ui/core/colors/amber';

// default theme at https://material-ui.com/customization/default-theme/
const config = {
    layout: 'classic', // popular or classic
    typography: {
        useNextVariants: true,
    },
    overrides: {
        // Name of the component
        MuiSvgIcon: {
            root: {
                fontSize: '1rem',
                verticalAlign: 'text-top',
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
            },
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
            },
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
        warning: amber[700],
        // end custom colors
    },
    headerHeight: 60,
    sidebarWidth: 200,
    sidebarWidthMini: 56,
};

export default config;
