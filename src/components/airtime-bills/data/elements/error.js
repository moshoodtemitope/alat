import React from 'react';
import './error.css';

const textError = (props) => (
    props.show  && props.shouldValidate ? <span className="text-danger text-err">{props.children}</span> : null
)

export default textError;