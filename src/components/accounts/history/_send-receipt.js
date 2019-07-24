import React from 'react';

const sendReceipt = (props) => {
    return (
        <div className="al-card">
            <h4 className="m-b-20">Generate Receipt</h4>
            <div className="ac-info-div">
                <p>Click on <b>Send Receipt</b> to filter and generate receipts for your NIP transactions. </p>
            </div>
            <button onClick={props.receipt} className="btn-alat m-t-10" style={{width: "100%"}}>Send Receipt</button>
        </div>
    )
}

export default sendReceipt;