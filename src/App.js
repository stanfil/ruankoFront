import React, { Component } from 'react';
import { HashRouter, Route} from 'react-router-dom'
import AdminSignIn from './pages/AdminSignIn'
import CMS from './pages/CMS'
import Home from './pages/Home'
class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
          <Route path='/' component={Home} />
          <Route path='/adminlogin' component={AdminSignIn} />
          <Route path='/CMS' component={CMS} />
        </div>
      </HashRouter>
    );
  }
}

export default App;
