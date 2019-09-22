import * as React from 'react';
import {
    createStyles,
    Theme,
    withStyles,
    CircularProgress,
    Typography,
} from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';

const styles = (theme: Theme) =>
    createStyles({
        circularProgressContainer: {
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(2),
            borderStyle: 'solid',
            borderWidth: 2,
            borderColor: fade(theme.palette.primary.main, 0.2),
            borderRadius: theme.shape.borderRadius,
            textAlign: 'center',
        },
        circularProgressWrapper: {
            position: 'relative',
            display: 'inline-block',
            margin: theme.spacing(2),
        },
        circularProgressDeterminate: {
            color: fade(theme.palette.primary.main, 0.2),
        },
        circularProgressIndeterminate: {
            color: theme.palette.primary.main,
            animationDuration: '600ms',
            position: 'absolute',
            left: 0,
        },
        circularProgressText: {
            display: 'block',
            textAlign: 'center',
        },
    });

class Loading extends React.Component<
    { classes: any; loadingText?: string },
    {}
> {
    public render() {
        const { classes, loadingText } = this.props;
        return (
            <div className={classes.circularProgressContainer}>
                <div className={classes.circularProgressWrapper}>
                    <CircularProgress
                        variant="determinate"
                        value={100}
                        className={classes.circularProgressDeterminate}
                        size={48}
                        thickness={4}
                    />
                    <CircularProgress
                        variant="indeterminate"
                        disableShrink={true}
                        className={classes.circularProgressIndeterminate}
                        size={48}
                        thickness={4}
                    />
                </div>
                {loadingText && (
                    <Typography
                        classes={{ root: classes.circularProgressText }}
                    >
                        {' '}
                        {loadingText}{' '}
                    </Typography>
                )}
            </div>
        );
    }
}

export default withStyles(styles)(Loading);
