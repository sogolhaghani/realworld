import React from 'react';

import Login from './authentication/login.ui';
import Register from './authentication/register.ui';
import MainPage from './paperbase/mainpage.ui';

import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';


const router = (props) => (
  <BrowserRouter>
    <Switch>
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
      <Route path='/' component={MainPage} />
    </Switch>
  </BrowserRouter>
)

export default router


