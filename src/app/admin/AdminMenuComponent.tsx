import * as React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Theme, createStyles, withStyles } from '@material-ui/core';

import menus from './menus';

const styles = (theme: Theme) =>
    createStyles({
        listItem: {
            paddingLeft: 16
        },
        listItemIcon: {
            marginRight: 14
        },
        listItemTextRoot: {
            paddingLeft: 0
        },
        listItemTextPrimary: {
            fontSize: '0.875rem',
        },
        listItemTextSecondary: {
            fontSize: '0.75rem',
        },
    });

class AdminMenuCompnent extends React.Component<{ classes: any }, {}> {
    render() {
        const { classes } = this.props;
        return (
            <div>
                {menus.map(
                    (menu) =>
                        menu.link ? (
                            <ListItem key={menu.text} className={classes.listItem} button component={(props: LinkProps) => <Link {...props} to={menu.link} />}>
                                <ListItemIcon>{menu.icon}</ListItemIcon>
                                <ListItemText
                                    classes={{ root: classes.listItemTextRoot, primary: classes.listItemTextPrimary, secondary: classes.listItemTextSecondary }}
                                    primary={menu.text}
                                    secondary={menu.description}
                                />
                            </ListItem>
                        ) : (
                            <ListItem key={menu.text} className={classes.listItem} button>
                                <ListItemIcon>{menu.icon}</ListItemIcon>
                                <ListItemText
                                    classes={{ root: classes.listItemTextRoot, primary: classes.listItemTextPrimary, secondary: classes.listItemTextSecondary }}
                                    primary={menu.text}
                                    secondary={menu.description}
                                />
                            </ListItem>
                        )
                )}
            </div>
        );
    }
}

export default withStyles(styles)(AdminMenuCompnent);
