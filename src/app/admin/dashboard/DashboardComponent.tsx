import * as React from 'react';

import Typography from '@material-ui/core/Typography';
import { GridSpacing } from '@material-ui/core/Grid';
import { Theme, createStyles, withStyles, Grid, IconButton } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import ContentHeader from '../../common/ContentHeader';
import Alert from '../../common/Alert';
import Panel, { getPanelIconButtonStyle } from '../../common/Panel';
import SimpleLineChart from './SimpleLineChart';
import MiniCard from '../../common/MiniCard';
import Tag from '../../common/Tag';

const styles = (theme: Theme) =>
    createStyles({
        contentHeader: {
            display: 'flex',
            paddingTop: theme.spacing.unit * 2,
            paddingBottom: theme.spacing.unit * 2,
            marginBottom: theme.spacing.unit,
            '& h2': {
                flex: 1
            }
        },
        breadcrumb: {
            display: 'flex',
            '& > *': {
                alignSelf: 'flex-end',
                textDecoration: 'none'
            },
            '& > *:not(:last-child):after': {
                content: '">"',
                display: 'inline-block',
                marginLeft: 5,
                marginRight: 5
            }
        },
        chartContainer: {},

        panelIconButton: getPanelIconButtonStyle(theme)
    });

const renderCard = (props) => {
    return (
        <Grid item md={3} xs={6}>
            <MiniCard title='150' description='New Orders' {...props} links={[['Home', '/'], ['More info', '/admin/dashboard']]} icon={<ShoppingCartIcon />}/>
        </Grid>
    );
};

const renderAlert = (props) => {
    return (
        <Grid item sm={6}>
            <Alert
                title='Alert Title'
                message='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam. '
                variant={props.variant}
                shadow={props.shadow}
                square={props.square}
                closeable={props.closeable}
            />
        </Grid>
    );
};

const renderPanel = (props) => {
    return (
        <Grid item sm={6}>
            <Panel
                title='Panel Title'
                variant={props.variant}
                closeable={props.closeable}
                minimizeable={props.minimizeable}
                actions={props.actions}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam
                beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat
                deleniti? Eum quasi quidem quibusdam.
            </Panel>
        </Grid>
    );
};

class DashboardComponent extends React.Component<
    {
        classes: any;
    },
    {}
> {
    render() {
        const { classes } = this.props;
        return (
            <div data-name='top'>
                <ContentHeader
                    title='Dashboard'
                    navigation={{
                        Home: '/',
                        Dashboard: null,
                    }}
                />
                <Grid container spacing={16 as GridSpacing}>
                    {renderCard({variant: 'info'})}
                    {renderCard({variant: 'success'})}
                    {renderCard({variant: 'warning'})}
                    {renderCard({})}
                </Grid>

                <ContentHeader title='Chart' />
                <Typography component='div' className={classes.chartContainer}>
                    <SimpleLineChart />
                </Typography>

                <ContentHeader title='Alerts' />
                <Grid container spacing={16 as GridSpacing}>
                    {renderAlert({ variant: 'info', square: true, closeable: false })}
                    {renderAlert({ variant: 'success', square: true, closeable: false })}
                    {renderAlert({ variant: 'warning', square: false, closeable: true, shadow: 3 })}
                    {renderAlert({ variant: 'error', square: false, closeable: true, shadow: 3 })}
                </Grid>

                <ContentHeader title='Panels' />
                <Grid container spacing={16 as GridSpacing}>
                    {renderPanel({ variant: 'info' })}
                    {renderPanel({ variant: 'success' })}
                    {renderPanel({ variant: 'warning', closeable: true, minimizeable: true })}
                    {renderPanel({
                        variant: 'error',
                        closeable: true,
                        minimizeable: true,
                        actions: [
                            <Tag variant='error'>8 New Members</Tag>,
                            <IconButton onClick={() => alert('Help')}>
                                <HelpIcon />
                            </IconButton>
                        ]
                    })}
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(DashboardComponent);
