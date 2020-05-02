import * as React from 'react';
import { Redirect } from 'react-router';
import { isAuthorized, getAuthUri } from 'app/service/auth';
import { Home, NotFound } from 'app/pages/public';
import { Admin } from 'app/pages/admin';
import { Login, Logout, Callback } from 'app/pages/auth';
import { RouteConfig } from 'react-router-config';

export const routes: RouteConfig[] = [
    {
        path: '/',
        exact: true,
        component: Home,
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/logout',
        component: Logout,
    },
    {
        path: '/auth/callback',
        component: Callback,
    },
    {
        path: '/admin',
        // `render()` method support in react-router-config v5.0
        /* eslint-disable */
        render: () => {
            if (isAuthorized()) {
                return <Admin />;
            } else {
                if (
                    getAuthUri() &&
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
