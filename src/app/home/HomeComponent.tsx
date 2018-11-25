import * as React from 'react';
import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';

import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import * as ReactMarkdown from 'react-markdown';

import authActions from '../auth/actions';
import homeActions from './actions';
import globalActions from '../global/actions';

const styles = (theme: Theme) =>
    createStyles({
        '@global': {
            body: {
                // backgroundImage: 'url(images/bg.jpg)',
                backgroundRepeat: 'none',
                paddingTop: theme.spacing.unit * 8,
                color: '#dddddd',
                textShadow: '2px 2px 5px #333333'
            },
            '.markdown-body a': {
                color: '#ffffff',
                textDecoration: 'underline',
            }
        },
        main: {
            maxWidth: 845,
            marginLeft: 'auto',
            marginRight: 'auto'
        },
        fab: {
            position: 'fixed',
            right: theme.spacing.unit * 2,
            bottom: theme.spacing.unit * 2,
            fontSize: 24,
            fontWeight: 700,
            '&.disabled': {
                color: '#ffffff',
            }
        },
    });

interface HomeComponentProps {
    history: any;
    classes: any;
    user: any;
    readme: string;
    onLogout(): void;
    onPreLogout(): void;
    onGetReadme(): void;
}

interface HomeComponentState {
    logoutDelay?: number;
}

class HomeComponent extends React.Component<HomeComponentProps, HomeComponentState> {
    interval: any;

    constructor(props: HomeComponentProps) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.state = {
            logoutDelay: null
        };
    }

    componentWillMount() {
        this.props.onGetReadme();
    }

    handleLogout() {
        this.setState({
            logoutDelay: 5
        });
        this.props.onPreLogout();
        this.interval = setInterval(() => {
            const delay = this.state.logoutDelay - 1;
            this.setState({
                logoutDelay: delay
            });
            if (delay <= 0) {
                clearInterval(this.interval);
                this.props.onLogout();
                this.props.history.push('/logout');
                return;
            }
        }, 1000);
    }

    handleLogin() {
        this.props.history.push('/login');
    }

    render() {
        const { classes } = this.props;
        const btn = this.props.user ? (
            <Tooltip title={this.props.user.username}>
                <Button
                    disabled={!!this.state.logoutDelay}
                    classes={{root: classes.fab, disabled: 'disabled'}} 
                    onClick={this.handleLogout}
                    color='secondary'
                    variant='fab'>
                    {this.state.logoutDelay && this.state.logoutDelay > 0 ? (
                        this.state.logoutDelay
                    ) : (
                        this.props.user.username[0]
                    )}
                </Button>
            </Tooltip>
        ) : (
            <Tooltip title='Log in'>
                <Button classes={{root: classes.fab, disabled: 'disabled'}} onClick={this.handleLogin} color='primary' variant='fab'>
                    <AccountCircleIcon />
                </Button>
            </Tooltip>
        );
        return (
            <div className={classes.body}>
                <main className={classes.main}>
                    <ReactMarkdown source={this.props.readme} className={'markdown-body'} />
                    {btn}
                </main>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.auth.user,
        readme: state.home.readme,
    };
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
    let s = false;
    return {
        onLogout: () => {
            dispatch(authActions.logout());
        },
        onPreLogout: () => {
            dispatch(globalActions.notify({
                message: 'Logging out...',
                variant: 'info',
                duration: 5000,
                placement: 'bottom left',
            }));
        },
        onGetReadme: () => {
            dispatch(homeActions.getReadme());
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HomeComponent));
