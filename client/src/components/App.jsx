import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import Home from '../pages/Home';
import Photo from '../pages/Photo';
import Profile from '../pages/Profile';
import Auth from '../pages/Auth';
import NotFound from '../pages/NotFound';
import Navbar from './layout/Navbar';
import Alerts from './layout/Alerts';
import {loginWithToken} from '../actions/auth';
import './App.css';

function App({loginWithToken}) {
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token !== null) {
            loginWithToken(token);
        }
    }, [loginWithToken]);
    return (
        <Router>
            <Navbar />
            <Alerts className="p-3" />
            <div className="container">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/photos/:id" component={Photo} />
                    <Route exact path="/auth" component={Auth} />
                    <Route
                        exact
                        path="/profile/:username"
                        component={Profile}
                    />
                    <Route component={NotFound} />
                </Switch>
            </div>
        </Router>
    );
}

export default connect(null, {loginWithToken})(App);
