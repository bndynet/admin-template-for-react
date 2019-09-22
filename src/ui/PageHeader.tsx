import * as React from 'react';
import { Link } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import { createStyles, Theme, withStyles } from '@material-ui/core';

const styles = (theme: Theme) =>
    createStyles({
        pageHeader: {
            display: 'flex',
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(),
            marginBottom: theme.spacing(2),
            '& h2': {
                flex: 1,
            },
            '& > *': {
                alignSelf: 'flex-end',
            },
        },
        breadcrumb: {
            display: 'flex',
            '& > *': {
                color: theme.palette.text.primary,
                textDecoration: 'none',
            },
            '& > *:not(:last-child):after': {
                content: '">"',
                display: 'inline-block',
                marginLeft: 5,
                marginRight: 5,
            },
            '& > span': {
                color: theme.palette.text.disabled,
            },
        },
        toolbox: {
            display: 'flex',
            '& > *': {
                display: 'flex',
            },
        },
    });

const renderNavItem = navigation => {
    const items = [];
    for (const key of Object.keys(navigation)) {
        items.push(
            navigation[key] ? (
                <Link key={key} to={navigation[key]}>
                    {key}
                </Link>
            ) : (
                <span key={key}>{key}</span>
            ),
        );
    }
    return items;
};

class PageHeader extends React.Component<
    {
        classes: any;
        title: string | JSX.Element;
        toolbox?: JSX.Element;
        navigation?: { [key: string]: string };
    },
    {}
> {
    public render() {
        const { classes, title, navigation, toolbox } = this.props;
        return (
            <div className={classes.pageHeader}>
                <Typography component="h2" variant="h5">
                    {title}
                </Typography>
                {navigation && (
                    <Typography
                        variant="caption"
                        className={classes.breadcrumb}
                    >
                        {renderNavItem(navigation)}
                    </Typography>
                )}
                {toolbox && <div className={classes.toolbox}>{toolbox}</div>}
            </div>
        );
    }
}

export default withStyles(styles)(PageHeader);
