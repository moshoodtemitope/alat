import React from 'react';
import infoImg from '../../../assets/img/ac-info.svg'

const info = (props) => {
    return (
        <div className="al-card">
            <h4 className="m-b-20">Account Balance</h4>
            <div className="ac-info-div">
                <div class="quote q1" style={{display: `${props.show1 ? "block" : "none"}`}}>
                    <blockquote> Available money that you can spend</blockquote>
                </div>
                <p>Available Balance<img src={infoImg} alt="info" onClick={() => props.showInfo("1")}/></p>
                <p className="ac-amount">{props.available}</p>
            </div>
            <div className="ac-info-div">
                <div class="quote q2" style={{display: `${props.show2 ? "block" : "none"}`}}>
                    <blockquote>Your account balance (including money you can spend, payments to be added or deducted an uncleared cheques).</blockquote>
                </div>
                <p>Book Balance<img src={infoImg} alt="info" onClick={() => props.showInfo("2")} /></p>
                <p className="ac-amount">{props.book}</p>
            </div>
            <div className="ac-info-div">
                <div class="quote q3" style={{display: `${props.show3 ? "block" : "none"}`}}>
                    <blockquote>Payments made to or from your account that have not been added or deducted.</blockquote>
                </div>
                <p>Liened Balance <img src={infoImg} alt="info" onClick={() => props.showInfo("3")} /></p>
                <p className="ac-amount">{props.liened}</p>
            </div>
            <div class="quote q4" style={{display: `${props.show4 ? "block" : "none"}`}}>
                <blockquote>Cheque payments that have not been cleared.</blockquote>
            </div>
            <div className="ac-info-div ac-b">
                <p>Uncleared Cheque Payment <img src={infoImg} alt="info" onClick={() => props.showInfo("4")} /></p>
                <p className="ac-amount">{props.uncleared}</p>
            </div>
        </div>
    )
}

export default info;