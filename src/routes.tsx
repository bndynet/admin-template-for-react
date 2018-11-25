import HomeComponent from './app/home/HomeComponent';
import CallbackComponent from './app/auth/CallbackComponent';
import LoginComponent from './app/auth/LoginComponent';
import LogoutComponent from './app/auth/LogoutComponent';
import AdminComponent from './app/admin/AdminComponent';

const routes = [
    {
        path: '/',
        exact: true,
        component: HomeComponent
    },
    {
        path: '/login',
        component: LoginComponent
    },
    {
        path: '/logout',
        component: LogoutComponent
    },
    {
        path: '/callback',
        component: CallbackComponent
    },
    {
        path: '/admin',
        component: AdminComponent
    }
];

export default routes;
