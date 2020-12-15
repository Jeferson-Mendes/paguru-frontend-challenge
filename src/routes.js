import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LandingPage from './pages/Landing';
import SignUp from './pages/SignUp';
import Feed from './pages/Feed';
import Users from './pages/Users';
import UserDetail from './pages/UserDetail';

const Routes = () => {

    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={LandingPage} />
                <Route path='/cadastro' component={SignUp} />
                <Route path='/publicacoes' component={Feed} />
                <Route path='/usuarios' component={Users} />
                <Route path='/usuario/:id' component={UserDetail} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;