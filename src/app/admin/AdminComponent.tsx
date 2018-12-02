import * as React from 'react';
import classNames from 'classnames';
import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { Router, Link } from 'react-router-dom';
import { withStyles, Theme, createStyles, Avatar, Tooltip, Menu, MenuItem } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import Switch from '@material-ui/core/Switch';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import NotificationsIcon from '@material-ui/icons/Notifications';

import history from '../../redux/history';
import AdminMenuComponent from './AdminMenuComponent';
import authActions from '../auth/actions';
import { themeConfig } from '../../theme';
import routes from './routes';
import globalActions from '../global/actions';

const styles = (theme: Theme) =>
    createStyles({
        root: {
            display: 'flex'
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            flexDirection: 'row'
        },
        brand: {
            height: themeConfig.headerHeight,
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            paddingLeft: theme.spacing.unit * 2
        },
        menuButton: {
            display: 'none',
            marginLeft: 12,
            marginRight: 36
        },
        menuButtonShow: {
            [theme.breakpoints.down('sm')]: {
                display: 'inherit',
                marginLeft: 0
            }
        },
        brandTitle: {
            color: '#ffffff'
        },
        brandTitleHidden: {
            [theme.breakpoints.down('sm')]: {
                display: 'none'
            }
        },
        toolbar: {
            paddingRight: theme.spacing.unit * 2,
            minHeight: themeConfig.headerHeight
        },
        avatar: {
            margin: 0,
            width: 30,
            height: 30,
            backgroundColor: theme.palette.secondary.main
        },
        avatarMenu: {
            minWidth: 160
        },
        drawerPaper: {
            position: 'relative',
            paddingTop: themeConfig.headerHeight,
            paddingBottom: 45,
            whiteSpace: 'nowrap',
            width: themeConfig.sidebarWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })
        },
        drawerPaperClose: {
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
            width: theme.spacing.unit * 7,
            [theme.breakpoints.down('sm')]: {
                width: 0
            }
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
            width: themeConfig.sidebarWidth - 1,
            overflow: 'hidden',
            minHeight: 'inherit',
            padding: theme.spacing.unit / 2,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            })
        },
        drawerPaperFooterClose: {
            justifyContent: 'center',
            width: theme.spacing.unit * 7 - 1,
            [theme.breakpoints.down('sm')]: {
                width: 0
            }
        },
        copyright: {
            flex: 1,
            paddingLeft: theme.spacing.unit
        },
        copyrightHidden: {
            display: 'none'
        },
        content: {
            flexGrow: 1,
            paddingTop: themeConfig.headerHeight,
            paddingBottom: theme.spacing.unit,
            paddingLeft: theme.spacing.unit * 3,
            paddingRight: theme.spacing.unit * 3,
            height: '100vh',
            overflow: 'auto'
        },
        iconButton: {
            padding: theme.spacing.unit
        },
        badge: {
            width: '1rem',
            height: '1rem',
            fontSize: '11px',
            top: -5,
            right: -5,
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: theme.palette.primary.main
        }
    });

class AdminComponent extends React.Component<
    {
        user: any;
        classes: any;
        history: any;
        isDarkTheme: boolean;
        onLogout: () => void;
        onThemeChange: (toDark: boolean) => void;
    },
    { largeMainMenu: boolean; avatarMenuAnchor: any }
> {
    constructor(props) {
        super(props);
        this.state = {
            largeMainMenu: true,
            avatarMenuAnchor: null
        };
    }

    handleDrawerToggle = () => {
        this.setState({ largeMainMenu: !this.state.largeMainMenu });
    };

    handleAvatarClick = (e) => {
        this.setState({ avatarMenuAnchor: e.currentTarget });
    };

    handleThemeChange = (e) => {
        this.props.onThemeChange(!this.props.isDarkTheme);
    };

    handleAvatarMenuClose = () => {
        this.setState({ avatarMenuAnchor: null });
    };

    handleLogout = () => {
        this.handleAvatarMenuClose();
        this.props.onLogout();
    };

    render() {
        const { avatarMenuAnchor } = this.state;
        const { classes, isDarkTheme } = this.props;
        const user = this.props.user || {};
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position='absolute' className={classes.appBar}>
                    <div className={classes.brand}>
                        <Link to='/'>
                            <Typography
                                className={classNames(
                                    'clickable',
                                    classes.brandTitle,
                                    !this.state.largeMainMenu && classes.brandTitleHidden
                                )}
                                variant='h5'
                                component='h1'>
                                ADMIN REACT
                            </Typography>
                        </Link>
                        <IconButton
                            color='inherit'
                            aria-label='Open drawer'
                            onClick={this.handleDrawerToggle}
                            className={classNames(
                                classes.menuButton,
                                !this.state.largeMainMenu && classes.menuButtonShow
                            )}>
                            <MenuIcon />
                        </IconButton>
                    </div>
                    <Toolbar disableGutters={!this.state.largeMainMenu} className={classes.toolbar}>
                        <Tooltip title='Change theme to Light/Dark'>
                            <Switch checked={isDarkTheme} onChange={this.handleThemeChange} color='default' />
                        </Tooltip>
                        <IconButton color='inherit'>
                            <Badge badgeContent={4} color='secondary' classes={{ badge: classes.badge }}>
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            color='inherit'
                            aria-owns={avatarMenuAnchor ? 'avatar-menu' : undefined}
                            aria-haspopup='true'
                            onClick={this.handleAvatarClick}>
                            <Tooltip title={user.username || 'Not logged in'}>
                                <Avatar className={classes.avatar}>{user.username && user.username[0]}</Avatar>
                            </Tooltip>
                        </IconButton>
                        <Menu
                            id='avatar-menu'
                            classes={{ paper: classes.avatarMenu }}
                            anchorEl={avatarMenuAnchor}
                            open={Boolean(avatarMenuAnchor)}
                            onClose={this.handleAvatarMenuClose}>
                            <MenuItem dense={true} onClick={this.handleLogout}>
                                Logout
                            </MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant='permanent'
                    classes={{
                        paper: classNames(classes.drawerPaper, !this.state.largeMainMenu && classes.drawerPaperClose)
                    }}
                    open={this.state.largeMainMenu}>
                    <Divider />
                    <List dense={true}>
                        <AdminMenuComponent />
                    </List>
                    <div
                        className={classNames(
                            classes.drawerPaperFooter,
                            !this.state.largeMainMenu && classes.drawerPaperFooterClose
                        )}>
                        <Typography
                            variant='caption'
                            className={classNames(
                                classes.copyright,
                                !this.state.largeMainMenu && classes.copyrightHidden
                            )}>
                            &copy; 2018 <a href='http://bndy.net' target='_blank'>BNDY-NET</a>
                        </Typography>
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
                    <Router history={history}>{renderRoutes(routes)}</Router>
                </main>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    isDarkTheme: state.global.theme && state.global.theme.palette && state.global.theme.palette.type === 'dark'
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    onLogout: () => {
        dispatch(authActions.logout());
    },
    onThemeChange: (toDark: boolean) => {
        dispatch(
            globalActions.changeTheme({
                palette: {
                    type: toDark ? 'dark' : 'light'
                }
            })
        );
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AdminComponent));
