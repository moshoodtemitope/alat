import React, { Fragment} from 'react';

// For All 6 digit OTP Entries in the Application
// For OTP also. maxLength configurable.
class OTPInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onChange(event){
        var pattern = /^\d*$/g
        if(pattern.test(event.target.value))
        {
            this.props.onChange(event.target.value);
        }
    }

    render() {
        return (
            <Fragment>
                <div className={this.props.OTPInvalid ? "input-ctn form-error" : "input-ctn"}>
                    <input value={this.props.value} onChange={this.onChange.bind(this)} maxLength={this.props.maxLength} type="password" />
                    {this.props.OTPInvalid &&
                                                <div className="text-danger">Please supply your OTP</div>
                                            }
                </div>
            </Fragment>
        );
    }
}

export default OTPInput;