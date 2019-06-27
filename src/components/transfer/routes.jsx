import * as React from 'react';
import { Route} from 'react-router-dom'
import { history } from '../../_helpers/history';
import {Router, Switch} from "react-router";
import NewTransfer from "./cash-transfer/new-transfer";
import TransferHome from "./transfer-home";
import ProvideDetails from "./cash-transfer/provide-details";
import ConFirmTransfer from "./cash-transfer/confirm";

const TransferRoute = props => (

    <Router history={history}>
        <Switch>
            <Route exact path="/transfer" component={TransferHome} />
            <Route path="/transfer/new-transfer" component={NewTransfer} />
            <Route path="/transfer/provide-details" component={ProvideDetails} />
            <Route path="/transfer/send" component={ConFirmTransfer} />
        </Switch>
    </Router>
);

export default TransferRoute;