import { Dashboard, Markdown } from "../components/pages/admin";
import PageNotFound from "../components/pages/PageNotFound";

const routes = [
    {
        path: "/admin",
        exact: true,
        component: Dashboard,
    },
    {
        path: "/admin/dashboard",
        exact: true,
        component: Dashboard,
    },
    {
        path: "/admin/markdown",
        exact: true,
        component: Markdown,
    },
    {
        component: PageNotFound,
    },
];

export default routes;
