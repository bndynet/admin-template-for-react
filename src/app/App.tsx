import * as React from 'react';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
   typography: {
     useNextVariants: true,
   },
 });

import routes from '../routes';

export class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Router>
                    <main>{renderRoutes(routes)}</main>
                </Router>
            </MuiThemeProvider>
        );
    }
}
