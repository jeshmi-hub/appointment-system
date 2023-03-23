import React, {useContext} from 'react'
import { Switch, Route } from "react-router-dom";
import Doctors from "./doctors/Doctors";
import DetailDoctor from "./detailDoctor/DetailDoctor";
import Login from "./auth/Login";
import Register from "./auth/Register";
import cart from './cart/cart';
import {GlobalState} from '../../GlobalState'

function Pages() {
  const state = useContext(GlobalState)
  return (
    <Switch>
      <Route path="/" exact component={Doctors} />
      <Route path="/detail/:id" exact component={DetailDoctor} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/cart" exact component={cart}/>
    </Switch>
  );
}

export default Pages;
