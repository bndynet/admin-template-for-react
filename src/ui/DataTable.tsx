import * as React from "react";
import _merge from "lodash-es/merge";
import MUIDataTable from "mui-datatables";
import { injectIntl, InjectedIntl } from "react-intl";
import { createStyles, Theme, withStyles } from "@material-ui/core";

export type SortDirection = "asc" | "desc";
export interface DataTableColumn {
    key: string;
    title: string;
    filter?: boolean;
    filterType?: "checkbox" | "dropdown" | "multiselect" | "textField";
    sort?: boolean;
    sortDirection?: SortDirection;
    searchable?: boolean;
    displayInPrint?: boolean;
    displayInDownloadCsv?: boolean;
}

export interface DataTablePageMeta {
    page: number;
    count: number;
    data: any[];
}

export interface DataTableOptions {
    sort?: boolean;
    filter?: boolean;
    search?: boolean;
    print?: boolean;
    download?: boolean;
    viewColumns?: boolean;
    selectableRows?: "multiple" | "single" | "none";
}

export interface MuiDataTableState {
    announceText?: string;
    page: number;
    rowsPerPage: number;
    filterList: any[];
    selectedRows: {
        data: any[];
        lookup: object;
    };
    showResponsive: boolean;
    searchText?: string;
}

export interface DataTableRequestParameters {
    sort?: string;
    sortDirection?: SortDirection;
    page?: number;
    pageSize?: number;
    searchText?: string;
}

export interface DataTableProps {
    classes: any;
    intl: InjectedIntl;
    data?: any[];
    columns?: DataTableColumn[];
    options?: DataTableOptions | any;
    className?: string;
    title?: string;
    rowsPerPageOptions?: number[];
    pagination?: boolean;
    scrollable?: boolean;
    onRowClick?: (rowData: any, dataIndex: number) => void;
    dataPromise?: (parameters?: DataTableRequestParameters) => Promise<DataTablePageMeta>;
}

export interface DataTableState extends DataTableRequestParameters {
    isLoading: boolean;
    data?: any[];
    recordCount?: number;
}

const styles = (theme: Theme) => createStyles({});

class DataTable extends React.Component<DataTableProps, DataTableState> {
    private data: any[];
    private columns: any[];
    private searchDelayTimer: NodeJS.Timeout;

    constructor(props: Readonly<DataTableProps>) {
        super(props);
        this.state = {
            page: 1,
            isLoading: false,
        };
    }

    public componentDidMount() {
        this.getData();
    }

    public componentWillUnmount() {
        if (this.searchDelayTimer) {
            clearTimeout(this.searchDelayTimer);
        }
    }

