import * as React from "react";
import {Router} from "react-router";
// import * as utils from "../../shared/utils";

import {Fragment} from "react";
import {connect} from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import * as utils from '../../../shared/utils';
import  {routes} from '../../../services/urls';
import {Textbox} from "react-inputs-validation";
import "./../remittance.scss";
import successIcon from "../../../assets/img/success-tick.svg";
import {
    LOADING_WESTERNUNION_COUNTRIES_SUCCESS,
    LOADING_WESTERNUNION_COUNTRIES_PENDING,
    LOADING_WESTERNUNION_COUNTRIES_FAILURE,
    RECEIVING_WESTERNUNION_SUCCESS,
    RECEIVING_WESTERNUNION_PENDING,
    RECEIVING_WESTERNUNION_FAILURE,
    WESTERNUNION_REDUCER_CLEAR
} from "../../../redux/constants/remittance/remittance.constants";

import {getWesternUnionCountries, 
    receiveWUMoney, 
    clearRemittanceStore} from "../../../redux/actions/remittance/remittance.actions";

// const options = [
// ];

const BASEURL = routes.BASEURL;

class WesternUnion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            mtcnNumber:'',
            selectedCountry:'',
            selectedAccountNumber:'',
            amountToReceive:'',
            securityAnswer:'',
            isRequiredError: false
        };
        
        
        this.getWesternUnionCountries   =  this.getWesternUnionCountries.bind(this);
        this.processWesternUnion        =  this.processWesternUnion.bind(this);
        this.renderCustomerAccounts     =  this.renderCustomerAccounts.bind(this);
        this.handleSelectedCountry      =  this.handleSelectedCountry.bind(this);
        this.handleSubmit               =  this.handleSubmit.bind(this);
        this.handleSelectedAccount      =   this.handleSelectedAccount.bind(this);
        
        
    }

    componentDidMount() {

        this.getWesternUnionCountries();
    }

    getWesternUnionCountries(){
        const { dispatch } = this.props;
        this.props.dispatch(clearRemittanceStore());
        dispatch(getWesternUnionCountries(this.state.user.token));
    }

    processWesternUnion(payload){
        const { dispatch } = this.props;

        dispatch(receiveWUMoney(payload, this.state.user.token));
    }

    handleSelectedAccount(selectedAccountNumber){
        this.setState({ selectedAccountNumber });
    }

    handleSelectedCountry(selectedCountry){
        this.setState({ selectedCountry });
    }


    renderCustomerAccounts(accountList){
        
        return(
            <Select
                options={accountList}
                onChange={this.handleSelectedAccount}
            />
        )
    }

    handleSubmit(e){
        e.preventDefault();
        let {mtcnNumber,
            amountToReceive,
            securityAnswer,
            selectedCountry,
            selectedAccountNumber} = this.state;

        if(mtcnNumber!=='' && amountToReceive!=='' && selectedCountry!=='' && selectedAccountNumber!==''){
            this.setState({isRequiredError: false});

            let payload ={
                CustReferenceMtcn   : this.state.mtcnNumber,
                PayerCountryCode    : this.state.selectedCountry.value,
                PayeeAccountNumber  : this.state.selectedAccountNumber.value,
                ExpectedAmount      : this.state.amountToReceive,
                TestAnswer          : this.state.securityAnswer!==''?this.state.securityAnswer: ''
            };

            this.processWesternUnion(payload);
        }else{
            this.setState({isRequiredError: true});
        }
    }

    renderWUCountries(countries){
        
        return(
            <Select
                options={countries}
                // isDisabled={this.state.submitButtonState}
                
                // onInputChange={this.handleChange}
                onChange={this.handleSelectedCountry}
            />
        )
    }

    renderWUForm(info){
        let {mtcnNumber,
            amountToReceive,
            securityAnswer,
            selectedCountry,
            selectedAccountNumber,
            isRequiredError} = this.state;

        let props = this.props,
        receiveMoney = props.receiveFunds;

            let wuCountries = info.countries,
                countriesList =[];
                wuCountries.map(country=>{
                    countriesList.push({value:country.CountryCode,
                                        label: country.CountryName
                    })
                }); 
            
                let customerAccounts = info.customerAccounts,
                    accountList =[];
                    customerAccounts.map(account=>{
                                    accountList.push({value:account.AccountNumber,
                                                    accountType: account.AccountType,
                                                    accountBal:  utils.formatAmount(account.AvailableBalance),
                                                    label: account.AccountType  +"\t"+ " (" +account.AccountNumber + " )   -" +account.Currency+ utils.formatAmount(account.AvailableBalance)
                        })
                    }); 

        return(
            
                <div className="row">
                    <div className="col-sm-12">
                        <div className="max-600">


                            <div className="al-card no-pad">
                                <h4 className="m-b-10 center-text hd-underline">Receive Western Union</h4>

                                <div className="transfer-ctn">
                                    <form onSubmit={this.handleSubmit}>

                                        <div className="input-ctn">
                                            <label>Country</label>
                                            {this.renderWUCountries(countriesList)}
                                        </div>

                                        <div>
                                            <div className="input-ctn inputWrap">
                                                <label>Money Transfer Control Number</label>
                                                <Textbox
                                                    id={'mtcnNumber'}
                                                    name="mtcnNumber"
                                                    type="number"
                                                    autoComplete ="off"
                                                    value={mtcnNumber}
                                                    maxLength="10"
                                                    placeholder= "Enter MTCN number"
                                                    onChange= {(mtcnNumber, e)=>{
                                                        this.setState({mtcnNumber});
                                                    }}
                                                />
                                            </div>
                                            <div className="input-ctn inputWrap">
                                                <label>Amount</label>
                                                <Textbox
                                                    id={'amountToReceive'}
                                                    name="amountToReceive"
                                                    type="number"
                                                    autoComplete ="off"
                                                    placeholder= "Enter amount to receive"
                                                    value={amountToReceive}
                                                    onChange= {(amountToReceive, e)=>{
                                                        this.setState({ amountToReceive});
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="input-ctn inputWrap">
                                            <label>Western Union Secret Answer <small>(required only if provided by sender)</small></label>
                                            <Textbox
                                                id={'securityAnswer'}
                                                name="securityAnswer"
                                                type="text"
                                                autoComplete ="off"
                                                placeholder= "Enter security answer"
                                                value={securityAnswer}
                                                onChange= {(securityAnswer, e)=>{
                                                    this.setState({securityAnswer});
                                                }}
                                            />
                                        </div>
                                        <div className="input-ctn inputWrap">
                                            <label>Select account to credit</label>
                                            {this.renderCustomerAccounts(accountList)}
                                        </div>
                                        <div className="input-ctn inputWrap">
                                            <center>
                                                
                                            
                                                {(receiveMoney.is_processing===false && receiveMoney.fetch_status===RECEIVING_WESTERNUNION_FAILURE)&&
                                                    <div className="error-msg">{receiveMoney.receive_westernunion_data.error.replace('|','')}</div>
                                                }

                                                {isRequiredError && <div className="error-msg">Please provide the required details</div>}
                                            
                                                <button type="submit" 
                                                        disabled={receiveMoney.is_processing}
                                                        className="btn-alat m-t-10 m-b-20 text-center"
                                                                        >{receiveMoney.is_processing?'Receiving...': 'Receive Money'}</button>
                                                
                                                
                                            </center>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            // </div>
        );
    }

    renderWesternUnion(){
        let props = this.props,
            gettingWUCountries = props.loadCountries,
            receiveMoney = props.receiveFunds;

            switch (gettingWUCountries.fetch_status){
                case  LOADING_WESTERNUNION_COUNTRIES_PENDING:
                        return(
                            <div className="col-sm-12">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="max-600">


                                            <div className="al-card no-pad">
                                                <h4 className="m-b-10 center-text hd-underline">Receive Western Union</h4>

                                                <div className="transfer-ctn">
                                                    <div className="text-center">Please wait...</div>  
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                case LOADING_WESTERNUNION_COUNTRIES_SUCCESS:
                    let westernUnionInfo = gettingWUCountries.westernunion_data.response;
                    return(
                        <div className="col-sm-12">
                            {receiveMoney.fetch_status!==RECEIVING_WESTERNUNION_SUCCESS && 
                                this.renderWUForm(westernUnionInfo)
                            }

                            {(receiveMoney.is_processing===false && receiveMoney.fetch_status===RECEIVING_WESTERNUNION_SUCCESS)&&
                                this.renderSuccesfullWU()
                            }

                        </div>
                    );
                case LOADING_WESTERNUNION_COUNTRIES_FAILURE:
                    let error = gettingWUCountries.westernunion_data.error
                    return(
                        <div className="col-sm-12">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="max-600">


                                        <div className="al-card no-pad">
                                            <h4 className="m-b-10 center-text hd-underline">Receive Western Union</h4>

                                            <div className="transfer-ctn">
                                                <div className="text-center">{error}</div> 
                                                <a className="cta-link tobottom" onClick={this.getWesternUnionCountries}>Try again</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
            }
    }

    renderSuccesfullWU(){
        return(
            <div className="row">
                <div className="col-sm-12">
                    <div className="max-600">


                        <div className="al-card no-pad">

                            <div className="transfer-ctn">
                                <center>
                                    <img src={successIcon} />
                                </center>
                                <div className="m-t-30 width-300">
                                    <h4 className="success-heading">Transaction Successful</h4>
                                    <div className="success-mg">
                                        You just received &#8358;{this.state.amountToReceive} through  Western Union
                                    </div>
                                </div>
                                <div className="return-text"><a onClick={(e)=>{e.preventDefault();
                                                                                this.props.dispatch(clearRemittanceStore()); 
                                                                                this.props.history.push("/dashboard");
                                                                        }}> Return to dashboard</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

           
        )
    }
   

    
    render() {
        return (
            <Fragment>
                {this.renderWesternUnion()}
            </Fragment>
        );
    }
}


function mapStateToProps(state){
    console.error(state);
    return {
        loadCountries : state.remittanceReducerPile.getCountries,
        receiveFunds  : state.remittanceReducerPile.receiveWUMoney
    };
}

export default connect(mapStateToProps)(WesternUnion);
