import * as React from 'react';
import classNames from 'classnames';

import { createStyles, Theme, withStyles, Typography } from '@material-ui/core';

import { variantColor } from '../theme';

const styles = (theme: Theme) =>
    createStyles({
        ...variantColor(theme),
        root: {
            borderRadius: 3,
            display: 'inline-block',
            fontSize: '0.75rem',
            lineHeight: '1em',
            padding: `${theme.spacing() / 2}px ${theme.spacing() / 2}px`,
        },
        spacing: {
            marginBottom: theme.spacing(),
            marginRight: theme.spacing(),
        },
    });

class Tag extends React.Component<{
    classes: any;
    className?: string;
    variant: string;
    hasSpacing?: boolean;
}> {
    public render() {
        const { classes, className, variant, hasSpacing } = this.props;
        return (
            <Typography
                color="inherit"
                variant="caption"
                className={classNames(
                    className,
                    classes.root,
                    classes[variant],
                    hasSpacing && classes.spacing,
                )}
            >
                {this.props.children}
            </Typography>
        );
    }
}

export default withStyles(styles)(Tag);
