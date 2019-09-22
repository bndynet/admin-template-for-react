import * as React from 'react';
import classNames from 'classnames';
import {
    Theme,
    createStyles,
    withStyles,
    Popper,
    Grow,
    ClickAwayListener,
    MenuList,
    Paper,
    MenuItem,
} from '@material-ui/core';
import { LinkButton } from 'app/ui';
import { MenuItem as TMenuItem } from 'app/types';

const styles = (theme: Theme) =>
    createStyles({
        root: {
            flex: 1,
            display: 'flex',
            '& > *': {
                display: 'flex',
                alignItems: 'center',
            },
        },
        menuItem: {
            color: theme.palette.common.white,
            fontSize: '1.5em',
            height: '100%',
            paddingLeft: theme.spacing(1.5),
            paddingRight: theme.spacing(1.5),
            borderRadius: 0,
        },
        subMenuWrapper: {
            display: 'flex',
            flexDirection: 'column',
            '& $subMenuWrapper $menuItem': {
                paddingLeft: theme.spacing(4),
            },
        },
        subMenuItem: {
            color: theme.palette.text.primary,
        },
        text: {
            display: 'inline-block',
            marginLeft: theme.spacing() / 2,
        },
    });

class HorizontalMenu extends React.Component<
    { classes: any; data: TMenuItem[] },
    { menuStatusSet: { [key: string]: boolean } }
> {
    private anchors;

    public constructor(props) {
        super(props);
        this.state = {
            menuStatusSet: {},
        };
        this.anchors = {};
    }

    public render() {
        const { classes, data } = this.props;
        return (
            <div className={classes.root}>
                {data &&
                    data.map(item =>
                        item.children ? (
                            <div key={item.text}>
                                {this.getMenuElement(item, true)}
                                <Popper
                                    open={
                                        !!this.state.menuStatusSet[
                                            this.getMenuKey(item)
                                        ]
                                    }
                                    anchorEl={
                                        this.anchors[this.getMenuKey(item)]
                                    }
                                    transition={true}
                                    disablePortal={true}
                                >
                                    {({ TransitionProps, placement }) => (
                                        <Grow
                                            {...TransitionProps}
                                            style={{
                                                transformOrigin:
                                                    placement === 'bottom'
                                                        ? 'center top'
                                                        : 'center bottom',
                                            }}
                                        >
                                            <Paper square={true}>
                                                <ClickAwayListener
                                                    onClickAway={e =>
                                                        this.handleClose(
                                                            e,
                                                            item,
                                                        )
                                                    }
                                                >
                                                    {this.generateSubMenu(item)}
                                                </ClickAwayListener>
                                            </Paper>
                                        </Grow>
                                    )}
                                </Popper>
                            </div>
                        ) : (
                            this.getMenuElement(item, true)
                        ),
                    )}
            </div>
        );
    }

    private getMenuKey(menu) {
        return `${menu.text}_${menu.link || ''}`;
    }

    private getMenuElement = (menu, isRoot) => {
        const { classes } = this.props;
        const menuKey = this.getMenuKey(menu);
        return (
            <LinkButton
                contentAlign="left"
                key={menu.text}
                to={menu.link}
                className={classNames(
                    classes.menuItem,
                    !isRoot && classes.subMenuItem,
                )}
                buttonRef={node => {
                    this.anchors[menuKey] = node;
                }}
                color="inherit"
                aria-haspopup="true"
                aria-owns={
                    this.state.menuStatusSet[menuKey] ? menuKey : undefined
                }
                onClick={() => this.handleToggle(menu)}
            >
                {typeof menu.icon !== 'string' ? (
                    menu.icon
                ) : (
                    <i className={menu.icon} />
                )}
                <span className={classes.text}>{menu.text}</span>
            </LinkButton>
        );
    };

    private generateSubMenu = menu => {
        const { classes } = this.props;
        return (
            menu.children &&
            menu.children.length > 0 && (
                <MenuList>
                    {menu.children.map(subItem => (
                        <div
                            key={subItem.text}
                            className={classes.subMenuWrapper}
                        >
                            <MenuItem
                                onClick={e => this.handleClose(e, subItem)}
                                component={props =>
                                    this.menuItem(props, subItem, false)
                                }
                            />
                            {this.generateSubMenu(subItem)}
                        </div>
                    ))}
                </MenuList>
            )
        );
    };

    private handleToggle = menu => {
        const menuKey = this.getMenuKey(menu);
        this.setState({
            menuStatusSet: {
                [menuKey]: !this.state.menuStatusSet[menuKey],
            },
        });
    };

    private menuItem = (props, menu, isRoot) =>
        this.getMenuElement(menu, isRoot);

    private handleClose = (event, menu) => {
        const menuKey = this.getMenuKey(menu);
        this.setState({
            menuStatusSet: { ...this.state.menuStatusSet, [menuKey]: false },
        });
    };
}

export default withStyles(styles)(HorizontalMenu);
