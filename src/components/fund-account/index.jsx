import React, { Fragment } from 'react';
import { Route, Switch } from "react-router-dom";

import InnerContainer from '../../shared/templates/inner-container';
import FundAccount from './fund-account';
import FundWemaIndex from './fund-wema/fund-wema-index';
import FundWemaSuccess from './fund-wema/fund-wema-success';
import FundCardIndex from './fund-card/fund-card-index';
import FundCardDetails from './fund-card/card-details';
import FundCardSelectAccount from './fund-card/fund-card-selectaccount';
import FundCardSuccess from './fund-card/fund-card-success';


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

                                       
                                            {this.props.children}
                                           
                                                <Route exact path={'/fund'} component={FundAccount} />
                                                <Route exact path={'/fund/wema'} component={FundWemaIndex} />
                                                <Route exact path={'/fund/wema/success'} component={FundWemaSuccess}/>
                                                {/* card */}
                                                <Route exact path={'/fund/card'} component={FundCardIndex}/>
                                                <Route path={'/fund/card/details'} component={FundCardDetails} />
                                               <Route path={'/fund/card/select-account'} component={FundCardSelectAccount} />
                                               <Route path={'/fund/card/success'} component={FundCardSuccess} />
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