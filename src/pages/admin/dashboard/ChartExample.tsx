import * as React from 'react';
import { Theme, createStyles, withStyles } from '@material-ui/core';
import { Chart } from '@bndynet/recharts-wrapper';
import { fade } from '@material-ui/core/styles/colorManipulator';

let chartIsMounted = false;
const data = [
    { name: 'Mon', Visits: 0, Orders: 20 },
    { name: 'Tue', Visits: 100, Orders: 0 },
    { name: 'Wed', Visits: 0, Orders: 430 },
];
function loadData() {
    return new Promise<any[]>(resolve => {
        setTimeout(() => {
            const response = [
                {
                    name: 'Mon',
                    Visits: 2200,
                    Orders: 3400,
                    ShoppingCart: 1210,
                    s3: 4000,
                },
                {
                    name: 'Tue',
                    Visits: 1280,
                    Orders: 2398,
                    ShoppingCart: 3000,
                    s3: 1212,
                },
                {
                    name: 'Wed',
                    Visits: 5000,
                    Orders: 4300,
                    ShoppingCart: 2300,
                    s3: 3333,
                },
                {
                    name: 'Thu',
                    Visits: 4780,
                    Orders: 2908,
                    ShoppingCart: 4500,
                    s3: 2321,
                },
                {
                    name: 'Fri',
                    Visits: 5890,
                    Orders: 4800,
                    ShoppingCart: 1000,
                    s3: 5422,
                },
                {
                    name: 'Sat',
                    Visits: 4390,
                    Orders: 3800,
                    ShoppingCart: 3400,
                    s3: 1,
                },
                {
                    name: 'Sun',
                    Visits: 4490,
                    Orders: 4300,
                    ShoppingCart: 2300,
                    s3: 0,
                },
            ];
            if (chartIsMounted) {
                resolve(response);
            }
        }, 5000);
    });
}

const styles = (theme: Theme) =>
    createStyles({
        loadingElement: {
            backgroundColor: fade(theme.palette.background.paper, 0.5),
        },
    });

class ChartExample extends React.Component<{
    classes: { loadingElement: any };
}> {
    public componentDidMount() {
        chartIsMounted = true;
    }

    public componentWillUnmount() {
        chartIsMounted = false;
    }

    public render() {
        return (
            <Chart
                classes={{ loadingElement: this.props.classes.loadingElement }}
                data={data}
                xKey="name"
                dataSource={loadData}
                series={[
                    { key: 'Visits', color: '#82ca9d', type: 'bar' },
                    { key: 'Orders', color: '#8884d8', type: 'area' },
                    { key: 'ShoppingCart', color: '#ff0000' },
                ]}
                loadingElement={<span>Loading...</span>}
            />
        );
    }
}

export default withStyles(styles)(ChartExample);
