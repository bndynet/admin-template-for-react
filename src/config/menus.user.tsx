import { MenuItem } from 'app/types';
import utils from 'app/helpers/utils';

const menus: MenuItem[] = [
    {
        icon: 'fas fa-user-cog',
        text: 'Settings',
        link: utils.link('settings'),
    },
    {
        icon: 'fas fa-sign-out-alt',
        text: 'Log out',
        link: utils.link('logout'),
    },
];

export default menus;
