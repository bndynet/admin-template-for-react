import * as React from 'react';
import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles, Theme, createStyles } from '@material-ui/core';

const styles = (theme: Theme) => createStyles({});

class AdminComponent extends React.Component<{ user: any }, {}> {
    render() {
        const user = this.props.user || {};
        return (
            <main>
                <h1>hi {user.username}</h1>
                <Link to='/'>Home</Link>
            </main>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AdminComponent));
