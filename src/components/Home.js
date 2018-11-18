import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from "react-redux";
import userService from '../redux/UserService';
import { Button } from '@material-ui/core';

class Home extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.user = this.props.userService.getCurrentUser();
        console.log(this.user);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        userService.logout();
        this.props.history.push('/login');
    }

    render() {
        if (!this.user) return <Redirect to="/login" />;

        return ( 
            <div>
                <h1>Hello {this.user.username}!</h1>
                <Button onClick={this.handleLogout}>Log out</Button>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        userService
    };
};

export default connect(mapStateToProps)(Home);