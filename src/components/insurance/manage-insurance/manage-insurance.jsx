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
        
       
        
        
    }

    componentDidMount() {
        this.getCustomerPolicies();
        this.getNewPolicyData();
    }

    getCustomerPolicies(){
        const { dispatch } = this.props;
        dispatch(getExistingPolicies(this.state.user.token));
        
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

    renderPoliciesContainer(){
        let getExistingPolicyRequest = this.props.getExistingPolicy,
            newPolicyRequest         = this.props.newPolicyDataChunk;
            console.log('status is',getExistingPolicyRequest.fetch_status);
            return(
                <div className="col-sm-12">
                    <div className="row">
                            <div className="col-sm-12">
                                <div className="max-600">
                                    <div className="al-card no-pad">
                                        <div className="transfer-ctn text-center">
                                            {(getExistingPolicyRequest.fetch_status===FETCH_EXISTING_POLICIES_PENDING ||
                                              newPolicyRequest.fetch_status===FETCH_NEWINSURANCE_INFOSETS_PENDING) &&
                                                <div>Loading your existing policies...</div>
                                            }

                                            {(getExistingPolicyRequest.fetch_status===FETCH_EXISTING_POLICIES_SUCCESS 
                                                && getExistingPolicyRequest.existingpolicy_data.response.data.InsuranceDetails===null
                                                && newPolicyRequest.fetch_status===FETCH_NEWINSURANCE_INFOSETS_SUCCESS) &&
                                                this.renderNoExistingPolicy()
                                            }
                                        </div>
                                    </div>
                                </div>
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
