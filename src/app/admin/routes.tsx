import DashboardComponent from './dashboard/DashboardComponent';
import MarkdownComponent from './markdown/MarkdownComponent';
const routes = [
    {
        path: '/admin',
        exact: true,
        component: DashboardComponent,
    },
    {
        path: '/admin/dashboard',
        exact: true,
        component: DashboardComponent,
    },
    {
        path: '/admin/markdown',
        exact: true,
        component: MarkdownComponent,
    },
];

export default routes;
