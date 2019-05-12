import { Dashboard, Markdown, DataTableExample } from "../components/pages/admin";
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
        path: "/admin/examples/datatable",
        exact: true,
        component: DataTableExample,
    },
    {
        component: PageNotFound,
    },
];

export default routes;
