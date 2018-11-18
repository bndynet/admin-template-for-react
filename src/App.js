import React from 'react';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter as Router, Link } from 'react-router-dom'

import routes from './routes';

class App extends React.Component {
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