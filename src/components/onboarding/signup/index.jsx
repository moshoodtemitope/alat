import * as React from 'react';
import { NavLink} from "react-router-dom";
// import {ApiService} from "../../shared/apiService";
// import {routes} from "../../shared/urls";
import {history} from "./../../../_helpers/history";
import {SubmissionError} from "redux-form";
// import {userActions} from "../../_actions";
import OnboardingContainer from "../Container";
import {ApiService} from "../../../services/apiService";
import {routes} from "../../../services/urls";

class Signup extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            error: '',
            formError: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        // const { name, value } = e.target;
        const re = /^[0-9\b]+$/;
        // this.setState({ [name]: value });
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({phone: e.target.value});
        }

    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { phone, error, formError } = this.state;
        const { dispatch } = this.props;
        console.log(phone);
        if(!phone || phone.length < 11){
            console.log("in here");
            this.setState({ formError: true });
            console.log(this.state);
            this.setState({ submitted: false });
            return;
        }
        if (phone) {
            let data = {
                PhoneNo: phone,
                channelId: 2
            };

            let consume = ApiService.request(routes.SIGNUP_PHONE, "POST", data);
            console.log(consume);
            return consume.then(function (response){
                console.log(response);
                history.push('/onboarding/bvn');
            }).catch(err => {
                // console.log(err.response.data.message);
                console.log(err.response);
                this.setState({ submitted: false, error: err.response.data.message});
                // throw new SubmissionError({ _error: err.response.data.message});
            });
        }

    }

    render(){
        const { phone, submitted, error, formError } = this.state;
        return (
            <OnboardingContainer>
                <div className="row">
                    <div className="col-12">
                        <h3>Hello there!<span></span></h3>
                        <p>We’re so glad you’re ready to come onboard. Let’s start by getting to know you better.</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <form className="onboard-form" onSubmit={this.handleSubmit}>
                            {error && <div className="info-label error">{error}</div>}
                            <div className={ !formError ? "input-ctn" : "input-ctn form-error" }>
                                <label>Please enter your phone number</label>
                                <input type="text" pattern="\d*" maxLength="20" name="phone" value={phone} onChange={this.handleChange} placeholder="08123456789" />
                                {formError &&
                                    <div className="text-danger">A Valid phone Number is required</div>
                                }
                            </div>
                            <button type="submit" disabled={submitted} className="btn-alat btn-block">{ submitted ? "Processing..." : "Get Started" }</button>
                        </form>
                        <p className="text-center">Already have an account? <NavLink to="/login">Login</NavLink></p>
                    </div>
                </div>
            </OnboardingContainer>
        );
    }
}

export default Signup

//
// ReactDom.render(
//     <Signup />,
//     document.getElementById('root')
// );