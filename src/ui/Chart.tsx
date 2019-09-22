import * as React from 'react';
import classNames from 'classnames';
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
} from 'recharts';
import {
    CircularProgress,
    createStyles,
    withStyles,
    Theme,
} from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';

export interface Serie {
    key: string;
    label: string;
    color?: string;
    width?: number;
    type?: 'area' | 'line' | 'bar';
    legendIconType?:
        | 'circle'
        | 'cross'
        | 'diamond'
        | 'square'
        | 'star'
        | 'triangle'
        | 'wye';
    visualizationType?: LineType;
}

const styles = (theme: Theme) =>
    createStyles({
        root: {
            position: 'relative',
        },
        loadingBox: {
            position: 'absolute',
            top: 0,
            margin: `0 auto`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: fade(theme.palette.background.paper, 0.6),
        },
        legendItemInactive: {
            color: theme.palette.grey[500],
        },
    });

interface ChartLegendContentProps extends LegendProps {
    classes?: { itemInactive: string };
    series: Serie[];
    onItemClick: (serie: Serie) => void;
}

const ICON_SIZE = 32;

class ChartLegendContent extends React.Component<
    ChartLegendContentProps,
    {
        offSeries: any;
    }
> {
    public constructor(props) {
        super(props);
        this.state = {
            offSeries: {},
        };
    }

    public render() {
        const { classes, align, iconSize } = this.props;
        return (
            <div
                className="customized-legend"
                style={{
                    textAlign: align,
                }}
            >
                {this.props.series &&
                    this.props.series.map((serie, index) => {
                        const { key, label } = serie;
                        const inactive = !!this.state.offSeries[key];
                        const margin = {
                            left: `0 16px 0 0`,
                            right: `0 0 0 16px`,
                            center: `0 8px 0 8px`,
                        };
                        const itemStyles = {
                            margin: margin[align],
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                        };

                        return (
                            <span
                                key={`legend-item-${index}`}
                                className={classNames(
                                    'legend-item',
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
                                        width: ICON_SIZE,
                                        height: ICON_SIZE,
                                    }}
                                    style={{
                                        marginRight: 4,
                                    }}
                                >
                                    {this.renderIcon(serie, inactive)}
                                </Surface>
                                <span>{label || key}</span>
                            </span>
                        );
                    })}
            </div>
        );
    }

    private handleLegendItemClick = serie => {
        this.setState({
            offSeries: {
                ...this.state.offSeries,
                [serie.key]: !this.state.offSeries[serie.key],
            },
        });
        if (this.props.onItemClick) {
            this.props.onItemClick(serie);
        }
    };

    private renderIcon(serie: Serie, inactive: boolean = false) {
        const halfSize = ICON_SIZE / 2;
        const sixthSize = ICON_SIZE / 6;
        const thirdSize = ICON_SIZE / 3;
        const color = serie.color;
        if (!serie.legendIconType) {
            if (serie.type === 'line') {
                // show line as the legend icon
                return inactive ? (
                    <path
                        strokeWidth={4}
                        fill="none"
                        stroke={'#9e9e9e'}
                        d={`M0,${halfSize}h${thirdSize}
                                A${sixthSize},${sixthSize},0,1,1,${2 *
                            thirdSize},${halfSize}
                                H${ICON_SIZE}M${2 * thirdSize},${halfSize}
                                A${sixthSize},${sixthSize},0,1,1,${thirdSize},${halfSize}`}
                        className="recharts-legend-icon"
                    />
                ) : (
                    <path
                        strokeWidth={4}
                        fill="none"
                        stroke={color}
                        d={`M0,${halfSize}h${thirdSize}
                                A${sixthSize},${sixthSize},0,1,1,${2 *
                            thirdSize},${halfSize}
                                H${ICON_SIZE}M${2 * thirdSize},${halfSize}
                                A${sixthSize},${sixthSize},0,1,1,${thirdSize},${halfSize}`}
                        className="recharts-legend-icon"
                    />
                );
            } else {
                // for area, bar show rect legend
                return inactive ? (
                    <path
                        strokeWidth={4}
                        stroke={color}
                        fill="none"
                        d={`M0,${sixthSize}h${ICON_SIZE}v${halfSize}h${-ICON_SIZE}z`}
                        className="recharts-legend-icon"
                    />
                ) : (
                    <path
                        stroke="none"
                        fill={color}
                        d={`M0,${sixthSize}h${ICON_SIZE}v${halfSize}h${-ICON_SIZE}z`}
                        className="recharts-legend-icon"
                    />
                );
            }
        }

        return inactive ? (
            <Symbols
                fill="none"
                strokeWidth={4}
                stroke={color}
                cx={halfSize}
                cy={halfSize}
                size={ICON_SIZE - 10}
                sizeType="diameter"
                type={serie.legendIconType || 'circle'}
            />
        ) : (
            <Symbols
                fill={color}
                cx={halfSize}
                cy={halfSize}
                size={ICON_SIZE - 10}
                sizeType="diameter"
                type={serie.legendIconType || 'circle'}
            />
        );
    }
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
        onLegendClick: (options) => void;
    },
    {
        loadingDataSource: boolean;
        data: any[];
        offSeries: any;
    }
> {
    private _mounted = false;

    public constructor(props) {
        super(props);
        this.state = {
            loadingDataSource: false,
            data: this.props.data,
            offSeries: {},
        };
    }

    public componentDidMount() {
        this._mounted = true;
        if (this.props.dataSource) {
            const promise =
                typeof this.props.dataSource === 'object'
                    ? this.props.dataSource
                    : this.props.dataSource();
            this.setState({
                loadingDataSource: true,
            });
            promise
                .then(result => {
                    this._mounted &&
                        this.setState({
                            data: result,
                            loadingDataSource: false,
                        });
                })
                .catch(error => {
                    this._mounted &&
                        this.setState({
                            loadingDataSource: false,
                        });
                    if (this.props.onDataSourceError) {
                        this.props.onDataSourceError(error);
                    }
                });
        }
    }

    public componentWillUnmount() {
        this._mounted = false;
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
                            iconType={this.props.legendItemIconType || 'square'}
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
                                    case 'area':
                                        return (
                                            <Area
                                                key={index}
                                                type={
                                                    serie.visualizationType ||
                                                    'monotone'
                                                }
                                                dataKey={serie.key}
                                                fill={serie.color}
                                                stroke={serie.color}
                                            />
                                        );

                                    case 'bar':
                                        return (
                                            <Bar
                                                key={index}
                                                dataKey={serie.key}
                                                barSize={serie.width || 20}
                                                fill={serie.color}
                                            />
                                        );

                                    case 'line':
                                    default:
                                        return (
                                            <Line
                                                key={index}
                                                type={
                                                    serie.visualizationType ||
                                                    'monotone'
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
                        style={{ height, width: '100%' }}
                    >
                        <CircularProgress disableShrink={true} />
                    </div>
                )}
            </div>
        );
    }

    private onLegendClick = p => {
        if (this.props.onLegendClick) {
            this.props.onLegendClick(p);
        }
    };

    private onLegentItemClick = serie => {
        const dataKey = serie.key;
        this.setState({
            offSeries: {
                ...this.state.offSeries,
                [dataKey]: !this.state.offSeries[dataKey],
            },
        });
    };
}

export default withStyles(styles)(Chart);
