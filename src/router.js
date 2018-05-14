import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';
import Signin from './container/signin';
import Signup from './container/signup';
import Chat from './container/chat';
import history from './History';
class Routers extends Component {
    render() {
        return (
            <Router history={history}>
            
                <div>
                    <Route exact path="/" component={Signin} />
                    <Route exact path="/signup" component={Signup}  />
                    <Route exact path="/chat" component={Chat} /> 
                    {/* <Route exact path="/" component ={Portfolio} /> */}
                    {/* <Route exact path="/about" component={About} />
                    <Route exact path="/signin" component={Signin} />
                    */}
                </div>
            </Router>
        )
    }
}

export default Routers;