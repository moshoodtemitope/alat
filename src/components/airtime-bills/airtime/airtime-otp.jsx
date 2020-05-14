import React from 'react';
import { connect } from 'react-redux';
import OtpValidation from '../../../shared/components/otpvalidation';
import { airtimeConstants } from '../../../redux/constants/airtime/airtime.constants';
import { airtimeWebPinOTPpayment, airtimeWebPinpayment } from '../../../redux/actions/airtime-bill/airtime.action';

class AirtimeOtp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            bill: {
                OTP: ""
            }
        }
        this.onReSubmit = this.onReSubmit.bind(this);
        this.getBillinfo();
    }

    getBillinfo() {
        let props = this.props
        if (this.props.airtime.airtime_buydata == airtimeConstants.AIRTIME_WEBPIN_SUCCESS) {
            var bill = {
                ...this.props.airtime.airtime_buydata_data.obj.request
            };
            this.setState({ bill: bill });

        } else {
            //commented for test purposes
            this.props.history.push("/bills/airtime/buy");
        }
    }

    returnOtpValidationMsg() {
        // console.log(this.props.airtime.airtime_buydata_data);
        if (this.props.airtime.airtime_buydata_data) {
                if (this.props.airtime.airtime_buydata_data.obj) {
                    return this.props.airtime.airtime_buydata_data.obj.response.ValidationMsg;
                }
                else return "";
        }else return "";
    }
    onSubmit = (otp) => {
        var bill = {
            ...this.props.airtime.airtime_buydata_data.obj.request
        }
        bill.OTP = otp.TransactionPin;
        this.setState({ bill: bill }, () => {
            this.props.dispatch(airtimeWebPinOTPpayment(this.state.user.token, bill))
        }
        );
    }

    onReSubmit() {
        var bill = {
            ...this.props.airtime.airtime_buydata_data.obj.request
        }
        this.props.dispatch(airtimeWebPinpayment(this.state.user.token, bill));
    }

    render() {
        if (this.props.airtime_otp.airtime_buydata == airtimeConstants.AIRTIME_WEBPIN_OTP_SUCCESS)
            this.props.history.push("/bills/airtime/done");

        return (
            <OtpValidation
                backLink={"/bills/airtime/select-account"}
                forwardLink={"bills/airtime/done"}
                submitAction={this.onSubmit}
                maxLength={6}
                ActionText="Confirm"
                busyAction={this.props.airtime_otp.airtime_buydata == airtimeConstants.AIRTIME_WEBPIN_OTP_PENDING}
                retryAction={this.onReSubmit}
                onResubmitBusyAction={this.props.airtime.airtime_buydata == airtimeConstants.AIRTIME_WEBPIN_PENDING}
                displayMessage={this.returnOtpValidationMsg()}
            />
        );
    }
}

function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user,
        alert: state.alert,
        airtime: state.airtimeReducerPile.airtime_webpin,
        airtime_history: state.airtimeReducerPile.airtime_buydata,
        airtime_otp: state.airtimeReducerPile.airtime_webpinotp
    };
}

export default connect(mapStateToProps)(AirtimeOtp);