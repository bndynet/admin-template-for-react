import * as React from 'react';
import classNames from 'classnames';
import { Link, LinkProps } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, withStyles, List, Collapse } from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { MenuItem } from 'app/types';
import { themeConfig, AppTheme, ifLayout } from 'app/theme';

const styles = (theme: AppTheme) =>
    createStyles({
        root: {
            '& .MuiListItemIcon-root': {
                color: ifLayout(theme, {
                    popular: 'inherit',
                }),
            },
            '& .MuiTypography-colorTextSecondary': {
                color: ifLayout(theme, {
                    popular: 'inherit',
                }),
            },
        },
        rootMini: {
            '& $listItem': {
                justifyContent: 'center',
                [theme.breakpoints.down('sm')]: {
                    overflow: 'hidden',
                },
            },
            '& $childList.level-1': {
                position: 'absolute',
                width: '100%',
                marginTop: -5,
                backgroundColor: ifLayout(theme, {
                    classic: theme.palette.background.paper,
                    popular: theme.palette.primary.dark,
                }),
                borderTopRightRadius: 0,
                borderBottomRightRadius: theme.shape.borderRadius,
            },
            '& > li': {
                position: 'relative',
                width: '100%',
            },
            '& > li:hover': {
                width: themeConfig.sidebarWidth,
                backgroundColor: ifLayout(theme, {
                    classic: theme.palette.background.paper,
                    popular: theme.palette.primary.dark,
                }),
                borderTopRightRadius: theme.shape.borderRadius,
                borderBottomRightRadius: theme.shape.borderRadius,
                boxShadow: theme.shadows[2],
                zIndex: 100,
            },
            '& > li $listItemText': {
                visibility: 'hidden',
            },
            '& > li:hover $listItemText': {
                visibility: 'visible',
            },
            '& > li:hover $childList': {
                display: 'block',
            },

            '& > li $childList': {
                display: 'none',
            },
            '& $expandIcon': {
                display: 'none',
            },
        },
        listItem: {
            paddingLeft: 0,
            paddingRight: 0,
        },
        listItemIcon: {
            marginRight: 0,
            justifyContent: 'center',
        },
        listItemText: {
            paddingLeft: 0,
            paddingRight: 0,
        },
        listItemTextPrimary: {
            fontSize: '0.875rem',
        },
        listItemTextSecondary: {
            fontSize: '0.75rem',
        },
        childList: {
            '& $listItem': {
                paddingLeft: theme.spacing(),
            },
            '& $childList $listItem': {
                paddingLeft: theme.spacing(2),
            },
            '& $childList $childList $listItem': {
                paddingLeft: theme.spacing(3),
            },
        },
        expandIcon: {
            marginRight: 10,
            color: ifLayout(theme, {
                popular: 'inherit',
            }),
        },
    });

class VerticalMenu extends React.Component<
    {
        classes: any;
        mini?: boolean;
        data: MenuItem[];
        width: number | string;
        minWidth: number | string;
    },
    {
        itemHovered: boolean;
        menuStatusSet: { [key: string]: boolean };
    }
> {
    private itemHoveredStyle;

    public constructor(props) {
        super(props);
        this.state = {
            itemHovered: false,
            menuStatusSet: {},
        };
        this.itemHoveredStyle = {
            // width: this.props.width || 200,
        };

        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.handleToggleChildMenu = this.handleToggleChildMenu.bind(this);
    }

    public render() {
        const { classes, mini, data } = this.props;
        return (
            <List
                className={classNames(classes.root, mini && classes.rootMini)}
            >
                {data && data.map(menu => this.renderMenuItem(menu, classes))}
            </List>
        );
    }

    private getMenuKey(menu) {
        return `${menu.text}_${menu.link || ''}`;
    }

    private handleMenuClick(menu) {
        this.handleToggleChildMenu(menu);
    }

    private handleToggleChildMenu(menu) {
        const menuKey = this.getMenuKey(menu);
        if (menu.children) {
            this.setState({
                menuStatusSet: {
                    ...this.state.menuStatusSet,
                    [menuKey]: !this.state.menuStatusSet[menuKey],
                },
            });
        }
    }

    private renderMenuItem(menu, classes, level?) {
        const menuKey = this.getMenuKey(menu);
        const mini = this.props.mini;
        const getLink = React.forwardRef<HTMLAnchorElement, Partial<LinkProps>>(
            (props, ref) => <Link to={menu.link} {...props} ref={ref as any} />,
        );
        getLink.displayName = 'ListItemLink';
        if (!level) {
            level = 1;
        }
        const ListItemComponent = menu.link ? getLink : null;
        return (
            <li
                key={menuKey}
                style={this.state.itemHovered ? this.itemHoveredStyle : null}
                onMouseEnter={() => this.setState({ itemHovered: true })}
            >
                <ListItem
                    button={true}
                    className={classes.listItem}
                    onClick={() => this.handleMenuClick(menu)}
                    component={ListItemComponent}
                >
                    <ListItemIcon
                        className={classes.listItemIcon}
                        style={{ width: this.props.minWidth }}
                    >
                        {typeof menu.icon !== 'string' ? (
                            menu.icon
                        ) : (
                            <i className={menu.icon} />
                        )}
                    </ListItemIcon>
                    <ListItemText
                        className={classes.listItemText}
                        classes={{
                            primary: classes.listItemTextPrimary,
                            secondary: classes.listItemTextSecondary,
                        }}
                        primary={menu.text}
                        secondary={menu.description}
                    />
                    {menu.children &&
                        !mini &&
                        (this.state.menuStatusSet[menuKey] ? (
                            <ExpandLessIcon
                                className={classes.expandIcon}
                                onClick={() => this.handleToggleChildMenu(menu)}
                            />
                        ) : (
                            <ExpandMoreIcon
                                className={classes.expandIcon}
                                onClick={() => this.handleToggleChildMenu(menu)}
                            />
                        ))}
                </ListItem>
                {menu.children &&
                    (mini ? (
                        <List
                            className={classNames(
                                classes.childList,
                                `level-${level}`,
                            )}
                        >
                            {menu.children.map(child =>
                                this.renderMenuItem(child, classes, level + 1),
                            )}
                        </List>
                    ) : (
                        <Collapse
                            in={!!this.state.menuStatusSet[menuKey]}
                            timeout="auto"
                        >
                            <List
                                className={classNames(
                                    classes.childList,
                                    `level-${level}`,
                                )}
                            >
                                {menu.children.map(child =>
                                    this.renderMenuItem(
                                        child,
                                        classes,
                                        level + 1,
                                    ),
                                )}
                            </List>
                        </Collapse>
                    ))}
            </li>
        );
    }
}

export default withStyles(styles)(VerticalMenu);
