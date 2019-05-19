import * as React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';

export default class ALink extends React.Component<{
    to: string;
}> {
    public constructor(props) {
        super(props);
    }

    public render() {
        let result;
        const { to, ...others } = this.props;
        const isEmptyLink = !this.props.to;
        const isExternalLink =
            this.props.to &&
            this.props.to
                .toString()
                .toLowerCase()
                .startsWith('http');
        if (isEmptyLink) {
            result = (
                <a {...others}>
                    <Typography color="inherit" component="span">
                        {this.props.children}
                    </Typography>
                </a>
            );
        } else if (isExternalLink) {
            result = (
                <a href={to as string} {...others}>
                    <Typography color="inherit" component="span">
                        {this.props.children}
                    </Typography>
                </a>
            );
        } else {
            result = (
                <Link to={to} {...others}>
                    <Typography color="inherit">
                        {this.props.children}
                    </Typography>
                </Link>
            );
        }
        return result;
    }
}
