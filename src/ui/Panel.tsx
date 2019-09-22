import * as React from 'react';
import classNames from 'classnames';
import {
    Paper,
    Theme,
    createStyles,
    withStyles,
    Typography,
    IconButton,
    Collapse,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import RemoveIcon from '@material-ui/icons/Remove';
import { variantBorderColor } from '../theme';

export const getPanelIconButtonStyle = (theme: Theme) => ({
    padding: theme.spacing() / 2,
});

const panelStyles = (theme: Theme) =>
    createStyles({
        ...variantBorderColor(theme),
        root: {
            marginBottom: theme.spacing(2),
        },
        rootForBordered: {
            borderTopStyle: 'solid',
        },
        header: {
            display: 'flex',
            alignItems: 'center',
            borderBottom: `solid 1px ${theme.palette.divider}`,
            padding: `${theme.spacing() / 2}px ${theme.spacing() +
                1}px ${theme.spacing() / 2}px ${theme.spacing(1.5)}px`,
        },
        headerForNonBordered: {
            paddingTop: theme.spacing() / 2 + 2,
        },
        headerForCollapsed: {
            borderBottom: 'none',
        },
        headerTitle: {
            flex: 1,
        },
        headerToolbox: {
            display: 'flex',
            alignItems: 'center',
        },
        headerToolboxButton: getPanelIconButtonStyle(theme),
        body: {
            padding: `${theme.spacing()}px ${theme.spacing(1.5)}px`,
        },
    });

class Panel extends React.Component<
    {
        classes: any;
        className?: string;
        title?: string | JSX.Element;
        variant?: string;
        closeable?: boolean;
        minimizeable?: boolean;
        bodyPadding?: string;
        actions?: any[];
    },
    { open: boolean; collapsed: boolean; collapsedDone: boolean }
> {
    public constructor(props) {
        super(props);
        this.state = {
            open: true,
            collapsed: false,
            collapsedDone: false,
        };
    }

    public render() {
        const { classes, className, title, bodyPadding, actions } = this.props;
        const actionEls = [];
        if (actions) {
            actions.forEach((action: any, index) => {
                actionEls.push(
                    React.cloneElement(action, {
                        className:
                            action.type === IconButton
                                ? classes.headerToolboxButton
                                : '',
                        key: `ACTION-${index}`,
                    }),
                );
            });
        }
        return (
            <Collapse in={this.state.open}>
                <Paper
                    className={classNames(
                        classes.root,
                        classes[this.props.variant],
                        this.props.variant && classes.rootForBordered,
                        className,
                    )}
                >
                    {title && (
                        <div
                            className={classNames(
                                classes.header,
                                this.state.collapsedDone &&
                                    classes.headerForCollapsed,
                                this.props.variant ||
                                    classes.headerForNonBordered,
                            )}
                        >
                            <Typography
                                className={classes.headerTitle}
                                variant="subtitle1"
                                component="h4"
                            >
                                {title}
                            </Typography>
                            <div className={classes.headerToolbox}>
                                {actionEls}
                                {this.props.minimizeable && (
                                    <IconButton
                                        className={classes.headerToolboxButton}
                                        onClick={() =>
                                            this.setState({
                                                collapsed: !this.state
                                                    .collapsed,
                                            })
                                        }
                                    >
                                        {this.state.collapsed ? (
                                            <AddIcon />
                                        ) : (
                                            <RemoveIcon />
                                        )}
                                    </IconButton>
                                )}
                                {this.props.closeable && (
                                    <IconButton
                                        className={classes.headerToolboxButton}
                                        onClick={() =>
                                            this.setState({ open: false })
                                        }
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                )}
                            </div>
                        </div>
                    )}
                    <Collapse
                        in={!this.state.collapsed}
                        onEnter={() => this.setState({ collapsedDone: false })}
                        onExited={() => this.setState({ collapsedDone: true })}
                    >
                        <div
                            className={classes.body}
                            style={{ padding: bodyPadding }}
                        >
                            <Typography component="div">
                                {this.props.children}
                            </Typography>
                        </div>
                    </Collapse>
                </Paper>
            </Collapse>
        );
    }
}

export default withStyles(panelStyles)(Panel);
