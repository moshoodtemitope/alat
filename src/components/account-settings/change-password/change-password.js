import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Input } from '../../airtime-bills/data/input';
import Success from '../success';
import { alertActions } from "../../../redux/actions/alert.actions";
import * as settingsActions from "../../../redux/actions/account-settings/export"

const pattern = /^\d+$/;
const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

class ChangePassword extends Component {
    state = {
        changeForm: {
            currentPassword: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'xxxxxxxx'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                label: 'Enter Current Password'
            },
            newPassword: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'xxxxxxxx'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                label: 'Enter New Password'
            },
            verifyNewPassword: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'xxxxxxxx'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                label: 'Verify New Password'
            },
            pin: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'xxxx'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                label: 'ALAT Pin'
            },
        },
        validation: {
            pinDigit: false,
            required: {
                currentEmpty: false,
                newEmpty: false,
                verifyEmpty: false,
                pinEmpty: false
            },
            format: {
                invalidCurrent: false,
                invalidNew: false,
            },
            notSame: false,
            isSamePassword: false
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
        let format = { ...validation.format }
        if (this.state.changeForm.currentPassword.value != this.state.changeForm.newPassword.value) {
            validation.isSamePassword = false;
        }
        // validation logic
        if (inputIdentifier == "pin") {
            updatedFormElement.value = event.target.value;
            validation.required.pinEmpty = false;
            if (updatedFormElement.value.length >= 1) {
                if (!pattern.test(updatedFormElement.value) || updatedFormElement.value.length > 4) {
                    return;
                }
            }
            if (inputIdentifier == "pin" && updatedFormElement.value.length != 4) {
                validation.pinDigit = true;
            } else {
                validation.pinDigit = false;
            }
        } else {
            updatedFormElement.value = event.target.value;
            if (updatedFormElement.value.length > 30) {
                return;
            }
            if (inputIdentifier == "currentPassword") {
                validation.required.currentEmpty = false
                if (!passwordPattern.test(updatedFormElement.value)) {
                    format.invalidCurrent = true
                } else format.invalidCurrent = false;
            } else if (inputIdentifier == "newPassword") {
                validation.required.newEmpty = false
                if(updatedChangeForm.verifyNewPassword.touched){
                    if (updatedFormElement.value != this.state.changeForm.newPassword.value) {
                        validation.notSame = true;
                    } else validation.notSame = false;
                }
                if (!passwordPattern.test(updatedFormElement.value)) {
                    format.invalidNew = true
                } else format.invalidNew = false;
            } else if (inputIdentifier == "verifyNewPassword") {
                updatedChangeForm.verifyNewPassword.touched = true;
                validation.required.verifyEmpty = false
                if (updatedFormElement.value != this.state.changeForm.newPassword.value) {
                    validation.notSame = true;
                } else validation.notSame = false;
            }
        }
        console.log(updatedChangeForm.verifyNewPassword.touched);
        validation.format = format;
        updatedChangeForm[inputIdentifier] = updatedFormElement;
        this.setState({ changeForm: updatedChangeForm, validation });
    }

    onSubmitForm = (event) => {
        event.preventDefault();
        this.props.clearError();
        let validation = { ...this.state.validation };
        let formData = { ...this.state.changeForm };
        if (formData.currentPassword.value == '' || formData.newPassword.value == '' || formData.verifyNewPassword.value == '' || formData.pin.value == '') {
            if (formData.currentPassword.value == '') validation.required.currentEmpty = true;
            if (formData.newPassword.value == '') validation.required.newEmpty = true;
            if (formData.verifyNewPassword.value == '') validation.required.verifyEmpty = true;
            if (formData.pin.value == '') validation.required.pinEmpty = true;
            this.setState({ validation });
            return;
        }
        if (validation.pinDigit) return;
        if (validation.isSamePassword || this.state.changeForm.currentPassword.value == this.state.changeForm.newPassword.value) {
            validation.isSamePassword = true;
            this.setState({ validation });
            return;
        }
        // if (this.state.changeForm.newPassword.value != this.state.changeForm.verifyNewPassword.value) {
        //     validation.notSame = true;
        //     this.setState({ validation });
        //     return;
        // };
        let payload = {
            CurrentPassword: this.state.changeForm.currentPassword.value,
            NewPassword: this.state.changeForm.newPassword.value,
            Pin: this.state.changeForm.pin.value
        }
        console.log("submited", payload)
        this.props.onChangePassword(this.state.user.token, payload);
    }

    goHome = (event) => {
        event.preventDefault();
        this.props.resetPageState()
    }

    render() {
        const formElementArray = [];
        const { validation } = this.state;
        for (let key in this.state.changeForm) {
            formElementArray.push({
                id: key,
                config: this.state.changeForm[key],
            })
        }
        let form = (
            <Fragment>

                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="max-600">
                                <div className="al-card no-pad">
                                    <h4 className="m-b-10 center-text hd-underline">Change Password</h4>
                                    <div className="transfer-ctn">
                                        <form>
                                            <div class="no-pad text-center" style={{ padding: "0 10px 10px 10px" }}>
                                                <p className="s-info">To make your password secure, make sure you use <b>at least 8 characters</b> which <b>must include letters, numbers & special characters.</b></p>
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
                                                        // isDisabled={formElement.config.isDisabled} 
                                                        />

                                                        {formElement.id == "pin" && validation.pinDigit ? <span className="text-danger">Password must be four digits</span> : formElement.id == "pin" && validation.required.pinEmpty ? <span className="text-danger">Field is required</span> : null}

                                                        {formElement.id == "currentPassword" && validation.format.invalidCurrent ? <span className="text-danger">Invalid password format</span> : formElement.id == "currentPassword" && validation.required.currentEmpty ? <span className="text-danger">Field is required</span> : null}

                                                        {formElement.id == "newPassword" && validation.format.invalidNew ? <span className="text-danger">Invalid password format</span> : formElement.id == "newPassword" && validation.required.newEmpty ? <span className="text-danger">Field is required</span> : null}

                                                        {formElement.id == "verifyNewPassword" && validation.notSame ? <span className="text-danger">Password doesn't match</span> : formElement.id == "verifyNewPassword" && validation.required.verifyEmpty ? <span className="text-danger">Field is required</span> : null}
                                                    </div>
                                                )

                                            })}

                                            <div class="row">
                                                <div class="col-sm-12">
                                                    <center>
                                                        {validation.isSamePassword ? <p className="text-danger">Old and new password cannot be the same</p> : null}
                                                        <button disabled={this.props.fetching} onClick={this.onSubmitForm} class="btn-alat m-t-10 m-b-20 text-center">{this.props.fetching ? "Processing..." : "Buy Data"}</button>
                                                    </center>
                                                </div>
                                            </div>

                                        </form>
                                    </div>

                                </div>

                                {/* <center>
                                    <button onClick={this.goBack} className="add-bene m-t-50 goback">Go Back</button>
                                </center> */}
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
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
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onChangePassword: (token, payload) => dispatch(settingsActions.changePassword(token, payload)),
        resetPageState: () => dispatch(settingsActions.resetPageState()),
        clearError: () => dispatch(alertActions.clear()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);