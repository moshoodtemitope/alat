import React, { Fragment } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../redux/actions/onboarding/loan.actions';
import { loanOnboardingConstants } from '../../../redux/constants/onboarding/loan.constants';
import LoanOnboardingContainer from './loanOnboarding-container';

class LoanOnboardingStep3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bvn: "",
            email: "",
            dob: null,
            password: "",
            verifyPassword: "",
            verifyEmail: "",

            bvnInvalid: false,
            emailInvalid: false,
            verifyEmailInvalid: false,
            dobInvalid: false,
            passwordInvalid: false,
            verifyPasswordInvalid: false,

            phoneNumber: "",
            LoanAmount: "",
            Tenure: ""
        }
    }
    componentDidMount = () => {
        this.init();
    }

    init = () => {
        if (this.props.loan_step2) {
            if (this.props.loan_step2.loan_step2_status == loanOnboardingConstants.LOAN_STEP2_SUCCESS) {
                var data = {
                    ...this.props.loan_step2.loan_step2_data.data
                };
                this.setState({
                    phoneNumber: data.PhoneNumber,
                    LoanAmount: data.LoanAmount,
                    Tenure: data.Term
                });

            } else {
                this.props.history.push("/loan/step-2");
            }
        } else {
            this.props.history.push("/loan/step-2");
        }
    }

    handleBVN = (e) => {
        const name = e.target.name;
        if (name === "bvn") {
            this.setState()
            this.setState({ bvn: e.target.value.replace(/\D/, '') })
            if (this.state.bvn.length === 10)
                this.validateBvn(0);
        }
        else
            e.preventDefault();
    }

    handleDatePicker = (dob) => {
        dob.setHours(dob.getHours() + 1);
        this.setState({ dob: dob });
    }

    validateBvn = (zeroIndex) => {
        if ((this.state.bvn.length - zeroIndex) === 10) {
            this.setState({ bvnInvalid: false });
            return false;
        }
        else {
            this.setState({ bvnInvalid: true });
            return true;
        }
    }

    validateDob = () => {
        if (this.state.dob == null) {
            this.setState({ dobInvalid: true });
            return true;
        }
        else {
            this.setState({ dobInvalid: false });
            return false;
        }
    }

    checkPwd = () => {
        let str = this.state.password;
        var digitEx = new RegExp(/\d/);
        var lowerEx = new RegExp(/[a-z]/);
        var upperCase = new RegExp(/[A-Z]/);
        var spCharacter = new RegExp(/[^a-zA-Z0-9]/);
        var condition = false;
        var message = "";
        if (str.length < 8) {
            message = "Password must be up to 8 characters";
            condition = true;
        } else if (!digitEx.test(str)) {
            message = "Password must contain a digit";
            condition = true;
        } else if (!lowerEx.test(str)) {
            message = "Password must contain a lower case alphabet";
            condition = true;
        } else if (!upperCase.test(str)) {
            message = "Password must contain a upper case alphabet";
            condition = true;
        }
        else if (!spCharacter.test(str)) {
            message = "Password must contain atleast a special character";
            condition = true;
        }

        if (condition === true) {
            this.setState({ passwordInvalid: true, passwordInvalidMessage: message });
            return true;
        }
        else {
            this.setState({ passwordInvalid: false });
            return false;
        }

    }

    ValConfirmEmail = () => {
        if (this.state.email.toLowerCase() === this.state.verifyEmail.toLowerCase()) {
            this.setState({ verifyEmailInvalid: false })
            return false;
        } else {
            this.setState({ verifyEmailInvalid: true })
            return true;
        }
    }

    handleInputChange = (e) => {
        let name = e.target.name;
        this.setState({ [name]: e.target.value })
    }

    validateEmail = () => {
        let re = /^[a-zA-Z][a-zA-Z0-9_\-.]*(\.[a-zA-Z][a-zA-Z0-9_\-.]*)?@[a-zA-Z][a-zA-Z-0-9]*\.[a-zA-Z]+(\.[a-zA-Z]+)?$/;
        let result = re.test(this.state.email.toLowerCase());
        if (!result) {
            this.setState({ emailInvalid: true });
        } else this.setState({ emailInvalid: false });
    }

    valConfirmPasswordValid = () => {
        if (this.state.password === this.state.verifyPassword) {
            this.setState({ verifyPasswordInvalid: false });
            return false;
        }
        else {
            this.setState({ verifyPasswordInvalid: true });
            return true;
        }
    }

    valDob = () => {
        if (this.state.dob == null) {
            this.setState({ dobInvalid: true });
            return true;
        } else {
            this.setState({ dobInvalid: false });
            return false;
        }
    }

    validateForm() {

        if (this.validateBvn(1) && this.validateEmail() && this.valConfirmPasswordValid() &&
            this.checkPwd() && this.ValConfirmEmail() && this.valDob()) {

            if (this.state.verifyEmail !== '' && this.state.verifyPassword !== '') {

                return true;
            } else {
                this.setState({ verifyEmailInvalid: false, verifyPasswordInvalid: false })
                return false
            }
        } else {

            return false;
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // console.log(this.state);
        //if (this.validateForm()) {
        console.log("submitted");
        this.props.dispatch(actions.verifyBvn({
            "bvn": this.state.bvn,
            "phoneNo": this.state.phoneNumber,
            "isOnboarding": true,
            "channelId": 2,  //channelID tobe confirmed for web
            "dateOfBirth": this.state.dob,
            "email" : this.state.email,
            "password" : this.state.password,
            loanAmount: this.state.LoanAmount,
            tenure: this.state.Tenure
        }));
        //}
    }

    gotoOtp = () => {
        if (this.props.loan_bvn)
            if (this.props.loan_bvn.loan_bvn_status == loanOnboardingConstants.LOAN_VERIFY_BVN_SUCCESS) {
                return <Redirect to="/loan/validateotp" />
            }
    }

    render() {
        const { bvn, email, dob, password, verifyPassword, verifyEmail, bvnInvalid, passwordInvalidMessage,
            emailInvalid, verifyEmailInvalid, dobInvalid, passwordInvalid, verifyPasswordInvalid } = this.state;

        let props = this;


        return (<LoanOnboardingContainer>
            {this.gotoOtp()}
            <div className="max-500">
                <div className="loan-header-text text-center">
                    <h4 className="text-black">Let's know more about you</h4>
                    <p>complete the form below to create your profile</p>
                </div>
                <div className="al-card no-pad">
                    <div className="transfer-ctn">
                        {this.props.alert && this.props.alert.message &&
                            <div className={`info-label ${this.props.alert.type}`}>{this.props.alert.message}</div>
                        }
                        <form onSubmit={this.handleSubmit}>

                            <div className={bvnInvalid ? "input-ctn form-error" : "input-ctn"}>
                                <label>Enter your BVN</label>
                                <input type="text" onChange={this.handleBVN} maxLength="11" name="bvn" value={bvn} placeholder="Enter your BVN" />
                                {bvnInvalid &&
                                    <div className="text-danger">A valid bvn is 11 digits</div>
                                }
                            </div>
                            <div className={emailInvalid ? "input-ctn form-error" : "input-ctn"}>
                                <label>Email Address</label>
                                <input onChange={this.handleInputChange} onBlur={this.validateEmail} type="email" name="email" value={email} />
                                {emailInvalid &&
                                    // <div className="text-danger">invalid email entered</div>
                                    <div className="text-danger">email is invalid</div>
                                }
                            </div>
                            <div className={verifyEmailInvalid ? "input-ctn form-error" : "input-ctn"}>
                                <label>Confirm Email Address</label>
                                <input onChange={this.handleInputChange} type="email" onBlur={this.ValConfirmEmail} name="verifyEmail" value={verifyEmail} />
                                {verifyEmailInvalid &&
                                    <div className="text-danger">email mis-match</div>
                                }
                            </div>

                            <div className={passwordInvalid ? "input-ctn form-error" : "input-ctn"}>
                                <label>Create a Password</label>
                                <input onChange={this.handleInputChange} type="password" name="password" value={password} onBlur={this.checkPwd} />
                                {passwordInvalid && <div className="pw-hint">Your password must contain an <b>upper-case letter</b>, a <b>lower-case letter</b>, a <b>number</b> and a <b>special character</b>.</div>}
                                {passwordInvalid &&
                                    <div className="text-danger">{passwordInvalidMessage}</div>
                                }
                            </div>
                            <div className={verifyPasswordInvalid ? "input-ctn form-error" : "input-ctn"}>
                                <label>Confirm Password</label>
                                <input onChange={this.handleInputChange} type="password" onBlur={this.valConfirmPasswordValid} name="verifyPassword" value={verifyPassword} />
                                {verifyPasswordInvalid &&
                                    <div className="text-danger">password mis-match</div>
                                }
                            </div>
                            <div className={!dobInvalid ? "input-ctn" : "input-ctn form-error"}>
                                <label>Your Date of Birth</label>
                                <DatePicker placeholderText="19 June, 1992" selected={dob}
                                    onChange={this.handleDatePicker}
                                    // onChangeRaw={(e) => this.handleChange(e)}
                                    dateFormat="d MMMM, yyyy"
                                    peekNextMonth
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    maxDate={new Date()}
                                />
                                {dobInvalid &&
                                    <div className="text-danger">select a valid date</div>
                                }
                            </div>

                            <div className="row">
                                <div className="col-sm-12">
                                    <center>
                                        <button type="submit"
                                            disabled={this.props.loan_bvn.loan_bvn_status === loanOnboardingConstants.LOAN_VERIFY_BVN_PENDING}
                                            className="btn-alat m-t-10 m-b-20 text-center">
                                            {this.props.loan_bvn.loan_bvn_status === loanOnboardingConstants.LOAN_VERIFY_BVN_PENDING ? "Processing..." : "Create Profile"}
                                        </button>
                                    </center>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </LoanOnboardingContainer>);
    }
}

function mapStateToProps(state) {
    return {
        alert: state.alert,
        loan_step2: state.loanOnboardingReducerPile.loanOnboardingStep2,
        loan_bvn: state.loanOnboardingReducerPile.loanOnboardingBVN
    };
}

export default connect(mapStateToProps)(LoanOnboardingStep3);