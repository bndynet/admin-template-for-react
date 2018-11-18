import Home from './components/Home';
import Callback from './components/Callback';
import Login from './components/Login';

const routes = [
    {
        path: '/',
        exact: true,
        component: Login,
    },
    { 
        path: '/home',
        exact: true,
        component: Home,
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/callback',
        component: Callback,
    }
];

export default routes;