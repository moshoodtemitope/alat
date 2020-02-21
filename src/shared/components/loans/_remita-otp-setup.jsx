import React, { Fragment } from 'react';

import Select from 'react-select';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import {history} from "../../../_helpers/history";
import * as actions from '../../../redux/actions/loans/loans.action';
import { loanConstants } from '../../../redux/constants/loans/loans.constants';
import * as LoanActions from '../../../redux/actions/loans/loans.action';
import * as util from '../../utils';
import { CollectionScreenOption } from '../../constants';
import ExtendModal from '../_modal';


class RemitaOtpSetupComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            formFieldsModel: null,
            StatusMandateModel: {
            },
            modelInitialized: false,
            openModal: false,
            IsSuccess: true,
            modalFired: false,
        };
        this.currentData = [];
        this.successMessage='';
    }

    componentDidMount = () => {
        this.init();
    }

    init = () => {
        if (this.props.standing_order)
         if (this.props.standing_order.loan_standOrder_status == loanConstants.LOAN_STAND_ORDER_SUCCESS) {
            //  console.log("in successful standing order");
        // var test = {
        //     GetCollectionScreenOption: 0,
        //     DebitBankActionRequired: true,
        //     DebitBankActionMessage: "sample string 2",
        //     RemitaMandateReference: "sample string 3",
        //     kycRequired: true,
        //     MandateValidationDetails: [
        //         {
        //             "ParamId": 1,
        //             "Param": "sample string 2",
        //             "Description": "sample string 3"
        //         },
        //         {
        //             "ParamId": 2,
        //             "Param": "sample string 2",
        //             "Description": "sample string 3"
        //         }
        //     ]
        // };
        let data = {
            ...this.props.standing_order.loan_standOrder_data.response.Response
            //...test
        };
        // console.log(data);
        let _formsFieldModel = data;//{ ...this.state.formFieldsModel }
        
        data.MandateValidationDetails.map((value, index) => {
            // console.log("params",value );
            _formsFieldModel[value.ParamId] = {
                Param: value.Param,
                ParamId: value.ParamId,
                Description: value.Description,
                Value: ""
            }

        })
        this.setState({ formFieldsModel: _formsFieldModel, StatusMandateModel: data });
           }
         else {
             //this.props.NavigateToPreviousPage();
            }
         else {
             //this.props.NavigateToPreviousPage();
            }
    }

    onSubmit = (e) => {
        e.preventDefault();
        // e.preventDefault();
        if (this.state.formFieldsModel) {
            const formElementArray = [];
            
            for (let key in this.state.formFieldsModel) {
                formElementArray.push(this.state.formFieldsModel[key])
            }
            // this.props.dispatch(actions.loanValidateRemitaOtp(this.state.user.token, formElementArray));
            this.props.dispatch(actions.loanValidateRemitaOtp(this.state.user.token, this.currentData));
        }
    }
   

    handleChange = (event, index, paramsData) => {
        let _formsFieldModel = { ...this.state.formFieldsModel }
        let updated = { ..._formsFieldModel[index] }
        
        updated.Value = event.target.value;
        _formsFieldModel[index] = updated;

        // let currentData = [];
        // if(currentData.length>=1){
            // let testExisting = currentData.filter(eachData=>eachData.ParamId===paramsData.ParamId);
            // if(testExisting.length===0){

            // }
        //    this.currentData.push(paramsData);
            for(var i=0; i < this.currentData.length; i++) {
                if(this.currentData[i].ParamId === paramsData.ParamId)
                {
                   this.currentData.splice(i,1);
                   
                }
                
             }
             this.currentData.push(paramsData);
        // }
        // console.log("-----",this.currentData);
        this.setState({ formFieldsModel: _formsFieldModel });
    }
   
    goToNextPage = () => {
        if (this.props.loan_validateOtp)
            if (this.props.loan_validateOtp.loan_valotp_status == loanConstants.LOAN_VALIDATEOTP_SUCCESS) {
                if (this.state.StatusMandateModel.kycRequired) {
                    this.props.NavigateToKyc();
                }
            }
    }
    PopupModal = () => {
        if (this.props.alert) {
            if (this.props.loan_validateOtp.loan_valotp_status!==undefined && !this.state.modalFired) {
                if (this.props.loan_validateOtp.loan_valotp_status===loanConstants.LOAN_VALIDATEOTP_SUCCESS){
                    console.log("NMesage", this.props.loan_validateOtp.lo_valotp_data);
                    this.successMessage = this.props.loan_validateOtp.lo_valotp_data.response.Message;
                    this.controlModal();
                    this.setState({modalFired : true})
                }
            }
        }
    }

    controlModal = () => {
        this.setState({ openModal: !this.state.openModal });
    }
    SubmitModal = () => {
        // this.props.dispatch(onboardingActions.clearLoanOnboardingStore());
        // this.props.gotoDashBoard();
        this.props.dispatch(LoanActions.clearLoanOnboardingStore());
        history.push('/loans/salary/dashboard');
        
    }



    render() {
        let optRequest = this.props.loan_validateOtp;
        var form = <h1>loading</h1>;
        this.PopupModal();
        if (this.state.formFieldsModel) {
            // console.log(this.state.formFieldsModel);
            const formElementArray = [];
            for (let key in this.state.formFieldsModel.MandateValidationDetails) {
                formElementArray.push(this.state.formFieldsModel.MandateValidationDetails[key])
            }
            form = (
                <div className="row">
                    <div className="col-sm-12">
                        <div className="max-500">
                            <div className="loan-header-text text-center">
                                <h4 className="text-black">Score Card</h4>
                                <p>Kindly select the answer that best describes you.</p>
                            </div>
                            <div className="al-card no-pad">
                                <div className="transfer-ctn">
                                    {this.props.alert && this.props.alert.message &&
                                        <div className={`info-label ${this.props.alert.type}`}>{this.props.alert.message}</div>
                                    }
                                    <form onSubmit={this.onSubmit}>
                                        {
                                            formElementArray.map(formElement => {
                                                
                                                if(formElement!==null && formElement!==undefined && typeof formElement==="object" && Object.keys(formElement).length>=3){
                                                    // if((formElement!==null && typeof formElement==="object" && Object.keys(formElement)>=4)  && formElement!==undefined && formElement!=="" && typeof formElement!==boolean && typeof formElement!=="number" ){
                                                        
                                                    return (
                                                        <div className="input-ctn" key={formElement.ParamId}>
                                                            <label>{formElement.Description}</label>
                                                            {/* <input type="text" name={formElement.ParamId} value={formElement.Value} onChange={(event) => this.handleChange(event, formElement.ParamId)} /> */}
                                                            <input type="text" name={formElement.ParamId} value={formElement.Value} 
                                                                onChange={(event) => this.handleChange(event, formElement.ParamId,
                                                                                                                {   Param:formElement.Param, 
                                                                                                                    Value:event.target.value,
                                                                                                                    ParamId:formElement.ParamId,
                                                                                                                    Description:formElement.Description })} />
                                                        </div>
                                                    )
                                                }

                                            })
                                        }
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <center>
                                                <button type="submit" 
                                                        disabled={optRequest.is_processing} className="btn-alat m-t-10 m-b-20 text-center">
                                                    {optRequest.is_processing===true?"Confirming...":"Confirm"}</button>
                                                    {/* <input type="submit"
                                                        value={optRequest.is_processing===true?"Confirming...":"Confirm"}
                                                        disabled={optRequest.is_processing}
                                                        className="btn-alat m-t-10 m-b-20 text-center" /> */}
                                                </center>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <center>
                                {/* <a onClick={this.gotoPreviousPage} className="add-bene m-t-50">Go Back</a> */}
                            </center>
                        </div>
                    </div>
                    <ExtendModal openModal={this.state.openModal} onCloseModal={this.controlModal} showCloseIcon={false}
                      IsSuccess={this.state.IsSuccess}  SubmitAction={this.SubmitModal}
                      message={this.successMessage} 
                    />
                </div>
            );
        }
        return (form);
    }
}

function mapStateToProps(state) {
    return {
        alert: state.alert,
        standing_order: state.loanReducerPile.loanStandingOrder,
        loan_validateOtp: state.loanReducerPile.loanValRemOtp
    }
}   

export default connect(mapStateToProps)(RemitaOtpSetupComponent);