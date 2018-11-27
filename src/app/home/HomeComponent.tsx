import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';
import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import authActions from '../auth/actions';
import homeActions from './actions';
import globalActions from '../global/actions';

const styles = (theme: Theme) =>
    createStyles({
        '@global': {
            body: {
                backgroundImage: 'url(images/bg.jpg)',
                backgroundRepeat: 'none',
                paddingTop: theme.spacing.unit * 8,
                color: '#dddddd',
                textShadow: '2px 2px 5px #333333'
            },
            '.markdown-body a': {
                color: '#ffffff',
                textDecoration: 'underline'
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
                color: '#ffffff'
            }
        },
        forkMe: {
            position: 'absolute',
            top: 0,
            right: 0,
            border: 0,
        }
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
                    classes={{ root: classes.fab, disabled: 'disabled' }}
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
                <Button
                    classes={{ root: classes.fab, disabled: 'disabled' }}
                    onClick={this.handleLogin}
                    color='primary'
                    variant='fab'>
                    <AccountCircleIcon />
                </Button>
            </Tooltip>
        );
        return (
            <div className={classes.body}>
                <a href="https://github.com/bndynet/admin-template-for-react">
                    <img className={classes.forkMe}
                        src="https://s3.amazonaws.com/github/ribbons/forkme_right_white_ffffff.png" alt="Fork me on GitHub" />
                    </a>
                <main className={classes.main}>
                    <ReactMarkdown source={this.props.readme} className={'markdown-body'} />
                    {btn}
                </main>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    readme: state.home.readme
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    onLogout: () => {
        dispatch(authActions.logout());
    },
    onPreLogout: () => {
        dispatch(
            globalActions.notify({
                message: 'Logging out...',
                variant: 'info',
                duration: 5000,
                placement: 'bottom left'
            })
        );
    },
    onGetReadme: () => {
        dispatch(homeActions.getReadme());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HomeComponent));
