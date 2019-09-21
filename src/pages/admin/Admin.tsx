import * as React from 'react';
import { renderRoutes } from 'react-router-config';
import {
    withStyles,
    Theme,
    createStyles,
    withWidth,
    Typography,
    CssBaseline,
} from '@material-ui/core';

import { SlidePanel } from 'app/ui';
import { themeConfig } from 'app/theme';
import { adminRoutes } from 'app/config';

import { Frame } from './core';

const styles = (theme: Theme) =>
    createStyles({
        '@global': {
            body: {
                color: theme.palette.text.primary,
            },
            '.markdown-body pre': {
                backgroundColor: theme.palette.background.paper,
            },
        },
        root: {
            display: 'flex',
        },
        content: {
            flexGrow: 1,
            paddingTop: themeConfig.headerHeight,
            paddingBottom: theme.spacing.unit,
            paddingLeft: theme.spacing.unit * 3,
            paddingRight: theme.spacing.unit * 3,
            height: '100vh',
            overflow: 'auto',
        },
    });

interface AdminProps {
    classes: any;
}

interface AdminState {
    sidePanelOpen: boolean;
}

class Admin extends React.PureComponent<AdminProps, AdminState> {
    public constructor(props: AdminProps) {
        super(props);
        this.state = {
            sidePanelOpen: false,
        };
    }

    public render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <Frame />
                <main className={classes.content}>
                    {renderRoutes(adminRoutes)}
                </main>
                <SlidePanel
                    width={600}
                    anchor="right"
                    title="Panel Title"
                    open={this.state.sidePanelOpen}
                    onClose={this.handleSidePanelClose}
                >
                    <Typography>This is a side panel.</Typography>
                </SlidePanel>
            </div>
        );
    }

    private handleSidePanelClose = () => {
        this.setState({
            sidePanelOpen: false,
        });
    };
}

export default withStyles(styles)(withWidth()(Admin));
