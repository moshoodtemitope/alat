import React, { Fragment } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../redux/actions/onboarding/loan.actions';
import { loanOnboardingConstants } from '../../../redux/constants/onboarding/loan.constants';
import LoanOnboardingContainer from './loanOnboarding-container';
import Select from 'react-select';

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
            securityAnswer: "",
            securityQuestion: "",

            bvnInvalid: false,
            emailInvalid: false,
            verifyEmailInvalid: false,
            dobInvalid: false,
            passwordInvalid: false,
            verifyPasswordInvalid: false,
            securityAnswerInvalid: false,
            securityQuestionInvalid: false,
            isSubmitted: false,

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
                this.getSecurityQuestions();

            } else {
                this.props.history.push("/loan/step-2");
            }
        } else {
            this.props.history.push("/loan/step-2");
        }
    }

    getSecurityQuestions=()=>{
        this.props.dispatch(actions.GetSecurityquestion());
    }

    handleQuestionChange = (Question) => {
        this.setState({ securityQuestion: Question.label });
        if (Question.value != "") {
            this.setState({ securityQuestionInvalid: false });
        }
    }

    renderSecurityQuestions = ( ) => {
        let secStatus = this.props.sec_question.sec_que_status
        switch (secStatus) {
            case loanOnboardingConstants.SECURITY_QUESTION_SUCCESS:
                let questionList = this.props.sec_question.sec_que_data.response.data;
                 var questionOptions = [];
                for (var question in questionList) {
                    questionOptions.push({ value: questionList[question].id, label: questionList[question].question });
                }
                return (<Select
                     options={questionOptions}
                     onChange={this.handleQuestionChange}
                />);
            case loanOnboardingConstants.SECURITY_QUESTION_PENDING:
                return (<select disabled>
                    <option>Fetching Questions...</option>
                </select>
                );
            case loanOnboardingConstants.SECURITY_QUESTION_FAILURE:
                return (<Fragment>
                    <select className="error-field" disabled>
                        <option>Unable to load questions</option>
                    </select>
                    <a className="cta-link to-right" onClick={this.getSecurityQuestions}>Try again</a>
                </Fragment>)
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
        this.setState({ dob: dob },()=>{
            if(this.state.isSubmitted){
               // console.log("here");
                this.valDob();
            }
        });
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

    // validateDob = () => {
    //     if (this.state.dob == null) {
    //         this.setState({ dobInvalid: true });
    //         return true;
    //     }
    //     else {
    //         this.setState({ dobInvalid: false });
    //         return false;
    //     }
    // }

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
            this.setState({ verifyEmailInvalid: false });
            return false;
        } else if(this.state.verifyEmail == ""){
            this.setState({ verifyEmailInvalid: true });
            return true;
        }else{ 
            this.setState({ verifyEmailInvalid: true });
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
        if (result == false) {
            //return true if the email is invalid
            this.setState({ emailInvalid: true });
            return true;
        } else if(result == true) {
            this.setState({ emailInvalid: false });
            return false
        }
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
            //console.log("true here");
            this.setState({ dobInvalid: true });
            return true;
        } else {
           // console.log("inner box");
            this.setState({ dobInvalid: false });
            return false;
        }
    }
    
    valSecQuestion =()=>{
        if (this.state.securityQuestion === "") {
            this.setState({ securityQuestionInvalid: true });
            return true;
        }
        else {
            this.setState({ securityQuestionInvalid: false });
            return false;
        }
    }

    valQuestionAnswer =()=>{
        if (this.state.securityAnswer === "") {
            this.setState({ securityAnswerInvalid: true });
            return true;
        }
        else {
            this.setState({ securityAnswerInvalid: false });
            return false;
        }
    }
    
   
    validateForm() {

        if (this.validateBvn(1) || this.validateEmail() || this.ValConfirmEmail() || this.valConfirmPasswordValid() ||
            this.checkPwd() || this.valDob() || this.valSecQuestion() || this.valQuestionAnswer()) {
                return true;
            
        } else {

            return false;
        }
    }

    handlePaste =(e)=>{
        e.preventDefault();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({isSubmitted : true});
        // console.log(this.state);
        if (this.validateForm()) {
       
        }else {
            //console.log("submitted");
             this.props.dispatch(actions.verifyBvn({
            "bvn": this.state.bvn,
            "phoneNo": this.state.phoneNumber,
            "isOnboarding": true,
            "channelId": 2,  //channelID tobe confirmed for web
            "dateOfBirth": this.state.dob,
            "email" : this.state.email.toLowerCase(),
            "password" : this.state.password,
            loanAmount: this.state.LoanAmount,
            tenure: this.state.Tenure,
            securityQuestion: this.state.securityQuestion,
            securityAnswer: this.state.securityAnswer

        }));
        }
    }

    goBack=(e)=>{
        e.preventDefault();
        this.props.dispatch(actions.goBackStoreClear(loanOnboardingConstants.LOAN_STEP2_CLEAR));
        this.props.history.push('/loan/step-2');
    }

    gotoOtp = () => {
        if (this.props.loan_bvn)
            if (this.props.loan_bvn.loan_bvn_status == loanOnboardingConstants.LOAN_VERIFY_BVN_SUCCESS) {
                return <Redirect to="/loan/validateotp" />
            }
    }

    render() {
        const { bvn, email, dob, password, verifyPassword, verifyEmail, bvnInvalid, passwordInvalidMessage, securityQuestionInvalid,
            emailInvalid, verifyEmailInvalid, dobInvalid, passwordInvalid, verifyPasswordInvalid, securityAnswer, securityAnswerInvalid } = this.state;

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
                        <form autoComplete="none" onSubmit={this.handleSubmit}>

                            <div className={bvnInvalid ? "input-ctn form-error" : "input-ctn"}>
                                <label>Enter your BVN</label>
                                <input type="text" onChange={this.handleBVN} maxLength="11" name="bvn" value={bvn} placeholder="Enter your BVN" />
                                {bvnInvalid &&
                                    <div className="text-danger">A valid bvn is 11 digits</div>
                                }
                            </div>
                            <div className={emailInvalid ? "input-ctn form-error" : "input-ctn"}>
                                <label>Email Address</label>
                                <input autoComplete="none" onChange={this.handleInputChange} onBlur={this.validateEmail} type="email" name="email" value={email} />
                                {emailInvalid &&
                                    // <div className="text-danger">invalid email entered</div>
                                    <div className="text-danger">email is invalid</div>
                                }
                            </div>
                            <div className={verifyEmailInvalid ? "input-ctn form-error" : "input-ctn"}>
                                <label>Confirm Email Address</label>
                                <input onChange={this.handleInputChange} onPaste={this.handlePaste} id="confirmemail" type="email" onBlur={this.ValConfirmEmail} name="verifyEmail" value={verifyEmail} />
                                {verifyEmailInvalid &&
                                    <div className="text-danger">email mis-match</div>
                                }
                            </div>

                            <div className={passwordInvalid ? "input-ctn form-error" : "input-ctn"}>
                                <label>Create a Password</label>
                                <input autoComplete="none" onChange={this.handleInputChange} type="password" name="password" value={password} onBlur={this.checkPwd} />
                                {passwordInvalid && <div className="pw-hint">Your password must contain an <b>upper-case letter</b>, a <b>lower-case letter</b>, a <b>number</b> and a <b>special character</b>.</div>}
                                {passwordInvalid &&
                                    <div className="text-danger">{passwordInvalidMessage}</div>
                                }
                            </div>
                            <div className={verifyPasswordInvalid ? "input-ctn form-error" : "input-ctn"}>
                                <label>Confirm Password</label>
                                <input onChange={this.handleInputChange} onPaste={this.handlePaste} type="password" onBlur={this.valConfirmPasswordValid} name="verifyPassword" value={verifyPassword} />
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
                            <div className={securityQuestionInvalid ? "input-ctn form-error" : "input-ctn"}>
                                <label>Select Security Question</label>
                                {this.renderSecurityQuestions()}
                                {securityQuestionInvalid &&
                                    <div className="text-danger">you need to select a security question</div>
                                }
                            </div>
                            <div className={securityAnswerInvalid ? "input-ctn form-error" : "input-ctn"}>
                                <label>Answer Sequrity Security Question</label>
                                <input onChange={this.handleInputChange} type="text" onBlur={this.valConfirmPasswordValid} name="securityAnswer" value={securityAnswer} />
                                {securityAnswerInvalid &&
                                    <div className="text-danger">you have to provide an answer</div>
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
                <center>
                    <a style={{ cursor: "pointer"}} onClick={this.goBack} className="add-bene m-t-50">Go Back</a>
                </center>           
            </div>
        </LoanOnboardingContainer>);
    }
}

function mapStateToProps(state) {
    return {
        alert: state.alert,
        loan_step2: state.loanOnboardingReducerPile.loanOnboardingStep2,
        loan_bvn: state.loanOnboardingReducerPile.loanOnboardingBVN,
        sec_question: state.loanOnboardingReducerPile.sec_question
    };
}

export default connect(mapStateToProps)(LoanOnboardingStep3);