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
    FETCH_COVERSIN_PRODUCTS_SUCCESS,
    FETCH_COVERSIN_PRODUCTS_PENDING,
    FETCH_COVERSIN_PRODUCTS_FAILURE
 }from "../../../redux/constants/insurance/insurance.constants";


 import {
    // clearCardsStore
} from "../../../redux/actions/insurance/insurance.actions";

// const options = [
// ];

const BASEURL = routes.BASEURL;

class SelectInsuranceCover extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
        };
        
        this.getCoverDetails =  this.getCoverDetails.bind(this);
       
        
        
    }

    componentDidMount() {
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
                                                className="btn-alat btn-inverse m-t-10 m-b-20 text-center">More Details    
                                            </button>
                                            <button type="button"  
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

    getCoverDetails(e){
        e.preventDefault();
        let productCoversRequest    = this.props.getProductCovers,
            listOfCovers            = productCoversRequest.policycover_data.response.data,
            idOfSelectedPackage     =  e.target.getAttribute('data-cover-id'),
            selectedPackage         = listOfCovers.filter(eachCover=>eachCover.SubClassCoverTypes.Id ===idOfSelectedPackage);

            this.state= Object.assign({}, {
                showDetailsModal:true,
                selectedPackage
            }, this.state);

           
        console.log('updated state',this.state);
    }
    
    renderCoverDetails(){
        let {selectedPackage} = this.state;
        return(
            <div className="coverdetails-modal">
                <div className="coverdetails-wrap al-card">
                    <h4 class="m-b-10  hd-underline">{selectedPackage.SubClassCoverTypes.CoverTypeName}</h4>
                    dfdfdfdfdfdfd
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
        getProductCovers   : state.insurancePile.getCoversInPoductRequest
    };
}

export default connect(mapStateToProps)(SelectInsuranceCover);
