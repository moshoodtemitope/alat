import * as React from 'react';
import { Route} from 'react-router-dom'
import { history } from '../_helpers';
import {Router} from "react-router";
import NewTransfer from "./cash-transfer/new-transfer";


const TransferRoute = props => (

    <Router history={history}>
        <Route exact path="/transfer/new-transfer" component={NewTransfer} />
    </Router>
);

export default TransferRoute;