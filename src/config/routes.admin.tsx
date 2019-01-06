import { Dashboard, Markdown } from '../components/pages/admin';

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
];

export default routes;
