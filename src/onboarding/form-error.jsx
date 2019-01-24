import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
    return { error: state.error };
};

const ConnectedList = ({ error }) => (
    <div>
        {error.map(el => (
            <div className="info-label error">
                {el.message}
            </div>

        ))}
    </div>
);
const FormError = connect(mapStateToProps)(ConnectedList);
export default FormError;