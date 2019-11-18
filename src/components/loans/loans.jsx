import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import  '../../assets/css/loan.css';//'../../assets/css/loans.css'

import alatLoan from '../../assets/img/alat_loan_grey.svg';
import alatLoanHover from '../../assets/img/alat_loan_white.svg';

import salaryLoan from '../../assets/img/salary_based_grey.svg';
import salaryLoanHover from '../../assets/img/salary_loan_white.svg';


class Loans extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    onNavigate = () => {
        // this.props.history.push("/fund/wema");
    }

    render() {
        return (
            <div className="max-750">
                 <div className="loan-header-text loan">
                        <h4 className="text-black">Loans</h4>
                        
                        <p className="m-t-20 text-black">Select a Loan type</p>
                    </div>
                <div className="al-card fund-al-card no-pad">
                    <div className="fund-option-ctn loan">
                        <div className="fund-option loan" onClick={() => { this.props.history.push("/loans/alat-loans") }}>
                            <i className="toshow"><img src={alatLoan} /></i>
                            <i className="hoveraction"><img src={alatLoanHover} /></i>
                            <p>ALAT Loans</p>
                            <p>You don’t need to stress over meeting any need. Get a loan here now.
											  </p>
                        </div>

                        <div className="fund-option loan" onClick={() => { this.props.history.push("/loans/salary/dashboard") }}>
                            <i className="toshow"><img src={salaryLoan} /></i>
                            <i className="hoveraction"><img src={salaryLoanHover} /></i>
                            <p>Salary Based Lending</p>
                            <p>You can get the money you need right now and payback from your salary over 3 to 24 months.</p>
                        </div>
                    </div>
                </div>


            </div>
        );
    }
}

function mapStateToProps(state) {
    // const { authentication } = state;
    // const { user } = authentication;
    return {
        state: state
    };
}

export default connect(mapStateToProps)(Loans);