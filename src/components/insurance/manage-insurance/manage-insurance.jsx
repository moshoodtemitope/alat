import * as React from "react";
import {Router} from "react-router";
// import * as utils from "../../shared/utils";

import {Fragment} from "react";
import {connect} from "react-redux";
import {Checkbox} from "react-inputs-validation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import * as utils from '../../../shared/utils';
import whitelogo from "../../../assets/img/white-logo.svg"; 
import  {routes} from '../../../services/urls';
import successIcon from "../../../assets/img/success-tick.svg";
import noPolicy from "../../../assets/img/empty-policy.svg";

import {
    FETCH_EXISTING_POLICIES_SUCCESS,
    FETCH_EXISTING_POLICIES_PENDING,
    FETCH_EXISTING_POLICIES_FAILURE,
    FETCH_NEWINSURANCE_INFOSETS_SUCCESS,
    FETCH_NEWINSURANCE_INFOSETS_PENDING,
    FETCH_NEWINSURANCE_INFOSETS_FAILURE
 }from "../../../redux/constants/insurance/insurance.constants";


 import {
    clearInsuranceStore,
    getNewPolicyDataChunk,
    getExistingPolicies
    // clearCardsStore
} from "../../../redux/actions/insurance/insurance.actions";

// const options = [
// ];

const BASEURL = routes.BASEURL;

class ManageInsurance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
        };
        
       
        this.viewPolicyDetails =  this.viewPolicyDetails.bind(this);
        
    }

    componentDidMount() {
        this.props.dispatch(clearInsuranceStore()); 
        this.getCustomerPolicies();
        this.getNewPolicyData();
    }

    getCustomerPolicies(){
        const { dispatch } = this.props;
        dispatch(getExistingPolicies(this.state.user.token));
        
    }

    viewPolicyDetails(e){
        e.preventDefault();
    }

    getNewPolicyData(){
        const { dispatch } = this.props;
        dispatch(getNewPolicyDataChunk(this.state.user.token));
    }

    renderNoExistingPolicy(){
        return(
            <div>
                <center>
                    <img src={noPolicy} />
                </center>
                <div className="m-t-30 width-300">
                    <div className="success-mg">
                        You don’t have any insurance policy at the moment. 
                    </div>
                    <center>
                        <button type="button"  
                            className="btn-alat m-t-10 m-b-20 text-center"
                            onClick={()=>this.props.history.push("/insurance/buy-insurance")}>Buy Insurance</button>
                    </center>
                </div>
            </div>
        )
    }
    renderExistingPolicies(){
        let policies = this.props.getExistingPolicy.existingpolicy_data.response.data.InsuranceDetails;

        return(
            <Fragment>
                <div className={policies.length>2?"row":"row middle-justified"}>
                    {
                        policies.map((eachPolicy,key)=>(
                            <div className="col-sm-4" key={key}>
                                <div className="al-card no-pad">
                                    <h4 className="m-b-10  hd-underline covername"> {eachPolicy.InsuranceProductCategory}</h4>
                                    <div className="policyinfo-wrap">
                                        <div className="product-name">{eachPolicy.ProductName}</div> 
                                        <div className="help-info">
                                            <div>Price: ₦{eachPolicy.Premium}</div>
                                        </div>
                                        <div className="product-ctas">
                                            
                                            <a href={eachPolicy.CertificateUrl}
                                                className="btn-alat m-t-10 m-b-20 text-center">View details   
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                    
            </Fragment>
        )
        
    }

    renderPoliciesContainer(){
        let getExistingPolicyRequest = this.props.getExistingPolicy,
            newPolicyRequest         = this.props.newPolicyDataChunk;
            
            // return(
            //     <div className="col-sm-12">
            //         <div className="row">
            //                 <div className="col-sm-12">
            //                     <div className="max-600">
            //                         <div className="al-card no-pad">
            //                             <div className="transfer-ctn text-center">
            //                                 {(getExistingPolicyRequest.fetch_status===FETCH_EXISTING_POLICIES_PENDING ||
            //                                   newPolicyRequest.fetch_status===FETCH_NEWINSURANCE_INFOSETS_PENDING) &&
            //                                     <div>Loading your existing policies...</div>
            //                                 }

            //                                 {(getExistingPolicyRequest.fetch_status===FETCH_EXISTING_POLICIES_SUCCESS 
            //                                     && (getExistingPolicyRequest.existingpolicy_data.response.data.InsuranceDetails===null)
            //                                     && newPolicyRequest.fetch_status===FETCH_NEWINSURANCE_INFOSETS_SUCCESS) &&
            //                                     this.renderNoExistingPolicy()
            //                                 }
            //                                 {(getExistingPolicyRequest.fetch_status===FETCH_EXISTING_POLICIES_SUCCESS 
            //                                     && getExistingPolicyRequest.existingpolicy_data.response.data.InsuranceDetails.length>=1
            //                                     && newPolicyRequest.fetch_status===FETCH_NEWINSURANCE_INFOSETS_SUCCESS) &&
            //                                     this.renderExistingPolicies()
            //                                 }
                                            
            //                             </div>
            //                         </div>
            //                     </div>
            //                 </div>
            //         </div>
            //     </div>
            // )


            return(
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-12">
                            
                                
                            {(getExistingPolicyRequest.fetch_status===FETCH_EXISTING_POLICIES_PENDING ||
                                newPolicyRequest.fetch_status===FETCH_NEWINSURANCE_INFOSETS_PENDING) &&
                                <div className="max-600">  
                                    <div className="al-card no-pad">
                                        <div className="transfer-ctn text-center">
                                            <div>Loading your existing policies...</div>
                                        </div>
                                    </div>
                                </div>
                            }

                            {(getExistingPolicyRequest.fetch_status===FETCH_EXISTING_POLICIES_SUCCESS 
                                && (getExistingPolicyRequest.existingpolicy_data.response.data.InsuranceDetails===null)
                                && newPolicyRequest.fetch_status===FETCH_NEWINSURANCE_INFOSETS_SUCCESS) &&
                                <div className="max-600">  
                                    <div className="al-card no-pad">
                                        <div className="transfer-ctn text-center">
                                            { this.renderNoExistingPolicy()}
                                        </div>
                                    </div>
                                </div>
                            }
                            {(getExistingPolicyRequest.fetch_status===FETCH_EXISTING_POLICIES_SUCCESS 
                                && (getExistingPolicyRequest.existingpolicy_data.response.data.InsuranceDetails!==null 
                                    && getExistingPolicyRequest.existingpolicy_data.response.data.InsuranceDetails.length>=1)
                                && newPolicyRequest.fetch_status===FETCH_NEWINSURANCE_INFOSETS_SUCCESS) &&
                                
                                <div>  
                                    <div className="al-card no-pad">
                                        <div className="text-right insurance-cta">
                                            <button type="button"  
                                            className="btn-alat m-t-10 m-b-20 text-center"
                                            onClick={()=>this.props.history.push("/insurance/buy-insurance")}>Buy Insurance</button>
                                        </div>
                                        <div className="transfer-ctn text-center">
                                            { this.renderExistingPolicies()}
                                        </div>
                                    </div>
                                </div>
                            }
                                    
                        </div>
                    </div>
                </div>
            )
    }


   
   

    
    render() {
        return (
            <Fragment>
               {this.renderPoliciesContainer()}
            </Fragment>
        );
    }
}


function mapStateToProps(state){
    return {
        getExistingPolicy   : state.insurancePile.getExistingPolicy,
        newPolicyDataChunk   : state.insurancePile.getNewPolicyDataChunk,
    };
}

export default connect(mapStateToProps)(ManageInsurance);
