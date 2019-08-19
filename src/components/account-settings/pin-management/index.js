import React, { Component, Fragment } from 'react';
import {Link } from 'react-router-dom';
import { connect } from 'react-redux'; 

import { alertActions } from "../../../redux/actions/alert.actions";
import * as settingsActions from "../../../redux/actions/account-settings/export"

class PinManagement extends Component {
    state = {
        user: JSON.parse(localStorage.getItem("user")),
    }

    onChangePin = (event) => {
        event.preventDefault();
        this.props.onClickPinOption(this.state.user.token);
        this.history.push("/settings/pin-management/changepin")
    }

    onForgotPin = (event) => {
        event.preventDefault();
        this.props.onClickPinOption(this.state.user.token);
        this.history.push("/settings/pin-management/forgotpin")
    }


    render() {
        return (
            <Fragment>

                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="max-600">
                                <div className="al-card no-pad">
                                    <h4 className="m-b-10 center-text hd-underline">ALAT Pin Management</h4>
                                    <div className="transfer-ctn">
                                        <div className="no-pad text-center" style={{ padding: "0 10px 10px 10px" }}>
                                            <p className="s-info" style={{ fontSize: 18, color: "#A6A6A6" }}>Keep your PIN safe and confidential at all times. Do not use easily guessable PINs like 0000 or 1234 etc.</p>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-12 m-b-20">
                                                <center>
                                                    <button disabled={this.props.fetching} onClick={this.onChangePin} className="btn-alat m-t-10 m-b-20 text-center">{this.props.fetching ? "Processing..." : "Change ALAT PIN"}</button>
                                                    <button disabled={this.props.fetching} onClick={this.onForgotPin} className="btn-alat m-t-10 m-b-20 text-center">{this.props.fetching ? "Processing..." : "Change ALAT PIN"}</button>
                                                </center>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}


const mapStateToProps = state => {
    return{
        alert: state.alert,
        fetching: state.settings_reducer.isFetching,
        pageState: state.settings_reducer.pageState,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onClickPinOption: (token) => dispatch(settingsActions.getSecurityQuestion(token)),
        // resetPageState: () => dispatch(settingsActions.resetPageState()),
        clearError: () => dispatch(alertActions.clear()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PinManagement);