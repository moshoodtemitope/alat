import React from 'react';
import Select from 'react-select';

const accounts = (props) => {
    return (
        <div className="al-card">
            <h4 className="m-b-20">My Accounts</h4>
            <div className="input-ctn">
                <label>Select an account</label>
                <Select
                    value={props.selectedAccount == null ? props.options : props.selectedAccount}
                    onChange={props.changeAccount}
                    options={props.options}
                    placeholder={props.error ? "Failed. Please try again" : (props.aLength > 0 ? "Select..." : "Loading Account...")}
                />
                {props.error ? <small className="text-danger">Failed to fetch. <span onClick={props.retryFetch} style={{ textDecoration: "underline", cursor: "pointer" }}>Click to retry</span></small> : null}
            </div>
        </div>)
}

export default accounts;
