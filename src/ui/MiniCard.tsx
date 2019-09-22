import * as React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import {
    Paper,
    Theme,
    createStyles,
    withStyles,
    Typography,
} from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { variantColor } from '../theme';

const miniCardStyles = (theme: Theme) =>
    createStyles({
        ...variantColor(theme),
        root: {
            position: 'relative',
            color:
                theme.palette.type === 'light'
                    ? ''
                    : theme.palette.text.primary,
            '&:hover $icon': {
                transform: 'scale(4)',
            },
        },
        body: {
            padding: `${theme.spacing()}px ${theme.spacing(
                1.5,
            )}px ${theme.spacing(2)}px ${theme.spacing(1.5)}px`,
        },
        icon: {
            position: 'absolute',
            top: theme.spacing(),
            right: theme.spacing(),
            opacity: 0.3,
            transform: 'scale(3.5)',
            transformOrigin: 'top right',
            transition: 'all .2s ease-in-out',
        },
        linkContainer: {
            display: 'flex',
            backgroundColor: fade(theme.palette.common.black, 0.1),
            borderBottomLeftRadius: 4,
            borderBottomRightRadius: 4,
            overflow: 'hidden',
            '& > *': {
                flex: 1,
                display: 'block',
                textAlign: 'center',
                paddingTop: theme.spacing() / 4,
                paddingBottom: theme.spacing() / 4,
                opacity: 0.8,
                '&:hover': {
                    backgroundColor: fade(theme.palette.common.black, 0.2),
                    opacity: 1,
                },
            },
        },
    });

class MiniCard extends React.Component<
    {
        classes: any;
        className?: string;
        title: string;
        description: string;
        icon: any;
        variant?: string;
        links: { [key: string]: string };
    },
    {}
> {
    public constructor(props) {
        super(props);
    }

    public render() {
        const {
            classes,
            className,
            icon,
            title,
            description,
            links,
        } = this.props;
        const linkEls = [];
        if (links) {
            for (const key of Object.keys(links)) {
                linkEls.push(this.getLink(key, links[key]));
            }
        }
        return (
            <Paper
                className={classNames(
                    classes.root,
                    classes[this.props.variant],
                    className,
                )}
            >
                <div className={classes.body}>
                    <Typography color="inherit" variant="h4" component="h4">
                        {title}
                    </Typography>
                    <Typography color="inherit" variant="caption">
                        {description}
                    </Typography>
                </div>
                <div className={classes.icon}>{icon}</div>
                <Typography
                    className={classes.linkContainer}
                    color="inherit"
                    variant="caption"
                    component="div"
                >
                    {linkEls}
                </Typography>
            </Paper>
        );
    }

    private getLink(text: string, url?: string): JSX.Element {
        if (url) {
            if (url.indexOf('://') > 0) {
                return (
                    <Typography color="inherit" variant="caption" key={text}>
                        <a href={url} target="_blank" rel="noopener noreferrer">
                            {' '}
                            {text}{' '}
                        </a>
                    </Typography>
                );
            } else {
                return (
                    <Link color="default" key={text} to={url}>
                        <Typography color="inherit" variant="caption">
                            {text}
                        </Typography>
                    </Link>
                );
            }
        } else {
            return (
                <Typography color="inherit" variant="caption" key={text}>
                    {text}
                </Typography>
            );
        }
    }
}

export default withStyles(miniCardStyles)(MiniCard);
