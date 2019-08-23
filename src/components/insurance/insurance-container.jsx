import * as React from "react";
import { Fragment } from "react";
import InnerContainer from '../../shared/templates/inner-container';
import { Route, NavLink } from "react-router-dom";
import { Switch } from "react-router";
import ManageInsuranceContainer from './manage-insurance'

class InsuranceContainer extends React.Component {

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
                                    <p className="page-title">Insurance</p>
                                </div>

                                <div className="col-sm-12">
                                    <div>
                                        <div className="sub-tab-nav">
                                            <ul>
                                                <li><NavLink to={'/insurance/manage-insurance'}>Active Policies</NavLink></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                {this.props.children}
                                {/* <Route exact to={'/insurance'} component={ManageInsuranceContainer} /> */}
                                <Route exact to={'/insurance/manage-insurance'} component={ManageInsuranceContainer} />
                            </div>
                        </div>
                    </div>
                </InnerContainer>
            </Fragment>
        );
    }
}

export default InsuranceContainer;