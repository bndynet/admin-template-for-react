import * as React from "react";
import _merge from "lodash-es/merge";
import MUIDataTable from "mui-datatables";
import { injectIntl, InjectedIntl } from "react-intl";
import { createStyles, Theme, withStyles } from "@material-ui/core";

export interface DataTableColumn {
    key: string;
    title: string;
    filter?: boolean;
    sort?: boolean;
}

const styles = (theme: Theme) => createStyles({});

class DataTable extends React.Component<{ classes: any; intl: InjectedIntl; data: any[]; columns?: DataTableColumn[]; options?: any; className?: string; title?: string }> {
    public render() {
        const { classes, className, intl, title, data, columns, options } = this.props;
        const defaultOptions = {
            filterType: "dropdown",
            responsive: "scroll",
            textLabels: {
                body: {
                    noMatch: intl.formatMessage({ id: "noData" }),
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

        let finalColumns: any[] = [];
        if (!columns) {
            if (data.length > 0) {
                if (Array.isArray(data[0])) {
                    for (let index = 0; index < data[0].length; index++) {
                        finalColumns.push(intl.formatMessage({ id: "column" }) + " " + (index + 1));
                    }
                } else {
                    for (const key of Object.keys(data[0])) {
                        finalColumns.push({
                            name: key,
                            label: key,
                            options: {
                                filter: true,
                                sort: true,
                            },
                        });
                    }
                }
            }
        } else {
            finalColumns = columns;
            columns.forEach(column => {
                finalColumns.push({
                    name: column.title,
                    label: column.key,
                    options: {
                        filter: column.filter,
                        sort: column.sort,
                    },
                });
            });
        }

        const finalOptions = _merge(defaultOptions, options);

        return <MUIDataTable title={title} data={data} columns={finalColumns} options={finalOptions} />;
    }
}

export default injectIntl(withStyles(styles)(DataTable));
