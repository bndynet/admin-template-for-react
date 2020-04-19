import { createBrowserHistory } from 'history';

// tell eslint below is global variables
// or declare them in globals section of eslint config file.
/* global APP_BASEHREF */
export default createBrowserHistory({
    basename: APP_BASEHREF,
});
