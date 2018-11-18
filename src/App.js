import React from 'react';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter as Router, Link } from 'react-router-dom'

import routes from './routes';

class App extends React.Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    return (
      <Router>
        <main>
          {renderRoutes(routes)}
        </main>
      </Router>
    );
  }
}

export default App;