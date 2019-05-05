import './App.less';
import  { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import Login from './pages/Login';

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
                        <Redirect exact path="/" to={'/login.html'} />
                        <Route exact path={'/login.html'} component={Login} />
                        {/* <Route path={'/x/'} component={XSystemIndex} />
                        <Route exact path={'/login.html'} component={Login} />
                        <Route exact path={'/forgetPassword.html'} component={ForgetPassword} />
                        <Route exact path={'/register.html'} component={Register} />
                        <Route exact path={'/404.html'} component={NotFound} />
                        <Redirect to={'/404.html'} /> */}
                    </Switch>
                </div> 
            </BrowserRouter>
        )
    }

}

export default App