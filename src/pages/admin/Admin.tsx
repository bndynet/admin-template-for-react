import * as React from 'react';
import { renderRoutes } from 'react-router-config';
import {
    withStyles,
    Theme,
    createStyles,
    withWidth,
    CssBaseline,
} from '@material-ui/core';

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
            paddingBottom: theme.spacing(),
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3),
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
            </div>
        );
    }
}

export default withStyles(styles)(withWidth()(Admin));
