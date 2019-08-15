import * as React from "react";
import {Router, NavLink} from "react-router";
// import * as utils from "../../shared/utils";


import {getCurrentVirtualCard,
        sendNewVirtualCardInfo,
        topUpVirtualCard
} from "../../../redux/actions/cards/cards.actions";

import { 
         SEND_NEWVC_DATA_SUCCESS,
         SEND_TOPUP_DATA_SUCCESS} from "../../../redux/constants/cards/cards.constants";
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
        let props = this.props,
            newCardCompletionStatus = props.sendVCNewCardinfo.isCompleted ||undefined,
            topUpCardStatus = props.sendTopVCCardinfo.isCompleted ||undefined;
            console.log('some is ', newCardCompletionStatus, );
            if((newCardCompletionStatus===false || newCardCompletionStatus===undefined) 
                && ( topUpCardStatus===false ||  topUpCardStatus===undefined)){
                this.props.history.push("/virtual-cards");
            }
    }

    


    renderSuccess(){
        let newCardFundResponse         = this.props.sendVCNewCardinfo,
            topupFundResponse           = this.props.sendTopVCCardinfo,
            newCardCompletionStatus     = this.props.sendVCNewCardinfo.isCompleted,
            topUpCardStatus             = this.props.sendTopVCCardinfo.isCompleted,
            amountPaid;

            if(newCardCompletionStatus===true){
                amountPaid = newCardFundResponse.cardpayload.Amount;
            }

            if(topUpCardStatus===true){
                amountPaid = topupFundResponse.cardpayload.Amount;
            }

        return(
            <div className="col-sm-12">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="max-600">
                            <div className="al-card no-pad  otpform">
                                <center>
                                    <img src={successIcon} />
                                </center>
                                <div className="m-t-30 width-300">
                                    <h4 className="success-heading">Transaction Successful</h4>
                                    You just funded your ALAT account with ${amountPaid} 
                                </div>           
                            </div>
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