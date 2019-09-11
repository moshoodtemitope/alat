import * as React from "react";
import {Router} from "react-router";
// import * as utils from "../../shared/utils";

import {Fragment} from "react";
import {connect} from "react-redux";
import {Checkbox} from "react-inputs-validation";
import DatePicker from "react-datepicker";
import { Link } from 'react-router-dom';
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
    FETCH_NEWINSURANCE_INFOSETS_FAILURE,
    FETCH_COVERSIN_PRODUCTS_SUCCESS,
    FETCH_COVERSIN_PRODUCTS_PENDING,
    FETCH_COVERSIN_PRODUCTS_FAILURE
 }from "../../../redux/constants/insurance/insurance.constants";


 import {
    getNewPolicyDataChunk,
    getCoversInProduct
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
            selectedProvider:'',
            selectedProduct:'',
            isProviderSelected: false,
            isCategorySelected: false,
            disabledBtn: true
        };
        
       this.handleSelectedProvider   = this.handleSelectedProvider.bind(this);
       this.handleProviderChange     = this.handleProviderChange.bind(this);
       this.handleSelectedCategory   = this.handleSelectedCategory.bind(this);
       this.handleSelectedProduct   = this.handleSelectedProduct.bind(this);
        
        
    }

    componentDidMount() {
        // this.getCustomerPolicies();
        // this.getNewPolicyData();
        this.verifyStage();
    }

    verifyStage(){
        if(Object.keys(this.props.newPolicyDataChunk).length===0){
            this.props.history.push("/insurance");
            return false;
        }
    }

    handleSelectedProvider(){
        this.setState({showProviders:false, isProviderSelected: true})
    }

    handleProviderChange(selectedProvider){
        // this.setState({selectedProvider, showProviders:false, isProviderSelected: true})
        this.setState({selectedProvider:selectedProvider.value, isProviderSelected: true})
    }

    handleSelectedCategory(selectedCat){
        this.setState({selectedCat: selectedCat.value, isCategorySelected: true})
    }

    handleSelectedProduct(selectedProduct){
        this.setState({selectedProduct: selectedProduct.value, isProductSelected: true, disabledBtn:false })
    }

    
    getCoversInProduct(){
        // console.log('select Id',this.state.selectedProduct);
        const {dispatch} = this.props;

        if(this.state.selectedProduct!=='' && this.state.selectedProvider!==''){
            let payload = {productId: this.state.selectedProduct}

            dispatch(getCoversInProduct(this.state.user.token, payload, this.state.selectedProvider ))
        }
    }


    renderPolicyCategories(){
        let getNewPolicyChunkRequest = this.props.newPolicyDataChunk,
            productList                =getNewPolicyChunkRequest.newpolicy_data.response.ProductsList.Result,
            productCategories =[],
            allPolices;

            
            productList.map(product=>{
                    if(product.ProductCategory==='Auto'){
                        productCategories.push({ value:product.ProductCategory, label:product.ProductCategory })
                    }
            })

            const filteredCategories = productCategories.reduce((acc, current) => {
                const x = acc.find(item => item.value === current.value);
                if (!x) {
                  return acc.concat([current]);
                } else {
                  return acc;
                }
              }, []);
            allPolices = (
                <div className="input-ctn m-t-30">
                    <label>Select Category</label>
                    <Select
                        options={filteredCategories}
                        placeholder="Select category"
                        onChange={this.handleSelectedCategory}
                    />
                </div>
            )
            // console.log('categories are', productCategories);


        return allPolices;
    }

    renderProductsInCategory(){
        let categoryChosen              = this.state.selectedCat,
            getNewPolicyChunkRequest    = this.props.newPolicyDataChunk,
            productList                 = getNewPolicyChunkRequest.newpolicy_data.response.ProductsList.Result,
            productsInCategory          = productList.filter(product=>product.ProductCategory===categoryChosen),
            productTodisplay = [];   

            
            productsInCategory.map(product=>{
                productTodisplay.push({
                    value: product.Id,
                    label: product.Name
                })
            })

            productsInCategory= (
                <div className="input-ctn m-t-30">
                    <label>Select Product</label>
                    <Select
                        options={productTodisplay}
                        placeholder="Select product"
                        onChange={this.handleSelectedProduct}
                    />
                </div>
            )

        return productsInCategory;
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


    renderInitialScreen(){
        let providers = [{ value:"Aiico", label:"Aiico"}],
            {isProviderSelected,
            isCategorySelected, 
            isProductSelected,
            disabledBtn} = this.state;

            let productCoversRequest = this.props.getProductCovers;
        return(
            <div>
                <h4 className="m-b-10 center-text hd-underline">Buy Insurance</h4>
                <div className="transfer-ctn">
                    <div className="input-ctn m-t-30">
                        <label>Select Insurance Vendor</label>
                        <Select
                            options={providers}
                            placeholder="Select insurance provider"
                            onChange={this.handleProviderChange}
                        />
                    </div>
                    {isProviderSelected && this.renderPolicyCategories()}
                    {isCategorySelected && this.renderProductsInCategory()}

                     
                    <center>
                        <button type="submit"  
                            className="btn-alat m-t-10 m-b-20 text-center"
                            disabled={productCoversRequest.is_processing}
                            onClick={()=>this.getCoversInProduct()}>
                                {productCoversRequest.is_processing===true?'Processing...':'Next'}    
                            </button>
                           
                            {(productCoversRequest.is_processing===false && productCoversRequest.fetch_status===FETCH_COVERSIN_PRODUCTS_FAILURE)&&
                                <div className="error-msg">{productCoversRequest.policycover_data.error}</div>
                            } 

                            <div><Link to={'/insurance'}>Back</Link></div>
                    </center>
                    
                </div>
            </div>
        )
    }

    renderAgreementAndProviders(){
        let {showAcceptTerms,
             showProviders} = this.state;
        return(
            <div>
                {showAcceptTerms &&
                    this.renderAgreement()
                }

                {showProviders && 
                    this.renderInitialScreen()
                }

            </div>
        )
    }

    renderNewPolicyContainer(){
        let getNewPolicyChunkRequest = this.props.newPolicyDataChunk;
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
        getProductCovers   : state.insurancePile.getCoversInPoductRequest
    };
}

export default connect(mapStateToProps)(BuyPolicy);
