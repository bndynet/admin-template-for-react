import * as React from 'react';
import { Link } from 'react-router-dom';
import { CssBaseline, Typography, Theme, createStyles, withStyles } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircleOutlined';
import { themeConfig } from 'app/theme';
import { Panel } from 'app/ui';

const styles = (theme: Theme) =>
    createStyles({
        panel: {
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
            color: themeConfig.palette.success,
            width: 80,
            height: 80,
        },
        textColor: {
            color: theme.palette.text.primary,
        },
    });

interface LogoutComponentProps {
    classes: any;
}

class Logout extends React.Component<LogoutComponentProps> {
    public render() {
        const { classes } = this.props;
        return (
            <main>
                <CssBaseline />
                <Panel variant='success' className={classes.panel}>
                    <CheckCircleIcon className={classes.icon} />
                    <Typography gutterBottom={true} component='h1' variant='h6'>
                        You have logged out successfully.
                    </Typography>
                    <Typography variant='body1'>
                        <Link className={classes.textColor} to='/'>Go home</Link>
                    </Typography>
                </Panel>
            </main>
        );
    }
}

export default withStyles(styles)(Logout);
