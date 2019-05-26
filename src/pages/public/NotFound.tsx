import * as React from 'react';
import * as intl from 'react-intl-universal';
import { connect } from 'react-redux';
import { createStyles, withStyles, Typography } from '@material-ui/core';

const styles = createStyles({
    root: {
        marginTop: 100,
        width: 600,
        margin: 'auto',
        textAlign: 'center',
    },
});

class NotFound extends React.Component<
    {
        classes: any;
    },
    {}
> {
    public render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <i className="far fa-frown fa-5x" />
                <br />
                <br />
                <Typography component="h2" variant="h4">
                    {intl.get('errors.404.title')}
                </Typography>
                <br />
                <br />
                <Typography>{intl.get('errors.404.description')}</Typography>
            </div>
        );
    }
}

export default connect(
    null,
    null,
)(withStyles(styles)(NotFound));
