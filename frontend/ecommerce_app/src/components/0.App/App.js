import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from '../1.Navigation/Navbar';
import Banner from '../2.Home/Banner';

function App () {
  return (
    <Router>
      <Switch>        
        <Route path='/login'></Route>
        <Route path='/signup'></Route>
        <Route path='/checkout'></Route>
        <Route exact path='/'>
          <Navbar />
          <Banner />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;