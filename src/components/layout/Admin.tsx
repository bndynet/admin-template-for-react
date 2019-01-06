import * as React from 'react';
import classNames from 'classnames';
import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { renderRoutes } from 'react-router-config';
import { Link } from 'react-router-dom';
import { withStyles, Theme, createStyles, Avatar, Tooltip, Menu, MenuItem, withWidth } from '@material-ui/core';
import { isWidthUp } from '@material-ui/core/withWidth';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import NotificationsIcon from '@material-ui/icons/Notifications';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import BrightnessLowIcon from '@material-ui/icons/BrightnessLow';

import { themeConfig } from 'app/theme';
import { adminRoutes } from 'app/config';
import { actions as authActions } from 'app/service/auth';
import { actions as globalActions } from 'app/service/global';

import AdminMenu from './AdminMenu';

const styles = (theme: Theme) =>
    createStyles({
        '@global': {
            body: {
                color: theme.palette.text.primary,
            },
            '.markdown-body pre': {
                backgroundColor: theme.palette.background.paper,
            },
        },
        root: {
            display: 'flex',
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            flexDirection: 'row',
        },
        brand: {
            height: themeConfig.headerHeight,
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            paddingLeft: theme.spacing.unit * 2,
        },
        menuButton: {
            padding: theme.spacing.unit,
            transform: 'scale(1.5)',
            [theme.breakpoints.down('sm')]: {
                display: 'inherit',
                marginLeft: 0,
            },
        },
        menuButtonHidden: {
            display: 'none',
            [theme.breakpoints.down('sm')]: {
                display: 'inherit',
            },
        },
        brandTitle: {
            color: '#ffffff',
            [theme.breakpoints.down('sm')]: {
                display: 'none',
            },
        },
        toolbar: {
            paddingRight: theme.spacing.unit * 2,
            minHeight: themeConfig.headerHeight,
        },
        avatar: {
            marginLeft: theme.spacing.unit * 1.5,
            width: '2.6rem',
            height: '2.6rem',
            backgroundColor: theme.palette.secondary.main,
            cursor: 'pointer',
            fontSize: '2rem',
        },
        avatarMenu: {
            minWidth: 160,
        },
        drawerPaper: {
            position: 'relative',
            paddingTop: themeConfig.headerHeight,
            paddingBottom: 45,
            whiteSpace: 'nowrap',
            width: themeConfig.sidebarWidth + 1,   // include right border width
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            [theme.breakpoints.down('sm')]: {
                position: 'fixed',
            },
        },
        drawerPaperClose: {
            overflowY: 'inherit',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: themeConfig.sidebarWidthMini + 1,    // include right border width
            [theme.breakpoints.down('sm')]: {
                width: 0,
            },
        },
        drawerPaperFooter: {
            position: 'fixed',
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            backgroundColor: theme.palette.background.paper,
            borderTopWidth: 1,
            borderTopColor: theme.palette.divider,
            borderTopStyle: 'solid',
            width: themeConfig.sidebarWidth,
            overflow: 'hidden',
            minHeight: 'inherit',
            padding: theme.spacing.unit / 2,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        drawerPaperFooterClose: {
            justifyContent: 'center',
            width: themeConfig.sidebarWidthMini,
            [theme.breakpoints.down('sm')]: {
                width: 0,
                padding: 0,
            },
        },

        copyright: {
            flex: 1,
            paddingLeft: theme.spacing.unit,
        },
        copyrightHidden: {
            display: 'none',
        },
        content: {
            flexGrow: 1,
            paddingTop: themeConfig.headerHeight,
            paddingBottom: theme.spacing.unit,
            paddingLeft: theme.spacing.unit * 3,
            paddingRight: theme.spacing.unit * 3,
            height: '100vh',
            overflow: 'auto',
        },
        iconButton: {
            padding: theme.spacing.unit,
        },
        badge: {
            width: '1rem',
            height: '1rem',
            fontSize: '11px',
            top: -5,
            right: -5,
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: theme.palette.primary.main,
        },
    });

class Admin extends React.Component<
    {
        user: any;
        classes: any;
        history: any;
        isDarkTheme: boolean;
        width: Breakpoint;
        push: (path: string) => void;
        onLogout: () => void;
        onThemeChange: (toDark: boolean) => void;
    },
    { largeMainMenu: boolean; avatarMenuAnchor: any }
> {
    constructor(props) {
        super(props);
        this.state = {
            largeMainMenu: isWidthUp('sm', this.props.width),
            avatarMenuAnchor: null,
        };
    }

    public render() {
        const { avatarMenuAnchor } = this.state;
        const { classes, isDarkTheme } = this.props;
        const user = this.props.user || {};
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position='absolute' className={classes.appBar}>
                    <div className={classes.brand}>
                        <Link to='/' hidden={!this.state.largeMainMenu}>
                            <Typography
                                className={classNames(
                                    'clickable',
                                    classes.brandTitle,
                                )}
                                variant='h5'
                                component='h1'
                                >
                                ADMIN REACT
                            </Typography>
                        </Link>
                        <IconButton
                            color='inherit'
                            aria-label='Open drawer'
                            onClick={this.handleDrawerToggle}
                            className={classNames(classes.menuButton, this.state.largeMainMenu && classes.menuButtonHidden)}
                            >
                            <MenuIcon />
                        </IconButton>
                    </div>
                    <Toolbar disableGutters={!this.state.largeMainMenu} className={classes.toolbar}>
                        <Tooltip title='Toggle light/dark theme'>
                            <IconButton color='inherit' onClick={() => this.handleThemeChange()}>
                                {isDarkTheme ? <BrightnessLowIcon fontSize='large' /> : <BrightnessHighIcon fontSize='large' />}
                            </IconButton>
                        </Tooltip>
                        <IconButton color='inherit'>
                            <Badge badgeContent={4} color='secondary' classes={{ badge: classes.badge }}>
                                <NotificationsIcon fontSize='large' />
                            </Badge>
                        </IconButton>
                        <Tooltip title={user.username || 'Not logged in'}>
                            <Avatar
                                aria-owns={avatarMenuAnchor ? 'avatar-menu' : undefined}
                                aria-haspopup='true'
                                className={classes.avatar}
                                onClick={this.handleAvatarClick}
                                >
                                {user.username && user.username[0]}
                            </Avatar>
                        </Tooltip>
                        <Menu
                            id='avatar-menu'
                            classes={{ paper: classes.avatarMenu }}
                            anchorEl={avatarMenuAnchor}
                            open={Boolean(avatarMenuAnchor)}
                            onClose={this.handleAvatarMenuClose}
                            >
                            <MenuItem dense={true} onClick={this.handleLogout}>
                                Logout
                            </MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant='permanent'
                    classes={{
                        paper: classNames(classes.drawerPaper, !this.state.largeMainMenu && classes.drawerPaperClose),
                    }}
                    open={this.state.largeMainMenu}
                    >
                    <Divider />
                    <AdminMenu mini={!this.state.largeMainMenu} />
                    <div
                        className={classNames(
                            classes.drawerPaperFooter,
                            !this.state.largeMainMenu && classes.drawerPaperFooterClose,
                        )}>
                        <a
                            className={classNames(
                                classes.copyright,
                                !this.state.largeMainMenu && classes.copyrightHidden,
                            )}
                            href='http://bndy.net'
                            target='_blank'>
                            <Typography variant='caption'>&copy; 2018 BNDY-NET</Typography>
                        </a>
                        <IconButton className={classes.iconButton} onClick={this.handleDrawerToggle}>
                            {this.state.largeMainMenu ? (
                                <ChevronLeftIcon fontSize='small' />
                            ) : (
                                <ChevronRightIcon fontSize='small' />
                            )}
                        </IconButton>
                    </div>
                </Drawer>
                <main className={classes.content}>
                    {renderRoutes(adminRoutes)}
                </main>
            </div>
        );
    }

    private handleDrawerToggle = () => {
        this.setState({ largeMainMenu: !this.state.largeMainMenu });
    }

    private handleAvatarClick = (e) => {
        if (!this.props.user) {
            this.props.push('/login');
            return;
        }
        this.setState({ avatarMenuAnchor: e.currentTarget });
    }

    private handleThemeChange = () => {
        this.props.onThemeChange(!this.props.isDarkTheme);
    }

    private handleAvatarMenuClose = () => {
        this.setState({ avatarMenuAnchor: null });
    }

    private handleLogout = () => {
        this.handleAvatarMenuClose();
        this.props.onLogout();
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    isDarkTheme: state.global.theme && state.global.theme.palette && state.global.theme.palette.type === 'dark',
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    push: (path: string) => {
        dispatch(push(path));
    },
    onLogout: () => {
        dispatch(authActions.logout());
    },
    onThemeChange: (toDark: boolean) => {
        dispatch(
            globalActions.changeTheme({
                palette: {
                    type: toDark ? 'dark' : 'light',
                },
            }),
        );
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withWidth()(Admin)));
