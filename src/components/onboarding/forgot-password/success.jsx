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
    SENDANSWERFOR_FORGOTPW_SUCCESS,
    SENDANSWERFOR_FORGOTPW_PENDING,
    SENDANSWERFOR_FORGOTPW_FAILURE,} from "../../../redux/constants/onboarding/user.constants";

// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));


class SuccessMessage extends React.Component{
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
        if(Object.keys(this.props.sendanswerfor_forgotpw).length<1 || this.props.sendanswerfor_forgotpw.fetch_status!==SENDANSWERFOR_FORGOTPW_SUCCESS){
            history.push('/forgot-password');
        }
    }
      

      render(){
        const { answer, submitted, error } = this.state;
        const {alert } = this.props;
        let   sendemailrequest = this.props.sendemailfor_forgotpw;
        return (
            <OnboardingContainer>
                {(Object.keys(this.props.sendemailfor_forgotpw).length>1) &&
                    <div>
                        <div className="row">
                            <div className="col-12">
                                <h3>That's all<span></span></h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="text-center m-b-30">A password reset link has been sent to 
                                    <div>{this.props.sendemailfor_forgotpw.sendmail_status.payload.email}</div>
                                </div>
                            
                                <center>
                                    <button type="button" className="btn-alat"
                                        onClick={(e)=>{
                                            e.preventDefault();
                                            history.push('/');
                                        }}>Done</button>
                                </center>
                                    
                            
                            </div>
                        </div>
                    </div>
                }
            </OnboardingContainer>
        );
    }
}

function mapStateToProps(state) {
      const { alert } = state;
      
      // const { storage } = state.storage_reducer;
    return {
        alert,
        sendemailfor_forgotpw : state.sendemailfor_forgotpw_request,
        sendanswerfor_forgotpw : state.sendanswerfor_forgotpw_request,
    };
}

export default connect(mapStateToProps)(SuccessMessage);