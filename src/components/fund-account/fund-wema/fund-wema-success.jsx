import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import succesImg from '../../../assets/img/success.svg';
import { fundAccountConstants } from '../../../redux/constants/fund-account/fund-account.constant';
//import OtpValidation from '../../../shared/components/otpvalidation';

class FundWemaSuccess extends React.Component {
    constructor(props) {
        super(props);
        
    }

    componentDidMount(){
        this.init();
    }

    init() {
       if(this.props.fundwema.fund_account_status)
           if(this.props.fundwema.fund_account_status !== fundAccountConstants.FUND_ALAT_WEMA_SUCCESS){
               //this.props.history.push("/fund/wema")
           }else{
            
           }
    }
    
    returnAccountName=(accountNumber)=>{
        if(this.props.accounts.debitable_accounts_data)
        var _account = this.props.accounts.debitable_accounts_data.data.find(account => account.AccountNumber== accountNumber);
        return _account.AccountDescription;
    }
    

    render() {
         let props = this.props;
         if(props.fundwema.fund_account_data)
            return (
                <div class="col-sm-12">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="max-600">
                                <div class="al-card">
                                    <center>
                                        <img src={succesImg} class="m-b-30 m-t-20" />
                                    </center>
                                    <h4 class="center-text red-text">Transfer was successful</h4>

                                    <div class="m-t-20 width-400">
                                        <div class="al-card no-pad">
                                            <p4>From</p4>
                                            <div class="trans-summary-card">
                                                <div class="name-amount clearfix">
                                                    <p class="pl-name-email">{this.returnAccountName(props.fundwema.fund_account_data.data.accountToDebit)}
                                                    <span>{props.fundwema.fund_account_data.data.accountToDebit}</span></p>
                                                    {/* <p class="pl-amount">N5,000</p> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="al-card no-pad">
                                            <p4>To</p4>
                                            <div class="trans-summary-card">
                                                <div class="name-amount clearfix">
                                                    <p class="pl-name-email">{this.returnAccountName(props.fundwema.fund_account_data.data.accountToDebit)}
                                                    <span>{props.fundwema.fund_account_data.data.accountToCredit}</span></p>
                                                    {/* <p class="pl-amount">N5,000</p> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="input-ctn">
                                            <label>Amount</label>
                                            <input type="text" value={props.fundwema.fund_account_data.data.Amount} disabled={true} />
                                        </div>

                                        <div class="row">
                                            <div class="col-sm-12">
                                                <center>
                                                    <a href="dashboard2.html"><button class="btn-alat m-t-10 m-b-20 text-center" type="submit">Done</button></a>
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