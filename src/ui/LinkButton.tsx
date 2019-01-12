import * as React from "react";
import { Button } from "@material-ui/core";
import { ButtonProps } from "@material-ui/core/Button";
import ALink from "./ALink";

interface LinkButtonProps extends ButtonProps {
    to: string;
}

export default class LinkButton extends React.Component<LinkButtonProps, {}> {
    public render() {
        const { className, to } = this.props;
        const elLink = props => <ALink to={to} {...props} />;
        return (
            <Button className={className} component={elLink}>
                {this.props.children}
            </Button>
        );
    }
}
