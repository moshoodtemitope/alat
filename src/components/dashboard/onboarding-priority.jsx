import * as React from "react";
import { connect } from "react-redux";
// import {history} from "../_helpers";
import {Router} from "react-router";
// import {getOnboardingPriority} from "./actions";
// import {userConstants} from "../_constants";
import {Fragment} from "react";
import {getOnboardingPriority} from "../../redux/actions/dashboard/dashboard.actions";
import {dashboardConstants as userConstants} from "../../redux/constants/dashboard/dashboard.constants";

class OnboardingPriority extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user"))
        };
        this.getPriority();
    }

    getPriority(){
        const { dispatch } = this.props;
        dispatch(getOnboardingPriority(this.state.user.token));
    };

    componentDidMount() {

    }

    getCorrespondingMessage(object){
        let prorityViewModel = { message:'', link:'', linkText:''};
        switch (object.onboarding_priority_data.response.validationError) {
            case 'Completed':
                if(object.onboarding_priority_data.response.score < 100){
                    prorityViewModel.message = "Your documents have been received and are being verified. All restrictions on your account will be removed within two business days";
                    prorityViewModel.link="";
                    prorityViewModel.linkText = "";
                    return prorityViewModel;
                }
                return prorityViewModel = { message:'', link:'', linkText:''};
            case 'LinkBvn':
                    prorityViewModel = { message:"Link your BVN and get your account",
                                         link:'#',
                                          linkText:'Link BVN'};
                return prorityViewModel;
            case 'SetALATPin':
                    prorityViewModel = { message:"Set your ALAT Pin",
                    link:'#',
                     linkText:'Set PIN'};
                return prorityViewModel;
            case 'UploadSelfie':
                    prorityViewModel = { message:"Upload your passport(selfie) and signature.",
                    link:'#',
                     linkText:'Update Profile'};
                return prorityViewModel;
            case 'UploadId':
                    prorityViewModel = { message:"Upload identification/utility documents",
                    link:'#',
                     linkText:'Upload Document'};
                return prorityViewModel;
            case 'FundAccount':
                    prorityViewModel = { message:"Fund your ALAT Account",
                    link:'#',
                    linkText:'Fund Account'};
            case 'AccountReactivation' : 
                    prorityViewModel = { message:"Your account has been blocked due to an extended period of inactivity.Reactivate your account to remove this restriction.",
                    link:'#',
                    linkText:'Reactivate your Account'};
                return prorityViewModel;
            case 'AccountReactivationInProgress' : 
                prorityViewModel = { message:"Your account reactivation is in progress and will be completed in 48 hours. Thank you",
                link:'#',
                linkText:''};
            return prorityViewModel;
            // case 'AccountReactivation':
            //     return "Your account has been blocked due to an extended period of inactivity.Reactivate your account to remove this restriction.";
            // case 'AccountReactivationInProgress':
            //     return "Your account reactivation is in progress and will be completed in 48 hours. Thank you";
                //VerifyAccount:
                // return "Please, upload photos of your face and signature to confirm your identity. Your account will be activated in 24 hours.";
                // return "You cannot spend more than a total of 20,000 naira till you upload photos of your face and signature. Your account will be upgraded 24 hours after
            default:
                    prorityViewModel = { message:"Okay",
                    link:'',
                     linkText:''};
                return "Okay";
        }
    }


    renderElement(priority){
        let priorities = {
            LinkBvn: 1,
            UploadSelfie: 2,
            SetALATPin: 3,
            UploadId: 4,
            FundAccount: 5,
            VerifyAccount: 6,
            NoActivity: 100,
            AccountReactivation: 98,
            InvalidCustomer: 99,
            Completed: 0
        };
        let user = this.state.user;

        let priorityObject = priority;
        if(priorityObject.onboarding_priority === userConstants.DASHBOARD_ONBOARDING_PRIORITY_SUCCESS && priorityObject.onboarding_priority_data){
            let prorityViewModel = { message:'', link:'', linkText:''};
            if(priorityObject.onboarding_priority_data.response.message !== ""){
                prorityViewModel.message = priorityObject.onboarding_priority_data.response.message;
            }
            else{
                prorityViewModel = this.getCorrespondingMessage(priorityObject);
            }
            if(priorityObject.onboarding_priority_data.response.score < 100 || !user.isAlatPinSet) {

                return (
                    <div className="account-setup">
                        <h4>Account Setup</h4>
                        <div className="bar-ctn">
                            <div className="bar" style={{width:priorityObject.onboarding_priority_data.response.score+'%'}}></div>
                        </div>

                        <p>{prorityViewModel.message}</p>

                        <ul>
                            {user.isBvnLinked && <li className="active">Link BVN</li>}
                            {!user.isBvnLinked && <li>Link BVN</li>}

                            {user.isAlatLiteDocCompleted && <li className="active">Update Profile</li>}
                            {!user.isAlatLiteDocCompleted && <li>Update Profile</li>}

                            {user.isDocumentUploaded && <li className="active">Upload Document</li>}
                            {!user.isDocumentUploaded && <li>Upload Document</li>}

                            {user.isAlatPinSet && <li className="active">Set PIN</li>}
                            {!user.isAlatPinSet && <li>Set PIN</li>}

                            {priorityObject.onboarding_priority_data.response.score < 100 && <li>Fund Account</li>}
                            {priorityObject.onboarding_priority_data.response.score >= 100 && <li className="active">Fund Account</li>}

                        </ul>
                        <div className="footer-breaker">
                            {/* return (
                            if(!user.isBvnLinked)
                            {<a href="#">Link BVN</a>}
                             else if(!user.isAlatLiteDocCompleted)
                            { <a href="#">Update Profile</a>}
                             else if(!user.isDocumentUploaded)
                            {<a href="#">Upload Document</a>}
                            else if(!user.isAlatPinSet)
                            {<a href="#">Set PIN</a>}
                            else if(priorityObject.onboarding_priority_data.response.score >= 100)
                            {<a href="#">Fund Account</a>}
                            ); */}
                            <a href={prorityViewModel.link}>{prorityViewModel.linkText}</a>
                        </div>
                    </div>

                );
            }
        }
    }

    render(){
        // let usergoals = this.props.userGoals;
        let userpriority = this.props;
        return (
            <Fragment>
                <div className="al-card no-pad">
                    {this.renderElement(userpriority)}
                </div>
            </Fragment>

        );
    }
}

function mapStateToProps(state){
    return state.dashboard_userOnboardingPriority;
    // return {
    //     onboardingPriority: state.userOnboardingPriority
    // };
}

export default connect(mapStateToProps)(OnboardingPriority);