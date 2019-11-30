import { Dashboard, Markdown, DataTableExample } from 'app/pages/admin';
import { NotFound } from 'app/pages/public';
import utils from 'app/helpers/utils';

const routes = [
    {
        path: utils.link('admin'),
        exact: true,
        component: Dashboard,
    },
    {
        path: utils.link('admin/dashboard'),
        exact: true,
        component: Dashboard,
    },
    {
        path: utils.link('admin/markdown'),
        exact: true,
        component: Markdown,
    },
    {
        path: utils.link('admin/examples/datatable'),
        exact: true,
        component: DataTableExample,
    },
    {
        component: NotFound,
    },
];

export default routes;
