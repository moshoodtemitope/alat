import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { airtimeConstants } from '../../../redux/constants/airtime/airtime.constants';
import Airtime from './airtime';

class BuyAirtime extends Component {
    constructor(props){
        super(props);
        this.state={
            phone: "",
            provider: "",
            amount: "",
            phoneIvalid: true,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

handleSubmit = (e)=>{
    e.preventDefault();
}

handleChange = (e)=>{
    const name = e.target.name;
    this.setState({ [name] : e.target.value });
}

    render() {
        let  { phoneIvalid, phone } = this.state;
        let props = this.props;
        return (
            <div className="col-sm-12">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="max-600">
                            <div className="al-card no-pad">
                                <h4 className="m-b-10 center-text hd-underline">Buy Airtime</h4>
                                <div className="transfer-ctn">
                                    <form>
                                        <div className="input-ctn">
                                            <label>Select a Network</label>
                                            {/* <select tabindex="-1" className="selectized" style="display: none;"><option selected="selected" value=""></option></select> */}
                                            {/* <div className="selectize-control single"><div className="selectize-input items not-full has-options"><input tabIndex="-32768" style={{width: '101px'}} type="text" placeholder="Select a Network" autoComplete="off" /></div>
                                                <div className="selectize-dropdown single" style={{left: '0px' top: 43px; width: 400px; display: none;}}><div className="selectize-dropdown-content"></div></div></div> */}
                                        </div>
                                        <div className={phoneIvalid ? "input-ctn" : "input-ctn form-error"}>
                                            <label>Enter your Phone number</label>
                                            <input type="text" onChange={this.handleChange} maxLength="11" name="phone" value={phone} placeholder="08033798761" />
                                            {!phoneIvalid &&
                                                <div className="text-danger">A valid phone number is required</div>
                                            }
                                        </div>

                                        <div className="input-ctn">
                                            <label>Amount</label>
                                            <input type="tel" />
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