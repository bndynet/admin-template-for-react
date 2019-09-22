import * as React from 'react';
import * as intl from 'react-intl-universal';
import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';

import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import AccountCircleRounded from '@material-ui/icons/AccountCircleRounded';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { actions as authActions } from 'app/service/auth';
import { actions as globalActions } from 'app/service/global';

const styles = (theme: Theme) =>
    createStyles({
        main: {
            width: 'auto',
            display: 'block',
            marginLeft: theme.spacing(3),
            marginRight: theme.spacing(3),
            [theme.breakpoints.up(400 + theme.spacing(6))]: {
                width: 400,
                marginLeft: 'auto',
                marginRight: 'auto',
            },
        },
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: `${theme.spacing(2)}px ${theme.spacing(
                3,
            )}px ${theme.spacing(3)}px`,
        },
        avatar: {
            margin: theme.spacing(),
            backgroundColor: theme.palette.secondary.main,
            width: 100,
            height: 100,
            fontSize: 110,
        },
        form: {
            width: '100%',
            marginTop: theme.spacing(),
        },
        submit: {
            marginTop: theme.spacing(3),
        },
    });

interface LoginComponentProps {
    history: any;
    classes: any;
    onLogin: (
        username: string,
        password: string,
        rememberMe: boolean,
    ) => boolean;
}

interface LoginComponentState {
    username: string;
    password: string;
    rememberMe: boolean;
}

class Login extends React.Component<LoginComponentProps, LoginComponentState> {
    public constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            rememberMe: true,
        };
        this.onLogin = this.onLogin.bind(this);
    }

    public render() {
        const { classes } = this.props;
        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <AccountCircleRounded fontSize="inherit" />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {intl.get('admin.brand')}
                    </Typography>
                    <form className={classes.form}>
                        <FormControl
                            margin="normal"
                            required={true}
                            fullWidth={true}
                        >
                            <InputLabel htmlFor="username">
                                {intl.get('username')}
                            </InputLabel>
                            <Input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                autoFocus={true}
                                onChange={e => {
                                    this.setState({ username: e.target.value });
                                }}
                            />
                        </FormControl>
                        <FormControl
                            margin="normal"
                            required={true}
                            fullWidth={true}
                        >
                            <InputLabel htmlFor="password">
                                {intl.get('password')}
                            </InputLabel>
                            <Input
                                name="password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={e => {
                                    this.setState({ password: e.target.value });
                                }}
                            />
                        </FormControl>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    value="remember"
                                    color="primary"
                                    checked={this.state.rememberMe}
                                    onChange={(e, v) => {
                                        this.setState({ rememberMe: v });
                                    }}
                                />
                            }
                            label={intl.get('rememberMe')}
                        />
                        <Button
                            type="submit"
                            fullWidth={true}
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.onLogin}
                        >
                            {intl.get('signIn')}
                        </Button>
                    </form>
                </Paper>
            </main>
        );
    }

    private onLogin(event) {
        this.props.onLogin(
            this.state.username,
            this.state.password,
            this.state.rememberMe,
        );
        event.preventDefault();
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    onLogin: (
        username: string,
        password: string,
        rememberMe: boolean,
    ): boolean => {
        if (!username || !password) {
            dispatch(
                globalActions.notify({
                    message: 'Please enter your username and password!',
                    variant: 'error',
                    placement: 'bottom center',
                }),
            );
            return false;
        }
        dispatch(authActions.login({ username, password, rememberMe }));
        return true;
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(Login));
