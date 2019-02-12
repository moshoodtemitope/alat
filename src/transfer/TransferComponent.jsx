import * as React from 'react';
import {Router} from "react-router";
import {history} from "../_helpers";
import {Route} from "react-router-dom";
import NewTransfer from "./cash-transfer/new-transfer";
import TransferRoute from "./routes";


class TransferContainer extends React.Component {
    render() {
        // console.log(this.props);
        return (
            <Router history={history}>
                <div className="dashboard-wrapper">
                    <div className="container">
                        {this.props.children}
                    </div>
                </div>
            </Router>
        );
    }
}

export default TransferContainer;