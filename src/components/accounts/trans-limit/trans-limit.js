import React, {Component} from 'react';
import { Fragment } from 'react';
import { Route } from 'react-router-dom';
import SetLimit from './set-limit';
import Verify from './verify-otp';


const transLimit = (props) => (
           <Fragment>
                {props.children}
                <Route exact path='/account/account-limit' render={(props) => <SetLimit {...props} />} />
                <Route exact path='/account/account-limit/verify' render={(props) => <Verify {...props} />} />
           </Fragment>
       );

export default transLimit;