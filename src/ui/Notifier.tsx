import * as React from 'react';
import classNames from 'classnames';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import { ifTheme, variantIcon, variantColor } from '../theme';

const notifierContentStyles = (theme: Theme) =>
    createStyles({
        ...variantColor(theme),
        common: {
            opacity: 0.9,
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(5),
        },
        info: {
            backgroundColor: ifTheme(
                theme,
                theme.palette.common.black,
                theme.palette.common.white,
            ),
        },
        icon: {
            fontSize: 20,
        },
        iconVariant: {
            opacity: 0.9,
            marginRight: theme.spacing(),
        },
        message: {
            display: 'flex',
            alignItems: 'center',
        },
        close: {
            position: 'absolute',
            top: 3,
            right: 0,
        },
    });

interface NotifierContentProps {
    classes?: any;
    className?: string;
    message?: string;
    hasCloseButton?: boolean;
    onCloseButtonClick?: (event: any) => void;
    onClose?: (event: any) => void;
    variant?: string;
}

class NotifierContentComponent extends React.Component<
    NotifierContentProps,
    {}
> {
    public constructor(props) {
        super(props);
    }

    public render() {
        const {
            classes,
            className,
            message,
            onCloseButtonClick,
            variant,
        } = this.props;
        const Icon = variantIcon[variant];
        const actions = [];

        if (this.props.hasCloseButton) {
            actions.push(
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    className={classes.close}
                    onClick={onCloseButtonClick}
                >
                    <CloseIcon className={classes.icon} />
                </IconButton>,
            );
        }
        return (
            <SnackbarContent
                className={classNames(
                    classes.common,
                    classes[variant],
                    className,
                )}
                aria-describedby="client-snackbar"
                message={
                    <span id="client-snackbar" className={classes.message}>
                        <Icon
                            className={classNames(
                                classes.icon,
                                classes.iconVariant,
                            )}
                        />
                        {message}
                    </span>
                }
                action={actions}
            />
        );
    }
}

const NotifierContent = withStyles(notifierContentStyles)(
    NotifierContentComponent,
);

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
    onCloseButtonClick?: (event: any) => void;
}

interface NotifierState {
    open: boolean;
}

const NotifierStyles = () =>
    createStyles({
        root: {
            maxWidth: 640,
        },
    });

class NotifierComponent extends React.Component<NotifierProps, NotifierState> {
    public constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    public render() {
        const { classes, hasCloseButton, onCloseButtonClick } = this.props;
        // const defaultNotifierOptions = {} as NotifierOptions;
        const open = this.props.open || this.state.open;
        const options = (this.props.options || {}) as NotifierOptions;
        let origin: SnackbarOrigin = {
            vertical: 'bottom',
            horizontal: 'right',
        };
        if (options.placement) {
            const p = options.placement.split(' ');
            origin = {
                vertical: p[0] as 'bottom',
                horizontal: p[1] as 'right',
            };
        }
        return (
            <Snackbar
                className={classes.root}
                anchorOrigin={origin}
                open={open}
                autoHideDuration={options.duration || 5000}
                onClose={this.handleClose}
            >
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

    private handleClose = e => {
        this.setState({
            open: false,
        });
        if (this.props.onCloseButtonClick) {
            this.props.onCloseButtonClick(e);
        }
    };
}

export const Notifier = withStyles(NotifierStyles)(NotifierComponent);
