import * as React from 'react';
import classNames from 'classnames';

import Paper from '@material-ui/core/Paper';
import CloseIcon from '@material-ui/icons/Close';
import { createStyles, Theme, withStyles, Typography, Collapse, IconButton } from '@material-ui/core';

import { variantIcon, variantColor } from '../../theme';

const styles = (theme: Theme) =>
    createStyles({
        ...variantColor,
        root: {
            position: 'relative',
            padding: `${theme.spacing.unit * 1.5} ${theme.spacing.unit * 2}`,
            marginBottom: theme.spacing.unit * 2,
        },
        header: {
            display: 'flex',
            marginBottom: theme.spacing.unit
        },
        icon: {
            marginRight: theme.spacing.unit,
            position: 'relative',
            marginTop: 5
        },
        title: {
            flex: 1
        },
        close: {
            position: 'absolute',
            top: 0,
            right: 0,
        }
    });

class Alert extends React.Component<
    {
        classes: any;
        title: string;
        message?: string;
        shadow?: number;
        variant?: string;
        square?: boolean;
        closeable?: boolean;
    },
    { close: boolean }
> {
    constructor(props) {
        super(props);
        this.state = {
            close: false
        };
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.setState({
            close: true
        });
    }

    render() {
        const { classes, title, message, shadow, variant, square, closeable } = this.props;
        const Icon = variantIcon[variant];
        return (
            <Collapse in={!this.state.close}>
                <Paper className={classNames(classes.root, classes[variant])} elevation={shadow} square={square}>
                    {title && (
                        <Typography className={classes.header} variant='h6' component='h3' color='inherit'>
                            <Icon className={classes.icon} />
                            <span className={classes.title}>{title}</span>
                        </Typography>
                    )}
                    {message && (
                        <Typography component='p' color='inherit'>
                            {message}
                        </Typography>
                    )}
                    {closeable && (
                        <IconButton
                            key='close'
                            aria-label='Close'
                            color='inherit'
                            className={classes.close}
                            onClick={this.handleClose}>
                            <CloseIcon fontSize='small' />
                        </IconButton>
                    )}
                </Paper>
            </Collapse>
        );
    }
}

export default withStyles(styles)(Alert);
