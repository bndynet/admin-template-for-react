import DashboardComponent from './dashboard/DashboardComponent';
const routes = [
    {
        path: '/admin',
        exact: true,
        component: DashboardComponent
    },
    {
        path: '/admin/dashboard',
        exact: true,
        component: DashboardComponent
    },
];

export default routes;