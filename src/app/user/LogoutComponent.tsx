import * as React from 'react';
import {
    CssBaseline,
    Paper,
    Typography,
    Theme,
    createStyles,
    withStyles,
} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircleOutlined';


const styles = (theme: Theme) => createStyles({
    paper: {
        marginTop: theme.spacing.unit * 8,
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingTop: theme.spacing.unit * 4,
        paddingBottom: theme.spacing.unit * 4,
        width: 400,
        textAlign: 'center',
    },
    icon: {
        marginBottom: theme.spacing.unit * 2,
        color: '#09af00',
        width: 80,
        height: 80,
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
                    <CheckCircleIcon className={classes.icon} />
                    <Typography component='h1' variant='h6' color='inherit'>
                        You have logged out successfully.
                    </Typography>
                </Paper>
            </main>
        );
    }
}

export default withStyles(styles)(LogoutComponent);
