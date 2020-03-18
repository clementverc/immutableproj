import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Contact from './components/contacts';

const Routes = () => (
  <div>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Contact} exact />
      </Switch>
    </BrowserRouter>
  </div>
);

export default Routes;
