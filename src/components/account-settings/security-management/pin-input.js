import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Input } from '../../airtime-bills/data/input';

import { Redirect } from 'react-router-dom';
import { alertActions } from "../../../redux/actions/alert.actions";
import * as settingsActions from "../../../redux/actions/account-settings/export";

const pattern = /^\d+$/;

class PinInput extends Component {
    state = {
        pinForm: {
            pin: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'xxxx'
                },
                value: '',
                label: 'Enter ypur ALAT PIN'
            },
        },
        validation: {
            pinDigit: false,
            pinEmpty: false
        },
        user: JSON.parse(localStorage.getItem("user")),
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedPinForm = {
            ...this.state.pinForm
        };
        const updatedFormElement = {
            ...updatedPinForm[inputIdentifier]
        };

        let validation = { ...this.state.validation };

        // validation logic
        if (event.target.value.length >= 1) {
            if (!pattern.test(event.target.value) || event.target.value.length > 4) {
                return;
            }
        }
        updatedFormElement.value = event.target.value;
        validation.pinEmpty = false;
        if (updatedFormElement.value.length != 4) {
            validation.pinDigit = true;
        } else {
            validation.pinDigit = false;
        }

        updatedPinForm[inputIdentifier] = updatedFormElement;
        this.setState({ pinForm: updatedPinForm, validation });
    }

    onSubmitForm = (event) => {
        event.preventDefault();
        this.props.clearError();
        let validation = { ...this.state.validation };
        let formData = { ...this.state.pinForm };
        if (formData.pin.value == '') {
            validation.pinEmpty = true;
            this.setState({ validation });
            return;
        }
        if (validation.pinDigit) return;
        let payload = {
            pin: this.state.pinForm.pin.value
        }
        // console.log("submited", payload)
        this.props.onSubmitPin(this.state.user.token, payload);
    }

    goHome = (event) => {
        event.preventDefault();
        this.props.clearPinManagementData();
    }

    render() {
        const formElementArray = [];
        const { validation } = this.state;
        for (let key in this.state.pinForm) {
            formElementArray.push({
                id: key,
                config: this.state.pinForm[key],
            })
        };
        let form = (
            <Fragment>

                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="max-600">
                                <div className="al-card no-pad">
                                    <h4 className="m-b-10 center-text hd-underline">Security Questions</h4>
                                    <div className="transfer-ctn">
                                        <form>
                                            {(this.props.alert.message) ?
                                                <div className="info-label error">{this.props.alert.message}</div> : null
                                            }
                                            {formElementArray.map((formElement) => {
                                                return (
                                                    <div className="input-ctn" key={formElement.id}>
                                                        <label>{formElement.config.label}</label>
                                                        <Input
                                                            elementType={formElement.config.elementType}
                                                            elementConfig={formElement.config.elementConfig}
                                                            value={formElement.config.value}
                                                            changed={(event) => this.inputChangedHandler(event, formElement.id)}
                                                        />

                                                        {validation.pinDigit ? <span className="text-danger">Pin must be four digits</span> : validation.pinEmpty ? <span className="text-danger">Field is required</span> : null}
                                                    </div>
                                                )
                                            })}

                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <center>
                                                        <button disabled={this.props.fetching} onClick={this.onSubmitForm} style={{ width: "100%" }} className="btn-alat m-t-10 m-b-20">{this.props.fetching ? "Processing..." : "Continue"}</button>
                                                    </center>
                                                </div>
                                            </div>
                                        </form>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
        if(this.props.pageState == 0){
            this.props.resetPageState()
            form = <Redirect to="/settings/security-questions/questions" />
        }
                                          
        return form;
    }
}


const mapStateToProps = state => {
    return {
        alert: state.alert,
        fetching: state.settings_reducer.isFetching,
        pageState: state.settings_reducer.pageState,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSubmitPin: (token, payload) => dispatch(settingsActions.getAllSecurityQuestions(token, payload)),
        resetPageState: () => dispatch(settingsActions.resetPageState()),
        clearError: () => dispatch(alertActions.clear()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PinInput);