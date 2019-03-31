import * as React from "react";
// tslint:disable-next-line:no-implicit-dependencies
import { Redirect } from "react-router";
import Home from "../components/pages/Home";
import Callback from "../components/pages/auth/Callback";
import Login from "../components/pages/auth/Login";
import Logout from "../components/pages/auth/Logout";
import Admin from "../components/layout/Admin";
import PageNotFound from "../components/pages/PageNotFound";
import { isAuthorized } from "app/service/auth";

const routes = [
    {
        path: "/",
        exact: true,
        component: Home,
    },
    {
        path: "/login",
        component: Login,
    },
    {
        path: "/logout",
        component: Logout,
    },
    {
        path: "/callback",
        component: Callback,
    },
    {
        path: "/admin",
        // `render()` method support in react-router-config v5.0
        render: () => (isAuthorized() ? <Admin /> : <Redirect to="/login" />),
    },
    {
        component: PageNotFound,
    },
];

export default routes;
