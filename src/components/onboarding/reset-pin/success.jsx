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
    SEND_NEWPIN_FORPINRESET_SUCCESS,
    SEND_NEWPIN_FORPINRESET_PENDING,
    SEND_NEWPIN_FORPINRESET_FAILURE,} from "../../../redux/constants/onboarding/user.constants";

// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));


class ResetPinSuccessMessage extends React.Component{
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
        if(Object.keys(this.props.send_newpinforpinreset).length<1 || this.props.send_newpinforpinreset.fetch_status!==SEND_NEWPIN_FORPINRESET_SUCCESS){
            history.push('/');
        }
    }
      

      render(){
        
        return (
            <OnboardingContainer>
                    <div>
                        <div className="row">
                            <div className="col-12">
                                <h3>That's all<span></span></h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="text-center m-b-30">
                                    <div>You have successfully changed your ALAT Pin</div>
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
            </OnboardingContainer>
        );
    }
}

function mapStateToProps(state) {
      const { alert } = state;
      
      // const { storage } = state.storage_reducer;
    return {
        alert,
        send_newpinforpinreset : state.send_newpinforpinreset_request,
    };
}

export default connect(mapStateToProps)(ResetPinSuccessMessage);