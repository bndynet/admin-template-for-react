import * as React from 'react';
import * as intl from 'react-intl-universal';
import classNames from 'classnames';
import { connect } from 'react-redux';
import {
    Drawer,
    Divider,
    createStyles,
    withStyles,
    Typography,
    IconButton,
    Avatar,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { VerticalMenu } from 'app/ui';
import {
    themeConfig,
    getCurrentTheme,
    ifLayout,
    AppTheme,
    isPopular,
} from 'app/theme';
import { getConfig, adminMenus, userMenus } from 'app/config';
import { UserInfo } from 'app/service/auth';
import { MenuItem } from 'app/types/MenuItem';

interface SidebarProps {
    classes: any;
    open?: boolean;
    user?: UserInfo;
    onToggleClick?: () => void;
}

const styles = (theme: AppTheme) => {
    return createStyles({
        root: {
            height: '100vh',
            '& .MuiIconButton-root': {
                color: ifLayout(theme, { popular: 'inherit' }),
            },
        },
        brandBlock: {
            textAlign: 'center',
            margin: 15,
            '& img': {
                width: '100%',
                backgroundColor: theme.palette.primary.main,
                borderRadius: '50%',
            },
        },
        brandBlockMini: {
            margin: '10px 5px 5px 5px',
        },
        avatar: {
            backgroundColor: theme.palette.grey[100],
            color: theme.palette.primary.main,
        },
        avatarMini: {
            width: 30,
            height: 30,
        },
        drawerPaper: {
            position: 'relative',
            paddingTop: ifLayout(theme, {
                classic: themeConfig.headerHeight,
                popular: 0,
            }),
            paddingBottom: 45,
            whiteSpace: 'nowrap',
            color: ifLayout(theme, {
                classic: theme.palette.common.black,
                popular: theme.palette.common.white,
            }),
            backgroundColor: ifLayout(theme, {
                classic: theme.palette.background.paper,
                popular: theme.palette.primary.main,
            }),
            width: themeConfig.sidebarWidth + 1, // include right border width
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            overflowX: 'hidden',
            [theme.breakpoints.down('sm')]: {
                position: 'fixed',
            },
        },
        drawerPaperClose: {
            overflowX: 'visible',
            overflowY: 'inherit',
            width: themeConfig.sidebarWidthMini + 1, // include right border width
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
            backgroundColor: ifLayout(theme, {
                classic: theme.palette.background.paper,
                popular: theme.palette.primary.dark,
            }),
            borderTopWidth: 1,
            borderTopColor: theme.palette.divider,
            borderTopStyle: 'solid',
            width: themeConfig.sidebarWidth,
            overflow: 'hidden',
            minHeight: 'inherit',
            padding: theme.spacing() / 2,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
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
            paddingLeft: theme.spacing(),
        },
        copyrightHidden: {
            display: 'none',
        },
    });
};

class Sidebar extends React.PureComponent<SidebarProps> {
    public constructor(props: SidebarProps) {
        super(props);
    }

    public render() {
        const config = getConfig();
        const { classes, open } = this.props;
        const theme = getCurrentTheme();
        const isPopularTheme = isPopular();
        return (
            <Drawer
                variant="permanent"
                className={classNames(classes.root, theme.layout)}
                classes={{
                    paper: classNames(
                        classes.drawerPaper,
                        !open && classes.drawerPaperClose,
                    ),
                }}
                open={open}
            >
                {isPopularTheme && (
                    <div>
                        <div
                            className={classNames(
                                classes.brandBlock,
                                !open && classes.brandBlockMini,
                            )}
                        >
                            <img
                                title={intl.get(config.title)}
                                src={config.logoUri}
                            />
                        </div>
                        <Divider />
                        <VerticalMenu
                            mini={!open}
                            width={themeConfig.sidebarWidth}
                            minWidth={themeConfig.sidebarWidthMini}
                            data={this.getUserMenus()}
                        />
                        <Divider />
                    </div>
                )}
                <VerticalMenu
                    mini={!open}
                    width={themeConfig.sidebarWidth}
                    minWidth={themeConfig.sidebarWidthMini}
                    data={adminMenus}
                />
                <div
                    className={classNames(
                        classes.drawerPaperFooter,
                        !open && classes.drawerPaperFooterClose,
                    )}
                >
                    <a
                        className={classNames(
                            classes.copyright,
                            !open && classes.copyrightHidden,
                        )}
                        href="http://bndy.net"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Typography variant="caption">
                            &copy; 2018 BNDY-NET
                        </Typography>
                    </a>
                    <IconButton
                        className={classes.iconButton}
                        onClick={this.handleToggle}
                    >
                        {open ? (
                            <ChevronLeftIcon fontSize="small" />
                        ) : (
                            <ChevronRightIcon fontSize="small" />
                        )}
                    </IconButton>
                </div>
            </Drawer>
        );
    }

    private handleToggle = () => {
        if (this.props.onToggleClick) {
            this.props.onToggleClick();
        }
    };

    private getUserMenus(): MenuItem[] {
        return [
            {
                icon: (
                    <Avatar
                        src={this.props.user.avatar}
                        className={this.props.classes.avatar}
                    />
                ),
                text: this.props.user.name,
                description: this.props.user.email,
                children: userMenus,
            },
        ];
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
});

export default connect(
    mapStateToProps,
    null,
)(withStyles(styles)(Sidebar));
