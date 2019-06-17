import React from 'react';

export const Input = (props) => {
    let inputElement = null;
    let error = props.show && props.shouldValidate ? <p className="text-danger text-err">{props.children}</p> : null
    const input =
        <input
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}
            disabled={props.isDisabled} />
    { error } {/* <TextError show={props.wrongInput} shouldValidate={props.isTouched}>{props.errormsg}</TextError> */ }


    switch (props.elementType) {
        case ('input'):
            inputElement = input;
            break;
        case ('textarea'):
            inputElement = <textarea
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        default:
            inputElement = <input
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }
    return inputElement;

}

export const Select = (props) =>(
    <div class="input-ctn">
        <label>{props.label}</label>
        <select >
            {props.optionsList.map((option, counter) => (
                <option value={option.value} key={counter+1}>{option.displayValue}</option>
            ))}
            
        </select>
    </div>);