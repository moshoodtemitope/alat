import React from 'react';
import connect from 'react-redux/es/connect/connect';
import {Link} from 'react-router-dom';
import InnerContainer from "../../shared/templates/inner-container";
import {history} from "../../_helpers/history";
import {NavLink} from "react-router-dom";
import {Fragment} from "react";
import "./offlineloans.scss";
// import ratingHeader from "../../../assets/img/alat-rating.svg";
import {
    OFFLINELOAN_GET_DATAOF_CUSTOMER_SUCCESS,
    OFFLINELOAN_GET_DATAOF_CUSTOMER_PENDING,
    OFFLINELOAN_GET_DATAOF_CUSTOMER_FAILURE,

    OFFLINELOAN_SEND_RESPONSEOF_CUSTOMER_SUCCESS,
    OFFLINELOAN_SEND_RESPONSEOF_CUSTOMER_PENDING,
    OFFLINELOAN_SEND_RESPONSEOF_CUSTOMER_FAILURE,

} from "../../redux/constants/onboarding/user.constants";
import {userActions} from "../../redux/actions/onboarding/user.actions";
//import mapStateToProps from 'react-redux/es/connect/mapStateToProps';
// import successIcon from "../../../assets/img/success-tick.svg";

class OfflineLoans extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rating:'',
            willrefer:''
        };

        this.setCustomerRating           =  this.setCustomerRating.bind(this);
        this.setWillCustomerReferALAT    =  this.setWillCustomerReferALAT.bind(this);
        this.sendRatingAndWillRefer      =  this.sendRatingAndWillRefer.bind(this);
    }

    componentDidMount(){
        // this.offlineLoanGetCustomerData();
    }


    offlineLoanGetCustomerData=()=>{
        const {dispatch} = this.props;
        let keyId = this.props.match.params.keyId
        
        dispatch(userActions.offlineLoanGetCustomerData(keyId));
    }

    offlineLoanSendCustomerData=()=>{
        
        const {dispatch} = this.props;

        let payload ={

        }
        
        dispatch(userActions.offlineLoanSendCustomerData(payload));
    }

    setCustomerRating(rating){
        this.setState({rating})
    }

    setWillCustomerReferALAT(willrefer){
        this.setState({willrefer})
    }

    sendRatingAndWillRefer(e){
        e.preventDefault();
        if(this.state.rating!=='' && this.state.willrefer!=='')
        {
            const {dispatch} = this.props;

            
            dispatch(userActions.offlineLoanGetCustomerData(this.state.rating, this.state.willrefer));
        }
    }

    renderFetchingData =()=>{

        return(
            <div>
                <h3 className="headingtext text-center">Please wait...</h3>
            </div>
        )
    }


    renderDataOfCustomer =()=>{
        let getCustomerData = this.props.offlineLoanGetCustomerDataRequest;
        let sendCustomerData = this.props.offlineLoanSendCustomerDataRequest;

        return(
            <div>
                <div className="nameheading">Hello <span>Toritsemogha Afinotan</span></div>

                <div className="loanmsg">
                    Congratulations! You are now qualified to take a <span>personal loan </span> of up to 
                    <span>&#8358;5,000,000</span> over a period of <span>24 months.</span>
                </div>
                <div className="loanmsg">
                    If you wish to take below the pre-qualified amount kindly input the amount you would like to take and click on 
                    <span>Apply Now</span> to proceed.
                </div>

                <button type="submit" 
                    className="btn-alat m-t-10 m-b-20 text-center btn-block"
                    disabled={sendCustomerData.is_processing}
                    onClick={this.sendRatingAndWillRefer}
                    >{sendCustomerData.is_processing?'Please wait...':'Submit'}  </button>
            </div>

        )
    }

    

    render() {
        let {rating,
            willrefer
        } =this.state;
        
        let {ratingRequest} = this.props;

        let getCustomerData = this.props.offlineLoanGetCustomerDataRequest;
        
        return (
            <Fragment>
                <InnerContainer>
                    <div className="offline-loan-wrap">
                        <div className="heading-icon">
                            {/* <img src={ratingHeader} /> */}
                        </div>
                        <div className="offlineloan-wrap">
                            <div className="offlineloan-container">
                                {getCustomerData.processing_status === OFFLINELOAN_GET_DATAOF_CUSTOMER_PENDING &&
                                    <div>{this.renderFetchingData()}</div> 
                                }

                                {this.renderFetchingData()}

                                {this.renderDataOfCustomer()}
                        
                                
                                
                                
                            </div>
                        </div>
                        
                        
                            {/* <div className="rating-wrap">
                                <center  className="m-t-30">
                                    <img src={successIcon} />
                                </center>
                                <div className="m-t-10 width-300">
                                    <h4 className="success-heading">Thank you for rating us</h4>
                                </div>  
                            </div> */}
                        
                    </div>
            </InnerContainer>
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        ratingRequest   : state.send_rating_request,
        offlineLoanGetCustomerDataRequest   : state.offlineloan_get_customer_data_request,
        offlineLoanSendCustomerDataRequest   : state.offlineloan_send_customer_data_request,
    }
}

export default connect(mapStateToProps)(OfflineLoans); 