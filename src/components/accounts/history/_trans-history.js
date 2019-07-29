import React from 'react';
import hstransfer from "../../../assets/img/hs-transfer.svg";
import hsatm from "../../../assets/img/hs-atm.svg";
import hspos from "../../../assets/img/hs-pos.svg";
import hsfund from "../../../assets/img/hs-fund.svg";
import filter from "../../../assets/img/filter-results-button.svg";
import { formatAmount, FormartDate } from '../../../shared/utils';

var image;
var historyCount;
const transactionHistory = (props) => {
    let transactionHistory = (
        <div className="al-card transact-history">
            <div className="text-center m-t-50">
                <span style={{ fontSize: 50, color: "#ccc", marginLeft: -10 }} className="fa fa-history m-b-20"></span>
                <p>{props.accountsLoaded ?  "Loading transactions history..." : "Loading all accounts..."}</p>
            </div>
        </div>
    );
    if (props.historyLength) {
        transactionHistory = (
            <div className="al-card transact-history">
                <h4 className="m-b-20">Transaction History <span><a href="#"><img src={filter} style={{ marginRight: 15 }} />Filter Transaction</a></span></h4>
                <div className="history-table clearfix">
                    <div className="history-ctn2">
                        <div className="history-list clearfix">
                            <p className="desc" style={{ color: "#8d8d8d" }}>Description</p>
                            <p className="balance" style={{ color: "#8d8d8d" }}>Amount</p>
                        </div>
                    </div>
                    {props.history.map((hist) => {
                        return hist.Transactions.map((histData, index) => {
                            historyCount = index;
                            if (histData.Narration.indexOf('ATM WD') >= 0) {
                                image = hsatm;
                            } else if (histData.Narration.indexOf('NIP TRANSFER') >= 0 || histData.Narration.indexOf('NIP') >= 0 || histData.Narration.indexOf('TRANSFER') >= 0) {
                                image = hstransfer;
                            } else if (histData.Narration.indexOf('POS') >= 0) {
                                image = hspos;
                            } else {
                                image = hsfund;
                            }
                            
                            return (
                                <div className="history-ctn" key={index}>
                                    <div className="history-list clearfix">
                                        <img src={image} />
                                        <p className="desc"><i className="narr-text">{histData.Narration}</i><span class="date">{FormartDate(hist.TransactionDate)}</span></p>
                                        {histData.TransactionType == "C" ? <p class="balance credit"><span className="amount-s" style={{display:"none"}}>{histData.Amount}</span>{`₦${formatAmount(histData.Amount)}`} {props.sendReceipt ? props.isSending ? <span class="receipt" onClick={props.callSendReceipt} style={{cursor: "not-allowed"}}>Sending...</span> : <span class="receipt">Send Receipt</span> : null}</p> : <p class="balance debit ac-debit" style={{ textAlign: "right" }}><span className="amount-s" style={{display:"none"}}>{histData.Amount}</span>{`- ₦${formatAmount(histData.Amount)}`} {props.sendReceipt ? <span class="receipt">Send Receipt</span> : null} </p>}
                                    </div>
                                </div>)
                        })
                    })}
                </div>
                {props.receivedTransactions < 10 ? null : props.fetchingHistory ? <p className="acc-view-more" style={{color : "#444444", cursor: "not-allowed"}}>Loading more transactions...</p> : <p className="acc-view-more" onClick={props.viewMore}>View more...</p>}
            </div>
        );
    }

    return transactionHistory
}

export default transactionHistory;