import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { Switch } from '../../../shared/elements/_toggle';
import { formatAmount } from '../../../shared/utils';
import succesimg from '../../../assets/img/success.svg';
import { airtimeConstants } from '../../../redux/constants/airtime/airtime.constants';
import { airtimeBeneficiarySave, clearAirtimeStore } from '../../../redux/actions/airtime-bill/airtime.action';


class AirtimeDone extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            saveBeneficiary: false,
            aliasInvalid: false,
            alias: "",
            bill: {},
            saveSubmitted: false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
       
    }
   
    componentDidMount(){
        this.getBillInfo();
    }
    getBillInfo() {
        let props = this.props

        if (props.airtime_otp){
            if (this.props.airtime_otp.airtime_buydata == airtimeConstants.AIRTIME_WEBPIN_OTP_SUCCESS) {
                this.setState({ bill: {...this.props.airtime.airtime_buydata_data.obj.request} });
            } else {
                //commented for test purposes
                this.props.history.push("/bills/airtime/buy");
            }
        }
        else this.props.history.push("/bills/airtime/buy");
    }

    handleToggle = () => {
        this.setState({ saveBeneficiary: !this.state.saveBeneficiary });
    }

    handleInputChange = (e) => {
        this.setState({ alias: e.target.value });
    }

    onSubmitSaveForm = (e) => {
        e.preventDefault()
        this.setState({ saveSubmitted: true })
        if (this.state.alias == "") {
            this.setState({ aliasInvalid: true })
        }
        else {
            //make api to call
            
            var bill = {
                ...this.props.airtime.airtime_buydata_data.obj.request,
                BillerAlias:  this.state.alias,
            }
            bill.Network = bill.NetworkCode;
            this.props.dispatch(airtimeBeneficiarySave(this.state.user.token, bill));
        }
    }


    render() {
        if (this.props.airtime_bene.airtime_beneficiary == airtimeConstants.AIRTIME_BENEFICIARIES_SAVE_SUCCESS)
           {   
               this.props.dispatch(clearAirtimeStore());
               this.props.history.push("/dashboard"); }
        return (
            <div className="col-sm-12">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="max-600">
                            <div className="al-card">
                                <center>
                                    <img src={succesimg} className="m-b-30 m-t-20" />
                                </center>
                                <h4 className="center-text red-text">Recharge Successful</h4>

                                <div className="m-t-20 width-400">
                                    {this.props.alert && this.props.alert.message &&
                                        <div className={`info-label ${this.props.alert.type}`}>{this.props.alert.message}</div>
                                    }
                                    {this.props.airtime_otp.airtime_buydata_data && <p className="m-b-30 f-s-16 center-text">
                                        {this.props.airtime_otp.airtime_buydata_data.response.ValidationMsg}
                                    </p>}
                                    <div className="al-card no-pad">
                                        <div className="trans-summary-card">
                                            <div className="name-amount clearfix">
                                                <p className="pl-name-email">Airtime Recharge<span>{this.state.bill.BillerName} - {this.state.bill.PhoneNumber}
                                                </span></p>
                                                <p className="pl-amount"> N{this.state.bill.Amount && formatAmount(this.state.bill.Amount)}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="clearfix save-purchase">
                                        <p>Save this purchase</p>
                                        <div className="">
                                            <div className="clearfix">
                                                {/* <div className="pretty p-switch p-fill">
												        <input type="checkbox" />
												        <div className="state p-danger">
												            <label></label>
												        </div>
                                                    </div> */}
                                                <div className="pretty p-switch p-fill" >
                                                    <Switch isChecked={this.state.saveBeneficiary} handleToggle={this.handleToggle} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        this.state.saveBeneficiary ? (
                                            <div className="save-purchase-frm">
                                                <form>
                                                    <div className={this.state.aliasInvalid ? "input-ctn form-error" : "input-ctn"}>
                                                        <label>Enter Alias</label>
                                                        <input
                                                            type="text"
                                                            value={this.state.alias}
                                                            maxLength="15"
                                                            onChange={this.handleInputChange} />
                                                    </div>

                                                    <center>
                                                        <button onClick={this.onSubmitSaveForm} className="btn-alat m-t-10 m-b-20 text-center">
                                                            {this.props.airtime_bene == "AIRTIME_BENEFICIARIES_SAVE_PENDING" ? "Saving..." : "Save Beneficiary"}</button>
                                                    </center>
                                                </form>
                                            </div>
                                        ) : (
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <center>
                                                            <button onClick={() => { this.props.dispatch(clearAirtimeStore()); this.props.history.push('/dashboard') }} className="btn-alat m-t-10 m-b-20 text-center">Go to Dashboard</button>
                                                            {/* <Link to={'/dashboard'} className="btn-alat m-t-10 m-b-20 text-center">Go to Dashboard</Link> */}
                                                        </center>
                                                    </div>
                                                </div>
                                            )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user,
        alert: state.alert,
        airtime: state.airtimeReducerPile.airtime_webpin,
        airtime_history: state.airtimeReducerPile.airtime_buydata,
        airtime_otp: state.airtimeReducerPile.airtime_webpinotp,
        airtime_bene: state.airtimeReducerPile.airtime_save_bene
    };
}

export default connect(mapStateToProps)(AirtimeDone);