import React, { Fragment } from 'react';
import { Route, Switch } from "react-router-dom";

import InnerContainer from '../../shared/templates/inner-container';
import FundAccount from './fund-account';
import FundWemaIndex from './fund-wema/fund-wema-index';
import FundWemaOtp from './fund-wema/fund-wema-otp';

import fundwema from '../../assets/img/fund-wema.svg';
import fundwemaHover from '../../assets/img/fund-wema-white.svg';
import creditcard from '../../assets/img/credit-card.svg';
import creditcardHover from '../../assets/img/credit-card-white.svg';
import fundworld from '../../assets/img/fund-world.svg';
import fundworldHover from '../../assets/img/fund-world-white';

class FundAccountIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <InnerContainer>
                    <div className="dashboard-wrapper">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="max-600">

                                        <Switch>
                                            {this.props.children}
                                           
                                                <Route exact path={'/fund'} component={FundAccount} />
                                                <Route exact path={'/fund/wema'} component={FundWemaIndex} />
                                                <Route path={'/fund/wema/otp'} component={FundWemaOtp}/>
                                        </Switch>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </InnerContainer>
            </Fragment>
        );
    }
}

export default FundAccountIndex;