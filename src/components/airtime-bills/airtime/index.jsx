
import React, { Component, Fragment } from 'react';
import { Link, NavLink, Route } from 'react-router-dom';
import phoneimg from "../../../assets/img/phone-airtime.svg"
import { connect } from "react-redux";
import { getAirtimeBeneficiaries, deleteBeneficairy, airtimeBuyData, clearAirtimeStore } from "../../../redux/actions/airtime-bill/airtime.action";
import { airtimeConstants } from '../../../redux/constants/airtime/airtime.constants';
import mtnImg from "../../../assets/img/mtn.svg";
import airtelImg from "../../../assets/img/airtel.svg";
import etiImg from "../../../assets/img/9mobile.svg";
import gloImg from "../../../assets/img/glo.svg";
import * as utils from "../../../shared/utils";
import Modal from 'react-responsive-modal';
import ConfirmModal from './element/confirmModal';

class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // user: user
            user: JSON.parse(localStorage.getItem("user")),
            openModal: false,
            submitted: false,
            selectedBeneficairy: {
                key: -1
            },
            isDelete: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        //this.beneficiarySelected = this.beneficiarySelected.bind(this);
    }

    componentDidMount() {
        this.fetchAirtimeBeneficiaries();
    }

    getDeleteStatus = () => {
        let props = this.props;
        if (props.airtime_beneDelete.airtime_beneficiary == airtimeConstants.AIRTIME_BENEFICIARIES_DELETE_PENDING)
            return true;
        else return false;
    }

    deleteAfterAction() {
        let props = this.props;
        if (this.state.isDelete == true) {
            if (props.airtime_beneDelete.airtime_beneficiary == airtimeConstants.AIRTIME_BENEFICIARIES_DELETE_SUCCESS) {
                // let a = this.props.airtime_beneficiary.airtime_beneficiary_data.response;
                // let index = a.findIndex(x => x.BeneficiaryId === this.state.selectedBeneficairyBeneficiaryId);
                // console.log(index);
                // index-=1;
                // console.log(index);
                // this.props.airtime_beneficiary.airtime_beneficiary_data.response.splice(index, 1);
                this.props.dispatch(clearAirtimeStore());
                this.fetchAirtimeBeneficiaries();
                this.toggleModal();
                this.setState({ isDelete: false });
            }
        }
    }

    fetchAirtimeBeneficiaries() {
        const { dispatch } = this.props;
        // console.log(this.props);
        dispatch(getAirtimeBeneficiaries(this.state.user.token));
    }

    toggleModal = (beneficiary, key, e) => {
        if(e){
        e.stopPropagation();
        this.setState({ selectedBeneficairy: { key: key } })
        this.setState({ selectedBeneficairy: beneficiary });
        }
        if (this.state.openModal)
            this.setState({ openModal: false })
        else this.setState({ openModal: true });

        //console.table(this.selectedBeneficairy);
    }

    deleteBeneficiary = (index) => {
        //console.log(this.state.selectedBeneficairy.BeneficiaryId);
        const { dispatch } = this.props;
        let props = this.props;
        this.setState({ isDelete: true });
        var result = dispatch(deleteBeneficairy(this.state.user.token, this.state.selectedBeneficairy.BeneficiaryId));  
    }

    beneficiarySelected(ben){
        const { dispatch } = this.props;
        var result = dispatch(airtimeBuyData(ben, true));
        this.props.history.push("/bills/airtime/select-account");
    }

    returnImage(networktype) {
        //console.log(networktype);
        switch (networktype) {
            case 'MTN':
                return (
                    <img src={mtnImg} srcSet="../../../assets/img/mtn@2x.png 2x" />
                )
                break;
            case 'GLO':
                return (<img src={gloImg} srcSet="../../../img/glo@2x.png 2x" />)
                break;
            case 'Airtel':
                return (<img src={airtelImg} srcSet="../../../img/airtel@2x.png 2x" />)
                break;
            case 'Etisalat':
                return (<img src={etiImg} srcSet="../../../img/9mobile@2x.png 2x" />)
                break;
            default:
                return (<img src="" alt="Provider.png" />)
        }

    }


    render() {
        return (
            <div className="col-sm-12">
                <div className="row">
                    {this.renderAirtimeBeneficairy()}
                </div>
            </div>)
    }
    // beneficiariesList  
    renderAirtimeBeneficiaries(beneficiariesList) {
        return (
            this.props.airtime_beneficiary.airtime_beneficiary_data.response.map((ben, key) => {
                if (ben.IsAirtime == true) {
                    return (
                        <div className="col-sm-12 col-md-4" key={key} onClick={()=>this.beneficiarySelected(ben)}>
                            <div className="al-card airtime-card">
                                <div className="clearfix">
                                    <div className="network-img">
                                        {this.returnImage(ben.BillerName)}
                                    </div>
                                    <div className="all-info">
                                        <p className="line-price">{ben.BillerAlias} <span className="price">N{utils.formatAmount(ben.Amount)}</span></p>
                                        <p className="num-ref">{ben.PhoneNumber}<span className="price"><a onClick={(e) => this.toggleModal(ben, key, e)}><i className="fa fa-trash-o" aria-hidden="true"></i></a></span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            })
        )

    }

    renderAirtimeBeneficairy() {
        let props = this.props;
        let airtimeBeneficairy = props.airtime_beneficiary;
        if (airtimeBeneficairy.airtime_beneficiary == airtimeConstants.AIRTIME_BENEFICIARIES_FETCH_PENDING) {
            return (
                <div className="col-sm-12">
                    <div className="max-600 m-t-40">
                        <center>
                            <img src={phoneimg} className="m-b-30" />
                            <p className="grey-text no-paylink">Loading saved beneficiaries...</p>
                            <NavLink to={'airtime/buy'}><button className="btn-alat">Buy Airtime</button></NavLink>
                        </center>
                    </div>
                </div>
            )
        }
        else if (airtimeBeneficairy.airtime_beneficiary == airtimeConstants.AIRTIME_BENEFICIARIES_FETCH_SUCCESS) {
            let beneficiariesList = airtimeBeneficairy.airtime_beneficiary_data.response;
            if (beneficiariesList.length >= 1) {
                return (
                    <Fragment>
                        <div className="col-sm-12">
                            <div className="row">
                                <div className="col-sm-12">
                                    <NavLink to={'airtime/buy'}><button className="btn-alat m-b-30 text-center">Buy Airtime</button></NavLink>
                                </div>
                            </div>
                        </div>
                        {
                            this.renderAirtimeBeneficiaries(this.props.airtime_beneficiary.airtime_beneficiary_data.response)
                        }
                        {this.deleteAfterAction()}
                        <Modal open={this.state.openModal} onClose={this.toggleModal} center>
                            <div className="div-modal">
                                {props.alert && props.alert.message &&
                                    <div className={`info-label ${props.alert.type}`}>{props.alert.message}</div>
                                }

                                <h3>You want to delete<br /><strong>

                                    {this.state.selectedBeneficairy && <span>{this.state.selectedBeneficairy.BillerAlias}</span>}<br />
                                    {this.state.selectedBeneficairy && <span> {this.state.selectedBeneficairy.PhoneNumber}</span>}
                                </strong>.<br /> Do you want to proceed?</h3>

                                <div className="btn-opt">
                                    <button onClick={this.toggleModal} className="border-btn">Back</button>
                                    <button onClick={this.deleteBeneficiary} disabled={this.getDeleteStatus()}
                                        className="btn-alat">{this.getDeleteStatus() ? "Processing..." : "Proceed"}</button>
                                </div>
                            </div>
                        </Modal>
                    </Fragment>
                )
            } else  {
                return (
                    <div className="col-sm-12">
                        <div className="max-600 m-t-40">
                            <center>
                                <img src={phoneimg} className="m-b-30" />
                                <p className="grey-text no-paylink">No saved airtime recharge</p>
                                <NavLink to={'airtime/buy'}><button className="btn-alat">Buy Airtime</button></NavLink>
                            </center>
                        </div>
                    </div>
                )
            }
        }
    }
}

function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user,
        airtime_beneficiary: state.airtimeReducerPile.airtime_beneficiaries,
        airtime_beneDelete: state.airtimeReducerPile.airtime_beneDelete,
        alert: state.alert
    };
}

export default connect(mapStateToProps)(Index);
//export default Airtime;