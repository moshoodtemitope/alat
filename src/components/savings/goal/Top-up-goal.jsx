import React, {Component, Fragment} from 'react';
import InnerContainer from "../create-stash-step2";
import SavingsContainer from "../container";

class TopUPGoal extends Component {
    render() {
        return (
            <Fragment>
                <InnerContainer>
                    <SavingsContainer>
                        <div className="row">
                            <div className="col-sm-12">
                                <p className="page-title">Savings & Goals</p>
                            </div>
                            <div className="col-sm-12">
                                <div className="tab-overflow">
                                    <div className="sub-tab-nav">
                                        <ul>
                                            <li><a href="accounts.html" className="active">Goals</a></li>
                                            <li><a href="statement.html">Group Savings</a></li>
                                            <li><a href="#">Investments</a></li>

                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SavingsContainer>
                </InnerContainer>
            </Fragment>




        );
    }
}

export default TopUPGoal;