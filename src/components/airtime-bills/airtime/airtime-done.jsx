import React from 'react';
import { Link } from 'react-router-dom';
import { Switch } from '../../../shared/elements/_toggle';
import {formartAmount } from '../../../shared/utils';
import succesimg from '../../../assets/img/success.svg';
import { airtimeConstants } from '../../../redux/constants/airtime/airtime.constants'


class AirtimeDone extends React.Component{
    constructor(props){
        super(props);

        this.state= {
            saveBeneficiary : false,
            aliasInvalid : false,
            alias: "",
            bill:{},
            saveSubmitted: false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        
    }

    getBillInfo(){
        let props = this.props
        if (this.props.airtime_otp.airtime_buydata == airtimeConstants.AIRTIME_WEBPIN_OTP_SUCCESS) {
            var bill = {
                ...this.props.airtime.airtime_buydata_data.data
            };
            this.setState({bill : bill},()=>console.log(this.state.bill));
            
        } else {
            //commented for test purposes
            this.props.history.push("/bills/airtime/buy");
        }
    }

    handleToggle =()=>{
        this.setState({ saveBeneficiary : !this.state.saveBeneficiary });
    }

    handleInputChange =(e)=>{
        this.setState({ alias : e.target.value});
    }

    onSubmitSaveForm=()=>{
        e.preventDefault()
        this.setState({saveSubmitted : true})
        if(this.state.alias == ""){
         this.setState({aliasInvalid : true})
        }
        else {
            //make api to call
            console.log(this.state.bill);
            var bill = {
                ...this.state.bill
            }
            bill.BillerAlias = this.state.alias;
           
        }
    }
    

    render(){
        if(this.props.airtime_bene == airtimeConstants.AIRTIME_BENEFICIARIES_SAVE_SUCCESS)
            this.props.history.push("/dashboard");
        return(
            <div class="col-sm-12">
					<div class="row">
						<div class="col-sm-12">
				  			<div class="max-600">
				  				<div class="al-card">
				  					<center>
				  						<img src={succesimg} class="m-b-30 m-t-20"/>
				  					</center>
				  					<h4 class="center-text red-text">Recharge Successful</h4>

				  					<div class="m-t-20 width-400">
					  					{/* <p class="m-b-30 f-s-16 center-text">Your phone line has been recharged with <span class="bold-text">N1,000</span> worth of Airtel credit.</p> */}
                                          <div className="al-card no-pad">
                                            <div className="trans-summary-card">
                                                <div className="name-amount clearfix">
                                                    <p className="pl-name-email">Airtime Recharge<span>{this.state.bill.BillerName} - {this.state.bill.PhoneNumber}
                                                    </span></p>
                                                    <p className="pl-amount">N{formartAmount(this.state.bill.Amount)}</p>
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
                                                                onChanged={this.handleInputChange} />
                                                        </div>
                                                
                                                        <center>
                                                            <button onClick={this.onSubmitSaveForm} class="btn-alat m-t-10 m-b-20 text-center">
                                                            {this.props.airtime_bene == "AIRTIME_BENEFICIARIES_SAVE_PENDING" ? "Saving..." : "Save Beneficiary"}</button>
                                                        </center>
                                                    </form>
                                                </div>
                                            ) : (
                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                            <center>
                                                            <button onClick={'/dashboard'} class="btn-alat m-t-10 m-b-20 text-center">Go to Dashboard</button>
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
        airtime: state.airtime_buydate,
        airtime_history: state.airtime_buydata,
        airtime_otp: state.airtime_webpin,
        airtime_bene: state.airtime_save_bene
    };
}

export default  AirtimeDone;