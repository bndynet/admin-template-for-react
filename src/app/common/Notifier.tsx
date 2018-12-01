import * as React from 'react';
import classNames from 'classnames';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { withStyles, Theme, createStyles, withTheme } from '@material-ui/core/styles';
import { ifTheme, variantIcon, variantColor } from '../../theme';

const notifierContentStyles = (theme: Theme) =>
    createStyles({
        ...variantColor(theme),
        common: {
            opacity: 0.9,
            paddingLeft: theme.spacing.unit * 2,
            paddingRight: theme.spacing.unit * 5
        },
        info: {
            backgroundColor: ifTheme(theme, theme.palette.common.black, theme.palette.common.white),
        },
        icon: {
            fontSize: 20
        },
        iconVariant: {
            opacity: 0.9,
            marginRight: theme.spacing.unit
        },
        message: {
            display: 'flex',
            alignItems: 'center'
        },
        close: {
            position: 'absolute',
            top: 3,
            right: 0
        }
    });

interface NotifierContentProps {
    classes?: any;
    className?: string;
    message?: string;
    hasCloseButton?: boolean;
    onCloseButtonClick?: () => void;
    variant?: string;
}

class NotifierContentComponent extends React.Component<NotifierContentProps, {}> {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, className, message, onCloseButtonClick, variant } = this.props;
        const Icon = variantIcon[variant];
        const actions = [];
        this.props.hasCloseButton &&
            actions.push(
                <IconButton
                    key='close'
                    aria-label='Close'
                    color='inherit'
                    className={classes.close}
                    onClick={onCloseButtonClick}>
                    <CloseIcon className={classes.icon} />
                </IconButton>
            );
        return (
            <SnackbarContent
                className={classNames(classes.common, classes[variant], className)}
                aria-describedby='client-snackbar'
                message={
                    <span id='client-snackbar' className={classes.message}>
                        <Icon className={classNames(classes.icon, classes.iconVariant)} />
                        {message}
                    </span>
                }
                action={actions}
            />
        );
    }
}

const NotifierContent = withStyles(notifierContentStyles)(NotifierContentComponent);

export interface NotifierOptions {
    message: string;
    variant?: string;
    placement?: string;
    duration?: number;
}

interface NotifierProps {
    classes?: any;
    options: NotifierOptions;
    placement?: string;
    open?: boolean;
    hasCloseButton?: boolean;
    onCloseButtonClick?: (event) => void;
}

interface NotifierState {
    open: boolean;
}

const NotifierStyles = (theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 640
        }
    });

class NotifierComponent extends React.Component<NotifierProps, NotifierState> {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    handleClose = (e) => {
        this.setState({
            open: false
        });
        this.props.onCloseButtonClick && this.props.onCloseButtonClick(e);
    };

    render() {
        const { classes, hasCloseButton, onCloseButtonClick } = this.props;
        const options = this.props.options || ({} as NotifierOptions);
        const open = this.props.open || this.state.open;
        let origin: SnackbarOrigin = {
            vertical: 'bottom',
            horizontal: 'right'
        };
        if (options.placement) {
            const p = options.placement.split(' ');
            origin = {
                vertical: p[0] as 'bottom',
                horizontal: p[1] as 'right'
            };
        }
        return (
            <Snackbar
                className={classes.root}
                anchorOrigin={origin}
                open={open}
                autoHideDuration={options.duration || 5000}
                onClose={this.handleClose}>
                <NotifierContent
                    onClose={this.handleClose}
                    hasCloseButton={hasCloseButton}
                    onCloseButtonClick={onCloseButtonClick}
                    variant={options.variant || 'info'}
                    message={options.message || ''}
                />
            </Snackbar>
        );
    }
}

const Notifier = withStyles(NotifierStyles)(NotifierComponent);
export default Notifier;
