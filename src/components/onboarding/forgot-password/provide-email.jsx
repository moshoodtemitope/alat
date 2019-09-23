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
          this.handleChange = this.handleChange.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleChange(e) {
          const { name, value } = e.target;
          this.setState({ [name]: value });
      }

      // validateForm(email, password) {
      //       const errors = [];
      //       if (email.length < 1) {
      //           this.setState({ hasErrors: true });
      //           //this.setState(this.state.errors.email, "Email or Username is required to ProvideEmail into your account");
      //           // this.setState(this.state.errors.email, {array: {$push: ["First"]}});
      //           errors['email'] = "Email or Username is required to login into your account";
      //       }
      //       // if (email.split("").filter(x => x === "@").length !== 1) {
      //       //     errors.push("Email should contain a @");
      //       // }
      //       // if (email.indexOf(".") === -1) {
      //       //     errors.push("Email should contain at least one dot");
      //       // }
      //       if (password.length < 1) {
      //           this.setState({ hasErrors: true });
      //           errors['password'] = "Password is required";
      //           //this.setState(this.state.errors.password, "Password is required");
      //       }
      //       // console.log(errors);
      //       return errors;
      // }

      handleSubmit(e) {
          e.preventDefault();
          this.setState({ submitted: true });
          const { email, password } = this.state;
          const { dispatch } = this.props;
          if (email && password) {
              this.setState({ submitted: true });
              dispatch(userActions.login(email, password));
          }
          else{
              this.setState({ submitted: false });
          }
      }

      render(){
        const { email, submitted, error } = this.state;
        const {alert } = this.props;
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
                        {alert && alert.message && !alert.message.includes("'closed'") &&
                        <div className={`info-label ${alert.type}`}>{alert.message}</div>
                        }
                        <form className="onboard-form" onSubmit={this.handleSubmit}>
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
                            <button type="submit" className="btn-alat btn-block">Submit</button>
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
        alert
    };
}

export default connect(mapStateToProps)(ProvideEmail);