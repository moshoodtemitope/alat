import React, { Component, Fragment } from 'react';
import InnerContainer from "../../../shared/templates/inner-container";
import TransferContainer from "../container";
import {connect} from "react-redux";
import "./../transfer.scss";

class TransferSuccess extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isSubmitted: false,
            transferData:{}
        };
        
        
    }

    componentDidMount() {
        this.getTransferDetails();
    }

    getTransferDetails(){
    let props = this.props,
        transferData = {
            AccountName : props.transfer_info.transfer_info_data.data.AccountName,
            AmountSent: props.transfersender.transfer_info_data.data.AmountToSend
        }

        this.setState({transferData: {...transferData}});

    }

    render(){
        return(
            <Fragment>
                <InnerContainer>
                    <TransferContainer>
                        <div className="row">
                            <div className="col-sm-12">
                                <p className="page-title">Send Money</p>
                            </div>
                            <div className="col-sm-12">
                                <div className="tab-overflow">
                                    <div className="sub-tab-nav">
                                        <ul>
                                            <li><a href="accounts.html" className="active">Bank Transfer</a></li>
                                            <li><a href="statement.html">Send To Contacts</a></li>
                                            <li><a href="#">Cardless Withdrawal</a></li>
                                            <li><a href="#">FX Transfer</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="max-600">
                                            <div className="al-card no-pad">
                                                <h4 className="m-b-10 center-text hd-underline">Transfer Summary</h4>
                                                <div className="transfer-ctn">
                                                    <div className="al-card">
                                                        <center>
                                                            <div className="m-b-30 m-t-20">
                                                                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M26.418 38.3379L20 32L16 36L26.4268 46L48 22L43.9629 18L26.418 38.3379Z" fill="#169A62"/>
                                                                <path d="M32 0C14.3261 0 0 14.3261 0 32C0 49.6739 14.3261 64 32 64C49.6739 64 64 49.6739 64 32C64 14.3261 49.6739 0 32 0ZM32 59C17.0879 59 5 46.9121 5 32C5 17.0879 17.0879 5 32 5C46.9121 5 59 17.0879 59 32C59 46.9121 46.9121 59 32 59Z" fill="#169A62"/>
                                                                </svg>
                                                            </div>
                                                        </center>
                                                        <h4 className="center-text red-text">Transaction Successful</h4>

                                                        <div className="m-t-20 width-400">
                                                            <p className="m-b-40 f-s-16">You just transfered <span className="bold-text">₦{this.state.transferData.AmountSent}</span> to <span className="bold-text">{this.state.transferData.AccountName}</span></p>

                                                            <div className="row">
                                                                <div className="col-sm-12">
                                                                    <center>
                                                                        <a href="dashboard2.html"><button className="btn-alat m-t-10 m-b-20 text-center" type="submit">Return to Dashboard</button></a>
                                                                    </center>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TransferContainer>
                </InnerContainer>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user,
        alert: state.alert,
        transfer_info: state.transfer_details_data,
        transfersender: state.transfersender_details_data
    };
}
export default connect(mapStateToProps)(TransferSuccess);