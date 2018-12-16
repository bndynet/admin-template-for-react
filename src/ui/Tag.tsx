import * as React from 'react';
import classNames from 'classnames';

import { createStyles, Theme, withStyles, Typography } from '@material-ui/core';

import { variantColor } from '../theme';

const styles = (theme: Theme) =>
    createStyles({
        ...variantColor(theme),
        root: {
            display: 'inline-block',
            padding: `${theme.spacing.unit / 2} ${theme.spacing.unit / 2}`,
            lineHeight: '1em',
            borderRadius: 3,
            fontSize: '0.75rem',
        },
        spacing: {
            marginRight: theme.spacing.unit,
            marginBottom: theme.spacing.unit,
        }
    });

class Tag extends React.Component<{ classes: any; variant: string, hasSpacing?: boolean }> {
    render() {
        const { classes, variant, hasSpacing } = this.props;
        return (
            <Typography color='inherit' variant='caption' className={classNames(classes.root, classes[variant], hasSpacing && classes.spacing)}>
                {this.props.children}
            </Typography>
        );
    }
}

export default withStyles(styles)(Tag);
