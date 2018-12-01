import * as React from 'react';
import { Link } from 'react-router-dom';
import { CssBaseline, Paper, Typography, Theme, createStyles, withStyles } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircleOutlined';
import appTheme from '../../theme';

const styles = (theme: Theme) =>
    createStyles({
        paper: {
            marginTop: theme.spacing.unit * 8,
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingTop: theme.spacing.unit * 4,
            paddingBottom: theme.spacing.unit * 4,
            width: 400,
            textAlign: 'center'
        },
        icon: {
            marginBottom: theme.spacing.unit * 2,
            color: appTheme.palette.success,
            width: 80,
            height: 80
        },
        textColor: {
            color: theme.palette.text.primary,
        }
    });

interface LogoutComponentProps {
    classes: any;
}

class LogoutComponent extends React.Component<LogoutComponentProps> {
    render() {
        const { classes } = this.props;
        return (
            <main>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <CheckCircleIcon className={classes.icon} />
                    <Typography gutterBottom component='h1' variant='h6'>
                        You have logged out successfully.
                    </Typography>
                    <Typography variant='body1'>
                        <Link className={classes.textColor} to='/'>Go home</Link>
                    </Typography>
                </Paper>
            </main>
        );
    }
}

export default withStyles(styles)(LogoutComponent);
