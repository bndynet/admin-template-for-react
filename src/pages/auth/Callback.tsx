import * as React from 'react';

import { Alert } from 'app/ui';
import { Url } from 'app/helpers/url';
import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import {
    actions as authActions,
    getAccessTokenUri,
    TokenInfo,
    getValidState,
} from '../../service/auth';
import { Ajax } from 'app/helpers/ajax';

const KEY_CODE = 'code';
const KEY_STATE = 'state';
const KEY_TOKEN = 'access_token';
const KEY_ERROR = 'error_description';

class CallbackComponent extends React.Component<{
    onAuthSuccess: (tokenInfo: TokenInfo) => void;
    push: (path: string) => void;
}> {
    private error: any;

    public constructor(props) {
        super(props);
        const currentUrl = Url.current();
        if (currentUrl.queries[KEY_CODE]) {
            // validate the state
            const state = currentUrl.queries[KEY_STATE] as string;
            if (state === getValidState()) {
                const code = currentUrl.queries[KEY_CODE] as string;
                const ajax = new Ajax().post(getAccessTokenUri(code), null);
                ajax.then((tokenInfo: any) => {
                    this.props.onAuthSuccess(tokenInfo);
                    this.props.push('/admin');
                });
            } else {
                this.error = 'Invalid state from server.';
            }
        } else if (currentUrl.queries[KEY_TOKEN]) {
            this.props.onAuthSuccess({
                /* eslint-disable-next-line @typescript-eslint/camelcase */
                access_token: currentUrl.queries[KEY_TOKEN] as string,
            });
        } else {
            this.error = currentUrl.queries[KEY_ERROR];
            if (!this.error) {
                this.error = (
                    <p>
                        Invalid request.{' '}
                        <a
                            className={'clickable'}
                            onClick={() => (location.href = '/')}
                        >
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
                <Alert
                    title={this.error ? 'Oops...' : 'Authorizing...'}
                    message={
                        this.error ||
                        'Application is obtaining authorization from 3rd-party application, please waiting...'
                    }
                    variant={this.error ? 'error' : 'info'}
                />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    onAuthSuccess: (tokenInfo: TokenInfo) => {
        dispatch(authActions.authSuccess(tokenInfo));
    },
    push: (path: string) => {
        dispatch(push(path));
    },
});

export default connect(
    null,
    mapDispatchToProps,
)(CallbackComponent);
