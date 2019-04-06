import * as React from "react";
import classNames from "classnames";

import { Alert } from "app/ui";
import { Url } from "app/helpers/url";
import { Dispatch, Action } from "redux";
import { connect } from "react-redux";

import { actions as authActions } from "../../../service/auth";

const KEY_TOKEN = "access_token";
const KEY_ERROR = "error_description";

class CallbackComponent extends React.Component<{
    onAuthSuccess: (token: string) => void;
}> {
    private error: any;

    constructor(props) {
        super(props);
        const currentUrl = Url.current();
        if (currentUrl.queries[KEY_TOKEN]) {
            this.props.onAuthSuccess(currentUrl.queries[KEY_TOKEN] as string);
        } else {
            this.error = currentUrl.queries[KEY_ERROR];
            if (!this.error) {
                this.error = (
                    <p>
                        Invalid request.{" "}
                        <a className={"clickable"} onClick={() => (location.href = "/")}>
                            Click here to go home.
                        </a>
                    </p>
                );
            }
        }
    }

    public render() {
        return (
            <div className="screen-center text-left">
                <Alert title={this.error ? "Oops..." : "Authorizing..."} message={this.error || "Application is obtaining authorization from 3rd-party application, please waiting..."} variant={this.error ? "error" : "info"} />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    onAuthSuccess: (token: string) => {
        dispatch(authActions.authSuccess(token));
    },
});

export default connect(
    null,
    mapDispatchToProps,
)(CallbackComponent);
