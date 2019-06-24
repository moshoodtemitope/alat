import React from 'react';
import OtpValidation from '../../../shared/components/otpvalidation';

class AirtimeOtp extends React.Component {
    constructor(props) {
        super(props);
        this.getBillinfo();
    }

    getBillinfo(){
        let props = this.props
        if (props.airtime.airtime_buydata == airtimeConstants.AIRTIME_BUYDATA_PAGE2) {
            // var bill = {
            //     ...this.props.airtime.airtime_buydata_data.data
            // };
            // bill.valueRecipent = bill.PhoneNumber;
            // bill.billCategory = "Airtime Recharge";
            // bill.ActionText ="Buy Airtime";

            // this.state.bill = {
            //     ...bill
            // }
        } else {
            this.props.history.push("/bills/airtime/buy");
        }
    }

    onSubmit(otp){
        //to be submitted
    }

    render() {
        return (
            <OtpValidation 
            backLink={"/bills/airtime/done"}
            submitAction={this.onSubmit}
             />
        );
    }
}

export default AirtimeOtp;