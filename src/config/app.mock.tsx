import { Config, AuthType } from './types';

export const config: Config = {
    authType: AuthType.Mock,
    userConverter: (mockUser: any) => {
        return {
            id: '-1',
            name: mockUser.username,
            email: 'zb@bndy.net',
            avatar: 'https://static.bndy.net/images/logo.png',
        };
    },
};
