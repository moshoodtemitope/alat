import React, { Fragment } from 'react';
import { Route, Switch } from "react-router-dom";
import Loans from './loans';
import LoansDashboard from './salary/salaryDashboard';
import LoanCalculator from './salary/calc';
import LoanSalaryDetail from './salary/a-salary-detail';
import LoanSalaryEntry from './salary/a-salary-entry';
import LoanSalaryTicket from './salary/a-ticket';

import InnerContainer from '../../shared/templates/inner-container';

class LoansIndex extends React.Component {
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
                                   
                                       
                                            {this.props.children}
                                                
                                               <Route exact path={'/loans'} component={Loans} />
                                               <Route path={'/loans/salary/dashboard'} component={LoansDashboard}/>
                                               <Route path={'/loans/salary/calc'} component={LoanCalculator}/>
                                               <Route path={'/loans/salary/detail'} component={LoanSalaryDetail}/>
                                               <Route path={'/loans/salary/entry'} component={LoanSalaryEntry} />
                                               <Route path={'/loans/salary/ticket'} component={LoanSalaryTicket} />
                            
                                </div>

                            </div>
                        </div>
                    </div>
                </InnerContainer>
            </Fragment>
        );
    }
}

export default LoansIndex;