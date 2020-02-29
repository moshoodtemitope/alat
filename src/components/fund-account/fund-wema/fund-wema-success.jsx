import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import succesImg from '../../../assets/img/success.svg';
import { fundAccountConstants } from '../../../redux/constants/fund-account/fund-account.constant';
import * as actions from '../../../redux/actions/fund-account/fund-acount.action';
//import OtpValidation from '../../../shared/components/otpvalidation';


import {numberWithCommas} from "../../../shared/utils";
class FundWemaSuccess extends React.Component {
    constructor(props) {
        super(props);
        
    }

    componentDidMount(){
        this.init();
    }

    init() {
       if(this.props.fundwema.fund_account_status!==undefined){
           if(this.props.fundwema.fund_account_status !== fundAccountConstants.FUND_ALAT_WEMA_SUCCESS){
               this.props.history.push("/fund/wema")
           }else{
            
           }
       }else{
        this.props.history.push("/fund/wema")   
       }
    }
    
    returnAccountName=(accountNumber)=>{
        if(this.props.accounts.debitable_accounts_data)
        var _account = this.props.accounts.debitable_accounts_data.data.find(account => account.AccountNumber== accountNumber);
        console.log("++++++++", _account);
        console.log("||||||", accountNumber);
        // console.log("=+++=+=+====", this.props.fundwema.fund_account_data);
        // console.log("=======", this.props.accounts.debitable_accounts_data.data);

        return _account.AccountDescription;
    }
    redirectHome=()=>{
        this.props.dispatch(actions.ClearAction(fundAccountConstants.FUND_ACCOUNT_REDUCER_CLEAR));
        this.props.history.push("/fund");
    }
    

    render() {
         let props = this.props;
         if(props.fundwema.fund_account_data)
            return (
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="max-600">
                                <div className="al-card">
                                    <center>
                                        <img src={succesImg} className="m-b-30 m-t-20" />
                                    </center>
                                    <h4 className="center-text red-text">Transfer was successful</h4>

                                    <div className="m-t-20 width-400">
                                        <div className="al-card no-pad">
                                            <h4>From</h4>
                                            <div className="trans-summary-card">
                                                <div className="name-amount clearfix">
                                                    <p className="pl-name-email">{this.returnAccountName(props.fundwema.fund_account_data.data.DebitAccountNumber)}
                                                    <span>{props.fundwema.fund_account_data.data.DebitAccountNumber}</span></p>
                                                    {/* <p className="pl-amount">N5,000</p> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="al-card no-pad">
                                            <h4>To</h4>
                                            <div className="trans-summary-card">
                                                <div className="name-amount clearfix">
                                                    <p className="pl-name-email">{this.returnAccountName(props.fundwema.fund_account_data.data.CreditAccountNumber)}
                                                    <span>{props.fundwema.fund_account_data.data.CreditAccountNumber}</span></p>
                                                    {/* <p className="pl-amount">N5,000</p> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="input-ctn">
                                            <label>Amount</label>
                                            <input type="text" value={numberWithCommas(props.fundwema.fund_account_data.data.Amount)} disabled={true} />
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-12">
                                                <center>
                                                    <a style={{cursor: "pointer"}}><button onClick={this.redirectHome} class="btn-alat m-t-10 m-b-20 text-center" type="submit">Done</button></a>
                                                </center>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
             else {
               // this.props.history.push("/fund/wema");
                 return(<div>

                 </div>);
                 
                }
    }
}

function mapStateToProps(state) {
    return {
        alert: state.alert,
        fundwema: state.fundAccountReducerPile.fundwema_alat,
        accounts: state.accounts,
    }
}

export default connect(mapStateToProps)(FundWemaSuccess);