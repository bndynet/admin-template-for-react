import * as React from 'react';
import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';

import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import * as ReactMarkdown from 'react-markdown';

import userActions from '../user/actions';

const styles = (theme: Theme) =>
    createStyles({
        "@global": {
            body: {
                backgroundImage: 'url(images/bg.jpg)',
                backgroundRepeat: 'none',
                paddingTop: theme.spacing.unit * 8,
                color: '#efefef',
                textShadow: '2px 2px 5px #333333',
            }
        },
        main: {
            maxWidth: 645,
            marginLeft: 'auto',
            marginRight: 'auto'
        },
        button: {
            marginTop: theme.spacing.unit,
            marginBottom: theme.spacing.unit
        }
    });

interface HomeComponentProps {
    history: any;
    classes: any;
    user: any;
    onLogout(): void;
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

    handleLogout() {
        this.setState({
            logoutDelay: 5
        });
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
            <Button size='large' disabled={!!this.state.logoutDelay} className={classes.button} onClick={this.handleLogout} color='secondary' variant='contained'>
                { this.state.logoutDelay && this.state.logoutDelay > 0 ? `Log out ` + this.state.logoutDelay + 's' : `Log out`}
            </Button>
        ) : (
            <Button size='large' className={classes.button} onClick={this.handleLogin} color='primary' variant='contained'>
                Log in
            </Button>
        );
        return (
            <div className={classes.body}>
                <main className={classes.main}>
                    <Typography gutterBottom variant='h3' component='h1' color='inherit'>
                        Hello {(this.props.user && this.props.user.username) || 'World'}!
                    </Typography>
                    <Typography gutterBottom component='p' color='inherit'>
                        This is a project for React, React Redux, and package using Webpack.
                    </Typography>
                    {btn}
                    <Typography component='div' color='inherit'>
                        <ReactMarkdown source={'# Admin Template'}></ReactMarkdown>
                    </Typography>
                </main>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.auth.user
    };
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
    return {
        onLogout: () => {
            dispatch(userActions.logout());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HomeComponent));
