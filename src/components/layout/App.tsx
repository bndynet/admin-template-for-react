import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';
import { renderRoutes } from 'react-router-config';
import { IntlProvider } from 'react-intl';
import _merge from 'lodash-es/merge';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Theme, createStyles, withStyles, LinearProgress } from '@material-ui/core';

import { routes } from 'app/config';
import { themeConfig } from 'app/theme';
import { Notifier, NotifierOptions, Overlay, Loading } from 'app/ui';
import { messages, defaultLocale } from 'app/locales';
import { KEY_LOCALE, KEY_THEME, actions as globalActions } from 'app/service/global';
import storage from 'app/helpers/storage';

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
    locale: string;
    onCloseNotifier: () => void;
}

class App extends React.Component<AppComponentProps> {
    constructor(props) {
        super(props);
    }

    public render() {
        const { classes, theme, notifierOptions, showNotifier } = this.props;
        return (
            <div className={theme.palette.type}>
                <IntlProvider locale={this.props.locale} key={this.props.locale} messages={messages[this.props.locale]}>
                    <MuiThemeProvider theme={theme}>
                        <LinearProgress hidden={!this.props.requesting} color='secondary' className={classes.progressBar} />
                        <Notifier
                            options={notifierOptions}
                            open={showNotifier}
                            onCloseButtonClick={this.props.onCloseNotifier}
                            hasCloseButton={true}
                        />
                        <Overlay open={this.props.loading}>
                            <Loading loadingText={this.props.loadingText} />
                        </Overlay>
                        {renderRoutes(routes)}
                    </MuiThemeProvider>
                </IntlProvider>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const clientTheme = state.global.theme || storage.get(KEY_THEME);
    const finalTheme = clientTheme ? _merge({}, themeConfig, clientTheme) : themeConfig;
    const muiFinalTheme = createMuiTheme(finalTheme);
    return {
        loading: state.global.loading,
        loadingText: state.global.loadingText,
        requesting: state.global.requesting,
        notifierOptions: state.global.notifierOptions,
        showNotifier: state.global.showNotifier,
        theme: muiFinalTheme,
        locale: state.global.locale || storage.get(KEY_LOCALE) || defaultLocale,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    onCloseNotifier: () => dispatch(globalActions.unnotify()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
