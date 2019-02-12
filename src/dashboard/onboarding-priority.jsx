import * as React from "react";
import { connect } from "react-redux";
import {history} from "../_helpers";
import {Router} from "react-router";
import {getOnboardingPriority} from "./actions";
import {userConstants} from "../_constants";

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
        switch (object.onboarding_priority_data.response.validationError) {
            case 'Completed':
                if(object.onboarding_priority_data.response.score < 100){
                    return "Your documents have been received and are being verified. All restrictions on your account will be removed within two business days";
                }
                return "";
            case 'LinkBvn':
                return "Link your BVN and get your account";
            case 'SetALATPin':
                return "Set your ALAT Pin";
            case 'UploadSelfie':
                return "Upload your passport(selfie) and signature.";
            case 'UploadId':
                return "Upload identification/utility documents";
            case 'FundAccount':
                return "Fund your ALAT Account";
            default:
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
            let message = "";
            if(priorityObject.onboarding_priority_data.response.message !== ""){
                message = priorityObject.onboarding_priority_data.response.message;
            }
            else{
                message = this.getCorrespondingMessage(priorityObject);
            }
            if(priorityObject.onboarding_priority_data.response.score < 100 || !user.isAlatPinSet) {

                return (
                    <div className="account-setup">
                        <h4>Account Setup</h4>
                        <div className="bar-ctn">
                            <div className="bar" style={{width:priorityObject.onboarding_priority_data.response.score+'%'}}></div>
                        </div>

                        <p>{message}</p>

                        <ul>
                            {user.isBvnLinked && <li className="active">Link BVN</li>}
                            {!user.isBvnLinked && <li>Link BVN</li>}

                            {user.isAlatLiteDocCompleted && <li className="active">Update Profile</li>}
                            {!user.isAlatLiteDocCompleted && <li>Update Profile</li>}

                            {user.isDocumentUploaded && <li className="active">Upload Document</li>}
                            {!user.isDocumentUploaded && <li>Upload Document</li>}

                            {user.isAlatPinSet && <li className="active">Set PIN</li>}
                            {!user.isAlatPinSet && <li>Set PIN</li>}

                            {priorityObject.onboarding_priority_data.response.score < 100 && <li className="active">Fund Account</li>}
                            {priorityObject.onboarding_priority_data.response.score >= 100 && <li>Fund Account</li>}

                        </ul>
                        <div className="footer-breaker">
                            {!user.isBvnLinked && <a href="#">Link BVN</a>}

                            {!user.isAlatLiteDocCompleted && <a href="#">Update Profile</a>}

                            {!user.isDocumentUploaded && <a href="#">Upload Document</a>}

                            {!user.isAlatPinSet && <a href="#">Set PIN</a>}

                            {priorityObject.onboarding_priority_data.response.score < 100 && <a href="#">Fund Account</a>}

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
            <Router history={history}>
                <div className="al-card no-pad">
                    {this.renderElement(userpriority)}
                </div>
            </Router>

        );
    }
}

function mapStateToProps(state){
    return state.userOnboardingPriority;
    // return {
    //     onboardingPriority: state.userOnboardingPriority
    // };
}

export default connect(mapStateToProps)(OnboardingPriority);