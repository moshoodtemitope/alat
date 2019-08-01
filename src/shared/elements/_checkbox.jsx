import React from 'react';

const checkBox = (props) => (
    <div>
        <input
            type="checkbox"
            id={props.id}
            value={props.value}
            name={props.name}
            checked={props.isChecked}
            disabled={props.disabled}
            onChange={props.changed}
            style={{opacity : "unset", position : "unset"}} />
        <label
            aria-hidden="true"
            htmlFor={props.id} />
        <label htmlFor={props.id} style={{margin:10}}>
            {props.label}
        </label>
    </div>
)

export default checkBox;