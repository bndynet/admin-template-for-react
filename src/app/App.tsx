import * as React from 'react';
import classNames from 'classnames';
import { renderRoutes } from 'react-router-config';
import { Router } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Theme, createStyles, withStyles, LinearProgress, CircularProgress, Typography } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';

import { AppComponentState } from './app.d';
import routes from '../routes';
import Notification from './global/Notification';
import history from '../redux/history';
import config from '../config';
import appTheme from '../theme';

const styles = (theme: Theme) => {
    console.log(theme);
    console.log(theme.palette.type == 'light');
    return createStyles({
        progressBar: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 2000
        },
        overlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100vh',
            backgroundColor: fade(appTheme.palette.type === 'light' ? theme.palette.common.white : theme.palette.common.black, 0.6),
            zIndex: 9999,
        },
        overlayClose: {
            display: 'none',
        },
        circularProgressContainer: {
            backgroundColor: appTheme.palette.type === 'light' ? theme.palette.common.white : theme.palette.common.black,
            padding: theme.spacing.unit * 2,
            borderStyle: 'solid',
            borderWidth: 2,
            borderColor: fade(theme.palette.primary.main, 0.2),
            textAlign: 'center',
        },
        circularProgressWrapper: {
            position: 'relative',
            display: 'inline-block',
            margin: theme.spacing.unit * 2,
        },
        circularProgressDeterminate: {
            color: fade(theme.palette.primary.main, 0.2),
        },
        circularProgressIndeterminate: {
            color: theme.palette.primary.main,
            animationDuration: '600ms',
            position: 'absolute',
            left: 0,
        },
        circularProgressText: {
            display: 'block',
            textAlign: 'center',
        }
    });

}

class AppComponent extends React.Component<
    {
        classes?: any;
        loading: boolean;
        loadingText: string;
        requesting: boolean;
        showNotification: boolean;
        notification: any;
    },
    AppComponentState
> {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;
        return (
            <MuiThemeProvider theme={appTheme}>
                <LinearProgress hidden={!this.props.requesting} color='secondary' className={classes.progressBar} />
                <Router history={history}>
                    <main>{renderRoutes(routes)}</main>
                </Router>
                <Notification />
                <div className={classNames(classes.overlay, !this.props.loading && classes.overlayClose)}>
                    <div className={classes.circularProgressContainer}>
                        <div className={classes.circularProgressWrapper}>
                            <CircularProgress
                                variant="determinate"
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
                        <Typography classes={{root: classes.circularProgressText}}> {this.props.loadingText} </Typography>
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
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AppComponent));
