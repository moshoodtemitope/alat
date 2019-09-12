import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import * as actions from '../../../redux/actions/onboarding/loan.actions';
import { loanOnboardingConstants } from '../../../redux/constants/onboarding/loan.constants';
import OtpValidation from '../otpvalidation';

class Ticket extends React.Component {
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
       
        if (this.props.loan_reqStat)
            if (this.props.loan_reqStat.loan_reqStat_status == loanOnboardingConstants.LOAN_REQUEST_STATEMENT_SUCCESS) {
            
            } else return(<Redirect to={this.props.backwardUrl}/>)//this.props.history.push(this.props.backwardUrl);
        else return(<Redirect to={this.props.backwardUrl}/>) //this.props.history.push(this.props.backwardUrl);
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
            return (<Redirect to={this.props.forwardUrl}/>);
                //this.props.history.push(this.props.forwardUrl); 
    }

    gotoPreviousPage(){
        //this.props.history.push(this.props.backwardUrl);
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
                <Fragment>
                {this.gotoNextPage()}
                <div className="row">
                    <div className="col-sm-12">
                        <div className="max-500">
                        <div className="loan-header-text text-center">
                            <h4 className="text-black">eStatement verification</h4>
                            <p>Kindly enter ticket number and password sent to you via sms to confirm that you are the owner of the provided account.</p>
                        </div>
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
                                {/* <a onClick={this.gotoPreviousPage} className="add-bene m-t-50">Go Back</a> */}
                            </center>
                        </div></div></div>
                        </Fragment>
        )
    };
}
function mapStateToProps(state) {
    return {
        alert: state.alert,
       
        loan_bvn: state.loanOnboardingReducerPile.loanOnboardingBVN,
        loan_step3: state.loanOnboardingReducerPile.loanOnboardingStep3,
        loan_reqStat: state.loanOnboardingReducerPile.loanOnboardingRequestStatement,
        loan_genStat: state.loanOnboardingReducerPile.loanOnboardingGenerateStatement
    };
}
export default connect(mapStateToProps)(Ticket);