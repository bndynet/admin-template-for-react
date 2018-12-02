import * as React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';

export class ALink extends Link {
    render() {
        let result;
        const { to, ...others} = this.props;
        const isExternalLink = this.props.to.toString().toLowerCase().startsWith('http');
        if (isExternalLink) {
            result = (
                <a href={to as string} {...others}>
                    <Typography component='span'>{this.props.children}</Typography>
                </a>
            );
        } else {
            result = (
                <Link {...this.props}>
                    <Typography>{this.props.children}</Typography>
                </Link>
            );
        }
        return result;
    }
}
