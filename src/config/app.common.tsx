import { Config } from ".";
import { AuthState } from "app/service/auth";

const config: Config = {
    defaultLocale: "en",
    resourceBaseUri: "/",
    userConverter: (backendUser: any) => {
        return {
            name: backendUser.name,
            email: backendUser.email,
            // TODO: here to map more backend user informations
        };
    },
    logoutHandler: (url: string, auth: AuthState) => {
        window.location.href = url;
        return;
    },
};

module.exports = config;
