import * as React from 'react';
import { NavLink} from "react-router-dom";
import OnboardingContainer from "../Container";
import {connect} from "react-redux";
import {ApiService} from "../../../services/apiService";
import {SystemConstant} from "../../../shared/constants";
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
// import {modelStateErrorHandler} from "../../../shared/utils";
import * as utils from "../../../shared/utils";
function EachQuestion(props){
    
    return(
        <option value={props.questionObj.id}>{props.questionObj.question}</option>
    );
}

function QuestionWrap(props) {
    let getQuestions,
        questionsToDisplay = [];

        getQuestions = props.questions;
        for(let i=0;   i<getQuestions.length;  i++){
            questionsToDisplay.push(<EachQuestion key={'question-'+i}  questionObj={getQuestions[i]}/>)
        }
      

    return (
        <div className="each-question">
            <div className="input-ctn">
                <label>Question {props.questionNumber.toString()} </label>
                <select className="selectQuestion" onChange={props.handleQuestionChange} id={'question_'+props.questionNumber}>
                    <option value="">Please Select</option>
                    {questionsToDisplay}
                </select>
            </div>
            <div className="input-ctn">
                <label>Answer {props.questionNumber.toString()} <small>(case sensitive. e.g John is not the same as john)</small> </label>
                <input onChange={props.handleAnswerChange} className="questionResponse" disabled id={'question-'+props.questionNumber+'answer'} type="text"/>             
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
            questionsAvailable: false,
            numberOfQuestions: 3,
            submitted : false
        };

        this.handleInputBlur = this.handleInputBlur.bind(this);
        this.submitQuestions =  this.submitQuestions.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleAutoLogin = this.handleAutoLogin.bind(this);
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

    submitQuestions(e){
        e.preventDefault();

        let getAllQuestionsField = document.querySelectorAll('.selectQuestion'),
            getAllAnswersField = document.querySelectorAll('.questionResponse'),
            getAllQuestionsWrap = document.querySelectorAll('.each-question'),
            questionsList = [],
            answersList = [],
            questionAndAnswersList = [],
            numberofAsweredQuestions,
            noEmptyQuestions,
            hasDuplicate= false;



            getAllQuestionsWrap.forEach(eachQuestionWrap=>{
                let questionField = eachQuestionWrap.querySelector('.selectQuestion'),
                    answerField= eachQuestionWrap.querySelector('.questionResponse');

                if(questionField.value!=='' && answerField.value!=='' ){
                    questionAndAnswersList.push({
                        'id':questionField.value,
                        'question':questionField.options[questionField.selectedIndex].text,
                        'answer':answerField.value,
                    });
                    
                }else{
                    if(questionField.value===''){
                        questionField.parentNode.classList.add('form-error');
                    }
                    if(answerField.value===''){
                        answerField.parentNode.classList.add('form-error');
                    }
                }
               
            })

            
            numberofAsweredQuestions = questionAndAnswersList.length;

        
            answersList = questionAndAnswersList.map(function(item){
                                                        return item.id 
                                                    });

            hasDuplicate = answersList.some(function(item, index){ 
                return answersList.indexOf(item) != index 
            });

            if(hasDuplicate==false){
                this.props.alert.message = null;
                if(this.state.numberOfQuestions === numberofAsweredQuestions){
                    noEmptyQuestions = true;

                    let userDetailsPayload = {
                        channelId: 2,
                        ReferralCode: this.state.refferalCode,
                        imei: '354553073954109',
                        phoneNo: this.state.userPhone,
                        email: this.state.userEmail,
                        password: this.state.userPassword,
                        deviceName: 'string-5',
                        securityQuestions: questionAndAnswersList,
                        deviceOs: 'string-6',
                        gcmRegId: 'string-8',
                        deviceCode: 'string-10',

                    };

                    // // Test DATA
                    // let userDetailsPayload = {
                    //     channelId: 2,
                    //     ReferralCode: '',
                    //     imei: '354553073954109',
                    //     phoneNo: '08139262233',
                    //     email: 'tester46472344@gmail.com',
                    //     password: 'Test123$',
                    //     deviceName: 'string-5',
                    //     securityQuestions: questionAndAnswersList,
                    //     deviceOs: 'string-6',
                    //     gcmRegId: 'string-8',
                    //     deviceCode: 'string-10'
                    // };
                    
                    //If user provided BVN info save userDetails and go to Documents upload page
                // this.props.customer_bvnverification_details.bvn_verification_status === BVN_VERIFICATION_SUCCESS
                if(this.props.customer_bvnverification_details.bvn_verification_status === BVN_VERIFICATION_SUCCESS.toString()){
                        this.props.dispatch(userActions.register(userDetailsPayload, USER_REGISTER_SAVE));
                        history.push('/register/doc-upload');

                }else{
                    //If user didnt provided BVN info POST userDetails and auto login user
                    this.setState({submitted : true, submitDisabled: true});
                        let consume = ApiService.request(routes.REGISTRATIONURLV2, "POST", userDetailsPayload);
                            return consume.then((loginData)=>{
                                
                                //call AutoLogin functionality
                                this.props.dispatch(userActions.loginAfterOnboarding(loginData.data));
                            })
                            .catch(error=>{
                                this.setState({submitted : false, submitDisabled: false});
                                this.props.dispatch(alertActions.error(utils.modelStateErrorHandler(error)));
                            });
                    }
                    
                }
                else{
                    noEmptyQuestions = false;
                }
            }
            else{
                var error= {message:'Please select different questions'}
                this.props.dispatch(alertActions.error(utils.modelStateErrorHandler(error)));
            }
    }

    handleAutoLogin(loginInfo){
        localStorage.setItem("user", JSON.stringify(loginInfo));
        history.push('/dashboard');
    }


    getBvnDetails(){
        const { dispatch } = this.props;
        let props = this.props,
            userDetails;
        // let bvnDetails = this.props.customer_bvnverification_details;
        // let bvnSkipDetails = this.props.customer_bvnskip_details;
        // let bvnSkipStatus = bvnSkipDetails.bvn_verification_status;
       
        if(props.user_details.registration_data==null || props.user_details.registration_data==undefined || props.user_details.registration_data =='undefined'){
            history.push('/register');
            return;
        }
        
        userDetails = props.user_details.registration_data.user;
        
        

        let bvnVerificationStatus = props.customer_bvnverification_details.hasOwnProperty('bvn_verification_data')? BVN_VERIFICATION_SUCCESS: null;
        
       
        this.setState({userPhone: userDetails.phone,bvnVerificationStatus, userEmail:userDetails.email, 
                       userPassword:userDetails.password, refferalCode: userDetails.refferalCode});
        // if(userDetails.profileUp && userDetails.signUp){
        //     this.setState({passportPhoto:userDetails.profileUp, signaturePhoto: userDetails.signUp})
        // }

        // if(bvnStatus === BVN_VERIFICATION_SUCCESS){
        //     let resp = bvnDetails.bvn_verification_data.response;
        //     this.setState({otpSent: true, bvnPhoneNo: resp.bvnPhoneNo, phoneNo: resp.phoneNo});
        // }

        // let bvnStatus = bvnDetails.bvn_verification_status;
        // let phoneEmail = "";
        // if(bvnStatus === BVN_VERIFICATION_SUCCESS){
        //     let resp = bvnDetails.bvn_verification_data.response;
        //     this.setState({otpSent: true, bvnPhoneNo: resp.bvnPhoneNo, phoneNo: resp.phoneNo});
        // }
        // else if(bvnSkipStatus ===SKIP_BVN_SUCCESS){
        //     let resp = bvnSkipDetails.bvn_verification_data.response;
        //     this.setState({otpSent: true,phoneNo: resp.phoneNo});
        // }
        // else{
        //     this.setState({otpSent: false});
        //      history.push('/register');
             
        // }

        
        //dispatch(alertActions.success(this.props.response.data.message.toString()));
    }

    
    

    handleInputChange(event){
        if(event.target.value!==''){
            this.setState({submitDisabled: false});
            if(event.target.parentNode.classList.contains('form-error')){
                event.target.parentNode.classList.remove('form-error');
            }
        }else{
            event.target.parentNode.classList.add('form-error');
            this.setState({submitDisabled: true});
        }
    }

    handleSelectChange(event){
        
        
        if(event.target.value !==''){
            event.target
            .parentNode
            .parentNode.querySelector('input')
            .parentNode.classList.add('form-error');

            event.target.parentNode.parentNode.querySelector('input').removeAttribute('disabled');

        }else{
            if(event.target
                .parentNode
                .parentNode.querySelector('input')
                .parentNode.classList.contains('form-error')){
                event.target.parentNode.parentNode.querySelector('input').parentNode.classList.remove('form-error');
                event.target.parentNode.parentNode.querySelector('input').setAttribute('disabled', true);
                
            }

        }
        if(event.target.value !=='' && event.target.parentNode.classList.contains('form-error')){
            event.target.parentNode.classList.remove('form-error');
        }
        event.target.parentNode.parentNode.querySelector('input').value = '';
    }

    getSecurityQuestions(){
        let consume = ApiService.request(routes.GETALLQUESTIONS, "GET");
            return consume.then(response=>{
                this.setState({allQuestions: response.data, questionsAvailable: true});
            })
            .catch(error=>{
                this.props.dispatch(alertActions.error(utils.modelStateErrorHandler(error)));
            })
    }

    

    componentDidMount() {
        // this.getRegistrationDetails();
        this.getBvnDetails();
        this.getSecurityQuestions();
    }

    

    handleInputBlur(OtpValue){
        this.setState({otpValue: OtpValue});
    }

    render(){
        let userState = this.props.onboarding_user_details,
            state = this.state,
            allQuestionsWrap = [];
        
        const {submitDisabled, submitted, numberOfQuestions} = state;

            if(state.questionsAvailable===true){
                for(var questionCount= 0; questionCount < this.state.numberOfQuestions; questionCount++ ){
                    allQuestionsWrap.push(<QuestionWrap handleAnswerChange={this.handleInputChange} handleQuestionChange={this.handleSelectChange} questions={state.allQuestions} key={questionCount+1} questionNumber={questionCount+1} />)
                    
                }
               
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
                    {state.questionsAvailable===false && <h5 className="loading-text">Loading security questions ...</h5>}

                    {state.questionsAvailable===true &&
                        <form className="onboard-form" onSubmit={this.submitQuestions}>
                            {/* <div className="info-label error hide">
                                An error occured while processing your request
                            </div> */}
                            {this.props.alert && this.props.alert.message &&
                             <div className={`info-label ${this.props.alert.type}`}>{this.props.alert.message}</div>}
                              {allQuestionsWrap}
                            <p>
                                By clicking "Create Account" you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
                            </p>
                            <button type="submit" disabled={submitDisabled} className="btn-alat btn-block">{ submitted ? "Processing..." : "Create Account" }</button>
                        </form>
                        }
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