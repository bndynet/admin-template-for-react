import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from "react-redux";
import { Button } from '@material-ui/core';

import userActions from '../user/actions';
import store from '../../redux/store';

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
        const btn = this.props.user 
            ? <Button onClick={this.handleLogout} color="secondary" variant="outlined">Log out</Button>
            : <Button onClick={this.handleLogin} color="primary" variant="outlined">Log in</Button>;
        return ( 
            <div>
                <h1>Hello {this.props.user && this.props.user.username || 'World'}!</h1>
                {btn}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
});
const mapDispatchToProps = (dispatch) => ({
    userActions
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);