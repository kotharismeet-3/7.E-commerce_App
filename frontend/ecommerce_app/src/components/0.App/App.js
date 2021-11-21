import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from '../1.Navigation/Navbar';
import Banner from '../2.Home/Banner';
import Products from '../3. Products/Products';
import ProductDetail from '../3. Products/ProductDetail';

function App () {
  return (
    <Router>
      <Switch>      
        <Route path='/auth/google'></Route>
        <Route path='/checkout'></Route>
        <Route path='/product/:id' component={ProductDetail}></Route>
        <Route exact path='/'>
          <Navbar />
          <Banner />
          <Products />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;