import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { alertActions } from "../../../redux/actions/alert.actions";
import * as settingsActions from "../../../redux/actions/account-settings/export"

class Index extends Component {
    state = {
        clicked: "",
        user: JSON.parse(localStorage.getItem("user")),
    }

    componentDidMount() {
        this.props.clearPinManagementData();
    }

    onChangePin = (event) => {
        event.preventDefault();
        this.props.clearError();
        this.setState({ clicked: "change" }, () => this.props.onClickPinOption(this.state.user.token));
    }

    onForgotPin = (event) => {
        event.preventDefault();
        this.props.clearError();
        this.setState({ clicked: "forgot" }, () => this.props.onClickPinOptionForgot(this.state.user.token));
    }


    render() {
        let view = (
            <Fragment>
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="max-600">
                                <div className="al-card no-pad">
                                    <h4 className="m-b-10 center-text hd-underline">ALAT Pin Management</h4>
                                    <div className="transfer-ctn" style={{padding: "30px 100px 0 100px"}}>
                                        {(this.props.alert.message) ?
                                            <div className="info-label error">{this.props.alert.message}</div> : null
                                        }
                                        <div className="no-pad text-center" style={{ padding: "0" }}>
                                            <p className="s-info" style={{ fontSize: 18, color: "#A6A6A6" }}>Keep your PIN safe and confidential at all times. Do not use easily guessable PINs like 0000 or 1234 etc.</p>
                                        </div>

                                        
                                    </div>
                                    <div className="transfer-ctn" style={{margin: "0 100px 0 100px"}}>
                                            <div className="col-sm-12 m-b-20" style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }} >
                                                {/* <center> */}
                                                <button disabled={this.props.fetching} style={{minWidth:190}} onClick={this.onChangePin} className="btn-alat mx-2 ">{this.props.fetching ? "Processing..." : "Change ALAT PIN"}</button>
                                                <button disabled={this.props.fetching} style={{minWidth:190}} onClick={this.onForgotPin} className="btn-alat mx-2 ">{this.props.fetching ? "Processing..." : "Forgot ALAT PIN"}</button>
                                                {/* </center> */}
                                            </div>
                                        </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
        if (this.props.pageState == 0) {
            if (this.state.clicked == "change") {
                view = <Redirect to="/settings/pin-management/change/security-question" />
            } else {
                view = <Redirect to="/settings/pin-management/forgot/security-question" />
            }
            this.props.resetPageState();
        }
        return view;
    }
}

const mapStateToProps = state => {
    return {
        alert: state.alert,
        fetching: state.settings_reducer.isFetching,
        pageState: state.settings_reducer.pageState,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onClickPinOption: (token) => dispatch(settingsActions.getSecurityQuestion(token)),
        onClickPinOptionForgot: (token) => dispatch(settingsActions.getSecurityQuestionForgot(token)),
        resetPageState: () => dispatch(settingsActions.resetPageState()),
        clearError: () => dispatch(alertActions.clear()),
        clearPinManagementData: () => dispatch(settingsActions.clearChangePinData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);