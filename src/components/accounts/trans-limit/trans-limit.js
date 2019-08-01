import React, {Component} from 'react';
import { Fragment } from 'react';
import { Route } from 'react-router-dom';
import SetLimit from './set-limit';


const transLimit = (props) => (
           <Fragment>
                {props.children}
                <Route exact path='/account/account-limit' render={(props) => <SetLimit {...props} />} />
                {/* <Route exact path='/accounts/account-limit/verify' render={(props) => <Billers {...props} />} /> */}
           </Fragment>
       );

export default transLimit;