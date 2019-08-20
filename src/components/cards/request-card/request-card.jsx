import * as React from "react";
import {Router} from "react-router";
// import * as utils from "../../shared/utils";

import {Fragment} from "react";
import {connect} from "react-redux";
import Select from 'react-select';
import Modal from 'react-responsive-modal';
import {Textbox} from "react-inputs-validation";
import "./../cards.scss";
import whitelogo from "../../../assets/img/white-logo.svg"; 
import emptyVC from "../../../assets/img/credit-card-2.svg"; 
import successIcon from "../../../assets/img/success-tick.svg";

import {
    loadInfoForCardRequest,
    requestOtpForNewATMCard,
    postDataForNewATMCard,
    clearCardsStore
} from "../../../redux/actions/cards/cards.actions";

const options = [
];

class RequestCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
        };
        
        this.getCustomerATMCardsData    = this.getCustomerATMCardsData.bind(this);
    }

    componentDidMount() {
        this.getCustomerATMCardsData()
    }

    getCustomerATMCardsData(){
        const { dispatch } = this.props;
        dispatch(loadInfoForCardRequest(this.state.user.token));

    }

    renderRequestNewCardScreen1(){
        return(
            <div className="request-screen1">
                <div>
                    <center>
                        <img className="nocards-icon" src={emptyVC} />
                        <p> You currently do not have an  ALAT card</p>
                        <button type="submit"  
                            className="btn-alat m-t-10 m-b-20 text-center">Request Card</button>
                    </center>
                </div>
            </div>
        )
    }


    renderCardRequestWrapper(){
        let {user} = this.state;
        if(user.isAlatPinSet===true){
            return(
                <div className="col-sm-12">
                    <div className="row">
                            <div className="col-sm-12">
                                <div className="max-600">
                                    <div className="al-card no-pad">
                                        <h4 className="m-b-10 center-text hd-underline">Request an ALAT ATM Card</h4>
                                        <div className="transfer-ctn">
                                                {/* {this.renderALATCardSettings()} */}
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            )
        }else{
            return(
                <div className="col-sm-12">
                    <div className="row">
                            <div className="col-sm-12">
                                <div className="max-600">
                                    <div className="al-card no-pad">
                                        <h4 className="m-b-10 center-text hd-underline">Set your ALAT Card Pin</h4>
                                        <div className="transfer-ctn text-center">
                                            <div className="nopin-msg">You need to set a PIN to continue</div> 
                                            <div>
                                                <button type="button" onClick={()=> this.props.history.push("/setcard-pin")}   
                                                    className="btn-alat m-t-10 m-b-20 text-center">Set ALAT Pin</button>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            )
        }
    }

    
    render() {
        return (
            <Fragment>
                {this.renderCardRequestWrapper()}
            </Fragment>
        );
    }
}


function mapStateToProps(state){
    console.error(state);
    return {
        infoForCardRequest   : state.alatCardReducersPile.infoForATMCardRequest,
        otpForCardRequest   : state.alatCardReducersPile.otpForATMCardRequest,
        postCardRequest   : state.alatCardReducersPile.postATMCardRequest,
    };
}

export default connect(mapStateToProps)(RequestCard);
