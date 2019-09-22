import * as React from 'react';

import Typography from '@material-ui/core/Typography';
import {
    Theme,
    createStyles,
    withStyles,
    Grid,
    IconButton,
    Button,
} from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import { Alert, PageHeader, Panel, MiniCard, Tag } from 'app/ui';
import ChartExample from './ChartExample';

const styles = (theme: Theme) =>
    createStyles({
        contentHeader: {
            display: 'flex',
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
            marginBottom: theme.spacing(),
            '& h2': {
                flex: 1,
            },
        },
        breadcrumb: {
            display: 'flex',
            '& > *': {
                alignSelf: 'flex-end',
                textDecoration: 'none',
            },
            '& > *:not(:last-child):after': {
                content: '">"',
                display: 'inline-block',
                marginLeft: 5,
                marginRight: 5,
            },
        },
        chartContainer: {},
    });

const renderCard = props => {
    return (
        <Grid item={true} md={3} xs={6}>
            <MiniCard
                title="150"
                description="New Orders"
                {...props}
                links={{ Home: '/', 'More info': '/admin/dashboard' }}
                icon={<ShoppingCartIcon />}
            />
        </Grid>
    );
};

const renderAlert = props => {
    /* eslint-disable */
    return (
        <Grid item={true} sm={6}>
            <Alert
                title="Alert Title"
                message="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam."
                variant={props.variant}
                shadow={props.shadow}
                square={props.square}
                closeable={props.closeable}
            />
        </Grid>
    );
};

const renderPanel = props => {
    return (
        <Grid item={true} sm={6}>
            <Panel
                title="Panel Title"
                variant={props.variant}
                closeable={props.closeable}
                minimizeable={props.minimizeable}
                actions={props.actions}
            >
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                blanditiis tenetur unde suscipit, quam beatae rerum inventore
                consectetur, neque doloribus, cupiditate numquam dignissimos
                laborum fugiat deleniti? Eum quasi quidem quibusdam.
            </Panel>
        </Grid>
    );
};

class Dashboard extends React.Component<
    {
        classes: any;
    },
    {}
> {
    public render() {
        const { classes } = this.props;
        return (
            <div data-name="top">
                <PageHeader
                    title="Dashboard"
                    navigation={{
                        Home: '/',
                        Dashboard: null,
                    }}
                />
                <Grid container={true} spacing={2}>
                    {renderCard({ variant: 'info' })}
                    {renderCard({ variant: 'success' })}
                    {renderCard({ variant: 'warning' })}
                    {renderCard({})}
                </Grid>

                <PageHeader title="Chart" />
                <Typography component="div" className={classes.chartContainer}>
                    <ChartExample />
                </Typography>

                <PageHeader title="Alerts" />
                <Grid container={true} spacing={2}>
                    {renderAlert({
                        variant: 'info',
                        square: true,
                        closeable: false,
                    })}
                    {renderAlert({
                        variant: 'success',
                        square: true,
                        closeable: false,
                    })}
                    {renderAlert({
                        variant: 'warning',
                        square: false,
                        closeable: true,
                        shadow: 3,
                    })}
                    {renderAlert({
                        variant: 'error',
                        square: false,
                        closeable: true,
                        shadow: 3,
                    })}
                </Grid>

                <PageHeader
                    title="Panels"
                    toolbox={
                        <div>
                            <Button variant="contained">Button</Button>
                            <Button>Button</Button>
                        </div>
                    }
                />
                <Grid container={true} spacing={2}>
                    {renderPanel({})}
                    {renderPanel({ variant: 'info' })}
                    {renderPanel({ variant: 'success' })}
                    {renderPanel({
                        variant: 'warning',
                        closeable: true,
                        minimizeable: true,
                    })}
                    {renderPanel({
                        variant: 'error',
                        closeable: true,
                        minimizeable: true,
                        actions: [
                            <Tag key="1" variant="error">
                                8 New Members
                            </Tag>,
                            <IconButton key="2" onClick={() => alert('Help')}>
                                <HelpIcon />
                            </IconButton>,
                        ],
                    })}
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(Dashboard);
