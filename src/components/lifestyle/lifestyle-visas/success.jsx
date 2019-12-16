import React from 'react';
import successLogo from '../../../assets/img/success.svg';
import { formatAmountNoDecimal } from '../../../shared/utils';
import { listStyleConstants } from '../../../redux/constants/lifestyle/lifestyle-constants';
import { connect } from "react-redux";





class Success extends React.Component{
    constructor(props){
        super(props)
        this.state={
            Package:"",
            ApplicationType:"",
            Amount:""


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

    render(){
        return(
            <div className="col-sm-12">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="max-600">
                            <div className="al-card">
                                <center>
                                    <img src={successLogo} className="m-b-30 m-t-20" alt="Success" />
                                </center>
                                <h4 className="center-text red-text">Payment Successful</h4>

                                <div className="m-t-20 width-400">
                                    <div className="al-card no-pad">
                                        <div className="trans-summary-card">
                                            <div className="name-amount clearfix">
                                                <p className="pl-name-email">{this.state.ApplicationType} Data Plan<span>{this.state.PackageName}</span></p>
                                                <p className="pl-amount">{this.state.Amount ? "₦" + formatAmountNoDecimal(this.state.Amount) : "####"}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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

export default connect(mapStateToProps)(Success) 

