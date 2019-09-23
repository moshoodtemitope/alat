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


class ProvideSecurityAnswer extends React.Component{
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
          
          //dispatch(userActions.logout());
          this.handleChange = this.handleChange.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleChange(e) {
          const { name, value } = e.target;
          this.setState({ [name]: value });
      }

      

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
        const { answer, submitted, error } = this.state;
        const {alert } = this.props;
        return (
            <OnboardingContainer>
                <div className="row">
                    <div className="col-12">
                        <h3>Forgot Password<span></span></h3>
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
                                <label>security question?</label>
                                <Textbox
                                    tabIndex="1"
                                    id={'securityanswer'}
                                    name="securityanswer"
                                    type="password"
                                    value={answer}
                                    onChange={(answer, e) => {
                                        this.setState({ answer });
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

export default connect(mapStateToProps)(ProvideSecurityAnswer);