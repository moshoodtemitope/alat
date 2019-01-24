import * as React from 'react';
import {connect, Provider} from "react-redux";
import LoginForm from "./loginForm";
import {ApiService} from "../../shared/apiService";
import {routes} from "../../shared/urls";
import {history} from "../../_helpers";
import {Field, SubmissionError} from "redux-form";
import {NavLink} from "react-router-dom";
import OnboardingContainer from "../Container";
import {userActions} from "../../_actions/user.actions";

// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));


  class Login extends React.Component{
      constructor(props) {
          super(props);
          this.state = {
              email: '',
              password: '',
              error: ''
          };

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
          const { email, password, error } = this.state;
          const { dispatch } = this.props;
          console.log(email);
          console.log(password);
          if (email && password) {
              this.setState({ submitted: true });
              dispatch(userActions.login(email, password));
              /*
              let data = {
                  email: email,
                  password: password,
                  deviceName: 'rdtr',
                  deviceOs: 'uhiu',
                  gcmRegId: '',
                  channelId: 2,
                  deviceCode: 'uytyyt',
                  imei: '123456789012345'
              };

              let consume = ApiService.request(routes.LOGIN, "POST", data);
              console.log(consume);
              return consume.then(function (response){
                  console.log(response);

                  dispatch(success(user));
                  history.push('/dashboard');
              }).catch(err => {
                  // console.log(err.response.data.message);
                  console.log(err.response);
                  this.setState({ submitted: false, error: err.response.data.message });
                  // throw new SubmissionError({ _error: err.response.data.message});
              });
              */
          }
          else{
              this.setState({ submitted: false });
          }
      }


      render(){
        const { email, password, submitted, error } = this.state;
        const { loggingIn } = this.props;
        console.log(this.props);
        return (
            <OnboardingContainer>
                <div className="row">
                    <div className="col-12">
                        <h3>Welcome Back!<span></span></h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">

                        <form className="onboard-form" onSubmit={this.handleSubmit}>
                            {error && <div className="info-label error">{error}</div>}
                            <div className="input-ctn">
                                <label>Email Address/Username</label>
                                <input type="text" name="email" value={email} onChange={this.handleChange} />
                                {submitted && !email &&
                                    <div className="text-danger">Email/Username is required</div>
                                }
                            </div>
                            <div className="input-ctn">
                                <label>Password</label>
                                <input type="password" name="password" value={password} onChange={this.handleChange} />
                                {submitted && !password &&
                                    <div className="text-danger">Password is required</div>
                                }
                            </div>
                            <button type="submit" disabled={submitted} className="btn-alat btn-block">{ submitted ? "Processing..." : "Login" }</button>
                        </form>
                        <p className="text-center">Don't have an account? <NavLink to="/register">Sign up</NavLink></p>
                    </div>
                </div>
            </OnboardingContainer>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}
//
// const connectedLoginPage = connect(mapStateToProps)(Login);
// export { connectedLoginPage as Login };
//

export default connect(mapStateToProps)(Login);
