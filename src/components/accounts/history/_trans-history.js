import React from 'react';
import hstransfer from "../../../assets/img/hs-transfer.svg";
import hsatm from "../../../assets/img/hs-atm.svg";
import hspos from "../../../assets/img/hs-pos.svg";
import hsfund from "../../../assets/img/hs-fund.svg";

const transactionHistory = (props) => {
    return (
        <div className="al-card transact-history">
            <h4 className="m-b-20">Transaction History <span><a href="#">Filter Transaction</a></span></h4>
            <div className="history-table clearfix">
                <div className="history-ctn">
                    <div className="history-list clearfix">
                        <p className="desc">Description</p>
                        <p>Date</p>
                        <p className="balance">Amount</p>
                    </div>
                </div>
                <div className="history-ctn">
                    <div className="history-list clearfix">
                        <img src={hsatm} />
                        <p className="desc">Funded Apple Virtual Card with USD 200 for NGN 80,000<span class="date">Feb 9, 2017</span></p>
                        <p class="balance credit">N20,000</p>
                    </div>
                </div>
                <div class="history-ctn">
                    <div class="history-list clearfix">
                        <img src={hspos} />
                        <p class="desc">Funded Apple Virtual Card with USD 200 for NGN 80,000<span class="date">Feb 9, 2017</span></p>
                        <p class="balance debit">1,000,000</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default transactionHistory;