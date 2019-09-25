import React, { Component, Fragment } from 'react';
import {connect} from "react-redux";

import { Switch } from '../../../shared/elements/_toggle';
import {
    clearInsuranceStore
} from "../../../redux/actions/insurance/insurance.actions";

    import {
    POST_AUTOINSURANCE_PAYMENTDATA_SUCCESS,
    POST_AUTOINSURANCE_PAYMENTDATA_PENDING,
    POST_AUTOINSURANCE_PAYMENTDATA_FAILURE,
     }from "../../../redux/constants/insurance/insurance.constants";

class PaymentSuccess extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        };
        
    }

    componentDidMount() {
        this.verifyStage();
    }

    verifyStage(){
        if(Object.keys(this.props.sendPayment).length===0 || this.props.sendPayment.fetch_status!==POST_AUTOINSURANCE_PAYMENTDATA_SUCCESS){
            this.props.dispatch(clearInsuranceStore()); 
            this.props.history.push("/insurance");
        }else{
            setTimeout(()=>{
                this.props.dispatch(clearInsuranceStore());
                this.props.history.push("/insurance");
            }, 7000);
        }
    }
   
    
    

   

    render(){
        return(
            <Fragment>
                            <div className="col-sm-12">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="max-600">
                                            <div className=" no-pad">
                                                
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
                                                            <p className="m-b-40 f-s-16 text-center">You have payed for your insurance cover</p>
                                                            
                                                            <div className="row">
                                                                <div className="col-sm-12">
                                                                    <center>
                                                                        <button className="btn-alat m-t-10 m-b-20 text-center" onClick={(e)=>{e.preventDefault();
                                                                            this.props.dispatch(clearInsuranceStore()); 
                                                                            this.props.history.push("/insurance");
                                                                            setTimeout(()=>{
                                                                                this.props.dispatch(clearInsuranceStore());
                                                                                this.props.history.push("/insurance");
                                                                            }, 3000);
                                                                            }} >Done</button>
                                                                        
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
        sendPayment   : state.insurancePile.postAutoInsurancePaymentRequest,
    };
}
export default connect(mapStateToProps)(PaymentSuccess);