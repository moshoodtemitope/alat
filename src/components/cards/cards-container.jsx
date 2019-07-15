import * as React from "react";
import { Fragment } from "react";
import InnerContainer from '../../shared/templates/inner-container';
import { Route, NavLink } from "react-router-dom";
import { Switch } from "react-router";
// import CashTransfer from './cash-transfer'
// import CardlessWithdrawal from './cardless-withdrawal/cardless-withdrawal'
// import fxTransfer from './fx-transfer/fxTransfer'

class CardsContainer extends React.Component {

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
                                    <p className="page-title">Cards</p>
                                </div>

                                <div className="col-sm-12">
                                    <div>
                                        <div className="sub-tab-nav">
                                            <ul>
                                                <li>Request Card</li>
                                                <li><a >Card Control</a></li>
                                                <li>Set Card Pin</li>
                                                <li>Hotlist Card</li>
                                                <li>ALAT Dollar Card</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                {this.props.children}
                                {/* <Route exact to={'/transfer'} component={CashTransfer} />
                                <Route to={'/cardless-withdrawal'} component={CardlessWithdrawal} />
                                <Route to={'/fx-transfer'} component={fxTransfer} /> */}
                            </div>
                        </div>
                    </div>
                </InnerContainer>
            </Fragment>
        );
    }
}

export default CardsContainer;