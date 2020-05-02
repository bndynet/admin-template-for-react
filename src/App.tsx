import * as React from 'react';
import _merge from 'lodash-es/merge';
import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {
    Theme,
    createStyles,
    withStyles,
    LinearProgress,
} from '@material-ui/core';

import { routes } from './routers/routes';
import { themeConfig } from 'app/theme';
import { Notifier, NotifierOptions, Overlay, Loading } from 'app/ui';
import { actions as globalActions } from 'app/service/global';
import { KEY_THEME } from 'app/theme';
import storage from 'app/helpers/storage';
import { onAppInit } from './app.events';
import utils from './helpers/utils';

const styles = (theme: Theme) => {
    return createStyles({
        '@global': {
            a: {
                color: 'inherit',
            },
            '.recharts-tooltip-label': {
                color: theme.palette.common.black,
            },
        },
        progressBar: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 2000,
        },
    });
};

interface AppComponentProps {
    classes?: any;
    loading: boolean;
    loadingText: string;
    requesting: boolean;
    showNotifier: boolean;
    notifierOptions: NotifierOptions;
    theme: any;
    onCloseNotifier: () => void;
}

interface AppComponentState {
    initDone: boolean;
}

class App extends React.Component<AppComponentProps, AppComponentState> {
    public constructor(props) {
        super(props);
        this.state = {
            initDone: false,
        };
    }

    public componentDidMount() {
        onAppInit({
            localeDone: () => {
                this.setState({ initDone: true });
            },
        });
    }

    public render() {
        const { classes, theme, notifierOptions, showNotifier } = this.props;
        return (
            this.state.initDone && (
                <div className={theme.palette.type}>
                    <MuiThemeProvider theme={theme}>
                        <LinearProgress
                            hidden={!this.props.requesting}
                            color="secondary"
                            className={classes.progressBar}
                        />
                        <Notifier
                            options={notifierOptions}
                            open={showNotifier}
                            onCloseButtonClick={this.props.onCloseNotifier}
                            hasCloseButton={true}
                        />
                        <Overlay open={this.props.loading}>
                            <Loading loadingText={this.props.loadingText} />
                        </Overlay>
                        {utils.renderRoutes(routes)}
                    </MuiThemeProvider>
                </div>
            )
        );
    }
}

const mapStateToProps = state => {
    const clientTheme = state.global.theme || storage.get(KEY_THEME);
    const finalTheme = clientTheme
        ? _merge({}, themeConfig, clientTheme)
        : themeConfig;
    const muiFinalTheme = createMuiTheme(finalTheme);
    return {
        loading: state.global.loading,
        loadingText: state.global.loadingText,
        requesting: state.global.requesting,
        notifierOptions: state.global.notifierOptions,
        showNotifier: state.global.showNotifier,
        theme: muiFinalTheme,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    onCloseNotifier: () => dispatch(globalActions.unnotify()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(App));
