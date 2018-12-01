import * as React from 'react';
import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import globalActions from './actions';
import { ifTheme, variantIcon, variantColor} from '../../theme';

const notificationContentStyles = (theme: Theme) =>
    createStyles({
        ...variantColor,
        common: {
            opacity: 0.9,
            paddingLeft: theme.spacing.unit * 2,
            paddingRight: theme.spacing.unit * 5,
        },
        info: {
            backgroundColor: ifTheme(theme.palette.common.black, theme.palette.common.white),
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
            right: 0,
        },
    });

interface NotificationContentProps {
    classes?: any;
    className?: string;
    message?: string;
    onClose?: () => void;
    variant?: string;
}

class NotificationContentComponent extends React.Component<NotificationContentProps, {}> {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, className, message, onClose, variant, ...other } = this.props;
        const Icon = variantIcon[variant];
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
                action={[
                    <IconButton
                        key='close'
                        aria-label='Close'
                        color='inherit'
                        className={classes.close}
                        onClick={onClose}>
                        <CloseIcon className={classes.icon} />
                    </IconButton>
                ]}
                {...other}
            />
        );
    }
}

const NotificationContent = withStyles(notificationContentStyles)(NotificationContentComponent);

interface NotificationProps {
    classes?: any,
    notification?: any;
    placement?: string;
    showNotification: boolean;
    onHideNotification?: () => void;
}

interface NotificationState {
}

const notificationStyles = (theme: Theme) => (
    createStyles({
        root: {
            maxWidth: 640,
        }
    })
);

class NotificationComponent extends React.Component<NotificationProps, NotificationState> {
    constructor(props) {
        super(props);
    }

    handleClose = (e) => {
        this.props.onHideNotification();
    };

    render() {
        const classes = this.props.classes;
        const open = this.props.showNotification||false;
        const notification = this.props.notification || {};
        let origin: SnackbarOrigin  = {
            vertical: 'bottom',
            horizontal: 'right',
        };
        if (notification.placement) {
            const p = notification.placement.split(' ');
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
                autoHideDuration={notification.duration||5000}
                onClose={this.handleClose}>
                <NotificationContent
                    onClose={this.handleClose}
                    variant={notification.variant||'info'}
                    message={notification.message||''}
                />
            </Snackbar>
        );
    }
}

const mapStateToProps = (state) => ({
    notification: state.global.notificaton,
    showNotification: state.global.showNotification,
});
const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    onHideNotification: () => (dispatch(globalActions.hideNotification())),
});
const Notification = connect(mapStateToProps, mapDispatchToProps)(withStyles(notificationStyles)(NotificationComponent));
export default Notification;
