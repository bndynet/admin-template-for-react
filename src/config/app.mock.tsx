import { Config, AuthType } from ".";

const config: Config = {
    authType: AuthType.Mock,
    userConverter: (mockUser: any) => {
        return {
            id: "-1",
            name: mockUser.username,
            email: "zb@bndy.net",
        };
    },
};

module.exports = config;
