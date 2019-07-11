import React, { Component, Fragment } from 'React';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import billsLogo from '../../../assets/img/bills-icon.svg';
import * as actions from '../../../redux/actions/bills/export';
import Modal from 'react-responsive-modal';
import { formatAmountNoDecimal } from '../../../shared/utils';
import airtelLogo from '../../../assets/img/airtel.svg';
import mtnLogo from '../../../assets/img/mtn.svg';
import gloLogo from '../../../assets/img/glo.svg';
import NinemobileLogo from '../../../assets/img/9mobile.svg';

var image = null;
class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            show: false,
            selectedBeneficiary: null,
            selectedAlias: ""
        };
    }

    componentDidMount() {
        if(this.props.bills < 1){
            this.props.fetchBills(this.state.user.token);
        }
    }

    onShowModal = (beneficiaryId, alias) => {
        this.setState({ selectedBeneficiary: beneficiaryId, selectedAlias: alias, show: true });
    }

    onCloseModal = () => {
        this.setState({ show: false, selectedBeneficiary: null, selectedAlias: ""})
    }

    onDeleteBeneficiary = () => {
        console.log(this.state.selectedBeneficiary);
        this.props.deleteBeneficiary(this.state.user.token, {BeneficiaryId: this.state.selectedBeneficiary});
        this.onCloseModal();
    }

    useBeneficiary = (billToSet) =>{
        this.props.setBillInfo(billToSet)
        this.props.history.push('/bills/paybills/confirm');
    }

    render() {
        console.log("in bils index")
        var index = (
            <div className="col-sm-12">
                <div className="max-600 m-t-40">
                    <center>
                        <img src={billsLogo} className="m-b-30" alt="Data Logo" />
                        <p className="grey-text no-paylink">{this.props.isFetching ? "Loading saved bills..." : (this.props.alert.message ? <p><span style={{color:"red"}}>{this.props.alert.message}</span><span onClick={() => {this.props.fetchBills(this.state.user.token)}} style={{textDecoration:"underline", cursor:"pointer"}}> Click here to try again</span></p> : "No saved bill payment")}</p>
                        <Link to={'/bills/paybills/biller'} className="btn-alat">Pay Bills</Link> 
                    </center>
                </div>
            </div>);

        if (this.props.bills.length > 0) {
                index = (
                    <Fragment>
                        <div className="col-sm-12 mb-3">
                            <div className="row">
                                <div className="col-sm-12">
                                    <Link to={'/bills/paybills/biller'} className="btn-alat">Pay Bills</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div className="row">
                                {
                                    this.props.bills.map((bill, counter) => {
                                        // switch (bill.BillerName) {
                                        //     case (2):
                                        //         image = <img src={mtnLogo} alt="mtnlogo" />;
                                        //         break;
                                        //     case (3):
                                        //         image = <img src={airtelLogo} alt="airtelLogo" />;
                                        //         break;
                                        //     case (1):
                                        //         image = <img src={gloLogo} alt="gloLogo" />;
                                        //         break;
                                        //     case (4):
                                        //         image = <img src={NinemobileLogo} alt="9mobileLogo" />;
                                        //         break;
                                        //     default:
                                        //         image = <img src={airtelLogo} alt="airtelLogo" />;
                                        // };
                                        var billsToPay = {
                                            category: bill.BillerCategory,
                                            biller: bill.BillerName,
                                            subscriberId: bill.SubscriberID,
                                            isBeneficiary : true,
                                            item:{
                                                value: bill.PaymentItem,
                                                amount: bill.Amount,
                                                paymentCode: bill.BillerPaymentCode,
                                            }
                                        }
                                        return (
                                            <div className="col-sm-12 col-md-4" key={counter + 1} >
                                                <div className="al-card airtime-card" onClick={() => this.useBeneficiary(billsToPay)} style={{zIndex:"10"}}>
                                                    <div className="clearfix">
                                                        <div className="network-img" >.
                                                        </div>
                                                        <div className="all-info">
                                                            <p className="line-price">{bill.BillerAlias} <span className="price">{"₦" + formatAmountNoDecimal(bill.Amount)}</span></p>
                                                            <p className="num-ref">{bill.SubscriberID}</p>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                                <span className="price delete-bene"><a onClick={() => this.onShowModal(bill.BeneficiaryId, bill.BillerAlias)} style={{zIndex:"50"}}><i class="fa fa-trash-o"></i></a></span>
                                                {/* <p className="num-ref">{beneficiary.PhoneNumber}<span className="price"><a onClick={() => this.onShowModal(bill.BeneficiaryId)} style={{zIndex:"50"}}><i class="fa fa-trash-o"></i></a></span></p> */}
                                            </div>)
                                    })
                                }
                            </div>
                        </div>
                    </Fragment>
                );



        }
        return (
            <Fragment>

                <Modal open={this.state.show} onClose={this.onCloseModal} center>
                    <div className="div-modal">
                        <h3> Are you sure you want to delete?</h3>
                        <h6><b>{this.state.selectedAlias}</b></h6>
                        <div className="btn-opt">
                            <button onClick={this.onCloseModal} className="border-btn">Back</button>
                            <button onClick={() => this.onDeleteBeneficiary()} className="btn-alat">Proceed</button>
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
        bills: state.bills_reducer.bills,
        fetching: state.bills_reducer.isFetching,
        alert: state.alert,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setBillInfo: (data) => dispatch(actions.setBillInfo(data)),
        fetchBills : (token) => dispatch(actions.fetchBillBeneficiaries(token)),
        deleteBeneficiary : (token, data) => dispatch(actions.deleteBillsBeneficiary(token, data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);


