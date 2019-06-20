import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { airtimeConstants } from '../../../redux/constants/airtime/airtime.constants';
import Airtime from './airtime';
import Select from 'react-select';
import {Textbox} from "react-inputs-validation";
import * as  utils  from '../../../shared/utils'
import * as  constants from '../../../shared/constants'

var networkOperators = [
    { value: "MTN", label: "MTN"},
    { value: "Airtel", label: "Airtel"},
    { value: "Glo", label: "Glo"},
    { value: "Etisalat", label: "Etisalat"}
]

class BuyAirtime extends Component {
    constructor(props){
        super(props);
        this.state={
            PhoneNumber: "",
            NetworkCode: "",
            Amount: "",
            phoneIvalid: true,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

handleSubmit = (e)=>{
    e.preventDefault();
}

getNetworkName(obj, value) {
    return Object.keys(constants.NetworkName).filter(e => obj[e] === value)[0] || null;
  }

handleChange = (e)=>{
    console.log(e.currentTarget);
    console.log(e.target);
    const name = e.target.name;
    if(name === 'newtork'){
        this.setState({ 'NetworkCode': this.getNetworkName(NetworkName, e.target.value) });
    }
    else if(e.target.name === 'Amount')  {
        console.log(utils.formatAmount(e.target.value));
        e.target.setValue("0"); //set("value",utils.formatAmount(e.target.value)) //= utils.formatAmount(e.target.value);
    this.setState({ [name] : e.target.value });
    console.log(this.state.Amount);
    }
}

    render() {
        let  { phoneIvalid, PhoneNumber, Amount } = this.state;
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
                                        <div className="input-ctn">
                                            <label>Select a Network</label>
                                            <Select tabindex="-1"
                                            options={networkOperators}
                                            onChange={this.handleChange}
                                            />
                                                
                                            {/* <div className="selectize-control single"><div className="selectize-input items not-full has-options"><input tabIndex="-32768" style={{width: '101px'}} type="text" placeholder="Select a Network" autoComplete="off" /></div>
                                                <div className="selectize-dropdown single" style={{left: '0px' top: 43px; width: 400px; display: none;}}><div className="selectize-dropdown-content"></div></div></div> */}
                                        </div>
                                        <div className={phoneIvalid ? "input-ctn" : "input-ctn form-error"}>
                                            <label>Enter your Phone number</label>
                                            <input type="text" onChange={this.handleChange} maxLength="11" name="PhoneNumber" value={PhoneNumber} placeholder="08033798761" />
                                            {!phoneIvalid &&
                                                <div className="text-danger">A valid phone number is required</div>
                                            }
                                        </div>

                                        <div className="input-ctn">
                                            <label>Amount</label>
                                            <input onChange={this.handleChange} name="Amount"  type="tel"
                                             />
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-12">
                                                <center>
                                                    <input className="btn-alat m-t-10 m-b-20 text-center" type="button" value="Next" />
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


export default BuyAirtime;