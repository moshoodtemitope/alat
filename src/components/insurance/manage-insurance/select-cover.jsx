import * as React from "react";
import {Router} from "react-router";
// import * as utils from "../../shared/utils";

import {Fragment} from "react";
import {connect} from "react-redux";
import Select from 'react-select';
import whitelogo from "../../../assets/img/white-logo.svg"; 
import  {routes} from '../../../services/urls';

import {
    FETCH_COVERSIN_PRODUCTS_SUCCESS,
    FETCH_COVERSIN_PRODUCTS_PENDING,
    FETCH_COVERSIN_PRODUCTS_FAILURE
 }from "../../../redux/constants/insurance/insurance.constants";


 import {
    // clearCardsStore
    setProductCoverId
} from "../../../redux/actions/insurance/insurance.actions";

// const options = [
// ];

const BASEURL = routes.BASEURL;

class SelectInsuranceCover extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            showDetailsModal: false
        };
        
        this.getCoverDetails    =  this.getCoverDetails.bind(this);
        this.renderCoverDetails = this.renderCoverDetails.bind(this);
        this.updateDetailsModal = this.updateDetailsModal.bind(this);
        this.collapseDetails    = this.collapseDetails.bind(this);
        this.choosePolicyTobuy  = this.choosePolicyTobuy.bind(this);
       
        
        
    }

    componentDidMount() {
        this.verifyStage();
    }

    
    verifyStage(){
        if(Object.keys(this.props.getProductCovers).length===0){
            this.props.history.push("/insurance")
        }
    }

    updateDetailsModal(selectedPackage){
        this.setState({showDetailsModal: true,selectedPackage})
    }
    
    choosePolicyTobuy(e){
        e.preventDefault();
        const { dispatch } = this.props;
        let productCoverId = e.target.getAttribute('data-cover-id'),
            productCoverName = e.target.getAttribute('data-cover-name'),

            coverData = {
                productCoverId,productCoverName
            }
        dispatch(setProductCoverId(coverData));
        this.props.history.push("/insurance/buy-insurance/details")
    }

    renderAllCovers(){
        let productCoversRequest = this.props.getProductCovers,
            listOfCovers = productCoversRequest.policycover_data.response.data;

            

            return(
                <Fragment>
                    {
                        listOfCovers.map((eachCover,key)=>(
                            <div className="col-sm-4" key={key}>
                                <div className="al-card no-pad">
                                    <h4 className="m-b-10  hd-underline covername"> {eachCover.SubClassCoverTypes.CoverTypeName}</h4>
                                    <div className="policyinfo-wrap">
                                        <div className="product-name">{eachCover.SubClassCoverTypes.ProductName}</div> 
                                        <div className="help-info">Click more details to see what is covered</div>
                                        <div className="product-ctas">
                                            <button type="button"
                                                        onClick={this.getCoverDetails}
                                                    data-cover-id={eachCover.SubClassCoverTypes.Id}  
                                                    data-cover-name={eachCover.SubClassCoverTypes.CoverTypeName}
                                                className="btn-alat btn-inverse m-t-10 m-b-20 text-center">More Details    
                                            </button>
                                            <button type="button"
                                                data-cover-id={eachCover.SubClassCoverTypes.Id}
                                                data-cover-name={eachCover.SubClassCoverTypes.CoverTypeName}
                                                onClick ={this.choosePolicyTobuy}
                                                className="btn-alat m-t-10 m-b-20 text-center">Buy Policy    
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    
                </Fragment>
            )
    }

    collapseDetails(){
        this.setState({showDetailsModal:false})
    }

    getCoverDetails(e){
        e.preventDefault();
        let productCoversRequest    = this.props.getProductCovers,
            listOfCovers            = productCoversRequest.policycover_data.response.data,
            idOfSelectedPackage     =  e.target.getAttribute('data-cover-id'),
            selectedPackage         = (listOfCovers.filter(eachCover=>eachCover.SubClassCoverTypes.Id ===idOfSelectedPackage))[0];

            this.updateDetailsModal(selectedPackage);
            // this.state= Object.assign({}, {
            //     showDetailsModal:true,
            //     selectedPackage
            // }, this.state);
            // this.state.showDetailsModal = true;
            // this.state.selectedPackage = selectedPackage;
           
        // console.log('updated state',this.state);
    }
    
    renderCoverDetails(){
        let {selectedPackage} = this.state;
        console.log('in details', this.state);
        return(
            <div className="coverdetails-modal">
                <div className="collapse-details" onClick={this.collapseDetails} ></div>
                <div className="coverdetails-wrap al-card no-pad">
                    <h4 className="m-b-10 covertitle  hd-underline text-center">{selectedPackage.SubClassCoverTypes.CoverTypeName}</h4>
                    <div className="policyinfo-wrap">
                        <h4>This policy is designed to cover:</h4>
                        <div className="allcovers-list">
                            {
                             selectedPackage.Benefits.map((eachBenefit,key)=>(
                                <div className="policy-benefit" key={key}>
                                    {eachBenefit.Name}{eachBenefit.Description!=='Covered' && <span>:{eachBenefit.Description} </span>}
                                </div>
                             ))   
                            }
                            <center>
                                <button type="button"
                                        className="btn-alat m-t-10 m-b-20 text-center"
                                        data-cover-name={selectedPackage.SubClassCoverTypes.CoverTypeName}
                                        data-cover-id={selectedPackage.SubClassCoverTypes.Id}
                                        onClick ={this.choosePolicyTobuy}>
                                    Buy Policy
                                </button>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderAllCoversContainer(){
        let productCoversRequest = this.props.getProductCovers;
            return(
                <div className="col-sm-12">
                    <div className="row">
                        {this.renderAllCovers()}
                    </div>
                </div>
            )
    }


   
   

    
    render() {
        return (
            <Fragment>
               {this.renderAllCoversContainer()}
               {this.state.showDetailsModal==true && this.renderCoverDetails()}
            </Fragment>
        );
    }
}


function mapStateToProps(state){
    return {
        getProductCovers   : state.insurancePile.getCoversInPoductRequest,
        saveProductCoverId   : state.insurancePile.saveProductCoverId
    };
}

export default connect(mapStateToProps)(SelectInsuranceCover);
