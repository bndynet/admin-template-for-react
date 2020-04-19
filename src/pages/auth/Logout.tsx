import * as React from 'react';
import * as intl from 'react-intl-universal';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import {
    CssBaseline,
    Typography,
    Theme,
    createStyles,
    withStyles,
} from '@material-ui/core';
import { themeConfig } from 'app/theme';
import { Panel } from 'app/ui';
import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';

import {
    actions as authActions,
    service as authService,
} from '../../service/auth';

const styles = (theme: Theme) =>
    createStyles({
        panel: {
            marginTop: theme.spacing(8),
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(4),
            width: 400,
            textAlign: 'center',
        },
        body: {
            wordBreak: 'break-all',
        },
        icon: {
            marginBottom: 30,
        },
        success: {
            color: themeConfig.palette.success,
        },
        warning: {
            color: themeConfig.palette.warning,
        },
        textColor: {
            color: theme.palette.text.primary,
        },
    });

interface LogoutComponentProps {
    classes: any;
    handleLogout: () => void;
}

class Logout extends React.Component<
    LogoutComponentProps,
    {
        loading: boolean;
        error: any;
    }
> {
    public constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: null,
        };
    }

    public componentWillMount() {
        const logoutResult = authService.logout();
        if (logoutResult && logoutResult.then) {
            logoutResult
                .then(null, error => {
                    this.setState({ error });
                })
                .finally(() => {
                    this.setState({
                        loading: false,
                    });
                });
        }
        this.props.handleLogout();
    }

    public render() {
        const { classes } = this.props;
        return (
            <main>
                <CssBaseline />
                <Panel
                    variant={
                        this.state.loading
                            ? 'default'
                            : this.state.error
                            ? 'warning'
                            : 'success'
                    }
                    className={classes.panel}
                >
                    {this.state.loading && (
                        <div>
                            <Typography
                                gutterBottom={true}
                                component="h1"
                                variant="h6"
                            >
                                Logging out your session...
                            </Typography>
                        </div>
                    )}
                    {!this.state.loading &&
                        (this.state.error ? (
                            <div>
                                <i
                                    className={classNames(
                                        'fa fa-exclamation-triangle fa-5x',
                                        classes.icon,
                                        classes.warning,
                                    )}
                                />
                                <Typography
                                    gutterBottom={true}
                                    variant="body2"
                                    className={classes.body}
                                >
                                    {JSON.stringify(this.state.error)}
                                </Typography>
                            </div>
                        ) : (
                            <div>
                                <i
                                    className={classNames(
                                        'fa fa-check-circle fa-5x',
                                        classes.icon,
                                        classes.success,
                                    )}
                                />
                                <Typography
                                    gutterBottom={true}
                                    component="h1"
                                    variant="h6"
                                >
                                    {intl.get('logout.success')}
                                </Typography>
                            </div>
                        ))}
                    {!this.state.loading && (
                        <Typography variant="body1">
                            <Link className={classes.textColor} to="/">
                                {intl.get('goHome')}
                            </Link>
                        </Typography>
                    )}
                </Panel>
            </main>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    handleLogout: () => {
        dispatch(authActions.logout());
    },
});

export default connect(
    null,
    mapDispatchToProps,
)(withStyles(styles)(Logout));
