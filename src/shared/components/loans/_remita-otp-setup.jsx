import React, { Fragment } from 'react';

import Select from 'react-select';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import * as actions from '../../../redux/actions/loans/loans.action';
import { loanConstants } from '../../../redux/constants/loans/loans.constants';
import * as util from '../../utils';
import { CollectionScreenOption } from '../../constants';


class RemitaOtpSetupComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            formFieldsModel: null,
            StatusMandateModel: {
            },
            modelInitialized: false
        }
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
            this.props.dispatch(actions.loanValidateRemitaOtp(this.state.user.token, formElementArray));
        }
    }
   

    handleChange = (event, index) => {
        let _formsFieldModel = { ...this.state.formFieldsModel }
        let updated = { ..._formsFieldModel[index] }
        updated.Value = event.target.value;
        _formsFieldModel[index] = updated;
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

    render() {
        var form = <h1>loading</h1>;
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
                                                            <input type="text" name={formElement.ParamId} value={formElement.Value} onChange={(event) => this.handleChange(event, formElement.ParamId)} />
                                                        </div>
                                                    )
                                                }

                                            })
                                        }
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <center>
                                                    <input type="submit"
                                                        value={"Confirm"}
                                                        className="btn-alat m-t-10 m-b-20 text-center" />
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