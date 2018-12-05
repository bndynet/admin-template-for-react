import * as React from 'react';
import classNames from 'classnames';
import { Link, LinkProps } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Theme, createStyles, withStyles, List } from '@material-ui/core';

import menus from './menus';
import { themeConfig } from '../../theme';

const styles = (theme: Theme) =>
    createStyles({
        root: {},
        rootMini: {},
        listItem: {
            paddingLeft: 0,
            paddingRight: 0,
        },
        listItemMini: {
            justifyContent: 'center',
            '&:hover': {
                width: themeConfig.sidebarWidth,
                backgroundColor: theme.palette.background.paper,
                borderTopRightRadius: theme.shape.borderRadius,
                borderBottomRightRadius: theme.shape.borderRadius,
                boxShadow: theme.shadows[2],
                zIndex: 100,
            },
            '&:hover $listItemTextMini': {
                visibility: 'visible',
            },
            [theme.breakpoints.down('sm')]: {
                overflow: 'hidden',
            },
        },
        listItemIcon: {
            marginRight: 0,
            width: themeConfig.sidebarWidthMini,
            justifyContent: 'center',
        },
        listItemIconMini: {
            marginRight: 0
        },
        listItemText: {
            paddingLeft: 0,
            paddingRight: 0,
        },
        listItemTextMini: {
            visibility: 'hidden',
        },
        listItemTextPrimary: {
            fontSize: '0.875rem'
        },
        listItemTextSecondary: {
            fontSize: '0.75rem'
        }
    });

class AdminMenuCompnent extends React.Component<{ classes: any; mini?: boolean }, {}> {
    render() {
        const { classes, mini } = this.props;
        return (
            <List className={classNames(classes.root, classes.rootMini)}>
                {menus.map((menu) => (
                    <ListItem
                        button
                        key={menu.text}
                        className={classNames(classes.listItem, mini && classes.listItemMini)}
                        disableGutters={mini}
                        component={menu.link ? (props: LinkProps) => <Link {...props} to={menu.link} /> : null}>
                        <ListItemIcon className={classNames(classes.listItemIcon, mini && classes.listItemIconMini)}>
                            {menu.icon}
                        </ListItemIcon>
                        <ListItemText
                            className={classNames(classes.listItemText, mini && classes.listItemTextMini)}
                            classes={{ primary: classes.listItemTextPrimary, secondary: classes.listItemTextSecondary }}
                            primary={menu.text}
                            secondary={menu.description}
                        />
                    </ListItem>
                ))}
            </List>
        );
    }
}

export default withStyles(styles)(AdminMenuCompnent);
