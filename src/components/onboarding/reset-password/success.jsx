import * as React from 'react';
import {connect, Provider} from "react-redux";
// import {ApiService} from "../../shared/apiService";
// import {routes} from "../../shared/urls";
import {history} from "../../../_helpers/history";
import {NavLink} from "react-router-dom";
import OnboardingContainer from "../Container";
import {alertActions} from "../../../redux/actions/alert.actions";
import {userActions} from "../../../redux/actions/onboarding/user.actions";
import { Textbox } from 'react-inputs-validation';
import 'react-inputs-validation/lib/react-inputs-validation.min.css';
import {
    SEND_NEWPASSWORDINFO_SUCCESS,
    SEND_NEWPASSWORDINFO_PENDING,
    SEND_NEWPASSWORDINFO_FAILURE,} from "../../../redux/constants/onboarding/user.constants";

// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));


class ResetSuccessMessage extends React.Component{
      constructor(props) {
          super(props);
          this.state = {
              answer:''
              // hasErrors: false,
              // errors: {
              //     email: '',
              //     password: ''
              // }
          };
          const { dispatch } = this.props;
          history.listen((location, action) => {
            //  dispatch(alertActions.clear());
          });
          
      }

      componentDidMount(){
        if(Object.keys(this.props.send_newcustomerpassword).length<1 || this.props.send_newcustomerpassword.fetch_status!==SEND_NEWPASSWORDINFO_SUCCESS){
            history.push('/forgot-password');
        }
    }
      

      render(){
        const { answer, submitted, error } = this.state;
        const {alert } = this.props;
        // let   sendemailrequest = this.props.sendemailfor_forgotpw;
        return (
            <OnboardingContainer>
                {/* {(Object.keys(this.props.sendemailfor_forgotpw).length>1) && */}
                    <div>
                        <div className="row">
                            <div className="col-12">
                                <h3>Reset Password Successful<span></span></h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="text-center m-b-30">You can visit the ALAT app to continue making transactions. 
                                    
                                </div>
                            
                                <center>
                                    <button type="button" className="btn-alat"
                                        onClick={(e)=>{
                                            e.preventDefault();
                                            history.push('/');
                                        }}>Login</button>
                                </center>
                                    
                            
                            </div>
                        </div>
                    </div>
                {/* } */}
            </OnboardingContainer>
        );
    }
}

function mapStateToProps(state) {
      const { alert } = state;
      
      // const { storage } = state.storage_reducer;
    return {
        alert,
        send_newcustomerpassword : state.send_newcustomerpassword_request,
    };
}

export default connect(mapStateToProps)(ResetSuccessMessage);