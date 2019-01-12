import * as React from "react";
import * as ReactMarkdown from "react-markdown";
import { FormattedMessage } from "react-intl";
import { Dispatch, Action } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Typography, Button, Fab } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import { actions as resourceActions } from "app/service/resource";
import { actions as authActions } from "app/service/auth";
import { actions as globalActions } from "app/service/global";

import { LocaleType, supportLocales } from "app/locales";

const styles = (theme: Theme) =>
    createStyles({
        "@global": {
            body: {
                paddingTop: theme.spacing.unit * 4,
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.background.default,
            },
            ".markdown-body a": {
                color: theme.palette.text.primary,
                textDecoration: "underline",
            },
        },
        main: {
            maxWidth: 845,
            marginLeft: "auto",
            marginRight: "auto",
        },
        fab: {
            position: "fixed",
            right: theme.spacing.unit * 2,
            bottom: theme.spacing.unit * 2,
            fontSize: 24,
            fontWeight: 700,
            "&.disabled": {
                color: theme.palette.common.white,
            },
        },
        forkMe: {
            position: "absolute",
            top: 0,
            right: 0,
            border: 0,
        },
        btn: {
            marginRight: theme.spacing.unit,
            marginBottom: theme.spacing.unit * 4,
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
    onChangeLocale(locale: string): void;
}

interface HomeComponentState {
    logoutDelay?: number;
}

class Home extends React.Component<HomeComponentProps, HomeComponentState> {
    private interval: any;

    constructor(props: HomeComponentProps) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.state = {
            logoutDelay: null,
        };
    }

    public componentWillMount() {
        this.props.onGetReadme();
    }

    public render() {
        const { classes } = this.props;
        const btn = this.props.user ? (
            <Tooltip title={this.props.user.username}>
                <Fab
                    disabled={!!this.state.logoutDelay}
                    classes={{ root: classes.fab, disabled: "disabled" }}
                    onClick={this.handleLogout}
                    color="secondary"
                >
                    {this.state.logoutDelay && this.state.logoutDelay > 0
                        ? this.state.logoutDelay
                        : this.props.user.username[0]}
                </Fab>
            </Tooltip>
        ) : (
            <Tooltip title="Log in">
                <Fab
                    classes={{ root: classes.fab, disabled: "disabled" }}
                    onClick={this.handleLogin}
                    color="primary"
                >
                    <AccountCircleIcon />
                </Fab>
            </Tooltip>
        );

        return (
            <div className={classes.body}>
                <a href="https://github.com/bndynet/admin-template-for-react">
                    <img
                        className={classes.forkMe}
                        src="https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png"
                        alt="Fork me on GitHub"
                    />
                </a>
                <main className={classes.main}>
                    <Link to="/login">
                        <Button variant="outlined" className={classes.btn}>
                            <Typography>
                                <FormattedMessage id="login" />
                            </Typography>
                        </Button>
                    </Link>
                    <Link to="/admin">
                        <Button variant="outlined" className={classes.btn}>
                            <Typography>
                                <FormattedMessage id="adminPanel" />
                            </Typography>
                        </Button>
                    </Link>
                    {Object.keys(supportLocales).map((key: string) => (
                        <Button
                            className={classes.btn}
                            key={key}
                            variant="outlined"
                            onClick={() => this.props.onChangeLocale(key)}
                        >
                            {supportLocales[key]}
                        </Button>
                    ))}
                    <ReactMarkdown
                        source={this.props.readme}
                        className={"markdown-body"}
                    />
                    {btn}
                </main>
            </div>
        );
    }

    private handleLogout() {
        this.setState({
            logoutDelay: 5,
        });
        this.props.onPreLogout();
        this.interval = setInterval(() => {
            const delay = this.state.logoutDelay - 1;
            this.setState({
                logoutDelay: delay,
            });
            if (delay <= 0) {
                clearInterval(this.interval);
                this.props.onLogout();
                return;
            }
        }, 1000);
    }

    private handleLogin() {
        this.props.history.push("/login");
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    readme: state.resource.readme,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    onLogout: () => {
        dispatch(authActions.logout());
    },
    onPreLogout: () => {
        dispatch(
            globalActions.notify({
                message: "Logging out...",
                variant: "info",
                duration: 5000,
                placement: "bottom left",
            }),
        );
    },
    onGetReadme: () => {
        dispatch(resourceActions.getReadme());
    },
    onChangeLocale: (locale: LocaleType) => {
        dispatch(globalActions.changeLocale(locale));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(Home));
