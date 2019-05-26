import { Dashboard, Markdown, DataTableExample } from 'app/pages/admin';
import { NotFound } from 'app/pages/public';

const routes = [
    {
        path: '/admin',
        exact: true,
        component: Dashboard,
    },
    {
        path: '/admin/dashboard',
        exact: true,
        component: Dashboard,
    },
    {
        path: '/admin/markdown',
        exact: true,
        component: Markdown,
    },
    {
        path: '/admin/examples/datatable',
        exact: true,
        component: DataTableExample,
    },
    {
        component: NotFound,
    },
];

export default routes;
