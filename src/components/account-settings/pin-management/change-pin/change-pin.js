import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Input } from '../../../airtime-bills/data/input';
import Success from '../../shared/success';

import {Redirect } from 'react-router-dom';
import { alertActions } from "../../../../redux/actions/alert.actions";
import * as settingsActions from "../../../../redux/actions/account-settings/export"

const pattern = /^\d+$/;

class ChangePin extends Component {
    state = {
        changeForm: {
            currentPin: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'xxxx'
                },
                value: '',
                label: 'Type your ALAT PIN'
            },
            newPin: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'xxxx'
                },
                value: '',
                label: 'Type a new 4-digit PIN'
            },
            verifyNewPin: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'xxxx'
                },
                value: '',
                touched: false,
                label: 'Confirm your new PIN'
            },
        },
        validation: {
            pinDigit: {
                currentDigit: false,
                newDigit: false,
                verifyDigit: false,
            },
            required: {
                currentEmpty: false,
                newEmpty: false,
                verifyEmpty: false,
            },
            notSame: false,
            isSamePin: false
        },
        user: JSON.parse(localStorage.getItem("user")),
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedChangeForm = {
            ...this.state.changeForm
        };
        const updatedFormElement = {
            ...updatedChangeForm[inputIdentifier]
        };

        let validation = { ...this.state.validation };

        if (this.state.changeForm.currentPin.value != this.state.changeForm.newPin.value) {
            validation.isSamePin = false;
        }
        // validation logic
        if (event.target.value.length >= 1) {
            if (!pattern.test(event.target.value) || event.target.value.length > 4) {
                return;
            }
        }
        updatedFormElement.value = event.target.value;
        if (inputIdentifier == "currentPin") {
            validation.required.currentEmpty = false;
            if (updatedFormElement.value.length != 4) {
                validation.pinDigit.currentDigit = true;
            } else {
                validation.pinDigit.currentDigit = false;
            }
        } else if (inputIdentifier == "newPin") {
            validation.required.newEmpty = false;
            if (updatedFormElement.value.length != 4) {
                validation.pinDigit.newDigit = true;
            } else {
                validation.pinDigit.newDigit = false;
            }
            if (updatedChangeForm.verifyNewPin.touched) {
                if (updatedFormElement.value != this.state.changeForm.verifyNewPin.value) {
                    validation.notSame = true;
                } else validation.notSame = false;
            }
        } else if (inputIdentifier == "verifyNewPin") {
            updatedFormElement.touched = true;
            validation.required.verifyEmpty = false;
            if (updatedFormElement.value.length != 4) {
                validation.pinDigit.verifyDigit = true;
            } else {
                validation.pinDigit.verifyDigit = false;
            }
            if (updatedFormElement.value != this.state.changeForm.newPin.value) {
                validation.notSame = true;
            } else validation.notSame = false;
        }

        // console.log(updatedChangeForm.verifyNewPassword.touched);
        // validation.format = format;
        updatedChangeForm[inputIdentifier] = updatedFormElement;
        this.setState({ changeForm: updatedChangeForm, validation });
    }

    onSubmitForm = (event) => {
        event.preventDefault();
        this.props.clearError();
        let validation = { ...this.state.validation };
        let formData = { ...this.state.changeForm };
        if (formData.currentPin.value == '' || formData.newPin.value == '' || formData.verifyNewPin.value == '') {
            if (formData.currentPin.value == '') validation.required.currentEmpty = true;
            if (formData.newPin.value == '') validation.required.newEmpty = true;
            if (formData.verifyNewPin.value == '') validation.required.verifyEmpty = true;
            this.setState({ validation });
            return;
        }
        if (validation.pinDigit.newDigit || validation.pinDigit.currentDigit || validation.pinDigit.verifyDigit) return;
        if (validation.isSamePin || this.state.changeForm.currentPin.value == this.state.changeForm.newPin.value) {
            validation.isSamePin = true;
            this.setState({ validation });
            return;
        }
        let payload = {
            NewPinNumber: this.state.changeForm.newPin.value,
            PinNumber: this.state.changeForm.currentPin.value
        }
        // console.log("submited", payload)
        this.props.onChangeAlatPin(this.state.user.token, payload);
    }

    goHome = (event) => {
        event.preventDefault();
        this.props.clearPinManagementData();
    }

    render() {
        const formElementArray = [];
        const { validation } = this.state;
        for (let key in this.state.changeForm) {
            formElementArray.push({
                id: key,
                config: this.state.changeForm[key],
            })
        };
        let form = <Redirect to="/settings/pin-management" />;
        if (this.props.changePinData) {

            form = (
                <Fragment>

                    <div className="col-sm-12">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="max-600">
                                    <div className="al-card no-pad">
                                        <h4 className="m-b-10 center-text hd-underline">Change ALAT PIN</h4>
                                        <div className="transfer-ctn">
                                            <form>
                                                <div className="no-pad text-center" style={{ padding: "0 10px 10px 10px" }}>
                                                    <p className="s-info" style={{ color: "#A6A6A6" }}>Keep your PIN safe and confidential at all times. Do not use easily guessable PINs like 0000 or 1234 etc.</p>
                                                </div>
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
                                                                wrongInput={!formElement.config.valid}
                                                                isTouched={formElement.config.touched}
                                                                errormsg={formElement.config.error}
                                                            />

                                                            {formElement.id == "currentPin" && validation.pinDigit.currentDigit ? <span className="text-danger">Pin must be four digits</span> : formElement.id == "currentPin" && validation.required.currentEmpty ? <span className="text-danger">Field is required</span> : null}

                                                            {formElement.id == "newPin" && validation.pinDigit.newDigit ? <span className="text-danger">Pin must be four digits</span> : formElement.id == "newPin" && validation.required.newEmpty ? <span className="text-danger">Field is required</span> : null}

                                                            {formElement.id == "verifyNewPin" && validation.notSame ? <span className="text-danger">Pin doesn't match</span> : formElement.id == "verifyNewPin" && validation.required.verifyEmpty ? <span className="text-danger">Field is required</span> : null}
                                                        </div>
                                                    )
                                                })}

                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <center>
                                                            {validation.isSamePin ? <p className="text-danger">Old and new pin cannot be the same</p> : null}
                                                            <button disabled={this.props.fetching} onClick={this.onSubmitForm} className="btn-alat m-t-10 m-b-20 text-center">{this.props.fetching ? "Processing..." : "Change PIN"}</button>
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
        }
        if (this.props.pageState == 0) {
            form = <Success
                message="PIN changed Successfully"
                homeUrl="/settings/change-password"
                isActionButton={true}
                clicked={this.goHome}
            />
        }

        return form;
    }
}


const mapStateToProps = state => {
    return {
        alert: state.alert,
        fetching: state.settings_reducer.isFetching,
        pageState: state.settings_reducer.pageState,
        changePinData: state.settings_reducer.changePinData,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onChangeAlatPin: (token, payload) => dispatch(settingsActions.changeAlatPin(token, payload)),
        resetPageState: () => dispatch(settingsActions.resetPageState()),
        clearError: () => dispatch(alertActions.clear()),
        clearPinManagementData: () => dispatch(settingsActions.clearChangePinData())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePin);