import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import * as actions from '../../../redux/actions/onboarding/loan.actions';
import { loanOnboardingConstants } from '../../../redux/constants/onboarding/loan.constants';
import LoanOnboardingContainer from './loanOnboarding-container';
import OtpValidation from '../../../shared/components/otpvalidation';

class LoanOnboardingTicket extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            ticketNumber: "",
            ticketPassword: "",
            ticketNumberInvalid: false,
            ticketPasswordInvalid: false,
            isSubmitted: false
        }
    }

    componentDidMount = () => {
         this.init();
    }

    init = () => {
        console.log("in init");
        if (this.props.loan_reqStat)
            if (this.props.loan_reqStat.loan_reqStat_status == loanOnboardingConstants.LOAN_REQUEST_STATEMENT_SUCCESS) {
            
            } else this.props.history.push("/loan/salary-detail");
        else this.props.history.push("/loan/salary-detail");
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value },()=>{
            if(this.state.isSubmitted){
                this.validateFields();
            }
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({ isSubmitted : true});
        if (this.validateFields()) {

        } else {
            let url = `ticketNumber=${this.state.ticketNumber}&ticketPassword=${this.state.ticketPassword}`;
            this.props.dispatch(actions.generateStatement(this.state.user.token, url));
        }
    }

    validateFields = () => {
        var ticketNumberInvalid = false;
        var ticketPasswordInvalid = false;
        if (this.state.ticketNumber.length == 0 || this.state.ticketNumber == "") {
            this.setState({ ticketNumberInvalid: true })
            ticketNumberInvalid = true;
        }

        if (this.state.ticketNumber.length != 0 || this.state.ticketNumber != "") {
            this.setState({ ticketNumberInvalid: false })
            ticketNumberInvalid = false;
        }

        if (this.state.ticketPassword.length == 0 || this.state.ticketPassword == "") {
            this.setState({ ticketPasswordInvalid: true })
            ticketPasswordInvalid = true;
        }

        if (this.state.ticketPassword.length != 0 || this.state.ticketPassword != "") {
            this.setState({ ticketPasswordInvalid: false })
            ticketPasswordInvalid = false;
        }

        if (ticketNumberInvalid || ticketPasswordInvalid)
            return true;
        else return false;
    }

    gotoNextPage() {
        if (this.props.loan_genStat)
            if (this.props.loan_genStat.loan_genStat_status == loanOnboardingConstants.LOAN_GENERATE_STATEMENT_SUCCESS)
                this.props.history.push("/loan/salary-entry")
    }

    returnGenPendingStat(){
        if (this.props.loan_genStat)
        if(this.props.loan_genStat.loan_genStat_status == loanOnboardingConstants.LOAN_GENERATE_STATEMENT_PENDING)
        return true; 
        else return false
    }

    render() {
        const { ticketNumber, ticketPassword, ticketNumberInvalid, ticketPasswordInvalid } = this.state;
        let props = this.props;
        return (
            <LoanOnboardingContainer UserName={this.state.user.firstname}>
                {/* {this.init()} */}
                {this.gotoNextPage()}
                <div className="row">
                    <div className="col-sm-12">
                        <div className="max-500">
                            <div className="al-card no-pad">
                                <div className="transfer-ctn">
                                    {this.props.alert && this.props.alert.message &&
                                        <div className={`info-label ${this.props.alert.type}`}>{this.props.alert.message}</div>
                                    }
                                    <form onSubmit={this.onSubmit}>
                                        <div className={ticketNumberInvalid ? "input-ctn form-error" : "input-ctn"}>
                                            <label>Ticket Number</label>
                                            <input type="text" name="ticketNumber" value={ticketNumber} onChange={this.handleChange} />
                                            {ticketNumberInvalid &&
                                                <div className="text-danger">please provide your ticket Number</div>
                                            }
                                        </div>
                                        <div className={ticketPasswordInvalid ? "input-ctn form-error" : "input-ctn"}>
                                            <label>Password</label>
                                            <input type="password" name="ticketPassword" value={ticketPassword} onChange={this.handleChange} />
                                            {ticketPasswordInvalid &&
                                                <div className="text-danger">please provide your ticket password</div>
                                            }
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <center>
                                                    <input type="submit" disabled={this.returnGenPendingStat()}
                                                     value={this.returnGenPendingStat() ? "Processing...": "Confirm"} 
                                                     className="btn-alat m-t-10 m-b-20 text-center" />
                                                </center>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <center>
                                <Link to={'/loan/salary-detail'} className="add-bene m-t-50">Go Back</Link>
                            </center>
                        </div></div></div>
            </LoanOnboardingContainer>
        )
    };
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
        loan_genStat: state.loanOnboardingReducerPile.loanOnboardingGenerateStatement
    };
}
export default connect(mapStateToProps)(LoanOnboardingTicket);