import Home from '../components/pages/Home';
import Callback from '../components/pages/auth/Callback';
import Login from '../components/pages/auth/Login';
import Logout from '../components/pages/auth/Logout';
import Admin from '../components/layout/Admin';

const routes = [
    {
        path: '/',
        exact: true,
        component: Home,
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/logout',
        component: Logout,
    },
    {
        path: '/callback',
        component: Callback,
    },
    {
        path: '/admin',
        component: Admin,
    },
];

export default routes;
