import React from 'react';
import { connect} from 'react-redux';
import OtpValidation from '../../../shared/components/otpvalidation';
import { airtimeConstants} from '../../../redux/constants/airtime/airtime.constants';

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
            backLink={"/bills/airtime/select-account"}
            submitAction={this.onSubmit}
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
        airtime: state.airtime_buydata
    };
}

export default connect(mapStateToProps)(AirtimeOtp);