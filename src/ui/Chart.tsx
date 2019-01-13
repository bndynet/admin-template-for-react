import * as React from "react";
import classNames from "classnames";
import {
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Line,
    LineType,
    ComposedChart,
    Bar,
    Area,
} from "recharts";
import {
    CircularProgress,
    createStyles,
    withStyles,
    Theme,
} from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator";

export interface Serie {
    key: string;
    color?: string;
    width?: number;
    type?: "area" | "line" | "bar";
    visualizationType?: LineType;
}

const styles = (theme: Theme) =>
    createStyles({
        root: {
            position: "relative",
        },
        loadingBox: {
            position: "absolute",
            top: 0,
            margin: `0 auto`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: fade(theme.palette.background.paper, 0.6),
        },
    });

export class Chart extends React.Component<
    {
        classes?: any;
        className?: string;
        data: any[];
        xKey: string;
        series: Serie[];
        width?: number | string;
        height?: number | string;
        xHeight?: number;
        yWidth?: number;
        legendHeight?: number;
        dataSource?: Promise<any[]> | (() => Promise<any[]>);
        onDataSourceError: (error) => void;
    },
    {
        loadingDataSource: boolean;
        data: any[];
    }
> {
    constructor(props) {
        super(props);
        this.state = {
            loadingDataSource: false,
            data: this.props.data,
        };
    }

    public componentDidMount() {
        if (this.props.dataSource) {
            const promise =
                typeof this.props.dataSource === "object"
                    ? this.props.dataSource
                    : this.props.dataSource();
            this.setState({
                loadingDataSource: true,
            });
            promise
                .then(result => {
                    this.setState({
                        data: result,
                        loadingDataSource: false,
                    });
                })
                .catch(error => {
                    this.setState({
                        loadingDataSource: false,
                    });
                    if (this.props.onDataSourceError) {
                        this.props.onDataSourceError(error);
                    }
                });
        }
    }

    public componentWillReceiveProps(props) {
        if (!this.props.dataSource) {
            this.setState({
                data: props.data,
            });
        }
    }

    public render() {
        const { classes } = this.props;
        const height = this.props.height || 320;
        return (
            <div
                className={classNames(classes.root, this.props.className)}
                style={{ width: this.props.width, height }}
            >
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={this.state.data}>
                        <XAxis
                            dataKey={this.props.xKey}
                            height={this.props.xHeight}
                        />
                        <YAxis
                            width={
                                this.state.data && this.state.data.length > 0
                                    ? this.props.yWidth
                                    : 0
                            }
                        />
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        {this.props.data && this.props.data.length > 0 && (
                            <Tooltip />
                        )}
                        <Legend height={this.props.legendHeight || 45} />
                        {this.props.series &&
                            this.props.series.map((serie, index) => {
                                switch (serie.type) {
                                    case "area":
                                        return (
                                            <Area
                                                key={index}
                                                type={
                                                    serie.visualizationType ||
                                                    "monotone"
                                                }
                                                dataKey={serie.key}
                                                fill={serie.color}
                                                stroke={serie.color}
                                            />
                                        );

                                    case "bar":
                                        return (
                                            <Bar
                                                key={index}
                                                dataKey={serie.key}
                                                barSize={serie.width || 20}
                                                fill={serie.color}
                                            />
                                        );

                                    case "line":
                                    default:
                                        return (
                                            <Line
                                                key={index}
                                                type={
                                                    serie.visualizationType ||
                                                    "monotone"
                                                }
                                                dataKey={serie.key}
                                                stroke={serie.color}
                                            />
                                        );
                                }
                            })}
                    </ComposedChart>
                </ResponsiveContainer>
                {this.state.loadingDataSource && (
                    <div
                        className={classes.loadingBox}
                        style={{ height, width: "100%" }}
                    >
                        <CircularProgress disableShrink={true} />
                    </div>
                )}
            </div>
        );
    }
}

export default withStyles(styles)(Chart);
