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
                        <div className="fund-option loan">
                            <i className="toshow"><img src={alatLoan} /></i>
                            <i className="hoveraction"><img src={alatLoanHover} /></i>
                            <p>ALAT Loans</p>
                            <p>Loans Description should look great here. You know What i mean?
                              Loans Description should look great here. You know What i mean?
											  </p>
                        </div>

                        <div className="fund-option loan" onClick={() => { this.props.history.push("/loans/salary/dashboard") }}>
                            <i className="toshow"><img src={salaryLoan} /></i>
                            <i className="hoveraction"><img src={salaryLoanHover} /></i>
                            <p>Salary Based Lending</p>
                            <p>Loans Description should look great here. You know What i mean?
												Loans Description should look great here. You know What i mean?</p>
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