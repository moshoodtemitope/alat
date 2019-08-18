import React, { Fragment} from 'react';

// For All 4 digit PIN Entries in the Application
// For OTP also. maxLength configurable.
class AlatPinInput extends React.Component {
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
                <div className={this.props.PinInvalid ? "input-ctn form-error" : "input-ctn"}>
                     <label> {this.props.PinLabel? this.props.PinLabel:'Enter ALAT PIN'} </label>
                    <input className="text-center" value={this.props.value} onChange={this.onChange.bind(this)} maxLength={this.props.maxLength} type="password" />
                    {this.props.PinInvalid &&
                                                <div className="text-danger">Please supply your pin</div>
                                            }
                </div>
            </Fragment>
        );
    }
}

export default AlatPinInput;