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

    
      

      render(){
        const { answer, submitted, error } = this.state;
        const {alert } = this.props;
        return (
            <OnboardingContainer>
                <div className="row">
                    <div className="col-12">
                        <h3>That's all<span></span></h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="text-center m-b-30">A password reset link has been sent to 
                            <div>temitpoe@gmail.com</div>
                        </div>
                       
                        <center>
                            <button type="submit" className="btn-alat">Done</button>
                        </center>
                            
                       
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
        alert
    };
}

export default connect(mapStateToProps)(SuccessMessage);