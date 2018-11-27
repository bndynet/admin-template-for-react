import * as React from 'react';
import classNames from 'classnames';
import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';
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
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import NotificationsIcon from '@material-ui/icons/Notifications';
import pink from '@material-ui/core/colors/pink';

import AdminMenuComponent from './AdminMenuComponent';
import authActions from '../auth/actions';

const drawerWidth = 220;
const headerHeight = 60;

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
            height: headerHeight,
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            paddingLeft: theme.spacing.unit * 2
        },
        brandTitle: {
            color: '#ffffff'
        },
        toolbar: {
            paddingRight: theme.spacing.unit * 2,
            minHeight: headerHeight
        },
        avatar: {
            margin: 0,
            width: 30,
            height: 30,
            backgroundColor: pink[500]
        },
        avatarMenu: {
            minWidth: 160
        },
        menuButton: {
            marginLeft: 12,
            marginRight: 36
        },
        title: {
            flexGrow: 1
        },
        drawerPaper: {
            position: 'relative',
            paddingTop: headerHeight,
            whiteSpace: 'nowrap',
            width: drawerWidth,
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
            width: theme.spacing.unit * 5,
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing.unit * 7
            }
        },
        drawerPaperFooter: {
            position: 'fixed',
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            borderTopWidth: 1,
            borderTopColor: 'rgba(0, 0, 0, 0.12)',
            borderTopStyle: 'solid',
            padding: theme.spacing.unit / 2,
            width: drawerWidth,
            minHeight: 'inherit',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            })
        },
        drawerPaperFooterClose: {
            justifyContent: 'center',
            width: theme.spacing.unit * 5,
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing.unit * 7
            }
        },
        content: {
            flexGrow: 1,
            paddingTop: headerHeight,
            paddingBottom: theme.spacing.unit,
            paddingLeft: theme.spacing.unit * 3,
            paddingRight: theme.spacing.unit * 3,
            height: '100vh',
            overflow: 'auto'
        },
        chartContainer: {
            marginLeft: -22
        },
        tableContainer: {
            height: 320
        },
        h5: {
            marginBottom: theme.spacing.unit * 2
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
            border: '2px solid #3f51b5'
        }
    });

class AdminComponent extends React.Component<
    { user: any; classes: any; history: any; onLogout: () => void },
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

    handleAvatarMenuClose = () => {
        this.setState({ avatarMenuAnchor: null });
    };

    handleLogout = () => {
        this.handleAvatarMenuClose();
        this.props.onLogout();
    };

    render() {
        const { avatarMenuAnchor } = this.state;
        const { classes } = this.props;
        const user = this.props.user || {};
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position='absolute' className={classes.appBar}>
                    <div className={classes.brand}>
                        <Typography className={classes.brandTitle} variant='h5' component='h1'>
                            ADMIN REACT
                        </Typography>
                        <IconButton
                            color='inherit'
                            aria-label='Open drawer'
                            onClick={this.handleDrawerToggle}
                            className={classes.menuButton}>
                            <MenuIcon />
                        </IconButton>
                    </div>
                    <Toolbar disableGutters={!this.state.largeMainMenu} className={classes.toolbar}>
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
                            <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
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
                    <List>
                        <AdminMenuComponent />
                    </List>
                    <div
                        className={classNames(
                            classes.drawerPaperFooter,
                            !this.state.largeMainMenu && classes.drawerPaperFooterClose
                        )}>
                        <IconButton className={classes.iconButton} onClick={this.handleDrawerToggle}>
                            {this.state.largeMainMenu ? (
                                <ChevronLeftIcon fontSize='small' />
                            ) : (
                                <ChevronRightIcon fontSize='small' />
                            )}
                        </IconButton>
                    </div>
                </Drawer>
                <main className={classes.content} />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    onLogout: () => {
        dispatch(authActions.logout());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AdminComponent));
