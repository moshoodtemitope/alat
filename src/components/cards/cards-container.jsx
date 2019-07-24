import * as React from "react";
import { Fragment } from "react";
import InnerContainer from '../../shared/templates/inner-container';
import { Route, NavLink } from "react-router-dom";
import { Switch } from "react-router";
import HotlistCardContainer from './hotlist-card'
import RequestCardContainer from './request-card'
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
                                                <li><NavLink to={'/cards'}>Request Card</NavLink></li>
                                                <li> <a href="#"> Card Control</a></li>
                                                <li><a href="#">Set Card Pin</a></li>
                                                <li><NavLink to={'/cards/hotlist'}>Hotlist Card </NavLink></li>
                                                <li><a href="#"></a> ALAT Dollar Card</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                {this.props.children}
                                <Route exact to={'/cards'} component={RequestCardContainer} />
                                <Route to={'/cards/hotlist'} component={HotlistCardContainer} />
                                {/* <Route to={'/fx-transfer'} component={fxTransfer} />  */} 
                            </div>
                        </div>
                    </div>
                </InnerContainer>
            </Fragment>
        );
    }
}

export default CardsContainer;