import * as React from 'react';
import classNames from 'classnames';
import { Paper, Theme, createStyles, withStyles, Typography, Grid, IconButton, Collapse } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import RemoveIcon from '@material-ui/icons/Remove';
import { variantBorderColor } from '../../theme';

export const getPanelIconButtonStyle = (theme: Theme) => ({
    padding: theme.spacing.unit / 2,
});

const panelStyles = (theme: Theme) =>
    createStyles({
        ...variantBorderColor(theme),
        root: {
            borderTopStyle: 'solid',
            marginBottom: theme.spacing.unit * 2,
        },
        header: {
            paddingLeft: theme.spacing.unit,
            paddingRight: theme.spacing.unit,
            borderBottom: `solid 1px ${theme.palette.divider}`,
            width: '100%',
            margin: 0
        },
        headerForCollapsed: {
            borderBottom: 'none'
        },
        headerToolbox: {
            textAlign: 'right',
            paddingRight: 0
        },
        headerToolboxButton: getPanelIconButtonStyle(theme),
        body: {
            padding: `${theme.spacing.unit} ${theme.spacing.unit * 1.5}`
        }
    });

class Panel extends React.Component<
    {
        classes: any;
        className?: string;
        title: string;
        variant?: string;
        closeable: boolean;
        minimizeable: boolean;
        bodyPadding?: string;
        actions: [];
    },
    { open: boolean; collapsed: boolean; collapsedDone: boolean }
> {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            collapsed: false,
            collapsedDone: false
        };
    }

    render() {
        const { classes, className, title, bodyPadding, actions } = this.props;
        const actionEls = [];
        if (actions) {
            actions.forEach((action, index) => {
                actionEls.push(
                    <span key={index}>{action}</span>
                );
            });
        }
        return (
            <Collapse in={this.state.open}>
                <Paper className={classNames(classes.root, classes[this.props.variant], className)}>
                    {title && (
                        <Grid
                            container
                            spacing={8}
                            className={classNames(
                                classes.header,
                                this.state.collapsedDone && classes.headerForCollapsed
                            )}>
                            <Grid item xs={6}>
                                <Typography variant='subtitle1' component='h4'>
                                    {title}
                                </Typography>
                            </Grid>
                            <Grid item xs={6} className={classes.headerToolbox}>
                                {actionEls}
                                {this.props.minimizeable && (
                                    <IconButton
                                        className={classes.headerToolboxButton}
                                        onClick={() => this.setState({ collapsed: !this.state.collapsed })}>
                                        {this.state.collapsed ? (
                                            <AddIcon fontSize='small' />
                                        ) : (
                                            <RemoveIcon fontSize='small' />
                                        )}
                                    </IconButton>
                                )}
                                {this.props.closeable && (
                                    <IconButton
                                        className={classes.headerToolboxButton}
                                        onClick={() => this.setState({ open: false })}>
                                        <CloseIcon fontSize='small' />
                                    </IconButton>
                                )}
                            </Grid>
                        </Grid>
                    )}
                    <Collapse
                        in={!this.state.collapsed}
                        onEnter={() => this.setState({ collapsedDone: false })}
                        onExited={() => this.setState({ collapsedDone: true })}>
                        <div className={classes.body} style={{ padding: bodyPadding }}>
                            <Typography component='div'>{this.props.children}</Typography>
                        </div>
                    </Collapse>
                </Paper>
            </Collapse>
        );
    }
}

export default withStyles(panelStyles)(Panel);
