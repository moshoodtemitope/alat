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
// import aiicoLogo from "/../src/assets/img/aiico_logo.jpg";
import "./../insurance.scss";

import {
    FETCH_NEWINSURANCE_INFOSETS_SUCCESS,
    FETCH_NEWINSURANCE_INFOSETS_PENDING,
    FETCH_NEWINSURANCE_INFOSETS_FAILURE
 }from "../../../redux/constants/insurance/insurance.constants";


 import {
    getNewPolicyDataChunk,
    // clearCardsStore
} from "../../../redux/actions/insurance/insurance.actions";

// const options = [
// ];

const BASEURL = routes.BASEURL;

class BuyPolicy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            showAgreementAndProviders: true,
            showAcceptTerms: true,
            showProviders: false,
            isProviderSelected: false
        };
        
       this.handleSelectedProvider = this.handleSelectedProvider.bind(this);
        
        
    }

    componentDidMount() {
        // this.getCustomerPolicies();
        // this.getNewPolicyData();
    }

    handleSelectedProvider(){
        this.setState({showProviders:false, isProviderSelected: true})
    }

    renderProductsInCategory(e){
        let getNewPolicyChunkRequest = this.props.newPolicyDataChunk,
            productList                =getNewPolicyChunkRequest.newpolicy_data.response.ProductsList.Result;
    }


    renderPolicyCategories(){
        let getNewPolicyChunkRequest = this.props.newPolicyDataChunk,
            productList                =getNewPolicyChunkRequest.newpolicy_data.response.ProductsList.Result,
            productCategories =[],
            allPolices;

            // console.log('producs', getNewPolicyChunkRequest.newpolicy_data.response);

            productList.map(product=>{
                if(!productCategories.includes(product.ProductCategory)){
                    productCategories.push(product.ProductCategory)
                }
            })
            console.log('categories fhggf fddf', productCategories);

            allPolices = (
                <div>
                    <h4 className="m-b-10 center-text hd-underline">Select Insurance category</h4>
                    <div className="transfer-ctn text-center" onClick={this.handleSelectedProvider}>
                        <div className="productcategory-list">
                        {productCategories.map((eachCat, index) => {
                            if(eachCat==="Auto"){
                                return (
                                    <div className="eachproduct-category" data-cat  key={index}>
                                        <div className="productcategory-name">{eachCat}</div>
                                    </div>
                                )
                            }

                        })}
                        </div>
                    </div>
                </div>
            )
            // console.log('categories are', productCategories);


        return allPolices;
    }

    getNewPolicyData(){
        const { dispatch } = this.props;
        dispatch(getNewPolicyDataChunk(this.state.user.token));
    }

    renderAgreement(){
        return(
            <div className="transfer-ctn text-center">
                <h3 className="text-center"> Disclaimer</h3>
                <div className="agreement-text">
                    <ul>
                        <li>This service is offered through us by our partners.</li>
                        <li>Our partners may get in touch with you from time to time.</li>
                        <li>Premium, claims and other related services are determined and controlled, entirely, by our partners.</li>
                        <li>Click <a href="https://www.aiicoplc.com/index.php/terms-of-use"><span>here</span></a> to read the terms and conditions from our partners.</li>
                        <li>Clicking <span>"Okay, I understand"</span>  below absolves ALAT/Wema Bank Plc of any form of liability or claim relating to this service.</li>
                    </ul>
                </div>
                <center>
                        <button type="button"  className="btn-alat m-t-10 m-b-20 text-center"
                                                onClick={()=>this.setState({showAcceptTerms:false, showProviders:true})}> Okay I understand</button>
                    </center>
            </div>
        )
    }


    renderProviders(){
        return(
            <div>
                <h4 className="m-b-10 center-text hd-underline">Select Insurance provider</h4>
                <div className="transfer-ctn text-center" onClick={this.handleSelectedProvider}>
                    <div className="providerslist">
                        <div className="each-provider">
                            <div className="provider-logo"><img src="/../src/assets/img/aiico_logo.jpg" alt=""/></div>
                            <div className="provider-name">Aiico</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderAgreementAndProviders(){
        let {showAcceptTerms,
             showProviders,
             isProviderSelected} = this.state;
        return(
            <div>
                {showAcceptTerms &&
                    this.renderAgreement()
                }

                {showProviders && 
                    this.renderProviders()
                }

                {isProviderSelected &&
                    this.renderPolicyCategories()
                }
                
            </div>
        )
    }

    renderNewPolicyContainer(){
        let getNewPolicyChunkRequest = this.props.newPolicyDataChunk;
            console.log('status is',getNewPolicyChunkRequest.fetch_status);
            return(
                <div className="col-sm-12">
                    <div className="row">
                            <div className="col-sm-12">
                                <div className="max-600">
                                    <div className="al-card no-pad">
                                        
                                        {/* <div className="transfer-ctn text-center"> */}
                                            {getNewPolicyChunkRequest.fetch_status===FETCH_NEWINSURANCE_INFOSETS_PENDING &&
                                               
                                                <div className="transfer-ctn text-center">
                                                    Please wait...
                                                </div>
                                            }

                                            {(getNewPolicyChunkRequest.fetch_status===FETCH_NEWINSURANCE_INFOSETS_SUCCESS) &&
                                                this.renderAgreementAndProviders()
                                            }
                                        {/* </div> */}
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
               {this.renderNewPolicyContainer()}
            </Fragment>
        );
    }
}


function mapStateToProps(state){
    return {
        newPolicyDataChunk   : state.insurancePile.getNewPolicyDataChunk,
    };
}

export default connect(mapStateToProps)(BuyPolicy);
