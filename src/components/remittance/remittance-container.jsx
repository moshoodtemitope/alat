import * as React from "react";
import { Fragment } from "react";
import InnerContainer from '../../shared/templates/inner-container';
import { Route, NavLink } from "react-router-dom";
import { Switch } from "react-router";
import WesternUnionContainer from './western-union'
// import CardlessWithdrawal from './cardless-withdrawal/cardless-withdrawal'
// import fxTransfer from './fx-transfer/fxTransfer'

class RemittanceContainer extends React.Component {

    componentDidMount(){
    }
    render() {
        // (this.props);
        
        return (
            <Fragment>
                <InnerContainer>
                    <div className="dashboard-wrapper">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12">
                                    <p className="page-title">Receive Money</p>
                                </div>
                                <div className="col-sm-12">
                                    <div>
                                        <div className="sub-tab-nav">
                                            <ul>
                                                <li><NavLink to={'/receive-money'}>Western Union</NavLink></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                {this.props.children}
                                <Route exact to={'/receive-money'} component={WesternUnionContainer} />
                            </div>
                        </div>
                    </div>
                </InnerContainer>
            </Fragment>
        );
    }
}

export default RemittanceContainer;