import HomeComponent from './app/home/HomeComponent';
import CallbackComponent from './app/user/CallbackComponent';
import LoginComponent from './app/user/LoginComponent';
import LogoutComponent from './app/user/LogoutComponent';

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
