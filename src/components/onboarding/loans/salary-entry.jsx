

import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../redux/actions/onboarding/loan.actions';
import { loanOnboardingConstants } from '../../../redux/constants/onboarding/loan.constants';
import LoanOnboardingContainer from './loanOnboarding-container';

class LoanOnboardingSalaryEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            enytrList: [{
                "entryId": 1,
                "accountNumber" : "0123456789",
                "accountName" : "Faleye Benjamin",
                "description" : "My own salary joo",
                "date" : "12-12-2009",
                "amount" : "100,000,000:00"
            },
            {
                "entryId": 2,
                "accountNumber" : "9876543210",
                "accountName" : "Amotayo Omolara",
                "description" : "My own salary joo",
                "date" : "12-12-2009",
                "amount" : "1,000,000:00"
            },
        ],
        selectedEntryList: [],
        }
    }


    init = () => {
        this.props.dispatch(actions.salaryTransaction(this.state.user.token));
    }

    entryChecked=(salaryEntry,e)=>{
        var entry = {...salaryEntry,
        key: e.target.value};
        var arr = [...this.state.selectedEntryList];
     if(e.target.checked){
         arr.push(entry.entryId)
     }else if(!e.target.checked){
        arr.splice(e.target.value, 1);
     }
     this.setState({selectedEntryList : arr});
    }

    postSalarEntries=()=>{
        this.props.dispatch(salaryEntry(this.user.token. this.state.selectedEntryList));
    }

    gotoNextPage=()=>{
        if(this.props.salary_entry.loan_salEnt_status){
            if(this.props.salary_entry.loan_salEnt_status == loanOnboardingConstants.LOAN_SALARYENTRY_SUCCESS){
                this.props.history.push("/loan/score-card");
            }
        }
    }

    renderSalaryEntries = () => {
        //if (this.props.salary_trans)
          //  if (this.props.salary_trans.loan_salTran_status == loanOnboardingConstants.LOAN_SALARYTRANSACTION_SUCCESS) {
                var salary_transactions = [
                   // ...this.props.salary_trans.loan_salTran_data.data.response
                   ...this.state.enytrList

                ]
                console.log(salary_transactions);
                if (salary_transactions.length >= 1) {
                    return (
                        <table className="table table-striped salary-table">
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Account Number</th>
                                    <th scope="col">Account Name</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {salary_transactions.map((entry, key) => {
                                    return (
                                        <tr key={key}>
                                            <th scope="row"><input type="checkbox" value={key} checked={entry.isChecked} onChange={(e) => this.entryChecked(entry,e)}
                                                style={{ opacity: "unset", position: "unset" }} /></th>
                                            <td>{entry.accountNumber}</td>
                                            <td>{entry.accountName}</td>
                                            <td>{entry.description}</td>
                                            <td>{entry.amount}</td>
                                            <td>{entry.date}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    )
                }else {
                    return(<Fragment>
                        <h1>No Salary Entry Found</h1>
                    </Fragment>)
                }

            }
    

    render = () => {
        return (
            <LoanOnboardingContainer>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="max-650">
                            <div className="loan-header-text text-center">
                                <h4 className="text-black">Select Salary</h4>
                                <p>Kindly select transaction(s) that represent your salary</p>
                            </div>
                            <div className="al-card no-pad">
                                <div className="transfer-ctn no-pad unset-pad">
                                    {this.renderSalaryEntries()}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <center>
                                        <button type="button" onClick={()=>this.postSalarEntries} className="btn-alat m-t-10 m-b-20 text-center">Proceed</button>
                                    </center>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LoanOnboardingContainer>
        );
    }
}

function mapStateToProps(state) {
    return {
        alert: state.alert,
        //loan_step2: state.loanOnboardingReducerPile.loanOnboardingStep2,
        //loan_val_otp: state.loanOnboardingReducerPile.loanOnboardingValidateOTP,
        loan_bvn: state.loanOnboardingReducerPile.loanOnboardingBVN,
        loan_step3: state.loanOnboardingReducerPile.loanOnboardingStep3,
        //bankList: state.transferReducerPile.transfer_bankList,
        loan_reqStat: state.loanOnboardingReducerPile.loanOnboardingRequestStatement,
        loan_genStat: state.loanOnboardingReducerPile.loanOnboardingGenerateStatement,
        salary_trans: state.loanOnboardingReducerPile.loanOnboardingSalaryTransaction,
        salary_entry: state.loanOnboardingReducerPile.loanSalaryEntryReducer
    };
}
export default connect(mapStateToProps)(LoanOnboardingSalaryEntry);

