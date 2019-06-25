import React from 'react';
import { connect} from 'react-redux';
import OtpValidation from '../../../shared/components/otpvalidation';
import { airtimeConstants} from '../../../redux/constants/airtime/airtime.constants';
import { airtimeWebPinOTPpayment, airtimeWebPinpayment } from '../../../redux/actions/airtime-bill/airtime.action';

class AirtimeOtp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user : JSON.parse(localStorage.getItem("user")),
            bill: {
                OTP: ""
            }
        }
        this.getBillinfo();
    }

    getBillinfo(){
        let props = this.props
        if (this.props.airtime.airtime_buydata == airtimeConstants.AIRTIME_WEBPIN_SUCCESS) {
            var bill = {
                ...this.props.airtime.airtime_buydata_data.obj.request
            };
            this.setState({bill : bill},()=>console.log(this.state.bill));
            
        } else {
            //commented for test purposes
            this.props.history.push("/bills/airtime/buy");
        }
    }

    returnOtpValidationMsg(){
        if(this.props.airtime.airtime_buydata_data)
         return this.props.airtime.airtime_buydata_data.obj.response.ValidationMsg;
         else return "";
    }

    onSubmit=(otp)=>{
        var bill = {
            ...this.props.airtime.airtime_buydata_data.obj.request
        }
        bill.OTP = otp.TransactionPin;
        this.setState({bill : bill},()=>{
        this.props.dispatch(airtimeWebPinOTPpayment(this.state.user.token, bill))}
        );
    }

    onReSubmit(){
        this.props.dispatch(airtimeWebPinpayment(this.user.state.token,this.state.bill));
    }

    render() {
            if(this.props.airtime_otp == airtimeConstants.AIRTIME_WEBPIN_OTP_SUCCESS)
                    this.props.history.push("/bills/airtime/done");
        return (
            <OtpValidation 
            backLink={"/bills/airtime/select-account"}
            submitAction={this.onSubmit}
            maxLength={6}
            busyAction ={this.props.airtime_otp == airtimeConstants.AIRTIME_WEBPIN_OTP_PENDING}
            retryAction ={this.onReSubmit}
            onResubmitBusyAction = {this.props.airtime.airtime_buydata == airtimeConstants.AIRTIME_WEBPIN_PENDING}
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
        airtime: state.airtime_webpin,
        airtime_history: state.airtime_buydata,
        airtime_otp: state.airtime_webpin
    };
}

export default connect(mapStateToProps)(AirtimeOtp);