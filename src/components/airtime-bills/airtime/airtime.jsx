
import React, { Component, Fragment } from 'react'
import phoneimg from "../../../assets/img/phone-airtime.svg"
import { connect } from "react-redux";
import { getAirtimeBeneficiaries } from "../../../redux/actions/airtime-bill/airtime.action";
import { airtimeConstants } from '../../../redux/constants/airtime/airtime.constants';
import mtnImg from "../../../assets/img/mtn.svg";
import airtelImg from "../../../assets/img/airtel.svg";
import etiImg from "../../../assets/img/9mobile.svg";
import gloImg from "../../../assets/img/glo.svg";
import * as utils from "../../../shared/utils";

class Airtime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // user: user
            user: JSON.parse(localStorage.getItem("user"))
        };
    }

    componentDidMount() {
        this.fetchAirtimeBeneficiaries();
    }

    fetchAirtimeBeneficiaries() {
        const { dispatch } = this.props;
        // console.log(this.props);
        dispatch(getAirtimeBeneficiaries(this.state.user.token));
    }

    returnImage(networktype) {
        //console.log(networktype);
        switch (networktype) {
            case 'MTN':
                return (
                  <img src={mtnImg} srcSet="../../../assets/img/mtn@2x.png 2x"/>
                    )
                break;
            case 'GLO':
                return (<img src={gloImg} srcSet="img/glo@2x.png 2x" />)
                break;
            case 'AIRTEL':
                return (<img src={airtelImg} srcSet="img/airtel@2x.png 2x" />)
                break;
            case '9Mobile':
                return (<img src={etiImg} srcSet="img/9mobile@2x.png 2x" />)
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
                return (
                    <div className="col-sm-12 col-md-4" key={key}>
                        <div className="al-card airtime-card">
                            <div className="clearfix">
                                <div className="network-img">
                                    {this.returnImage(ben.BillerName)}
                                </div>
                                <div className="all-info">
                                    <p className="line-price">{ben.BillerAlias} <span className="price">#{utils.formatAmount(ben.Amount)}</span></p>
                                    <p className="num-ref">{ben.PhoneNumber}<span className="price"><a href="#"><i className="fa fa-trash-o" aria-hidden="true"></i></a></span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
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
                            {/* <p className="grey-text no-paylink">No saved airtime recharge</p> */}
                            {/* <a href="send-contact3.html"><button class="btn-alat">Buy Airtime</button></a> */}
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
                                    <a href="airtime-1.html"><button className="btn-alat m-b-30 text-center">Buy Airtime</button></a>
                                </div>
                            </div>
                        </div>
                        {
                            //    this.props.airtime_beneficiary.airtime_beneficiary_data.response
                            this.renderAirtimeBeneficiaries(this.props.airtime_beneficiary.airtime_beneficiary_data.response)
                        }
                    </Fragment>
                )
            } else {
                return (
                    <div className="col-sm-12">
                        <div className="max-600 m-t-40">
                            <center>
                                <img src={phoneimg} className="m-b-30" />
                                <p className="grey-text no-paylink">No saved airtime recharge</p>
                                <a href="send-contact3.html"><button className="btn-alat">Buy Airtime</button></a>
                            </center>
                        </div>
                    </div>
                )
            }
        }
    }
}

function mapStateToProps(state) {
    //console.log(state);
    const { authentication } = state;
    const { user } = authentication;
    return {
        user,
        airtime_beneficiary: state.airtime_beneficiaries
        //accounts: state.dashboard_accounts,
    };
}

export default connect(mapStateToProps)(Airtime);
//export default Airtime;