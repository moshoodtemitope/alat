import * as React from "react";
import {Fragment} from "react";
import {Route} from "react-router-dom";
import NewTransfer from "./cash-transfer/new-transfer";
import {Switch} from "react-router";

class TransferContainer extends React.Component {
    render() {
        // console.log(this.props);
        return (
            <Fragment>
                <div className="dashboard-wrapper">
                    <div className="container">
                        {this.props.children}
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default TransferContainer;