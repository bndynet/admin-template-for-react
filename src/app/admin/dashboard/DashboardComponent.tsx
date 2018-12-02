
import * as React from 'react';

import Typography from '@material-ui/core/Typography';
import { GridSpacing } from "@material-ui/core/Grid";
import { Theme, createStyles, withStyles, Grid } from '@material-ui/core';

import ContentHeader from '../../common/ContentHeader';
import Alert from '../../common/Alert';
import SimpleLineChart from './SimpleLineChart';

const styles = (theme: Theme) => (
    createStyles({
        contentHeader: {
            display: 'flex',
            paddingTop: theme.spacing.unit * 2,
            paddingBottom: theme.spacing.unit * 2,
            marginBottom: theme.spacing.unit,
            '& h2': {
                flex: 1,
            }
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
            }
        },
        chartContainer: {

        },
    })
);

const renderAlert = (props) => {
    return (
        <Grid item xs={6}>
            <Alert title='Alert Title' message='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam. '
             variant={props.variant} shadow={props.shadow} square={props.square} closeable={props.closeable}/>
        </Grid>
    );
};

class DashboardComponent extends React.Component<{
    classes: any,
}, {}> {
    render() {
        const { classes } = this.props;
        return (
            <div data-name='top'>
                <ContentHeader title='Dashboard' navigation={{
                    'Home': '/',
                    'Dashboard': '',
                }}></ContentHeader>
                <Typography component="div" className={classes.chartContainer}>
                    <SimpleLineChart />
                </Typography>
                
                <ContentHeader title='Alerts'></ContentHeader>
                <Grid container spacing={16 as GridSpacing}>
                    {renderAlert({variant: 'info', square: true, closeable: false })}
                    {renderAlert({variant: 'success', square: true, closeable: false })}
                    {renderAlert({variant: 'warning', square: false, closeable: true, shadow: 3})}
                    {renderAlert({variant: 'error', square: false, closeable: true, shadow: 3})}
                </Grid>
            </div>
        );
    };
}

export default withStyles(styles)(DashboardComponent);