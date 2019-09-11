import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import OTPInput from './otpInput';
import phoneImg from '../../assets/img/verify-phone.svg';
import { airtimeConstants } from '../../redux/constants/airtime/airtime.constants';

class OtpValidation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            OtpInvalid: false,
            TransactionPin: "",
            isSubmitted: false,
            buttonText: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount=()=>{
        // if(this.props.retryAction != null){
        //    this.setState({buttonText: "Complete Transfer"});
        // }else {  
        //     this.setState({buttonText: "Validate"});
        // }
        if(this.props.ActionText){
            this.setState({buttonText: "Validate"});
        }
        else { this.setState({buttonText: "Complete Transfer"});  }
    }
    // handleChange=(e)=>{
    //     this.props.
    // }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.validatePin()) {
        }
        else {
            this.setState({ isSubmitted: true });
            this.props.submitAction({ TransactionPin: this.state.TransactionPin });
        }
    }

    handleRetry =()=>{
        this.props.retryAction();
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
        
           //this.props.history.push(this.props.forwardLink);
        return (
            <div className="col-sm-12">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="max-600">
                            <div className="al-card no-pad">
                            {this.props.retryAction && <h4 className="m-b-10 center-text hd-underline">OTP Verification</h4>}

                                <center>
                                    <img src={phoneImg} className="m-t-20" />
                                </center>

                                <div className="m-t-30 width-300">
                                    {/* <p className="m-b-20" >We just sent a verification code to your mobile number (+2348020****01)</p> */}
                                    <p className="m-b-20" > {this.props.displayMessage} </p>
                                    <form onSubmit={this.handleSubmit}>

                                        {this.props.alert && this.props.alert.message &&
                                            <div className={`info-label ${this.props.alert.type}`}>{this.props.alert.message}</div>
                                        }
                                   
                                        <OTPInput
                                           //OTP is returned as { TransactionPIN }, so do something like OTP = otp.TransactionPIN
                                            OTPInvalid={this.state.OtpInvalid}
                                            value={this.state.TransactionPin}
                                            onChange={this.handleOnChange}
                                            maxLength={this.props.maxLength}
                                        />

                                        <div className="row">
                                            <div className="col-sm-12">
                                                <center>
                                                    <button type="submit" disabled={this.props.busyAction} className="btn-alat m-t-10 m-b-40 text-center">{this.props.busyAction ? "Processing..." : this.state.buttonText }</button>
                                                    {this.props.retryAction && <p onClick={this.props.retryAction} className="resend-otp" >{this.props.onResubmitBusyAction ? "Resending OTP..." : "Didn't get OTP? Resend Code."}</p>}
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
        airtime: state.airtime_webpinotp,
    };
}

export default connect(mapStateToProps)(OtpValidation);