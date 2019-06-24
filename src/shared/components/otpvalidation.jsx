import React from 'react';
import OTPInput from './otpInput';
import phoneImg from '../../../assets/img/verify-phone.svg';

class OtpValidation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            OtpInavlid :false
        };
    }
   
    // handleChange=(e)=>{
    //     this.props.
    // }

    handleSubmit=(object)=>{
        this.props.submitAction(object);
    }

    render() {
        return (
            <div className="col-sm-12">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="max-600">
                            <div className="al-card no-pad">
                                <h4 className="m-b-10 center-text hd-underline">OTP Verification</h4>

                                <center>
                                    <img src={phoneImg} className="m-t-20" />
                                </center>

                                <div className="m-t-30 width-300">
                                    <p className="m-b-20" >We just sent a verification code to your mobile number (+2348020****01)</p>

                                    <form>
                                        {/* <div className="input-ctn">
                                            <input type="tel" />
                                        </div> */}
                                        <OTPInput OTPInvalid={this.state.OtpInavlid}  />

                                        <div className="row">
                                            <div className="col-sm-12">
                                                <center>
                                                    <input type="button" onSubmit={} value="Complete Transfer" className="btn-alat m-t-10 m-b-40 text-center" />
                                                </center>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <center>
                                <Link to={this.props.backLink} className="add-bene m-t-50">Go Back</Link>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default OtpValidation;