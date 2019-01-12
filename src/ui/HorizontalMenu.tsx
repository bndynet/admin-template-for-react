import * as React from "react";
import classNames from "classnames";
import {
    Theme,
    createStyles,
    withStyles,
    List,
    Collapse,
} from "@material-ui/core";
import { LinkButton } from "app/ui";
import { MenuItem } from "app/types";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            flex: 1,
            display: "flex",
        },
        menuItem: {
            color: theme.palette.common.white,
            fontSize: "1.5em",
        },
        text: {
            display: "inline-block",
            marginLeft: theme.spacing.unit / 2,
        },
    });

class HorizontalMenu extends React.Component<
    { classes: any; data: MenuItem[] },
    {}
> {
    constructor(props) {
        super(props);
    }

    public render() {
        const { classes, data } = this.props;
        return (
            <div className={classes.root}>
                {data &&
                    data.map(item => (
                        <LinkButton
                            key={item.text}
                            to={item.link}
                            className={classes.menuItem}
                            color="inherit"
                        >
                            {typeof item.icon !== "string" ? (
                                item.icon
                            ) : (
                                <i className={item.icon} />
                            )}
                            <span className={classes.text}>{item.text}</span>
                        </LinkButton>
                    ))}
            </div>
        );
    }
}

export default withStyles(styles)(HorizontalMenu);
