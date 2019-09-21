import * as React from 'react';
import classNames from 'classnames';
import {
    Drawer,
    Divider,
    createStyles,
    withStyles,
    Theme,
    Typography,
    IconButton,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { VerticalMenu } from 'app/ui';
import { themeConfig } from 'app/theme';
import { adminMenus } from 'app/config';

interface SidebarProps {
    classes: any;
    open?: boolean;
    onToggleClick?: () => void;
}

const styles = (theme: Theme) =>
    createStyles({
        root: {
            height: '100vh',
        },
        drawerPaper: {
            position: 'relative',
            paddingTop: themeConfig.headerHeight,
            paddingBottom: 45,
            whiteSpace: 'nowrap',
            width: themeConfig.sidebarWidth + 1, // include right border width
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
    });

class Sidebar extends React.PureComponent<SidebarProps> {
    public constructor(props: SidebarProps) {
        super(props);
    }

    public render() {
        const { classes, open } = this.props;
        return (
            <Drawer
                variant="permanent"
                className={classes.root}
                classes={{
                    paper: classNames(
                        classes.drawerPaper,
                        !open && classes.drawerPaperClose,
                    ),
                }}
                open={open}
            >
                <Divider />
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
}

export default withStyles(styles)(Sidebar);
