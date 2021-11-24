import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from '../1.Navigation/Navbar';
import Banner from '../2.Home/Banner';
import Products from '../3. Products/Products';
import ProductDetail from '../3. Products/ProductDetail';
import Createproducts from '../3. Products/Createproducts';
import Updateproducts from '../3. Products/Updateproducts';
import DeleteProduct from '../3. Products/DeleteProduct';

const App = () => {
  //docker build -t servernodeapp .      
  return (
    <Router>
      <Switch>              
        <Route path='/auth/google'></Route>
        <Route path='/product/create'>
          <Navbar />
          <Createproducts />
        </Route>
        <Route exact path='/product/:id' component={ProductDetail} ></Route>
        <Route exact path='/product/update/:id' component={Updateproducts} ></Route>
        <Route exact path='/product/delete/:id' component={DeleteProduct} ></Route>
        
        <Route exact path='/'>
          <Navbar />          
          <Banner />
          <Products/>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;