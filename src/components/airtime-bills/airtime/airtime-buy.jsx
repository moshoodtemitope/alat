import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { airtimeConstants } from '../../../redux/constants/airtime/airtime.constants';
import { airtimeBuyData } from "../../../redux/actions/airtime-bill/airtime.action";
import Airtime from './airtime';
import Select from 'react-select';
import { Textbox } from "react-inputs-validation";
import * as  utils from '../../../shared/utils'
import * as  constants from '../../../shared/constants'
import AmountInput from './element/amountInput';

var networkOperators = [
    { value: "2", label: "MTN" },
    { value: "3", label: "Airtel" },
    { value: "1", label: "Glo" },
    { value: "4", label: "Etisalat" }
]

class BuyAirtime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            PhoneNumber: "",
            NetworkCode: "",
            Amount: "",
            selectedNetwork: "",
            formsubmitted: false,
            phoneIvalid: false,
            networkInvalid: false,
            AmountInvalid: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleAmount = this.handleAmount.bind(this);
        // this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    checkAmount = () => {
        if (this.state.Amount == "") {
            this.setState({ AmountInvalid: true });
            return true;
        }
    }

    checkNetwork = () => {
        if (this.state.NetworkCode == "") {
            this.setState({ networkInvalid: true });
            return true;
        }
    }

    checkPhone = () => {
        if (this.state.PhoneNumber.length != 11) {
            this.setState({ phoneIvalid: true });
            return true;
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ formsubmitted: true });

        if (this.checkNetwork() || this.checkPhone() || this.checkAmount()) {

        } else {
            const { dispatch } = this.props;
            var result = dispatch(airtimeBuyData({
                PhoneNumber: this.state.PhoneNumber,
                NetworkCode: this.state.NetworkCode,
                Amount: this.state.Amount
            }));
            this.props.history.push("/bills/airtime/select-account");
        }
    }

    getNetworkName(obj, value) {
        return Object.keys(obj).filter(e => obj[e] === value)[0] || null;
    }

    handleChange = (e) => {
        const name = e.target.name;
        if (/[0-9]+/.test(e.target.value)) {
            this.setState({ [name]: e.target.value });
            if (this.state.formsubmitted && e.target.value.length == 11)
                this.setState({ phoneIvalid: false });
        }
        else if (e.target.value == "") {
            this.setState({ [name]: e.target.value });
        }

    }

    handleAmount = (e) => {
        // console.log(this.intValue);
        this.setState({ "Amount": e });
        if (this.state.formsubmitted) {
            if (e != "")
                this.setState({ AmountInvalid: false });
        }
    }

    handleSelectChange = (selectedNetwork) => {
        this.setState({ "NetworkCode": selectedNetwork.value });
        if (this.state.formsubmitted && selectedNetwork.value != "")
            this.setState({ networkInvalid: false })
    }

    render() {
        let { phoneIvalid, networkInvalid, AmountInvalid, PhoneNumber, Amount, selectedNetwork, formattedValue, formsubmitted } = this.state;
        let props = this.props;
        return (
            <div className="col-sm-12">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="max-600">
                            <div className="al-card no-pad">
                                <h4 className="m-b-10 center-text hd-underline">Buy Airtime</h4>
                                <div className="transfer-ctn">
                                    <form onSubmit={this.handleSubmit}>
                                        <div className={networkInvalid ? "input-ctn form-error" : "input-ctn"}>
                                            <label>Select a Network</label>
                                            <Select tabindex="-1"
                                                name="network"
                                                options={networkOperators}
                                                onChange={this.handleSelectChange}
                                                value={selectedNetwork.label}
                                            />
                                            {networkInvalid &&
                                                <div className="text-danger">Select a network please</div>}
                                            {/* <div className="selectize-control single"><div className="selectize-input items not-full has-options"><input tabIndex="-32768" style={{width: '101px'}} type="text" placeholder="Select a Network" autoComplete="off" /></div>
                                                <div className="selectize-dropdown single" style={{left: '0px' top: 43px; width: 400px; display: none;}}><div className="selectize-dropdown-content"></div></div></div> */}
                                        </div>
                                        <div className={phoneIvalid ? "input-ctn form-error" : "input-ctn"}>
                                            <label>Enter your Phone number</label>
                                            <input type="text" onChange={this.handleChange} maxLength="11" name="PhoneNumber" value={PhoneNumber} placeholder="08033798761" />
                                            {phoneIvalid &&
                                                <div className="text-danger">A valid phone number is required</div>
                                            }
                                        </div>

                                        <AmountInput value={formattedValue} onChange={this.handleAmount} name="Amount" intValue={Amount} AmountInvalid={AmountInvalid} />

                                        <div className="row">
                                            <div className="col-sm-12">
                                                <center>
                                                    <input className="btn-alat m-t-10 m-b-20 text-center" type="submit" value="Next" />
                                                </center>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <center>
                                <Link to={'/bills/airtime'} className="add-bene m-t-50">Go Back</Link>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user,
        alert: state.alert
    };
}


export default connect(mapStateToProps)(BuyAirtime);