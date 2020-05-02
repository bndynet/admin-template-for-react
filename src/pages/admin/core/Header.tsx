import * as React from 'react';
import * as intl from 'react-intl-universal';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Dispatch, Action } from 'redux';
import {
    AppBar,
    IconButton,
    Toolbar,
    Tooltip,
    Avatar,
    Typography,
    Divider,
    List,
    ListItem,
    ListItemText,
    Theme,
    createStyles,
    withStyles,
    withWidth,
    Badge,
    Popover,
} from '@material-ui/core';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { HorizontalMenu, SlidePanel } from 'app/ui';
import { themeConfig } from 'app/theme';
import { getConfig, adminMenus } from 'app/config';
import { actions as globalActions } from 'app/service/global';
import { onAppThemeChanged } from '../../../app.events';
import SidePanelContent from './SidePanelContent';

const styles = (theme: Theme) =>
    createStyles({
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            flexDirection: 'row',
            $IconButton: {
                borderRadius: 0,
            },
        },
        menuButton: {
            paddingLeft: theme.spacing(),
            paddingRight: theme.spacing(),
            borderRadius: 0,
            minWidth: 45,
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
            width: themeConfig.sidebarWidth,
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: theme.spacing(),
            paddingRight: theme.spacing(),
            fontSize: 22,
            justifyContent: 'center',
            [theme.breakpoints.down('sm')]: {
                display: 'none',
            },
            '&.hidden': {
                display: 'none',
            },
        },

        toolbar: {
            flex: 'inherit',
            minHeight: themeConfig.headerHeight,
            paddingRight: 0,
            display: 'flex',
            alignItems: 'stretch',
        },
        avatar: {
            width: 30,
            height: 30,
            backgroundColor: theme.palette.grey[100],
            color: theme.palette.primary.main,
        },
        bigAvatar: {
            width: 100,
            height: 100,
            margin: '0 auto 5px auto',
            fontSize: 70,
            backgroundColor: theme.palette.grey[100],
            color: theme.palette.primary.main,
        },
        avatarPopup: {
            minWidth: 200,
            maxHeight: '50vh',
        },
        iconButton: {
            padding: theme.spacing(),
        },
        badge: {
            fontSize: '11px',
            right: 5,
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: theme.palette.primary.main,
        },
    });

interface HeaderProps {
    user?: any;
    classes?: any;
    history?: any;
    isDarkTheme?: boolean;
    width?: Breakpoint;
    push?: (path: string) => void;
    onThemeChange?: (toDark: boolean) => void;
    onToggleClick?: () => void;
    hideBrand?: boolean;
}

interface HeaderState {
    avatarPopupAnchor: any;
    sidePanelOpen: boolean;
}

class Header extends React.PureComponent<HeaderProps, HeaderState> {
    public constructor(props: HeaderProps) {
        super(props);
        this.state = {
            avatarPopupAnchor: null,
            sidePanelOpen: false,
        };
    }

