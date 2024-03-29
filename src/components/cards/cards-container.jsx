import * as React from "react";
import { Fragment } from "react";
import InnerContainer from '../../shared/templates/inner-container';
import { Route, NavLink } from "react-router-dom";
import { Switch } from "react-router";
import HotlistCardContainer from './hotlist-card'
import RequestCardContainer from './request-card'
import VirtualCardsContainer from './virtual-cards'
import SetCardPinContainer from './setcard-pin'
import CardsControlContainer from './cards-control'
// import CardlessWithdrawal from './cardless-withdrawal/cardless-withdrawal'
// import fxTransfer from './fx-transfer/fxTransfer'

class CardsContainer extends React.Component {
    
    componentDidMount(){
    }
    render() {
        // (this.props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            toggleModal: 'toggleModal'
        }
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
                                                {this.state.user.isWemaMobileUser===false &&
                                                    <li><NavLink to={'/cards'}>Request Card</NavLink></li>
                                                }
                                                
                                                <li><NavLink to={'/cards-control'}> Card Control</NavLink></li>
                                                {this.state.user.isWemaMobileUser===false &&
                                                    <li><NavLink to={'/setcard-pin'}> Set Card Pin</NavLink></li>
                                                }
                                                {this.state.user.isWemaMobileUser===false &&
                                                    <li><NavLink to={'/hotlist'}>Hotlist Card </NavLink></li>
                                                }
                                                
                                                

                                                <li><NavLink to={"/virtual-cards"}> Alat Dollar Card </NavLink></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                {this.props.children}
                                <Route exact to={'/cards'} component={RequestCardContainer} />
                                <Route to={'/setcard-pin'} component={SetCardPinContainer} />
                                <Route to={'/cards-control'} component={CardsControlContainer} />
                                <Route to={'/hotlist'} component={HotlistCardContainer} />
                                <Route to={'/virtual-cards'} component={VirtualCardsContainer} />  
                            </div>
                        </div>
                    </div>
                </InnerContainer>
            </Fragment>
        );
    }
}

export default CardsContainer;