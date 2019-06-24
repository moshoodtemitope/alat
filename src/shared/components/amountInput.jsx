import React from "react";
import PropTypes from "prop-types";
//import utils from
//  The amount input on all Transaction pages
//  Formarts text to currency as you type.
// should be enhanced to handle decimal.
class AmountInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            intValue: 0,
            formartedValue: "",
        };
    }


    onChange(event) {
        var intVal = event.target.value.replace(/,/g, '');
        //console.log(intVal);
         if (/^\d+(\.\d+)?$/g.test(intVal)) {
            this.props.onChange(event.target.value);
                this.setState({
                    formartedValue: this.toCurrency(intVal),
                    intValue: intVal
                })
            }
         else if (intVal == '') {
            this.setState({
                formartedValue: '',
                intValue: ''
            })
        }
        else {

        }
    }

    toCurrency(number) {
        console.log(number);
        const formatter = new Intl.NumberFormat('en-IN', {
            style: "decimal",
            currency: "USD",
            maximumFractionDigits:2
        });

        return formatter.format(number);
    }

    toggleEditing() {
        this.setState({ isEditing: !this.state.isEditing });
    }

    render() {
        return (
            <div className={this.props.AmountInvalid ? "input-ctn form-error" : "input-ctn"}>
                <label htmlFor={this.props.name}>Amount</label>
                <input
                    type="text"
                    name={this.props.name}
                    value={this.state.formartedValue}
                    onChange={this.onChange.bind(this)}
                />
                {this.props.AmountInvalid &&
                                                <div className="text-danger">Please supply an amount</div>
                                            }
            </div>
        );
    }
}

AmountInput.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    intValue: PropTypes.string,
    AmountInvalid: PropTypes.bool
};

export default AmountInput;
