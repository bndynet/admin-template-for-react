import * as React from 'react';
import classNames from 'classnames';
import { createStyles, Theme, withStyles } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';

const styles = (theme: Theme) =>
    createStyles({
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100vh',
            backgroundColor: fade(theme.palette.background.default, 0.5),
            zIndex: 9999,
        },
        overlayClose: {
            display: 'none',
        },
    });

class Overlay extends React.Component<{ classes: any; open: boolean }, {}> {
    public render() {
        const { classes, open } = this.props;
        return (
            <div
                className={classNames(
                    classes.overlay,
                    !open && classes.overlayClose,
                )}
            >
                {this.props.children}
            </div>
        );
    }
}

export default withStyles(styles)(Overlay);
