import * as React from "react";
import {Router, NavLink} from "react-router";
// import * as utils from "../../shared/utils";


import {
        clearCardsStore
} from "../../../redux/actions/cards/cards.actions";

import {Fragment} from "react";
import {connect} from "react-redux";
import { Link } from 'react-router-dom';
import successIcon from "../../../assets/img/success-tick";
import Select from 'react-select';
import Modal from 'react-responsive-modal';
import {Textbox} from "react-inputs-validation";

class VirtualCardsFundSuccess extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
        };

        
    }


    componentDidMount() {
        this.verifyTransferStage();
    }

    verifyTransferStage(){
        let props                   = this.props,
        newCardCompletionStatus     = props.sendVCNewCardinfo.new_vc_info!==undefined? this.props.sendVCNewCardinfo.new_vc_info.isCompleted : undefined,
        topUpCardStatus             = props.sendTopVCCardinfo.topup_vc_info!==undefined? this.props.sendTopVCCardinfo.topup_vc_info.isCompleted : undefined;
            console.log('some is ', topUpCardStatus, );
            if((newCardCompletionStatus===false || newCardCompletionStatus===undefined) 
                && ( topUpCardStatus===false ||  topUpCardStatus===undefined)){
                this.props.history.push("/virtual-cards");
            }
    }

    


    renderSuccess(){
        let newCardFundResponse         = this.props.sendVCNewCardinfo,
            topupFundResponse           = this.props.sendTopVCCardinfo,
            newCardCompletionStatus     = this.props.sendVCNewCardinfo.new_vc_info!==undefined? this.props.sendVCNewCardinfo.new_vc_info.isCompleted : undefined,
            topUpCardStatus             = this.props.sendTopVCCardinfo.topup_vc_info!==undefined? this.props.sendTopVCCardinfo.topup_vc_info.isCompleted : undefined,
            amountPaid;

            if(newCardCompletionStatus!==undefined && newCardCompletionStatus===true){
                amountPaid = newCardFundResponse.new_vc_info.cardpayload.Amount;
            }

            if(topUpCardStatus!==undefined && topUpCardStatus===true){
                amountPaid = topupFundResponse.topup_vc_info.cardpayload.Dollar;
            }

        return(
            <div className="col-sm-12">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="max-600 m-b-40">
                            <div className="al-card no-pad otpform m-b-30">
                                <div className="transfer-ctn">
                                    <center>
                                        <img src={successIcon} />
                                    </center>
                                    <div className="m-t-30 width-300">
                                        <h4 className="success-heading">Transaction Successful</h4>
                                        <div className="success-mg">
                                        You just funded your ALAT Dollar Card with <span> ${amountPaid}</span> 
                                        </div>
                                        
                                        
                                    </div>  
                                </div>         
                            </div>
                            <div class="return-text"><a onClick={(e)=>{e.preventDefault();
                                                                        this.props.dispatch(clearCardsStore()); 
                                                                        this.props.history.push("/dashboard");
                                                                }}> Return to dashboard</a></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    

    render(){
        let props = this.props;
            // newCardotpRequestStatus = props.sendVCNewCardinfo;
            // newCardotpRequestStatus = props.sendTopVCCardinfo;
        
        return(
            <Fragment>
                 {this.renderSuccess()}
            </Fragment>
        )
    }
}


function mapStateToProps(state){
    return {
        virtualCards        : state.alatCardReducersPile.getVirtualCards,
        sendVCNewCardinfo   : state.alatCardReducersPile.sendVCNewCardinfo,
        sendTopVCCardinfo   : state.alatCardReducersPile.sendTopVCCardinfo,
    };
}

export default connect(mapStateToProps)(VirtualCardsFundSuccess);