import React from 'react';
import Base from './base'
import TextError from './error'

const input = (props) => {
    let inputElement = null;
    const input = <Base>
                    <input
                        {...props.elementConfig}
                        value={props.value}
                        className={props.inputStyle}
                        onChange={props.changed} /> 
                        <TextError show={props.wrongInput} shouldValidate={props.isTouched}>{props.errormsg}</TextError>
                </Base>;

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
    return (
        <Base>
            {inputElement}
        </Base>
    );

}

export default input;