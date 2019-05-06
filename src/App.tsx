import './App.less';
import  { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import Login from './pages/Login';
import XHome from './pages/x/Home';

type Prop = {}

type State = Readonly<{}>

class App extends Component<Prop, State> {

    readonly state: State = {}

    render() {
        return (
            <BrowserRouter>
                <div className={'app'}>
                    <Switch>
                        {/* <Redirect exact path="/" to={'/x/'}  /> */}
                        <Redirect exact path="/" to={'/login.shtml'} />
                        <Route exact path={'/login.shtml'} component={Login} />
                        <Route path={'/x/'} component={XHome} />
                        {/* <Route exact path={'/404.html'} component={NotFound} /> */}
                        {/* <Redirect to={'/404.html'} /> */}
                    </Switch>
                </div> 
            </BrowserRouter>
        )
    }

}

export default App