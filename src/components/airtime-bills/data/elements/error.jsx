import React from 'react';
import './error.css';

const textError = (props) => (
    props.show  && props.shouldValidate ? <p className="text-danger text-err">{props.children}</p> : null
)

export default textError;