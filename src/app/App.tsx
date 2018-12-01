import * as React from 'react';
import { renderRoutes } from 'react-router-config';
import { Router } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';
import * as _ from 'lodash';

import { MuiThemeProvider, createMuiTheme, withTheme } from '@material-ui/core/styles';
import { Theme, createStyles, withStyles, LinearProgress } from '@material-ui/core';

import routes from '../routes';
import Notifier, { NotifierOptions } from './common/Notifier';
import history from '../redux/history';
import globalActions from './global/actions';
import Overlay from './common/Overlay';
import Loading from './common/Loading';
import { themeConfig } from '../theme';

const styles = (theme: Theme) => {
    console.log(theme);
    return createStyles({
        '@global': {
            '.recharts-tooltip-label': {
                color: theme.palette.common.black,
            },
        },
        progressBar: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 2000
        },
    });
};

class AppComponent extends React.Component<{
    classes?: any;
    loading: boolean;
    loadingText: string;
    requesting: boolean;
    showNotifier: boolean;
    notifierOptions: NotifierOptions;
    theme: any;
    onCloseNotifier: () => void;
}> {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, theme, notifierOptions, showNotifier } = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <LinearProgress hidden={!this.props.requesting} color='secondary' className={classes.progressBar} />
                <Router history={history}>
                    <main>{renderRoutes(routes)}</main>
                </Router>
                <Notifier options={notifierOptions} open={showNotifier} onCloseButtonClick={this.props.onCloseNotifier} hasCloseButton={true} />
                <Overlay open={this.props.loading}>
                    <Loading loadingText='Loading...' />
                </Overlay>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = (state) => {
    const clientTheme = state.global.theme;
    // TODO: combine clientTheme to themeConfig
    const finalTheme = _.merge({}, themeConfig, clientTheme);
    return {
        loading: state.global.loading,
        loadingText: state.global.loadingTxt,
        requesting: state.global.requesting,
        notifierOptions: state.global.notifierOptions,
        showNotifier: state.global.showNotifier,
        theme: createMuiTheme(finalTheme),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    onCloseNotifier: () => (dispatch(globalActions.unnotify())),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTheme()(withStyles(styles)(AppComponent)));
