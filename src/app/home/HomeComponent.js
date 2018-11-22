import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from "react-redux";

import userActions from '../user/actions';
import store from '../../redux/store';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
    card: {
        maxWidth: 645,
        marginTop: 100,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    media: {
        height: 340,
    },
    button: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    }
});

class HomeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogin= this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        store.dispatch(userActions.logout());
    }

    handleLogin() {
        this.props.history.push('/login');
    }

    render() {
        const { classes } = this.props;
        const btn = this.props.user 
            ? <Button className={classes.button} onClick={this.handleLogout} color="secondary" variant="outlined">Log out</Button>
            : <Button className={classes.button} onClick={this.handleLogin} color="primary" variant="outlined">Log in</Button>;
        return ( 
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                    className={classes.media}
                    image="/images/bg.jpg"
                    title="Contemplative Reptile"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Hello {this.props.user && this.props.user.username || 'World'}!
                    </Typography>
                    <Typography component="p">
                        This is a project for React, React Redux, and package using Webpack.
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    {btn}
                </CardActions>
            </Card>
        );
    }
}

HomeComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
});
const mapDispatchToProps = (dispatch) => ({
    userActions
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HomeComponent));