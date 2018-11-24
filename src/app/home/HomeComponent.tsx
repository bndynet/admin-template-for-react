import * as React from 'react';
import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';

import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import userActions from '../user/actions';

const imgMain = '/images/bg.jpg';
const styles = (theme: Theme) =>
    createStyles({
        card: {
            maxWidth: 645,
            marginTop: theme.spacing.unit * 8,
            marginLeft: 'auto',
            marginRight: 'auto'
        },
        media: {
            height: 340
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
            <Button disabled={!!this.state.logoutDelay} className={classes.button} onClick={this.handleLogout} color='secondary' variant='outlined'>
                { this.state.logoutDelay && this.state.logoutDelay > 0 ? `Log out ` + this.state.logoutDelay + 's' : `Log out`}
            </Button>
        ) : (
            <Button className={classes.button} onClick={this.handleLogin} color='primary' variant='outlined'>
                Log in
            </Button>
        );
        return (
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia className={classes.media} image={imgMain} />
                    <CardContent>
                        <Typography gutterBottom variant='h5' component='h2'>
                            Hello {(this.props.user && this.props.user.username) || 'World'}!
                        </Typography>
                        <Typography component='p'>
                            This is a project for React, React Redux, and package using Webpack.
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>{btn}</CardActions>
            </Card>
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
