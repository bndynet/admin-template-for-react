import * as React from 'react';
import {
    CssBaseline,
    Paper,
    Avatar,
    Typography,
    Theme,
    createStyles,
    withStyles,
} from '@material-ui/core';


const styles = (theme: Theme) => createStyles({
    paper: {
        width: 400,
        marginTop: theme.spacing.unit * 8,
        marginLeft: 'auto',
        marginRight: 'auto',
    }
});

interface LogoutComponentProps {
    classes: any 
}

class LogoutComponent extends React.Component<LogoutComponentProps> {
    render() {
        const { classes } = this.props;
        return (
            <main>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Avatar />
                    <Typography component='h1' variant='h5'>
                        You have logged out successfully.
                    </Typography>
                </Paper>
            </main>
        );
    }
}

export default withStyles(styles)(LogoutComponent);
