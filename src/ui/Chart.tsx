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
    Surface,
    Symbols,
    IconType,
    LegendProps,
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
        legendItemInactive: {
            color: theme.palette.action.disabled,
        },
    });

interface ChartLegendContentProps extends LegendProps {
    classes?: { itemInactive: string };
    series: Serie[];
    onItemClick: (serie: Serie) => void;
}

class ChartLegendContent extends React.Component<
    ChartLegendContentProps,
    {
        offSeries: any;
    }
> {
    constructor(props) {
        super(props);
        this.state = {
            offSeries: {},
        };
    }

    public render() {
        const { classes, iconType, iconSize } = this.props;
        return (
            <div className="customized-legend">
                {this.props.series &&
                    this.props.series.map(serie => {
                        const { key, color } = serie;
                        const inactive = !!this.state.offSeries[key];
                        const itemStyles = {
                            marginRight: 10,
                            cursor: "pointer",
                        };

                        return (
                            <span
                                key={key}
                                className={classNames(
                                    "legend-item",
                                    inactive && classes.itemInactive,
                                )}
                                onClick={() =>
                                    this.handleLegendItemClick(serie)
                                }
                                style={itemStyles}
                            >
                                <Surface
                                    width={iconSize}
                                    height={iconSize}
                                    viewBox={{
                                        x: 0,
                                        y: 0,
                                        width: 10,
                                        height: 10,
                                    }}
                                >
                                    <Symbols
                                        cx={5}
                                        cy={5}
                                        type={iconType as "circle"}
                                        size={50}
                                        fill={color}
                                    />
                                    {inactive && (
                                        <Symbols
                                            cx={5}
                                            cy={5}
                                            type={iconType as "circle"}
                                            size={25}
                                            fill="#FFF"
                                        />
                                    )}
                                </Surface>
                                <span>{key}</span>
                            </span>
                        );
                    })}
            </div>
        );
    }

    private handleLegendItemClick = serie => {
        this.setState({
            offSeries: {
                [serie.key]: !this.state.offSeries[serie.key],
            },
        });
        if (this.props.onItemClick) {
            this.props.onItemClick(serie);
        }
    };
}

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
        legendItemIconType?: IconType;
        dataSource?: Promise<any[]> | (() => Promise<any[]>);
        onDataSourceError: (error) => void;
    },
    {
        loadingDataSource: boolean;
        data: any[];
        offSeries: any;
    }
> {
    constructor(props) {
        super(props);
        this.state = {
            loadingDataSource: false,
            data: this.props.data,
            offSeries: {},
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
                        <Legend
                            height={this.props.legendHeight || 45}
                            iconType={this.props.legendItemIconType || "square"}
                            onClick={this.onLegendClick}
                            content={props => (
                                <ChartLegendContent
                                    {...props}
                                    series={this.props.series}
                                    onItemClick={this.onLegentItemClick}
                                    classes={{
                                        itemInactive:
                                            classes.legendItemInactive,
                                    }}
                                />
                            )}
                        />
                        {this.props.series &&
                            this.props.series.map((serie, index) => {
                                if (this.state.offSeries[serie.key]) {
                                    return;
                                }
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
                                                style={{ display: "none" }}
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

    private onLegendClick = p => {
        const dataKey = p.dataKey;
        this.setState({
            offSeries: {
                [dataKey]: !this.state.offSeries[dataKey],
            },
        });
    };

    private onLegentItemClick = serie => {
        const dataKey = serie.key;
        this.setState({
            offSeries: {
                [dataKey]: !this.state.offSeries[dataKey],
            },
        });
    };
}

export default withStyles(styles)(Chart);
