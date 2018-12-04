import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import { Theme, createStyles, withStyles } from '@material-ui/core';

const styles = (theme: Theme) =>
    createStyles({
        listItem: {
            paddingLeft: 16,
        },
        listItemIcon: {
            marginRight: 14,
        },
        listItemTextRoot: {
            paddingLeft: 0,
        },
        listItemTextPrimary: {
            fontSize: '0.875rem',
        }
    });

class AdminMenuCompnent extends React.Component<{ classes: any }, {}> {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <ListItem className={classes.listItem} button>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText
                        classes={{ root: classes.listItemTextRoot, primary: classes.listItemTextPrimary }}
                        primary='Dashboard'
                    />
                </ListItem>
                <ListItem className={classes.listItem} button>
                    <ListItemIcon>
                        <ShoppingCartIcon />
                    </ListItemIcon>
                    <ListItemText
                        classes={{ root: classes.listItemTextRoot, primary: classes.listItemTextPrimary }}
                        primary='Orders'
                    />
                </ListItem>
                <ListItem className={classes.listItem} button>
                    <ListItemIcon>
                        <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText
                        classes={{ root: classes.listItemTextRoot, primary: classes.listItemTextPrimary }}
                        primary='Customers'
                    />
                </ListItem>
                <ListItem className={classes.listItem} button>
                    <ListItemIcon>
                        <BarChartIcon />
                    </ListItemIcon>
                    <ListItemText
                        classes={{ root: classes.listItemTextRoot, primary: classes.listItemTextPrimary }}
                        primary='Reports'
                    />
                </ListItem>
                <ListItem className={classes.listItem} button>
                    <ListItemIcon>
                        <LayersIcon />
                    </ListItemIcon>
                    <ListItemText
                        classes={{ root: classes.listItemTextRoot, primary: classes.listItemTextPrimary }}
                        primary='Integrations'
                    />
                </ListItem>
            </div>
        );
    }
}

export default withStyles(styles)(AdminMenuCompnent);
