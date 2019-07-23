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
            ticketPassword: ""
        }
    }

    componentDidMount = () => {

    }

    init = () => {
        if (this.props.loan_reqStat)
            if (this.props.loan_reqStat.loan_reqStat_status == loanOnboardingConstants.LOAN_REQUEST_STATEMENT_SUCCESS) {

            } else return (<Redirect to={"/loan/salary-detail"} />);
        else return (<Redirect to={"/loan/salary-detail"} />);
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = () => {
        let url = `ticketNumber=${this.state.ticketNumber}&ticketPassword=${this.state.ticketPassword}`;
        this.props.dispatch(actions.generateStatement(this.state.user.token, url));
    }

    gotoNextPage() {
        if(this.props.loan_genStat)
        if(this.props.loan_genStat.loan_genStat_data == loanOnboardingConstants.LOAN_GENERATE_STATEMENT_SUCCESS)
        this.props.history.push("/loan/salary-statement")
    }

    render() {
        let { ticketNumber, ticketPassword } = this.state;
        return (
            <LoanOnboardingContainer>
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
                                    <form>
                                        <div className="input-ctn">
                                            <label>Ticket Number</label>
                                            <input type="text" value={ticketNumber} onChange={this.handleChange} />
                                        </div>
                                        <div className="input-ctn">
                                            <label>Password</label>
                                            <input type="password" value={ticketPassword} onChange={this.handleChange} />
                                        </div>


                                        <div className="row">
                                            <div className="col-sm-12">
                                                <center>
                                                    <input onClick={this.onSubmit} type="button" value="Confirm" className="btn-alat m-t-10 m-b-20 text-center" />
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