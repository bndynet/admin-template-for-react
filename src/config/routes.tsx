import * as React from 'react';
import { Redirect } from 'react-router';
import { isAuthorized, getAuthUri } from 'app/service/auth';
import { Home, NotFound } from 'app/pages/public';
import { Admin } from 'app/pages/admin';
import { Login, Logout, Callback } from 'app/pages/auth';
import utils from 'app/helpers/utils';

const routes = [
    {
        path: utils.link(),
        exact: true,
        component: Home,
    },
    {
        path: utils.link('login'),
        component: Login,
    },
    {
        path: utils.link('logout'),
        component: Logout,
    },
    {
        path: utils.link('auth/callback'),
        component: Callback,
    },
    {
        path: utils.link('admin'),
        // `render()` method support in react-router-config v5.0
        /* eslint-disable */
        render: () => {
            if (isAuthorized()) {
                return <Admin />;
            } else {
                if (
                    !getAuthUri()
                        .toLowerCase()
                        .startsWith('http')
                ) {
                    return <Redirect to={getAuthUri()} />;
                }
            }
            location.href = getAuthUri();
            return null;
        },
    },
    {
        component: NotFound,
    },
];

export default routes;
