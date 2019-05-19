import * as React from 'react';
import classNames from 'classnames';
import { Button, createStyles, withStyles } from '@material-ui/core';
import { ButtonProps } from '@material-ui/core/Button';
import ALink from './ALink';

interface LinkButtonProps extends ButtonProps {
    to: string;
    classes: any;
    contentAlign?: 'left' | 'center' | 'right';
    square?: boolean;
}

const styles = () =>
    createStyles({
        root: {
            width: '100%',
        },
        rootSquare: {
            borderRadius: 0,
        },
        labelLeft: {
            justifyContent: 'left',
        },
        labelRight: {
            justifyContent: 'right',
        },
    });

class LinkButton extends React.Component<LinkButtonProps, {}> {
    public render() {
        const { classes, to, contentAlign, square, ...others } = this.props;
        return (
            <Button
                className={classNames(square && classes.rootSquare)}
                classes={{
                    label: classNames(
                        contentAlign === 'left' && classes.labelLeft,
                        contentAlign === 'right' && classes.labelRight,
                    ),
                }}
                {...others}
            >
                <ALink to={to}>{this.props.children}</ALink>
            </Button>
        );
    }
}

export default withStyles(styles)(LinkButton);
