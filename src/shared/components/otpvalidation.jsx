import React from 'react';
import { Link } from 'react-router-dom';
import OTPInput from './otpInput';
import phoneImg from '../../assets/img/verify-phone.svg';

class OtpValidation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            OtpInvalid: false,
            TransactionPin: "",
            isSubmitted: false
        };
    }

    // handleChange=(e)=>{
    //     this.props.
    // }

    handleSubmit = () => {
        e.preventDefault();
        if (this.validatePin()) {
        }
        else {
            this.setState({isSubmitted : true});
            this.props.submitAction({ TransactionPin: this.state.TransactionPin }); }
    }

    handleOnChange = (e) => {
        this.setState({ TransactionPin: e })
        if (this.isSubmitted == true)
            this.validatePin();
    }

    validatePin = () => {
        if (this.state.TransactionPin.length != this.props.maxLength) { this.setState({ OtpInvalid: true }); return true; }
        else { this.setState({ OtpInvalid: false }); return false; }
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
                                    {/* <p className="m-b-20" >We just sent a verification code to your mobile number (+2348020****01)</p> */}
                                    <p className="m-b-20" > {this.props.displayMessage} </p>
                                    <form onSubmit={this.handleSubmit}>
                                        {/* <div className="input-ctn">
                                            <input type="tel" />
                                        </div> */}
                                        <OTPInput
                                            OTPInvalid={this.state.OtpInvalid}
                                            value={this.state.TransactionPin}
                                            onChange={this.handleOnChange}
                                            maxLength={this.props.maxLength}
                                        />

                                        <div className="row">
                                            <div className="col-sm-12">
                                                <center>
                                                    <input type="submit" value="Complete Transfer" className="btn-alat m-t-10 m-b-40 text-center" />
                                                </center>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            {/* <center>
                                <Link to={this.props.backLink} className="add-bene m-t-50">Go Back</Link>
                            </center> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user,
        alert: state.alert,
        //airtime: state.airtime_buydata
    };
}

export default OtpValidation;