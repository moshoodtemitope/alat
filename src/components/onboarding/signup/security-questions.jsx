import * as React from 'react';
import { NavLink} from "react-router-dom";
import OnboardingContainer from "../Container";
import {connect} from "react-redux";
import {ApiService} from "../../../services/apiService";
import {routes} from "../../../services/urls";
import {
    BVN_VERIFICATION_SUCCESS,
    USER_REGISTER_FETCH,
    USER_REGISTER_SAVE,
    OTP_VERIFICATION_FAILURE,
    DATA_FROM_BVN,
    SKIP_BVN_SUCCESS,
    OTP_VERIFICATION_PENDING
} from "../../../redux/constants/onboarding/user.constants";
import {userActions} from "../../../redux/actions/onboarding/user.actions";
import {history} from "../../../_helpers/history";

import {Textbox} from "react-inputs-validation";
import {alertActions} from "../../../redux/actions/alert.actions";
import {modelStateErrorHandler} from "../../../shared/utils";

function EachQuestion(props){
    return(
        <option value={props.questionObj.id}>{props.questionObj.question}</option>
    );
}

function EachQuestionWrap(props) {
    let getQuestions = props.questions,
        questionsToDisplay;
        console.log('questions are', getQuestions);
        questionsToDisplay = getQuestions.map((question)=>{
            <EachQuestion questionObj={question} key={'question'+question.id} />;
        })

    return (
        <div className="each-question">
            <div className="input-ctn">
                <label>Question {props.questionNumber.toString()} </label>
                <select>
                    <option>Please Select</option>
                    {/* {questionsToDisplay} */}
                    {/* <option>What is your grandmother's name</option>
                    <option>What is your grandfather's name</option> */}
                </select>
            </div>
            <div className="input-ctn form-error">
                <label>Answer</label>
                <input type="text" />
                <span className="error">Your answer was incorrect</span>
            </div>
        </div>
    );
}

class SecurityQuestions extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            error: '',
            formError: '',
            numberOfQuestions: 3
            // resendingOtp: false,
            // resendStatus: ""
        };

        this.handleInputBlur = this.handleInputBlur.bind(this);
        
    }

    getRegistrationDetails(){
        const { dispatch } = this.props;
        let props = this.props;
        let userData;
        let registrationStatus = props.registration_status;
        if(registrationStatus === USER_REGISTER_SAVE){
            userData =  props.registration_data.user;
            this.setState({userData: userData});
            this.setState({phone: userData.phone});
            
        }
    }

    getBvnDetails(){
        const { dispatch } = this.props;
        let bvnDetails = this.props.customer_bvnverification_details;
        let bvnSkipDetails = this.props.customer_bvnskip_details;
        let bvnSkipStatus = bvnSkipDetails.bvn_verification_status;
        // console.log('verifypage', bvnDetails);
        // console.log('skip details', bvnSkipDetails);
        
        let bvnStatus = bvnDetails.bvn_verification_status;
        let phoneEmail = "";
        if(bvnStatus === BVN_VERIFICATION_SUCCESS){
            let resp = bvnDetails.bvn_verification_data.response;
            this.setState({otpSent: true, bvnPhoneNo: resp.bvnPhoneNo, phoneNo: resp.phoneNo});
        }
        else if(bvnSkipStatus ===SKIP_BVN_SUCCESS){
            let resp = bvnSkipDetails.bvn_verification_data.response;
            this.setState({otpSent: true,phoneNo: resp.phoneNo});
        }
        else{
            this.setState({otpSent: false});
             history.push('/register');
             
        }
        //dispatch(alertActions.success(this.props.response.data.message.toString()));
    }

    getSecurityQuestions(){
        let consume = ApiService.request(routes.GETALLQUESTIONS, "GET");
            return consume.then(response=>{
                console.log('security questions', response.data);
                this.setState({allQuestions: response.data});
            })
            .catch(error=>{
                console.error('error messages', error);
            })
    }

    

    componentDidMount() {
        // this.getRegistrationDetails();
        // this.getBvnDetails();
        this.getSecurityQuestions();
    }

    

    handleInputBlur(OtpValue){
        this.setState({otpValue: OtpValue});
    }

    render(){
        let userState = this.props.onboarding_user_details,
            questionsWrap = [];
        
            for(var questionCount= 0; questionCount < this.state.numberOfQuestions; questionCount++ ){
                questionsWrap.push(<EachQuestionWrap questions={this.state.allQuestions} key={questionCount+1} questionNumber={questionCount+1} />)
            }
        
        
        return (
            <OnboardingContainer>
                
                <div className="row">
                    <div className="col-12">
                        <h3>Security Questions<span></span></h3>
                        <p>
                            We’re so glad you’re ready to come onboard. Let’s start by getting to know you better.
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <form className="onboard-form">
                            <div className="info-label success">
                                An error occured while processing your request
                            </div>
                            {questionsWrap}
                            <p>
                                By clicking "Create Account" you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
                            </p>
                            <input type="submit" value="Create Account" className="btn-alat btn-block"/>
                        </form>
                    </div>
                </div>
            </OnboardingContainer>
        );
    }
}


function mapStateToProps(state){
    return {
        user_details: state.onboarding_user_details,
        customer_bvnverification_details: state.onboarding_bvn_details,
        customer_bvnskip_details: state.onboarding_bvnskip_details,
        alert: state.alert
    }
}

export default connect(mapStateToProps)(SecurityQuestions);