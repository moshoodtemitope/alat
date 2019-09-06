import * as React from "react";
import { Fragment } from "react";
import InnerContainer from '../../shared/templates/inner-container';
import { Route, NavLink } from "react-router-dom";
import NewTransfer from "./cash-transfer/new-transfer";
import { Switch } from "react-router";
import CashTransfer from './cash-transfer'
import CardlessWithdrawal from './cardless-withdrawal/cardless-withdrawal'
import fxTransfer from './fx-transfer/fxTransfer'

class TransferContainer extends React.Component {

    componentDidMount(){
    }
    render() {
        // console.log(this.props);
        
        return (
            <Fragment>
                <InnerContainer>
                <div className="dashboard-wrapper">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12">
                                    <p className="page-title">Send Money</p>
                                </div>

                                <div className="col-sm-12">
                                    <div>
                                        <div className="sub-tab-nav">
                                            <ul>
                                                <li><NavLink to={'/transfer'}>Bank Transfer</NavLink></li>
                                                <li><a>Send To Contacts</a></li>
                                                <li><NavLink to={'/cardless-withdrawal'}>Cardless Withdrawal</NavLink></li>
                                                <li><NavLink to={'/fx-transfer'}>FX Transfer</NavLink></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                {this.props.children}
                                <Route exact to={'/transfer'} component={CashTransfer} />
                                <Route to={'/cardless-withdrawal'} component={CardlessWithdrawal} />
                                <Route to={'/fx-transfer'} component={fxTransfer} />
                            </div>
                        </div>
                    </div>
                </InnerContainer>
            </Fragment>
        );
    }
}

export default TransferContainer;