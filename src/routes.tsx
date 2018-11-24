import HomeComponent from './app/home/HomeComponent';
import CallbackComponent from './app/auth/CallbackComponent';
import LoginComponent from './app/auth/LoginComponent';
import LogoutComponent from './app/auth/LogoutComponent';

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
    }
];

export default routes;