    public render() {
        this.data = this.props.data || this.state.data;
        const { classes, className, intl, title, options } = this.props;
        const { isLoading } = this.state;
        const defaultOptions = {
            filterType: "dropdown",
            responsive: "scroll",
            textLabels: {
                body: {
                    noMatch: isLoading ? intl.formatMessage({ id: "loadingData" }) : intl.formatMessage({ id: "noData" }),
                },
                filter: {
                    all: intl.formatMessage({ id: "all" }),
                    title: intl.formatMessage({ id: "filters" }),
                    reset: intl.formatMessage({ id: "reset" }),
                },
                selectedRows: {
                    text: intl.formatMessage({ id: "itemsSelected" }),
                    delete: intl.formatMessage({ id: "delete" }),
                    deleteAria: intl.formatMessage({ id: "delete" }),
                },
                pagination: {
                    next: intl.formatMessage({ id: "nextPage" }),
                    previous: intl.formatMessage({ id: "previousPage" }),
                    rowsPerPage: intl.formatMessage({ id: "rowsPerPage" }),
                    displayRows: intl.formatMessage({ id: "of" }),
                },
                toolbar: {
                    search: intl.formatMessage({ id: "search" }),
                    downloadCsv: intl.formatMessage({ id: "downloadCsv" }),
                    print: intl.formatMessage({ id: "print" }),
                    viewColumns: intl.formatMessage({ id: "viewColumns" }),
                    filterTable: intl.formatMessage({ id: "filter" }),
                },
                viewColumns: {
                    title: intl.formatMessage({ id: "viewColumns" }),
                    titleAria: intl.formatMessage({ id: "toggleColumns" }),
                },
            },
        };

        if (!this.props.columns) {
            this.generateColumnsFromData();
        } else {
            this.generateColumnsFromProps();
        }

        if (this.state.sort) {
            this.columns.forEach(column => {
                if (column.label === this.state.sort) {
                    column.options.sortDirection = this.state.sortDirection || "asc";
                }
            });
        }

        const finalOptions = _merge(defaultOptions, options, {
            responsive: this.props.scrollable ? "scroll" : "stacked",
            pagination: this.props.pagination,
            count: this.state.recordCount,
            page: this.state.page - 1,
            rowsPerPage: this.state.pageSize,
            rowsPerPageOptions: this.props.rowsPerPageOptions,
            onRowClick: (rowData: string[], rowMeta: { dataIndex: number; rowIndex: number }) => {
                if (this.props.onRowClick) {
                    this.props.onRowClick(this.data[rowMeta.dataIndex], rowMeta.dataIndex);
                }
            },
            onSearchChange: (searchText: string) => {
                if (this.searchDelayTimer) {
                    clearTimeout(this.searchDelayTimer);
                }
                this.searchDelayTimer = setTimeout(() => {
                    this.setState(
                        {
                            page: 1,
                            searchText,
                        },
                        () => {
                            this.getData();
                        },
                    );
                }, 1000);
            },
            onSearchClose: () => {
                this.setState(
                    {
                        page: 1,
                        searchText: null,
                    },
                    () => {
                        this.getData();
                    },
                );
            },
            onColumnSortChange: (column: string, direction: string) => {
                let sortDirection: SortDirection = "asc";
                if (column === this.state.sort && this.state.sortDirection === "asc") {
                    sortDirection = "desc";
                }
                const changedState = this.props.dataPromise
                    ? {
                          page: 1,
                          sort: column,
                          sortDirection,
                      }
                    : {
                          sort: column,
                          sortDirection,
                      };
                this.setState(changedState, () => {
                    this.getData();
                });
            },
            onTableChange: (action: string, tableState: MuiDataTableState) => {
                switch (action) {
                    case "changePage":
                        this.setState(
                            {
                                page: tableState.page + 1,
                            },
                            () => {
                                this.getData();
                            },
                        );
                        break;
                    case "changeRowsPerPage":
                        this.setState(
                            {
                                page: 1,
                                pageSize: tableState.rowsPerPage,
                            },
                            () => {
                                this.getData();
                            },
                        );
                        break;
                }
            },
        });

        if (this.props.dataPromise) {
            finalOptions.serverSide = true;
        }

        return <MUIDataTable title={title} data={this.data} columns={this.columns} options={finalOptions} />;
    }

    private getData() {
        if (this.props.dataPromise) {
            this.setState({
                isLoading: true,
                data: [],
            });
            this.props.dataPromise(this.state).then((result: DataTablePageMeta) => {
                const totalPages = Math.ceil(result.count / this.state.pageSize);
                this.setState({
                    isLoading: false,
                    data: result.data,
                    recordCount: result.count,
                    page: result.page > totalPages ? totalPages : result.page,
                });
            });
        }
    }

    private generateColumnsFromProps() {
        this.columns = [];
        this.props.columns.forEach(column => {
            this.columns.push({
                name: column.title,
                label: column.key,
                options: {
                    filter: column.filter,
                    filterType: column.filterType,
                    sort: column.sort,
                    sortDirection: column.sortDirection,
                    print: column.displayInPrint,
                    download: column.displayInDownloadCsv,
                    searchable: column.searchable,
                },
            });
        });
    }

    private generateColumnsFromData() {
        const { intl } = this.props;
        if (this.data && this.data.length > 0) {
            if (Array.isArray(this.data[0])) {
                this.columns = this.data[0];
                this.data = this.data.slice(1);
            } else {
                this.columns = [];
                for (const key of Object.keys(this.data[0])) {
                    this.columns.push({
                        name: intl.formatMessage({ id: key }),
                        label: key,
                        options: {
                            filter: true,
                            sort: true,
                        },
                    });
                }
            }
        }
    }
}

export default withStyles(styles)(injectIntl(DataTable));
