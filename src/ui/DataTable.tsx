import * as React from 'react';
import * as intl from 'react-intl-universal';
import _merge from 'lodash-es/merge';
import MUIDataTable from 'mui-datatables';
import { createStyles, withStyles } from '@material-ui/core';

export type SortDirection = 'asc' | 'desc';
export interface DataTableColumn {
    key: string;
    title: string;
    hint?: string;
    filter?: boolean;
    filterType?: 'checkbox' | 'dropdown' | 'multiselect' | 'textField';
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
    selectableRows?: 'multiple' | 'single' | 'none';
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
    data?: any[];
    columns?: DataTableColumn[];
    options?: DataTableOptions | any;
    className?: string;
    title?: string;
    rowsPerPageOptions?: number[];
    pagination?: boolean;
    scrollable?: boolean;
    selectable?: 'multiple' | 'single' | 'none' | boolean;
    localePrefix?: string;
    onRowClick?: (rowData: any, dataIndex: number) => void;
    onRowsDelete?: (rowsData: any[]) => Promise<any>;
    dataPromise?: (
        parameters?: DataTableRequestParameters,
    ) => Promise<DataTablePageMeta>;
}

export interface DataTableState extends DataTableRequestParameters {
    isLoading: boolean;
    data?: any[];
    recordCount?: number;
}

const styles = () => createStyles({});

class DataTableComponent extends React.Component<
    DataTableProps,
    DataTableState
> {
    private data: any[];
    private columns: any[];
    private searchDelayTimer: any;
    private rowsPerPageOptions: number[];
    private defaultRowsPerPageOptions: number[] = [10, 20, 50];

    public constructor(props: Readonly<DataTableProps>) {
        super(props);
        this.rowsPerPageOptions =
            this.props.rowsPerPageOptions || this.defaultRowsPerPageOptions;
        this.state = {
            page: 1,
            isLoading: false,
            recordCount: 0,
            pageSize: this.rowsPerPageOptions[0],
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
        const { title, options } = this.props;
        const { isLoading } = this.state;
        const defaultOptions = {
            filterType: 'dropdown',
            responsive: 'scroll',
            selectableRows:
                this.props.selectable === true
                    ? 'multiple'
                    : this.props.selectable === false
                    ? 'none'
                    : this.props.selectable,
            textLabels: {
                body: {
                    noMatch: isLoading
                        ? intl.get('loadingData')
                        : intl.get('noData'),
                },
                filter: {
                    all: intl.get('all'),
                    title: intl.get('filters'),
                    reset: intl.get('reset'),
                },
                selectedRows: {
                    text: intl.get('itemsSelected'),
                    delete: intl.get('delete'),
                    deleteAria: intl.get('delete'),
                },
                pagination: {
                    next: intl.get('nextPage'),
                    previous: intl.get('previousPage'),
                    rowsPerPage: intl.get('rowsPerPage'),
                    displayRows: intl.get('of'),
                },
                toolbar: {
                    search: intl.get('search'),
                    downloadCsv: intl.get('downloadCsv'),
                    print: intl.get('print'),
                    viewColumns: intl.get('viewColumns'),
                    filterTable: intl.get('filter'),
                },
                viewColumns: {
                    title: intl.get('viewColumns'),
                    titleAria: intl.get('toggleColumns'),
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
                    column.options.sortDirection =
                        this.state.sortDirection || 'asc';
                }
            });
        }

        const finalOptions = _merge(defaultOptions, options, {
            responsive: this.props.scrollable ? 'scroll' : 'stacked',
            pagination:
                typeof this.props.pagination === 'undefined'
                    ? true
                    : this.props.pagination,
            count: this.state.recordCount,
            page: this.state.page - 1,
            rowsPerPage: this.state.pageSize,
            rowsPerPageOptions: this.rowsPerPageOptions,
            onRowClick: (
                rowData: string[],
                rowMeta: { dataIndex: number; rowIndex: number },
            ) => {
                if (this.props.onRowClick) {
                    this.props.onRowClick(
                        this.data[rowMeta.dataIndex],
                        rowMeta.dataIndex,
                    );
                }
            },
            onRowsDelete: (rowsDeleted: {
                lookup: { [dataIndex: number]: boolean };
                data: { index: number; dataIndex: number }[];
            }) => {
                if (this.props.onRowsDelete) {
                    const needDeleteRows = [];
                    rowsDeleted.data.forEach(item => {
                        needDeleteRows.push(this.data[item.dataIndex]);
                    });
                    this.props.onRowsDelete(needDeleteRows).then(() => {
                        this.getData();
                    });
                    // false to prevent the deletion on UI
                    return false;
                }
                return true;
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
            onChangePage: (currentPage: number) => {
                this.setState(
                    {
                        page: currentPage + 1,
                    },
                    () => {
                        this.getData();
                    },
                );
            },
            onColumnSortChange: (column: string) => {
                let sortDirection: SortDirection = 'asc';
                if (
                    column === this.state.sort &&
                    this.state.sortDirection === 'asc'
                ) {
                    sortDirection = 'desc';
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
                    case 'changeRowsPerPage':
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

        // The `key` attribute for fixing count does not refresh in pagination
        // More info: https://github.com/gregnb/mui-datatables/issues/610
        return (
            <MUIDataTable
                key={this.state.recordCount}
                title={title}
                count={this.state.recordCount}
                data={this.data}
                columns={this.columns}
                options={finalOptions}
            />
        );
    }

    private getData() {
        if (this.props.dataPromise) {
            this.setState({
                isLoading: true,
            });
            this.props
                .dataPromise(this.state)
                .then((result: DataTablePageMeta) => {
                    const totalPages = Math.ceil(
                        result.count / this.state.pageSize,
                    );
                    this.setState({
                        isLoading: false,
                        data: result.data,
                        recordCount: result.count,
                        page:
                            result.page > totalPages ? totalPages : result.page,
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
                hint: column.hint,
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
        if (this.data && this.data.length > 0) {
            if (Array.isArray(this.data[0])) {
                this.columns = this.data[0];
                this.data = this.data.slice(1);
            } else {
                this.columns = [];
                for (const key of Object.keys(this.data[0])) {
                    this.columns.push({
                        name: intl
                            .get(`${this.props.localePrefix || ''}${key}`)
                            .defaultMessage(key),
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

export const DataTable = withStyles(styles)(DataTableComponent);
