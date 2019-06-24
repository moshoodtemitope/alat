import React from 'react';

class AirtimeOtp extends React.Component {
    constructor(props) {
        super(props);
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
                                    <img src="img/verify-phone.svg" className="m-t-20"/>
                              </center>

                                    <div className="m-t-30 width-300">
                                        <p className="m-b-20" >We just sent a verification code to your mobile number (+2348020****01)</p>

                                        <form>
                                            <div className="input-ctn">
                                                <input type="tel" />
                                            </div>

                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <center>
                                                        <input type="button" value="Complete Transfer" className="btn-alat m-t-10 m-b-40 text-center" />
                                                    </center>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                          </div>

                                <center>
                                    <a href="add-beneficiary.html" className="add-bene m-t-50">Go Back</a>
                                </center>
                            </div>
                        </div>
                    </div>
                </div>
                )
            }
        }
        
export default AirtimeOtp;