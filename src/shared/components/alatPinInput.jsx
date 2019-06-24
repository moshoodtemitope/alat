import React, { Fragment} from 'react';

// For All 4 digit PIN Entries in the Application
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
                    <label>Enter ALAT PIN</label>
                    <input value={this.props.value} onChange={this.onChange.bind(this)} maxLength="4" type="password" />
                    {this.props.PinInvalid &&
                                                <div className="text-danger">Please supply an amount</div>
                                            }
                </div>
            </Fragment>
        );
    }
}

export default AlatPinInput;