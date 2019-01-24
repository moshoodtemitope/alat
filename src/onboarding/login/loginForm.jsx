import {Field, reduxForm} from "redux-form";
import * as React from "react";
import {NavLink} from "react-router-dom";
import { SubmissionError } from 'redux-form';
import {routes} from "../../shared/urls";
import { ApiService } from "../../shared/apiService";
import {history} from "../../_helpers";
// import createHistory from "history/createBrowserHistory";
// import { Redirect } from 'react-router'
// import { Redirect } from 'react-router';
// import {render} from "react-dom";
// const axios = require('axios');

let valid = true;
let submitting = false;
// var createBrowserHistory = require('history').createBrowserHistory;


function validate(values){
        submitting = true;
        if (!values.email) {
            valid = false;
            submitting = false;
            throw new SubmissionError({
                email: 'Enter a user email/username',
                _error: 'Please enter a username or email',
            });
        } else if (!values.password) {
            valid = false;
            submitting = false;
            throw new SubmissionError({
                password: 'Enter a password',
                _error: 'Please enter your password',
            });
        } else {
            let data = {
                email: values.email,
                password: values.password,
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
                history.push('/dashboard');
                // return history.('/login');
                // return browserHistory.push('/sign-up');
                // console.log(response.data.fullName);
            }).catch(err => {
                // console.log(err.response.data.message);
                console.log(err.response);
                submitting = false;
                throw new SubmissionError({ _error: err.response.data.message});
            });
            // console.log(consume);

            // if(consume.resp == 200){
            //     console.log("lets redirect");
            // }
            // else{
            //     throw new SubmissionError({ _error: consume.error.response.data.message || consume.error.response.data});
            // }
            // axios.defaults.headers.common['alat-client-apiKey'] = 'ERTojertoijertoijert';
            // axios.defaults.headers.common['Content-Type'] = 'application/json';
            // return axios.post(routes.LOGIN,
            //     {
            //         email: values.email,
            //         password: values.password,
            //         deviceName: 'rdtr',
            //         deviceOs: 'uhiu',
            //         gcmRegId: '',
            //         channelId: 2,
            //         deviceCode: 'uytyyt',
            //         imei: '123456789012345'
            //     })
            // .then(function (response) {
            //     //success
            //     console.log(response);
            //
            //     // return (<Redirect push to="/dashboard" />);
            //
            //     // return createBrowserHistory.push('/dashboard');
            //
            //     // window.history.pushState('', '', '/dashboard');
            //
            //     // history.push('new/path/here/');
            //
            //     // return <Redirect to="/sign-up" push />;
            //
            //     // return push('/sign-up');
            //
            //
            //
            // })
            // .catch(function (error) {
            //     submitting = false;
            //     throw new SubmissionError({ _error: error.response.data.message});
            // });
        }
}


const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div className="input-ctn">
        <div className={ valid ? "" : "form-error" }>
            <input {...input} placeholder={label} type={type} className={ valid ? "" : "form-error" } />
            {touched && error && <span className="form-error"> <span className="error">{error}</span></span>}
        </div>
    </div>
);


const LoginForm = props => {
    const { handleSubmit, error, touched } = props;
    return (
        <div className="row">
            <div className="col-12">
                {error && <div className="info-label error">{error}</div>}
                <form className="onboard-form" onSubmit={handleSubmit(validate)}>

                        <label>Email Address/Username</label>
                        <Field type="text" component={renderField} name="email" error={!!(touched && error)} />

                        <label>Password</label>
                        <Field type="password" component={renderField} name="password" className="" error={!!(touched && error)}/>

                    <button type="submit" disabled={submitting} className="btn-alat btn-block">{ submitting ? "Processing..." : "Login" }</button>
                </form>
                <p className="text-center">Don't have an account? <NavLink to="/register">Sign up</NavLink></p>
            </div>
        </div>
    );
};

export default reduxForm({
    form: 'login', // a unique identifier for this form
})(LoginForm);