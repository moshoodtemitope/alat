

import React from 'react'
import { listStyleConstants } from '../../../redux/constants/lifestyle/lifestyle-constants';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import AlatPinInput from '../../../shared/components/alatPinInput';
import * as actions from '../../../redux/actions/lifestyle/movies-actions';





class VisaPayment extends React.Component{

    constructor(props){
        super(props)
        this.state={
            Pin: "",
            isPinInvalid: false,
            ApplicationType:"",
            Package:"",
            Amount:"",
            Email:"",
            PassportNumber:"",
            TransactionReference:"",
            DebitAccountNumber:"",
            user: JSON.parse(localStorage.getItem("user")),


        }
        this.handleAlatPinChange = this.handleAlatPinChange.bind(this);

    }
    handleAlatPinChange(pin) {
        this.setState({ Pin:pin })
        if (this.state.isSubmitted) {
            if (pin.length != 4)
                this.setState({ isPinInvalid: false })
        }
    }
    checkPin() {
        if (this.state.Pin.length != 4) {
            this.setState({ isPinInvalid: true })
            return true;
        }
    }

    componentDidMount = () => {
        this.init();
    };
    
    init = () => {
        if (this.props.PostVisaDetail.message !== listStyleConstants.POST_VISA_DETAIL_SUCCESS)
            this.props.history.push("/lifestyle/travels/visa-detail");
        else {
            var data = {
                ...this.props.PostVisaDetail.data
            };
            console.log('tag', data);

            this.setState({
                ApplicationType: data.data.ApplicationType,
                Package: data.data.Package,
                Amount: data.data.TransactionAmount,
                PassportNumber: data.data.PassportNumber,
                Email: data.data.Email,
                PackageName: data.data.PackageName,
                TransactionReference: data.response.data.transactionReference



            });
        }
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ formsubmitted: true });

        if (this.checkPin()) {

        } else {
            let data={
                TransactionReference: this.state.TransactionReference,
                DebitAccountNumber: this.state.user.accounts[0].accountNumber,
                Pin: this.state.Pin,
                Amount: parseFloat(this.state.Amount),
                
            }

            this.props.dispatch(actions.PostVisaPayment(this.state.user.token, data));

        }
    }
    // gotoStep2 = () => {
    //     if (this.props.PostVisaPayment)
    //         if (this.props.PostVisaPayment.message === listStyleConstants.POST_VISA_PAYMENT_SUCCESS) {
    //             return <Redirect to="/lifestyle/travels/success"/>
    //         }
    // };
    formatAmountNoDecimal = (amount) => {
        return amount.toLocaleString(navigator.language, { minimumFractionDigits: 0 });
    };


    render(){
        return(
            <div className="col-sm-12">
                <div className="row">
                    {/* {this.gotoStep2()} */}

                    <div className="col-sm-12">
                        <div className="max-600">
                            {this.props.alert && this.props.alert.message &&
                                <div style={{ width: "100%", marginLeft:"1px" }} className={`info-label ${this.props.alert.type}`}>{this.props.alert.message}</div>
                            }
                            <div className="al-card no-pad">
                                <h4 className="m-b-10 center-text hd-underline">Payment Details</h4>
                                <div className="transfer-ctn">
                                    
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="al-card no-pad">
                                            <div className="trans-summary-card">
                                                <div className="name-amount clearfix">
                                                    <p className="pl-name-email">{this.state.user.accounts[0].accountType}<span>{this.state.user.accounts[0].accountNumber}</span></p>
                                                    <p className="pl-amount-balance">₦{this.state.user.accounts[0].availableBalance}<span>Account Balance</span></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="al-card no-pad">
                                            <div className="trans-summary-card">
                                                <div className="name-amount clearfix">
                                                <p className="pl-name-email">{this.state.ApplicationType}<span>{this.state.PackageName}</span><span>{this.state.Email}</span><span>Passport Number:{this.state.PassportNumber}</span></p>
                                                    <p className="pl-amount-balance">₦{this.formatAmountNoDecimal(this.state.Amount)}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <AlatPinInput
                                            value={this.state.Pin}
                                            onChange={this.handleAlatPinChange}
                                            PinInvalid={this.state.isPinInvalid}
                                            maxLength={4} />

                                        <div className="row">
                                            <div className="col-sm-12">
                                                <center>
                                                    <button 
                                                        disabled={this.props.PostVisaPayment.message === listStyleConstants.POST_VISA_PAYMENT_PENDING}
                                                    className="btn-alat m-t-10 m-b-20 text-center">
                                                        {this.props.PostVisaPayment.message === listStyleConstants.POST_VISA_PAYMENT_PENDING ? "Processing...": "Comfirm" }
                                                    </button>

                                                </center>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                             <center>
                                <a  style={{ cursor: "pointer" }} onClick={() => {
                                    this.props.dispatch(actions.ClearAction(listStyleConstants.MOVIE_REDUCER_CLEAR));
                                    this.props.history.push('/lifestyle/travels/visa-detail')
                                }} className="add-bene m-t-50">
                                    Go back
                                </a>
                        </center>
                        </div>
                    </div>
                   
                </div>
            </div>






        )
    }

}
function mapStateToProps(state) {
    return {
        PostVisaDetail: state.LifestyleReducerPile.PostVisaDetail,
        PostVisaPayment: state.LifestyleReducerPile.PostVisaPayment,
        alert: state.alert,



    };

}

export default connect(mapStateToProps)(VisaPayment) 