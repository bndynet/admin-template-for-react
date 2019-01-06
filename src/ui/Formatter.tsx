import * as React from "react";
import { Typography, Tooltip } from "@material-ui/core";
import {
    FormattedMessage,
    FormattedNumber,
    FormattedDate,
    FormattedTime,
    FormattedRelative,
} from "react-intl";

type FormatterFormatAs = "string" | "number" | "date" | "time" | "fromNow";

export default class Formatter extends React.Component<{
    i18nKey?: string;
    description?: string;
    descriptionPlacement?: string;
    defaultMessage?: string;
    value?: any;
    formatAs?: FormatterFormatAs;
    format?: string;
}> {
    public render() {
        let tooltipPlacement = this.props.descriptionPlacement as "top";
        if (!tooltipPlacement) {
            tooltipPlacement = "top";
        }
        const text = (
            <Typography style={{ display: "inline" }} component="span">
                {this.getItem()}
            </Typography>
        );
        return this.props.description ? (
            <Tooltip
                title={this.props.description}
                placement={tooltipPlacement}
            >
                {text}
            </Tooltip>
        ) : (
            text
        );
    }

    private getItem() {
        const key = this.props.i18nKey;
        let formatAs = this.props.formatAs;
        if (this.props.i18nKey) {
            formatAs = "string";
        }
        if (!formatAs && this.props.value) {
            if (typeof this.props.value === "string") {
                formatAs = "string";
            } else if (typeof this.props.value === "number") {
                formatAs = "number";
            }
        }
        switch (formatAs) {
            case "string":
                return (
                    <FormattedMessage
                        id={key}
                        description={this.props.description}
                        defaultMessage={this.props.defaultMessage}
                        values={this.props.value}
                    />
                );

            case "number":
                return <FormattedNumber value={this.props.value} />;

            case "date":
                const dateValue =
                    typeof this.props.value === "number"
                        ? new Date(this.props.value)
                        : this.props.value;
                return (
                    <FormattedDate
                        value={dateValue}
                        format={this.props.format}
                    />
                );

            case "time":
                const timeValue =
                    typeof this.props.value === "number"
                        ? new Date(this.props.value)
                        : this.props.value;
                return (
                    <FormattedTime
                        value={timeValue}
                        format={this.props.format}
                    />
                );

            case "fromNow":
                const fromNowValue =
                    typeof this.props.value === "number"
                        ? new Date(this.props.value)
                        : this.props.value;
                return <FormattedRelative value={fromNowValue} />;

            default:
                const msg = `! Can not obtain format type, you can set it mannually using <I18n formatAs="..." />`;
                return <span>{msg}</span>;
        }
    }
}