    public render() {
        const config = getConfig();
        const { classes, isDarkTheme, hideBrand } = this.props;
        const { avatarPopupAnchor } = this.state;
        const user = this.props.user || {};
        return (
            <AppBar position="absolute" className={classes.appBar}>
                <Link
                    to="/"
                    className={classNames('clickable', classes.brandTitle, {
                        hidden: hideBrand,
                    })}
                >
                    <img
                        src={config.logoUri}
                        style={{ maxHeight: themeConfig.headerHeight }}
                    />
                    {intl.get(config.title)}
                </Link>

                <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={this.handleToggleClick}
                    className={classNames(classes.menuButton)}
                    style={{ width: themeConfig.sidebarWidthMini }}
                >
                    <i
                        className={classNames(
                            'fa fa-bars animated',
                            hideBrand && 'rotateIn',
                        )}
                    />
                </IconButton>

                <HorizontalMenu data={adminMenus} />

                <Toolbar disableGutters={hideBrand} className={classes.toolbar}>
                    <Tooltip title="Toggle light/dark theme">
                        <IconButton
                            color="inherit"
                            onClick={() => this.handleThemeChange()}
                            className={classNames(classes.menuButton)}
                        >
                            <i
                                className={classNames(
                                    'fa-lightbulb',
                                    isDarkTheme ? 'fas' : 'far',
                                )}
                            />
                        </IconButton>
                    </Tooltip>
                    <IconButton
                        color="inherit"
                        className={classNames(classes.menuButton)}
                    >
                        <Badge
                            badgeContent={4}
                            color="secondary"
                            classes={{ badge: classes.badge }}
                        >
                            <NotificationsIcon fontSize="large" />
                        </Badge>
                    </IconButton>
                    <Tooltip title={user.name || 'Not logged in'}>
                        <IconButton
                            color="inherit"
                            aria-haspopup="true"
                            aria-owns={
                                avatarPopupAnchor ? 'avatar-popup' : undefined
                            }
                            className={classNames(classes.menuButton)}
                            onClick={this.handleAvatarClick}
                        >
                            <Avatar
                                alt={user.name}
                                src={user.avatar}
                                className={classes.avatar}
                            >
                                {!user.avatar &&
                                    user.name &&
                                    user.name[0] &&
                                    user.name[0].toUpperCase()}
                            </Avatar>
                        </IconButton>
                    </Tooltip>
                    <Popover
                        id="avatar-popup"
                        classes={{ paper: classes.avatarPopup }}
                        anchorEl={avatarPopupAnchor}
                        open={Boolean(avatarPopupAnchor)}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        onClose={this.handleavatarPopupClose}
                    >
                        <div className="text-center padding-2">
                            <Avatar
                                alt={user.name}
                                src={user.avatar}
                                className={classes.bigAvatar}
                            >
                                {!user.avatar &&
                                    user.name &&
                                    user.name[0] &&
                                    user.name[0].toUpperCase()}
                            </Avatar>
                            <Typography variant="subtitle1">
                                {user.name}
                            </Typography>
                            <Typography>{user.email}</Typography>
                        </div>
                        <Divider />
                        <List component="nav">
                            <ListItem button={true}>
                                <ListItemText primary={intl.get('myProfile')} />
                            </ListItem>
                            <ListItem button={true} onClick={this.handleLogout}>
                                <ListItemText primary={intl.get('signOut')} />
                            </ListItem>
                        </List>
                    </Popover>
                    <IconButton
                        color="inherit"
                        className={classNames(classes.menuButton)}
                        onClick={() => this.setState({ sidePanelOpen: true })}
                    >
                        <MoreVertIcon fontSize="large" />
                    </IconButton>
                </Toolbar>
                <SlidePanel
                    width={600}
                    height={100}
                    anchor="right"
                    title="Panel Title"
                    open={this.state.sidePanelOpen}
                    onClose={this.handleSidePanelClose}
                >
                    <SidePanelContent />
                </SlidePanel>
            </AppBar>
        );
    }

    private handleToggleClick = () => {
        if (this.props.onToggleClick) {
            this.props.onToggleClick();
        }
    };

    private handleSidePanelClose = () => {
        this.setState({
            sidePanelOpen: false,
        });
    };

    private handleAvatarClick = e => {
        if (!this.props.user) {
            this.props.push('/login');
            return;
        }
        this.setState({ avatarPopupAnchor: e.currentTarget });
    };

    private handleThemeChange = () => {
        this.props.onThemeChange(!this.props.isDarkTheme);
    };

    private handleavatarPopupClose = () => {
        this.setState({ avatarPopupAnchor: null });
    };

    private handleLogout = () => {
        this.handleavatarPopupClose();
        this.props.push('/logout');
    };
}

const mapStateToProps = state => ({
    user: state.auth.user,
    isDarkTheme:
        state.global.theme &&
        state.global.theme.palette &&
        state.global.theme.palette.type === 'dark',
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    push: (path: string) => {
        dispatch(push(path));
    },
    onThemeChange: (toDark: boolean) => {
        onAppThemeChanged(toDark);
        dispatch(
            globalActions.changeTheme({
                palette: {
                    type: toDark ? 'dark' : 'light',
                },
            }),
        );
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(withWidth()(Header)));
