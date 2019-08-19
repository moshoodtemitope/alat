

import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../redux/actions/onboarding/loan.actions';
import { loanOnboardingConstants } from '../../../redux/constants/onboarding/loan.constants';
import { alertActions } from '../../../redux/actions/alert.actions';

class SalaryEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            //FirstName: "",
            enytrList: [
                
            ],
            selectedEntryList: [],
        }
    }

    componentDidMount = () => {
        this.init();
    }

    init = () => {
        if (this.props.loan_reqStat)
        if (this.props.loan_reqStat.loan_reqStat_status == loanOnboardingConstants.LOAN_REQUEST_STATEMENT_SUCCESS)
        this.props.dispatch(actions.salaryTransaction(this.state.user.token));
        // if(this.props.user_detail.loan_userdetails_data)
        // this.setState({ FirstName :this.props.user_detail.loan_userdetails_data.data.FirstName }); 
    }

    entryChecked = (salaryEntry, e) => {
        var entry = {
            ...salaryEntry,
            key: e.target.value
        };
        var arr = [...this.state.selectedEntryList];
        if (e.target.checked) {
            arr.push(entry.TransactionId)
        } else if (!e.target.checked) {
            arr.splice(e.target.value, 1);
        }
        this.setState({ selectedEntryList: arr });
    }

    postSalarEntries = () => {
        console.log(this.state.selectedEntryList.length);
        if (this.state.selectedEntryList.length > 0)
            {this.props.dispatch(actions.salaryEntry(this.state.user.token,this.state.selectedEntryList));}
        else {
            this.props.dispatch(alertActions.error("you need to select atleast an entry"));
        }
    }

    returnEntriesPendingStatus=()=>{
        if (this.props.salary_entry.loan_salEnt_status == loanOnboardingConstants.LOAN_SALARYENTRY_PENDING)
        return true;
        else return false;
    }

    gotoNextPage = () => {
        if (this.props.salary_entry.loan_salEnt_status) {
            if (this.props.salary_entry.loan_salEnt_status == loanOnboardingConstants.LOAN_SALARYENTRY_SUCCESS) {
               // return (<Redirect to={this.props.forwardUrl}/>) // this.props.history.push("/loan/score-card");
               this.props.NextPageMethod()
            }
        }
    }

    renderSalaryEntries = () => {
        if (this.props.salary_trans)
           if (this.props.salary_trans.loan_salTran_status == loanOnboardingConstants.LOAN_SALARYTRANSACTION_SUCCESS) {
                var salary_transactions = [
                    ...this.props.salary_trans.loan_salTran_data.data.response.Response
                    //...this.state.enytrList

                ]
                console.log(salary_transactions);
                if (salary_transactions.length >= 1) {
                    return (
                        <table className="table table-striped salary-table">
                            <thead>
                                <tr>
                                    <th scope="col"></th>

                                    <th scope="col">Description</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {salary_transactions.map((entry, key) => {
                                    return (
                                        <tr key={key}>
                                            <th scope="row"><input type="checkbox" value={key} checked={entry.isChecked} onChange={(e) => this.entryChecked(entry, e)}
                                                style={{ opacity: "unset", position: "unset" }} /></th>
                                            <td>{entry.Description}</td>
                                            <td>{entry.Amount}</td>
                                            <td>{entry.TransactionDate}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    )
                } else {
                    return (<Fragment>
                        <p>No Salary Entry Found</p>
                    </Fragment>)
                }

           }
        }

        render = () => {
            this.gotoNextPage();
            return (
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="max-650">
                                <div className="loan-header-text text-center">
                                    <h4 className="text-black">Select Salary</h4>
                                    <p>Kindly select transaction(s) that represent your salary</p>
                                </div>
                                <div className="al-card no-pad">
                                    {this.props.alert && this.props.alert.message &&
                                        <div className={`info-label ${this.props.alert.type}`}>{this.props.alert.message}</div>
                                    }
                                    <div className="transfer-ctn no-pad unset-pad">
                                        {this.renderSalaryEntries()}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <center>
                                            <button type="button" onClick={this.postSalarEntries} 
                                            disabled={this.returnEntriesPendingStatus()}
                                            className="btn-alat m-t-10 m-b-20 text-center">{this.returnEntriesPendingStatus() ? "Processing..." : "Proceed"}</button>
                                        </center>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            );
        }
    }

function mapStateToProps(state) {
    return {
        alert: state.alert,
       
        loan_bvn: state.loanOnboardingReducerPile.loanOnboardingBVN,
        loan_step3: state.loanOnboardingReducerPile.loanOnboardingStep3,
        //bankList: state.transferReducerPile.transfer_bankList,
        loan_reqStat: state.loanOnboardingReducerPile.loanOnboardingRequestStatement,
        loan_genStat: state.loanOnboardingReducerPile.loanOnboardingGenerateStatement,
        salary_trans: state.loanOnboardingReducerPile.loanOnboardingSalaryTransaction,
        salary_entry: state.loanOnboardingReducerPile.loanSalaryEntryReducer,
        //user_detail: state.loanOnboardingReducerPile.loanUserDetails,
    };
}
export default connect(mapStateToProps)(SalaryEntry);
