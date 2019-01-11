import React, { Component } from 'react';
import { HashRouter, Route} from 'react-router-dom'
import AdminSignIn from './pages/AdminSignIn'
import CMS from './pages/CMS'
import Client from './pages/Client'
import Login from './pages/Login'
class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
          <Route path='/' component={Client} />
          <Route path='/adminlogin' component={AdminSignIn} />
          <Route path='/CMS' component={CMS} />
        </div>
      </HashRouter>
    );
  }
}

export default App;
