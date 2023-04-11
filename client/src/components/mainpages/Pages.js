import React, {useContext} from 'react'
import { Switch, Route } from "react-router-dom";
import Doctors from "./doctors/Doctors";
import DetailDoctor from "./detailDoctor/DetailDoctor";
import Login from "./auth/Login";
import Register from "./auth/Register";
import cart from './cart/cart';
import NotFound from './utils/not_found/NotFound';
import {GlobalState} from '../../GlobalState'

function Pages() {
  const state = useContext(GlobalState)
  const [isLogged] = state.userAPI.isLogged
  return (
    <Switch>
      <Route path="/" exact component={Doctors} />
      <Route path="/detail/:id" exact component={DetailDoctor} />
      <Route path="/login" exact component={isLogged ? NotFound : Login} />
      <Route path="/register" exact component={isLogged ? NotFound : Register} />
      <Route path="/appoint" exact component={cart}/>
    </Switch>
  );
}

export default Pages;
