import React from 'react';
import infoImg from '../../../assets/img/ac-info.svg'

const info = (props) => {
    return (
        <div className="al-card">
            <h4 className="m-b-20">Account Balance</h4>
            <div className="ac-info-div">
                <p>Available Balance<img src={infoImg} alt="info" /></p>
                <p className="ac-amount">{props.available}</p>
            </div>
            <div className="ac-info-div">
                <p>Book Balance<img src={infoImg} alt="info" /></p>
                <p className="ac-amount">{props.book}</p>
            </div>
            <div className="ac-info-div">
                <p>Liened Balance <img src={infoImg} alt="info" /></p>
                <p className="ac-amount">{props.liened}</p>
            </div>
            <div className="ac-info-div ac-b">
                <p>Uncleared Cheque Payment <img src={infoImg} alt="info" /></p>
                <p className="ac-amount">{props.uncleared}</p>
            </div>
        </div>
    )
}

export default info;