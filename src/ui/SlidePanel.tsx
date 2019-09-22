import * as React from 'react';
import {
    Theme,
    createStyles,
    withStyles,
    IconButton,
    Drawer,
    Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { variantBorderColor } from '../theme';

const styles = (theme: Theme) =>
    createStyles({
        ...variantBorderColor(theme),
        root: {
            backgroundColor: theme.palette.background.default,
        },
        header: {
            display: 'flex',
            alignItems: 'flex-end',
            padding: `${theme.spacing()}px ${theme.spacing(2)}px`,
            borderBottom: `solid 1px ${theme.palette.divider}`,
        },
        headerTitle: {
            flex: 1,
        },
        headerToolbox: {
            flex: 1,
            textAlign: 'right',
        },
        body: {
            padding: `${theme.spacing()}px ${theme.spacing(2)}px`,
        },
    });

class SlidePanel extends React.Component<{
    classes: any;
    className?: string;
    title: string | JSX.Element;
    anchor: 'top' | 'right' | 'left' | 'bottom';
    width: number | string;
    height: number | string;
    open: boolean;
    closeable?: boolean;
    onClose?: () => void;
    onOpen?: () => void;
}> {
    public constructor(props) {
        super(props);
    }

    public render() {
        const {
            classes,
            className,
            anchor,
            title,
            width,
            height,
            open,
        } = this.props;
        const closeable =
            typeof this.props.closeable === 'undefined'
                ? true
                : this.props.closeable;
        return (
            <Drawer
                classes={{ paper: classes.root }}
                anchor={anchor || 'right'}
                open={open}
            >
                <div className={className} style={{ width, height }}>
                    {title && (
                        <div className={classes.header}>
                            <Typography
                                className={classes.headerTitle}
                                component="h2"
                                variant="h5"
                            >
                                {title}
                            </Typography>
                            {closeable && (
                                <div className={classes.headerToolbox}>
                                    <IconButton
                                        aria-label="Close"
                                        onClick={this.close}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </div>
                            )}
                        </div>
                    )}
                    <div className={classes.body}>{this.props.children}</div>
                </div>
            </Drawer>
        );
    }

    private close = () => {
        this.props.onClose();
    };
}

export default withStyles(styles)(SlidePanel);
