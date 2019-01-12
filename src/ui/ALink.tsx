import * as React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

export default class ALink extends Link {
    public render() {
        let result;
        const { to, ...others } = this.props;
        const isExternalLink = this.props.to
            .toString()
            .toLowerCase()
            .startsWith("http");
        if (isExternalLink) {
            result = (
                <a href={to as string} {...others}>
                    <Typography color="inherit" component="span">
                        {this.props.children}
                    </Typography>
                </a>
            );
        } else {
            result = (
                <Link {...this.props}>
                    <Typography color="inherit">
                        {this.props.children}
                    </Typography>
                </Link>
            );
        }
        return result;
    }
}
