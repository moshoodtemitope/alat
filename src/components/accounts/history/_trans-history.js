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
    const createheader = () => {
        return (
            <div>
                <h4 className="m-b-20">Transaction History <span><p onClick={props.showDropdown} style={{ color: "#AB2656", cursor: "pointer", fontSize: 14 }}><img src={filter} style={{ marginRight: 15 }} /><b>Transaction Filter: {props.currentView}</b> <b>{props.currentFilter} </b></p>
                    <div class="trans-drop" style={{ display: `${props.showOptions ? "block" : "none"}` }}>
                        <p onClick={() => props.optionTofetch("All")}>All</p>
                        <p onClick={() => props.optionTofetch("Credits")}>Credits</p>
                        <p onClick={() => props.optionTofetch("Debits")}>Debits</p>
                        <p onClick={() => props.optionTofetch("Receipts")}>Receipts</p>
                    </div></span></h4>
            </div>

        )
    }
    let historyData = props.currentView == "Receipts" ? props.receiptHistory : props.history;
    let transactionHistory = (
        <div className="al-card transact-history">
            {createheader()}
            <div className="text-center m-t-50">
                <span style={{ fontSize: 50, color: "#ccc", marginLeft: -10 }} className="fa fa-history m-b-20"></span>
                <p style={{ fontWeight: 600 }}>{props.accountsLoaded ? "No Transaction  data found." : "Loading all accounts..."}</p>
            </div>
        </div>
    );
    if (props.currentView == "Debits" || props.currentView == "Credits") {
        transactionHistory = (
            <div className="al-card transact-history">
                {createheader()}
                <div className="history-table clearfix">
                    <div className="history-ctn2">
                        <div className="history-list clearfix">
                            <p className="desc" style={{ color: "#8d8d8d" }}>Description</p>
                            <p className="balance" style={{ color: "#8d8d8d" }}>Amount</p>
                        </div>
                    </div>
                    {historyData.map((hist, index) => {
                            if (hist.Narration.indexOf('ATM WD') >= 0) {
                                image = hsatm;
                            } else if (hist.Narration.indexOf('NIP TRANSFER') >= 0 || hist.Narration.indexOf('NIP') >= 0 || hist.Narration.indexOf('TRANSFER') >= 0) {
                                image = hstransfer;
                            } else if (hist.Narration.indexOf('POS') >= 0) {
                                image = hspos;
                            } else {
                                image = hsfund;
                            }

                            return (
                                <div className="history-ctn" key={index}>
                                    <div className="history-list clearfix">
                                        <img src={image} />
                                        <p className="desc"><i className="narr-text">{hist.Narration}</i><span class="date">{FormartDate(hist.TransactionDate)}</span></p>
                                        {hist.TransactionType == "C" ? 
                                        <p class="balance credit"><span className="amount-s" style={{ display: "none" }}>{hist.Amount}</span>{`${props.currency}${formatAmount(parseInt(hist.Amount))}`}</p> :
                                        
                                        
                                        <p class="balance debit"><span className="amount-s" style={{ display: "none" }}>{hist.Amount}</span>{`${props.currency}${formatAmount(parseInt(hist.Amount))}`} </p>}
                                    </div>
                                </div>)
                        
                    })}
                </div>
                {props.receivedTransactionsAlt < 30 ? null : props.fetchingHistory ? <p className="acc-view-more" style={{ color: "#444444", cursor: "not-allowed" }}>Loading more transactions...</p> : <p className="acc-view-more" onClick={props.viewMore}>View more...</p>}
            </div>
        );
    } else if (historyData.length) {
        transactionHistory = (
            <div className="al-card transact-history">
                {createheader()}
                <div className="history-table clearfix">
                    <div className="history-ctn2">
                        <div className="history-list clearfix">
                            <p className="desc" style={{ color: "#8d8d8d" }}>Description</p>
                            <p className="balance" style={{ color: "#8d8d8d" }}>Amount</p>
                        </div>
                    </div>
                    {historyData.map((hist) => {
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
                                        {histData.TransactionType == "C" ? <p class="balance" style={{ color: `${props.sendReceipt ? "#444444" : "#5BB746"}` }}><span className="amount-s" style={{ display: "none" }}>{histData.Amount}</span>{`${props.currency}${formatAmount(parseInt(histData.Amount))}`} {props.sendReceipt ? props.isSending ? <span class="receipt" style={{ cursor: "not-allowed", color: "#444444" }}>Sending...</span> : <span class="receipt" onClick={props.callSendReceipt()} >Send Receipt</span> : null}</p> : <p class="balance" style={{ textAlign: "right", color: `${props.sendReceipt ? "#444444" : "#AB2656"}` }}><span className="amount-s" style={{ display: "none" }}>{histData.Amount}</span>{`${props.currency}${formatAmount(parseInt(histData.Amount))}`} {props.sendReceipt ? <span class="receipt" onClick={() => props.callSendReceipt(histData.Identifier, histData.IdentifierId)} onClick={() => props.callSendReceipt(histData.Identifier, histData.IdentifierId)} >Send Receipt</span> : null} </p>}
                                    </div>
                                </div>)
                        })
                    })}
                </div>
                {props.receivedTransactions < 10 ? null : props.fetchingHistory ? <p className="acc-view-more" style={{ color: "#444444", cursor: "not-allowed" }}>Loading more transactions...</p> : <p className="acc-view-more" onClick={props.viewMore}>View more...</p>}
            </div>
        );
    }

    if ((props.response != 2)) {
        transactionHistory = (
            <div className="al-card transact-history">
                {createheader()}
                <div className="text-center m-t-50">
                    {props.response == 0 ? <span style={{ fontSize: 50, color: "#5BB746", marginLeft: -10 }} className="fa fa-check-circle m-b-20"></span> : <span style={{ fontSize: 50, color: "#ccc", marginLeft: -10 }} className="fa fa-history m-b-20"></span>}
                    <p style={{ fontWeight: 600 }}>{props.response == 0 ? "Redirecting... Receipt has been sent to your e-mail" : "Sending transaction receipt"}</p>
                </div>
            </div>
        );
    }

    return transactionHistory
}

export default transactionHistory;