import React from 'react';
import {Route, Redirect} from 'react-router-dom';
// import { connect } from 'react-redux';
// import { setUser } from '../redux/reducer';
import store from '../redux/store.js';

export default function PrivateRoute({ component: Component, ...rest }){
    var user = localStorage.getItem('user');
        return (
          <Route
            {...rest}
            render={props => 
              user ? (
                <Component {...props} />
              ) : (

                <Redirect
                  to={{
                    pathname: "/",
                    state: { from: props.location }
                  }}
                />
              )
            }
          />
        );
      }