import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import {Redirect } from 'react-router-dom';

import Security from '../../shared/security-question';
import { alertActions } from "../../../../redux/actions/alert.actions";
import * as settingsActions from "../../../../redux/actions/account-settings/export"


class SecurityQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answerValue: "",
            emptyAnswer: false,
            user: JSON.parse(localStorage.getItem("user"))
        };
    }

    componentDidMount() {
        console.warn("I have mounted")
    }

    handleAnswerInput = (event) => {
        if(event.target.value.length > 40){
            return;
        }
        this.setState({answerValue : event.target.value});
    }

    onSubmitAnswer = (event) => {
        event.preventDefault();
        this.props.clearError();
        if(this.state.answerValue.length < 1){
            this.setState({emptyAnswer: true});
            return;
        }else{
            this.setState({emptyAnswer: false});
        }
        let payload = {
            Answer: this.state.answerValue,
            Question: this.props.changePinData.Question
        }
        // console.log(payload)
        this.props.checkAnswerResult(this.state.user.token, payload);

    }


    render() {
        let view = <Redirect to="/settings/pin-management" />;
        if(this.props.changePinData){
            view = (
                <Security
                heading="Change ALAT Pin"
                fetching={this.props.fetching}
                checkAnswer={this.onSubmitAnswer}
                errorMessage={this.props.alert.message}
                question={this.props.changePinData.Question ? this.props.changePinData.Question : "Fetching Question"}
                answer={this.state.answerValue}
                changed={this.handleAnswerInput}
                isEmpty={this.state.emptyAnswer}
            />
            );
        }
        if(this.props.pageState == 0) {
            this.props.resetPageState();
            view = <Redirect to="/settings/pin-management/change/change-pin" />;
        }
        return view;
    }
}

const mapStateToProps = state => {
    return {
        alert: state.alert,
        fetching: state.settings_reducer.isFetching,
        pageState: state.settings_reducer.pageState,
        changePinData: state.settings_reducer.changePinData,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        checkAnswerResult : (token, payload) => dispatch(settingsActions.checkSecurityQuestionAnswerNoOTP(token, payload)),
        resetPageState: () => dispatch(settingsActions.resetPageState()),
        clearError: () => dispatch(alertActions.clear()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SecurityQuestion);