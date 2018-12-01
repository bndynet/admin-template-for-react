import * as React from 'react';
import classNames from 'classnames';
import { renderRoutes } from 'react-router-config';
import { Router } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';

import { MuiThemeProvider } from '@material-ui/core/styles';
import { Theme, createStyles, withStyles, LinearProgress, CircularProgress, Typography } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';

import routes from '../routes';
import Notifier, { NotifierOptions } from './common/Notifier';
import history from '../redux/history';
import appTheme, { ifTheme } from '../theme';
import globalActions from './global/actions';

const styles = (theme: Theme) => {
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
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100vh',
            backgroundColor: fade(ifTheme(theme.palette.common.white, theme.palette.common.black), 0.5),
            zIndex: 9999
        },
        overlayClose: {
            display: 'none'
        },
        circularProgressContainer: {
            backgroundColor: ifTheme(theme.palette.common.white, theme.palette.common.black),
            padding: theme.spacing.unit * 2,
            borderStyle: 'solid',
            borderWidth: 2,
            borderColor: fade(theme.palette.primary.main, 0.2),
            textAlign: 'center'
        },
        circularProgressWrapper: {
            position: 'relative',
            display: 'inline-block',
            margin: theme.spacing.unit * 2
        },
        circularProgressDeterminate: {
            color: fade(theme.palette.primary.main, 0.2)
        },
        circularProgressIndeterminate: {
            color: theme.palette.primary.main,
            animationDuration: '600ms',
            position: 'absolute',
            left: 0
        },
        circularProgressText: {
            display: 'block',
            textAlign: 'center'
        }
    });
};

class AppComponent extends React.Component<{
    classes?: any;
    loading: boolean;
    loadingText: string;
    requesting: boolean;
    showNotifier: boolean;
    onCloseNotifier: () => void;
    notifierOptions: NotifierOptions;
}> {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, notifierOptions, showNotifier } = this.props;
        return (
            <MuiThemeProvider theme={appTheme}>
                <LinearProgress hidden={!this.props.requesting} color='secondary' className={classes.progressBar} />
                <Router history={history}>
                    <main>{renderRoutes(routes)}</main>
                </Router>
                <Notifier options={notifierOptions} open={showNotifier} onCloseButtonClick={this.props.onCloseNotifier} hasCloseButton={true} />
                <div className={classNames(classes.overlay, !this.props.loading && classes.overlayClose)}>
                    <div className={classes.circularProgressContainer}>
                        <div className={classes.circularProgressWrapper}>
                            <CircularProgress
                                variant='determinate'
                                value={100}
                                className={classes.circularProgressDeterminate}
                                size={48}
                                thickness={4}
                            />
                            <CircularProgress
                                variant='indeterminate'
                                disableShrink
                                className={classes.circularProgressIndeterminate}
                                size={48}
                                thickness={4}
                            />
                        </div>
                        <Typography classes={{ root: classes.circularProgressText }}>
                            {' '}
                            {this.props.loadingText}{' '}
                        </Typography>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = (state) => ({
    loading: state.global.loading,
    loadingText: state.global.loadingText,
    requesting: state.global.requesting,
    notifierOptions: state.global.notifierOptions,
    showNotifier: state.global.showNotifier,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    onCloseNotifier: () => (dispatch(globalActions.unnotify())),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AppComponent));
