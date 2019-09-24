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
    SENDEMAILFOR_FORGOTPW_SUCCESS,
    SENDEMAILFOR_FORGOTPW_PENDING,
    SENDEMAILFOR_FORGOTPW_FAILURE} from "../../../redux/constants/onboarding/user.constants";

// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));


class ProvideEmail extends React.Component{
      constructor(props) {
          super(props);
          this.state = {
              email: '',
              password: '',
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
          
          //dispatch(userActions.logout());
        //   this.handleChange = this.handleChange.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
      }

    //   handleChange(e) {
    //       const { name, value } = e.target;
    //       this.setState({ [name]: value });
    //   }

      

      handleSubmit(e) {
          e.preventDefault();
          this.setState({ submitted: true });
          const { email} = this.state;
          const { dispatch } = this.props;
          if (email.length>=7) {
              this.setState({ submitted: true });
              dispatch(userActions.sendForgotPwEmail({email}));
          }
          else{
              this.setState({ submitted: false });
          }
      }

      render(){
        const { email, submitted, error } = this.state;
        const {alert } = this.props;
        let   sendemailrequest = this.props.sendemailfor_forgotpw;
        return (
            <OnboardingContainer>
                <div className="row">
                    <div className="col-12">
                        <h3>Forgot Password<span></span></h3>
                    </div>
                    <div className="col-12">
                        <p>
                        Type the email connected to your ALAT account
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <form className="onboard-form" onSubmit={this.handleSubmit}>
                        {(sendemailrequest.is_processing===false && sendemailrequest.fetch_status===SENDEMAILFOR_FORGOTPW_FAILURE)&&
                            <div className="info-label error">{sendemailrequest.sendmail_status.error}</div>
                        }
                            {error && <div className="info-label error">{error}</div>}
                            <div className="input-ctn">
                                <label>Email Address</label>
                                <Textbox
                                    tabIndex="1"
                                    id={'email'}
                                    name="email"
                                    type="text"
                                    value={email}
                                    onChange={(email, e) => {
                                        this.setState({ email });
                                    }}
                                    onBlur={(e) => {}}
                                    validationOption={{
                                        name: 'Email/username',
                                        check: true, 
                                        required: true 
                                    }}
                                />
                            </div>
                            <button type="submit" disabled={sendemailrequest.is_processing} 
                                    className="btn-alat btn-block">{sendemailrequest.is_processing?'Please wait...':'Submit'}</button>
                        </form>
                        <p className="text-center"> <NavLink to="/">Back</NavLink></p>
                        <p className="text-center m-t-20">Need help? <a target="_blank" href="http://www.alat.ng/contact-us">We are here for you</a></p>
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
        sendemailfor_forgotpw : state.sendemailfor_forgotpw_request,
    };
}

export default connect(mapStateToProps)(ProvideEmail);