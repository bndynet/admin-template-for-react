import * as React from 'react';
import classNames from 'classnames';

import Paper from '@material-ui/core/Paper';
import CloseIcon from '@material-ui/icons/Close';
import {
    createStyles,
    Theme,
    withStyles,
    Typography,
    Collapse,
    IconButton,
} from '@material-ui/core';

import { variantIcon, variantColor } from '../theme';

const styles = (theme: Theme) =>
    createStyles({
        ...variantColor(theme),
        root: {
            position: 'relative',
            padding: `${theme.spacing(1.5)}px ${theme.spacing(2)}px`,
            marginBottom: theme.spacing(2),
        },
        header: {
            display: 'flex',
        },
        icon: {
            marginRight: theme.spacing() / 2,
            position: 'relative',
            marginTop: 3,
            fontSize: '1.2em',
        },
        title: {
            flex: 1,
            paddingRight: 24,
        },
        message: {
            marginLeft: 2,
        },
        close: {
            position: 'absolute',
            top: 4,
            right: 4,
        },
    });

class Alert extends React.Component<
    {
        classes: any;
        className?: string;
        title: string;
        message?: string;
        shadow?: number;
        variant?: string;
        square?: boolean;
        closeable?: boolean;
    },
    { close: boolean }
> {
    public constructor(props) {
        super(props);
        this.state = {
            close: false,
        };
        this.handleClose = this.handleClose.bind(this);
    }

    public render() {
        const {
            classes,
            className,
            title,
            message,
            shadow,
            variant,
            square,
            closeable,
        } = this.props;
        const Icon = variantIcon[variant];
        return (
            <Collapse in={!this.state.close} className={className}>
                <Paper
                    className={classNames(classes.root, classes[variant])}
                    elevation={shadow}
                    square={square}
                >
                    {title && (
                        <Typography
                            className={classes.header}
                            variant="subtitle1"
                            component="h3"
                            color="inherit"
                        >
                            <Icon className={classes.icon} />
                            <span className={classes.title}>{title}</span>
                        </Typography>
                    )}
                    {message && (
                        <Typography
                            className={classes.message}
                            component="p"
                            color="inherit"
                        >
                            {message}
                        </Typography>
                    )}
                    {closeable && (
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.close}
                            onClick={this.handleClose}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    )}
                </Paper>
            </Collapse>
        );
    }

    private handleClose() {
        this.setState({
            close: true,
        });
    }
}

export default withStyles(styles)(Alert);
