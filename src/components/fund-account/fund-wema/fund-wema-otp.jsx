import React from 'react';
import OtpValidation from '../../../shared/components/otpvalidation';

class FundWemaOtp extends React.Component{
 constructor(props){
     super(props);
 }

    render(){
        return(
            <OtpValidation />
        );
    }
}

export default FundWemaOtp;