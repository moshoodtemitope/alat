import React, { Component, Fragment } from 'React';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import dataLogo from '../../../assets/img/phone-data.svg';
import * as actions from '../../../redux/actions/dataActions/export';
import Modal from 'react-responsive-modal';
import { formatAmountNoDecimal } from '../../../shared/utils';
import airtelLogo from '../../../assets/img/airtel.svg';
import mtnLogo from '../../../assets/img/mtn.svg';
import gloLogo from '../../../assets/img/glo.svg';
import NinemobileLogo from '../../../assets/img/9mobile.svg';

var image = null;
var network = null;
class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            show: false,
            selectedBeneficiary: { BillerAlias: "" }
        };
    }

    componentDidMount() {
        this.props.clearDataInfo();
    }

    onShowModal = (beneficiaryData) => {
        this.setState({ selectedBeneficiary: beneficiaryData, show: true });
    }

    onCloseModal = () => {
        this.setState({ show: false, selectedBeneficiary: { BillerAlias: "" } })
    }

    onErrorModal = () => {
        this.props.resetPinState();
    }

    onDeleteBeneficiary = (beneficiaryData) => {
        console.log(beneficiaryData);
        this.props.onDeleteBeneficiary(this.state.user.token, beneficiaryData);
        this.onCloseModal();
    }

    useBeneficiary = (dataToSet, network) =>{
        this.props.setDataToBuyDetails(dataToSet, network)
        this.props.history.push('/bills/data/buy/confirm');
    }

    render() {
        let index = (
            <div className="col-sm-12">
                <div className="max-600 m-t-40">
                    <center>
                        <img src={dataLogo} className="m-b-30" alt="Data Logo" />
                        <p className="grey-text no-paylink">{this.props.isFetching ? "Loading saved beneficiaries..." : "No saved data purchase"}</p>
                        <Link to={'/bills/data/buy'} className="btn-alat">Buy Data</Link> 
                    </center>
                </div>
            </div>);

        if (this.props.beneficiaries.length > 0) {
            var dataBeneficiaries = this.props.beneficiaries.filter(beneficiary => beneficiary.IsAirtime == false);
            if (dataBeneficiaries.length > 0) {
                index = (
                    <Fragment>
                        <Modal open={this.props.pinVerified == 1 && this.props.errorMessage} onClose={this.onErrorModal} center>
                                <div className="div-modal">
                                    <h3><b>{this.props.errorMessage}</b> </h3>
                                </div>
                        </Modal>
                        <div className="col-sm-12 mb-3">
                            <div className="row">
                                <div className="col-sm-12">
                                    <Link to={'/bills/data/buy'} className="btn-alat">Buy Data</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div className="row">
                                {

                                    dataBeneficiaries.map((beneficiary, counter) => {
                                        switch (beneficiary.NetworkCode) {
                                            case (2):
                                                image = <img src={mtnLogo} alt="mtnlogo" />;
                                                network = "MTN";
                                                break;
                                            case (3):
                                                image = <img src={airtelLogo} alt="airtelLogo" />;
                                                network = "Airtel";
                                                break;
                                            case (1):
                                                image = <img src={gloLogo} alt="gloLogo" />;
                                                network = "Glo"
                                                break;
                                            case (4):
                                                network = "Etisalat"
                                                image = <img src={NinemobileLogo} alt="9mobileLogo" />;
                                                break;
                                            default:
                                                image = <img src={airtelLogo} alt="airtelLogo" />;
                                                network = "Airtel";
                                        };
                                        var dataToBuy = {
                                            Amount: beneficiary.Amount,
                                            BillerPaymentCode: beneficiary.BillerPaymentCode,
                                            NetworkCode: beneficiary.NetworkCode,
                                            PaymentItem: beneficiary.PaymentItem,
                                            PhoneNumber: beneficiary.PhoneNumber,
                                            SubscriberId: beneficiary.PhoneNumber,
                                        }
                                        return (
                                            <div className="col-sm-12 col-md-4" key={counter + 1} >
                                                <div className="al-card airtime-card">
                                                    <div className="clearfix">
                                                        <div className="network-img"  onClick={() => {this.useBeneficiary(dataToBuy, network)}}>
                                                            {image}
                                                        </div>
                                                        <div className="all-info">
                                                            <p className="line-price">{beneficiary.BillerAlias} <span className="price">{"N" + formatAmountNoDecimal(beneficiary.Amount)}</span></p>
                                                            <p className="num-ref">{beneficiary.PhoneNumber}<span className="price"><a onClick={() => this.onShowModal(beneficiary)}><i class="fa fa-trash-o" aria-hidden="true"></i></a></span></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>)
                                    })
                                }
                            </div>
                        </div>
                    </Fragment>
                );
            }



        }
        return (
            <Fragment>

                <Modal open={this.state.show} onClose={this.onCloseModal} center>
                    <div className="div-modal">
                        <h3> Are you sure you want to delete?</h3>
                        <h6><b>{this.state.selectedBeneficiary.BillerAlias}</b></h6>
                        <div className="btn-opt">
                            <button onClick={this.onCloseModal} className="border-btn">Back</button>
                            <button onClick={() => this.onDeleteBeneficiary(this.state.selectedBeneficiary)} className="btn-alat">Proceed</button>
                        </div>
                    </div>
                </Modal>
                {index}

            </Fragment>
        )
    }
}



const mapStateToProps = state => {
    return {
        fetching: state.data_reducer.isFetching,
        pinVerified: state.data_reducer.pinVerified,
        errorMessage: state.data_reducer.errorMessage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onDeleteBeneficiary: (token, data) => dispatch(actions.deleteDataBeneficiary(token, data)),
        setDataToBuyDetails: (dataToBuy, network) => dispatch(actions.setDataTransactionDetails(dataToBuy, network)),
        clearDataInfo: () => dispatch(actions.clearDataInfoNoPost()),
        resetPinState: () => dispatch(actions.pinVerificationTryAgain()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);


