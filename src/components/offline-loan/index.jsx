import React from 'react';
import connect from 'react-redux/es/connect/connect';
import {Link} from 'react-router-dom';
import InnerContainer from "../../shared/templates/inner-container";
import {history} from "../../_helpers/history";
import {numberWithCommas} from '../../shared/utils';
import AmountInput from '../../shared/components/amountInput';
import {NavLink} from "react-router-dom";
import {Fragment} from "react";
import "./offlineloans.scss";
// import ratingHeader from "../../../assets/img/alat-rating.svg";
import {
    OFFLINELOAN_GET_DATAOF_CUSTOMER_SUCCESS,
    OFFLINELOAN_GET_DATAOF_CUSTOMER_PENDING,
    OFFLINELOAN_GET_DATAOF_CUSTOMER_FAILURE,

    OFFLINELOAN_SEND_RESPONSEOF_CUSTOMER_SUCCESS,
    OFFLINELOAN_SEND_RESPONSEOF_CUSTOMER_PENDING,
    OFFLINELOAN_SEND_RESPONSEOF_CUSTOMER_FAILURE,

} from "../../redux/constants/onboarding/user.constants";
import {userActions} from "../../redux/actions/onboarding/user.actions";
//import mapStateToProps from 'react-redux/es/connect/mapStateToProps';
// import successIcon from "../../../assets/img/success-tick.svg";

class OfflineLoans extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rating:'',
            willrefer:'',
            showTerms:false,
            RequestedAmount: '',
            amountError:'',
            isChecked:false,
            isCheckedMsg:''
        };

        
        
        
    }

    componentDidMount(){
        this.offlineLoanGetCustomerData();
    }


    offlineLoanGetCustomerData=()=>{
        const {dispatch} = this.props;
        let keyId = this.props.match.params.keyId
        
        dispatch(userActions.offlineLoanGetCustomerData(keyId));
    }

    offlineLoanSendCustomerData=(status)=>{
        
        const {dispatch} = this.props;
        let{RequestedAmount, ApplicationStatus, amountError, isChecked} = this.state;
        // this.setState({ApplicationStatus:status});

       
            if(ApplicationStatus===1){
                if(amountError==='' && RequestedAmount!=='' && parseFloat(RequestedAmount)>0){

                    if(isChecked===true){
                        this.setState({isCheckedMsg: ""});
                        let payload ={
                            customerId:this.props.match.params.keyId,
                            ApplicationStatus: ApplicationStatus,
                            RequestedAmount: (RequestedAmount==='' || ApplicationStatus===3)? 0: parseFloat(RequestedAmount)
                        }
                        
                        dispatch(userActions.offlineLoanSendCustomerData(payload));
                    }else{
                        this.setState({isCheckedMsg: "Please accept terms and conditions"});
                    }

                    
                }else{
                    this.setState({amountError:'Please input loan amount'});
                }
            }else{
                let payload ={
                    customerId:this.props.match.params.keyId,
                    ApplicationStatus: ApplicationStatus,
                    RequestedAmount: 0
                }
                
                dispatch(userActions.offlineLoanSendCustomerData(payload));
            }


        
        
       
    }

    renderSuccessfulApplication =()=>{
        let {RequestedAmount, ApplicationStatus} =this.state;
        return(
            <div>
                <center>
                    <div className="m-b-30 m-t-20">
                        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M26.418 38.3379L20 32L16 36L26.4268 46L48 22L43.9629 18L26.418 38.3379Z" fill="#169A62"/>
                        <path d="M32 0C14.3261 0 0 14.3261 0 32C0 49.6739 14.3261 64 32 64C49.6739 64 64 49.6739 64 32C64 14.3261 49.6739 0 32 0ZM32 59C17.0879 59 5 46.9121 5 32C5 17.0879 17.0879 5 32 5C46.9121 5 59 17.0879 59 32C59 46.9121 46.9121 59 32 59Z" fill="#169A62"/>
                        </svg>
                    </div>
                </center>
                {ApplicationStatus===1 &&
                    <div>
                        <h4 className="center-text red-text">Your interest in a loan {(RequestedAmount!=='' && RequestedAmount>0)?`amount of  ₦${numberWithCommas(RequestedAmount)}`:''} was successful</h4>
                        <div className="text-center">
                            An officer will give you a call shortly.
                        </div>
                    </div>
                }
                {ApplicationStatus===3 &&
                    <div>
                        <h4 className="center-text red-text">Thank you for your response</h4>
                    </div>
                }
            </div>
        )
    }

   

   

    renderFetchingData =()=>{
        let getCustomerData = this.props.offlineLoanGetCustomerDataRequest;
        if(getCustomerData.processing_status === OFFLINELOAN_GET_DATAOF_CUSTOMER_PENDING){
            return(
                <div>
                    <h3 className="headingtext text-center">Please wait...</h3>
                </div>
            )
        }

        if(getCustomerData.processing_status === OFFLINELOAN_GET_DATAOF_CUSTOMER_FAILURE){
            // console.log("====",error.response);
            if(getCustomerData.offlineloan_data.error!=="Customer not found!" && getCustomerData.offlineloan_data.error!=="It seems you have applied before!"){
                return(
                    <div>
                        <h3 className="headingtext text-center">{getCustomerData.offlineloan_data.error}</h3>
                        <div className="text-center"><span className="error-msg" onClick={this.offlineLoanGetCustomerData}>Try again</span></div>
                    </div>
                )
            }else if(getCustomerData.offlineloan_data.error==="It seems you have applied before!"){
                return(
                    <div>
                        <h3 className="headingtext text-center">{getCustomerData.offlineloan_data.error}</h3>
                    </div>
                )
            }
            else{
                return(
                    <div className="text-center">
                        Sorry, page not found
                    </div>
                )
            }
        }
    }
    handleTermsCheck =()=>{
        let {isChecked}= this.state;
        this.setState({isChecked :!isChecked});
    }

    handleAmount = (e) => {
        let getCustomerData = this.props.offlineLoanGetCustomerDataRequest.offlineloan_data.response.data,
            valueTotest = e.target.value.toString().replace(/,/g, '');
        this.setState({ AmountToSend: e.target.value, RequestedAmount:valueTotest!==''?parseFloat(valueTotest):0});
        if(parseFloat(getCustomerData.MaxLimit)<parseFloat(valueTotest)){
            
            this.setState({amountError:`Maximum amount you can apply for is ₦${numberWithCommas(getCustomerData.MaxLimit)}`});
        }else{
            this.setState({amountError:''});
        }
        
        
    }


    renderDataOfCustomer =()=>{
        let getCustomerData = this.props.offlineLoanGetCustomerDataRequest.offlineloan_data.response.data;
        let sendCustomerData = this.props.offlineLoanSendCustomerDataRequest;
        let {AmountToSend, isCheckedMsg,formattedValue, amountError, ApplicationStatus} = this.state;
        
        return(
            <div>
                <div className="nameheading">Hello <span>{getCustomerData.FullName}</span></div>

                <div className="loanmsg">
                    Congratulations! You are now qualified to take a <span>{(getCustomerData.ProductType===null || getCustomerData.ProductType==='')?"Personal Loan": getCustomerData.ProductType}</span> of up to 
                    <span>&#8358;{numberWithCommas(getCustomerData.MaxLimit)}</span> over a period of <span>{getCustomerData.Tenure} months.</span>
                </div>
                <div className="loanmsg">
                    Kindly input the loan amount you would like to take and click on 
                    <span>Submit</span> to proceed.
                </div>
                <div className={amountError!==''?"amount-wrap witherror":"amount-wrap"} >
                    
                    {/* <AmountInput label="Input Loan Amount" value={formattedValue} intValue={AmountToSend}  name="Amount" onKeyUp={this.handleAmount}  onChange={this.handleAmount} /> */}
                    <div className="input-ctn">
                        <label htmlFor="Amount">Input Loan Amount</label>
                        <input type="text" onChange={this.handleAmount} autoComplete="off" name="Amount" value={numberWithCommas(AmountToSend) }/>
                        
                    </div>
                    <span className="currencyicon"></span>
                    {amountError!=='' && <div className="amount-error">{amountError}</div>}
                    
                    <div className="terms-txt">
                    <input 
                        type="checkbox"
                        checked={this.state.isChecked}
                        onChange={this.handleTermsCheck} />
                       <span>I agree to  </span> 
                    <span className="termslink"
                        onClick={()=>this.setState({showTerms:true})}>Terms and Conditions</span> </div>

                    {isCheckedMsg!=='' && <div className="amount-error"> {isCheckedMsg} </div>}
                </div>
                

                <div className="cta-wrap">
                    <button type="submit"
                        onClick={()=>{
                            this.setState({ApplicationStatus:3}, this.offlineLoanSendCustomerData)
                                
                            }  
                        }
                        disabled={sendCustomerData.is_processing} 
                        className="btn-alat decline-btn m-t-10 m-b-20">
                            {sendCustomerData.is_processing?'Please wait...':'Maybe Later'} </button>
                    <button type="submit" 
                        className="btn-alat m-t-10 m-b-20 text-center btn-block"
                        disabled={sendCustomerData.is_processing}
                        onClick={()=>{
                                
                            this.setState({ApplicationStatus:1}, this.offlineLoanSendCustomerData)
                            }  
                        }
                        >{(sendCustomerData.is_processing && ApplicationStatus===1)?'Please wait...':'Submit'}  </button>
                </div>
            </div>

        )
    }
    renderTerms =()=>{

        return(
            <div className="termswrap">
                <h3 className="termsheading">TERMS &amp; CONDITIONS (Personal Loan)</h3>
                <div>
                    Please read these Terms and Conditions carefully before using this service with your mobile device or any other means because by using this service you agree to be bound by the terms and conditions stated herein.
                    
                    If you do not agree with this Terms and Conditions, please do not apply for this Service or reject the offer by selecting the Reject option. Please note these terms are addition to the terms and conditions applicable on your existing relationship with Bank and your Goodself.
                    
                    This Service is available to employed (salaried) individuals who meets WEMA Bank’s retail lending parameters and with a monthly salary record with the Bank and whose employer is deemed acceptable risk to WEMA Bank PLC.
</div>
                <h4>Global Standing Instruction</h4>
                <div>
                    By accepting this offer letter/loan agreement and by drawing on the loan, I covenant to repay the loan as and when due. In the event that I fail to repay the loan as agreed, and the loan becomes delinquent, the bank shall have the right to report the delinquent loan to the CBN through the Credit Risk Management System (CRMS) or by any other means, and request the CBN to exercise its regulatory power to direct all banks and other financial institutions under its regulatory purview to set-off my indebtedness from any money standing to my credit in any bank account and from any financial assets they may be holding for my benefit.
                    
                    I covenant and warrant that the bank shall have power to set-off my indebtedness under this loan agreement from all such monies and funds standing to credit/benefit in any and all such accounts or from any other financial assets belonging to me and in the custody of any such bank.
                    
                    I hereby waive any right of confidentiality whether arising under common law or statute or in any other manner whatsoever and irrevocably agree that I shall not argue to the contrary before any court of law, tribunal administrative authority or any other body acting in any judicial or quasi-judicial capacity.
</div>
                <h4>Definitions</h4>
                <div>
                    In this agreement, the terms "You", "Your", "Customer" and "Borrower" shall mean the person who has applied for a credit facility and has agreed to the terms of this Agreement while "We", "Us" "Our" and "Lender" shall mean Wema Bank PLC.
                    
                    Wema Bank Plc (herein after referred to as the “Bank”) may approve or decline an application for credit facility at its absolute discretion. The bank is not obliged to disclose any reasons for decline or approval of an application.
                    
<span>Account</span> - means the Borrower's existing account or accounts with the Bank.
                    
<span>Disbursement Date</span>  - means the date the Lender actually advanced the loan to the Borrower.
                    
<span>Payment Due Date</span>  -; means loan repayment date
                    
<span>Loan</span>  - means the credit facility available to the Borrower, which shall be subject to a maximum not more than 10 Times of the Borrower’s monthly net pay.
</div>
                <h4>Interest</h4>
                <div>
                    a. The Interest rate to be charged for this service shall be 24% per annum (2% per month) on a reducing balance basis. The interest rate may be increased or decreased from time to time by us. Such change in the interest rate will take effect following a minimum of ten (10) business days’ notice to you.
                    
                    b. The Applicant authorizes the Bank to apportion the monthly repayments between interest and principal, at its absolute discretion, and to debit the Applicant's current/savings account with the amount for each monthly repayment as they fall due.
                    
                    c. Interest on all credit facilities will be charged on a monthly basis. Interest will therefore be calculated for the month based on the outstanding debit balance
                    
                    d. The bank reserves the right to increase/decrease either the tenor/monthly installment amount to effect any upward or downward revision of interest rate or for any other reason
                    
                    e. The Bank reserves the right to change interest rate depending on changes in market conditions
                    
                    f. Interest will be charged on all amounts owed by the Applicant
</div>
                <h4>Other Fees and Charges</h4>
                <div>
                    a. Management Fee: 1% Flat of the approved loan amount payable upfront and one-off
                    
                    b. Insurance Premium: 0.65% per annum of the approved loan amount payable monthly through out the facility tenor. The insurance covers permanent disability and death of the applicant. The insurance premium is payable to a third party – Insurance company.
                    
                    c. Credit Check fees: Maximum N1,000 payable one-off at initiation of the loan. An additional N400 is payable quarterly throughout the facility tenor. All fees are payable to the credit bureau companies.
</div>
                <h4>Disbursement</h4>
                <div>
                    The Applicant understands and agrees that all fees and charges will be charged to the account of the Applicant.
</div>
                <h4>Security</h4>
                <div>
                    The Applicant understands and agrees that the Bank will have a lien on salary through salary domiciliation with Wema Bank as security for the facility and hereby undertakes (by the letter of irrevocable salary domiciliation) that the salary will be paid into the current account with Wema Bank until the expiration of the facility.
</div>
                <h4>Facility Fees</h4>
                <div>
                    The Bank will charge fees as prescribed by the Central Bank of Nigeria (CBN).
                    
                    The Bank reserves the right to vary such charges and fees as will be communicated by publication from time to time. The publication will be published via the web/email/ displayed at its branches and a copy will be made available on request.
</div>
                <h4>Repayment</h4>
                <div>
                    We agree to the terms and condition as set out in the loan agreement and we confirm that the individual is solvent and will be able to meet the principal and interest payment at the agreed due dates and time, to repay 2nd of every month within working hours (7:00am-6pm).
</div>
                <h4>Default</h4>
                <div>
                    In the event of default by the Applicant, the outstanding principal amount of the loan and the accrued interest shall become immediately due, and payable. A statement or demand signed by an authorized officer of the Bank shall be conclusive evidence that the sum is due and owing from the Applicant.
                    
                    In the event of default, the Bank reserves the right to assign this agreement to a third party without the permission of the Applicant, to recover outstanding debt. The Bank reserves the right to set-off the full indebtedness against the Applicant’s bank account/s with Wema Bank and any other financial institution where the Applicant’s BVN or phone number is linked to such account.
</div>
                <h4>Default Fee</h4>
                <div>
                    Where loan instalments due from the Applicant are not received at the date due for the payment, the Bank reserves the right to charge a default rate on the outstanding balance for the month. A flat default charge will be charged on the outstanding balance after 30days
</div>
                <h4>Foreclosure</h4>
                <div>
                    The Bank reserves the right to foreclose the loan and recover all out standings in the event of loss or change of employment, or any other circumstance which may impede the loan repayment, and is thus considered a risk to the Bank.
</div>
                <h4>Variation</h4>
                <div>
                    The Bank will advise the Applicant of any change in prime lending rate, charges, fees and any other terms and conditions of the loan by a notice at its branches, or by notes in the customer's statements. The Applicant will be deemed to have received notification of changes thirty (30) days of publication of notice at its branches. The Applicant understands and agrees that the bank is not obliged to obtain the applicant's signature for receipt of such communication.
</div>
                <h4>Set-Off and Consolidated Rights</h4>
                <div>
                    The bank may at any time and without notice combine all or any of the Applicant's accounts and liabilities with the Bank whether singly or jointly with any person or set-off all or any monies standing to the credit of such account(s) including the Applicant's deposits with the Bank (whether matured or not) towards settling any of the Applicant's liabilities to the Bank whether as principal or surety, actual
                    
                    or contingent, primary or collateral, singly or jointly with any other person, and the bank may effect any necessary currency conversion at the prevailing exchange rate. Exchange risks associated with any collateral, cash or otherwise in settling any outstanding debt shall be borne by the borrower.
                    
                    Banking Instructions via Telex/Facsimile/E-mail
                    
                    Unless the Applicant instructs the bank to the contrary, the Bank is authorized but not obliged, to act on the Applicant's banking instructions transmitted through telex, facsimile service or e-mail. The Applicant releases the Bank from, indemnifies and holds the Bank harmless from and against all actions, suits, proceedings, costs, claims, demands and charges, expenses, losses and liabilities however arising, in consequence or in any way related to:
                    
                    a. The Bank having acted in good faith in accordance with the Applicant's written facsimile, e-mail or telex instructions, notwithstanding that such instruction(s) may have been initiated in error or fraudulently altered, misunderstood or distorted in the lines of communication and/or transmission
                    
                    b. The Bank having refrained from acting in accordance with written facsimile, e-mail or telex instructions of the Applicant by reason of failure of actual transmission thereof to the Bank for whatever reason, whether connected with fault, failure or lack of readiness of the sending or receiving machine
                    
                    c. The Applicant's failure to forward all original copies of facsimile, e-mail or telex instructions to the Bank within 24 hours
</div>
                <h4>Authority of Future Employers</h4>
                <div>
                    The Applicant undertakes to authorise present and future employers to deduct loan repayment from the salary and remit to the Bank or pay salary to Applicant's account with the Bank and cause future employers to issue an irrevocable letter of undertaking to the Bank to make the monthly requisite deductions in respect of all outstanding loans.
</div>
                <h4>Notices</h4>
                <div>
                    The Applicant agrees to accept service of all notices and processes at his/her postal or physical address indicated on this form and hereby confirms these addresses as his/her address for service.
                    
                    All notices and processes sent by registered post will be deemed to have been received 7 days after the date of posting and all processes and notices delivered by hand will be deemed to have been received on the date of delivery.
</div>
                <h4>Appropriation</h4>
                <div>
                    All amounts received by the Bank will be first appropriated towards overdue interest charges/fees, and interest. Any balance left thereafter will be appropriated lastly towards principal. The Bank reserves the right to refuse acceptance of post-dated cheques or such other instruments towards payment or settlement of the credit facility.
</div>
                <h4>Disclosure of Information</h4>
                <div>
                    The Bank may use any information relating to the Applicant for evaluating the credit application and share such information with third parties including but not limited to the Applicant's employer (both present and future), referees and guarantors for any purpose in respect of the credit facility.
                    
                    The bank is registered with the Credit Bureaus licensed by the Central Bank of Nigeria (CBN) to create, organize and manage database for the exchange and sharing of information on credit status of individuals and businesses. This information shall be used for business purposes approved by the CBN and any relevant statute. By this, the Bank is under obligation to disclose to the Bureaus credit information and any other personal information disclosed to it in the course of the banker-customer relationship with it.
                    
                    By submitting information to the Bank (whether or not the Applicant proceeds with the transaction):
                    
                    a. The Applicant agrees that the Bank may collect, use and disclose such information to the
                    
                    Credit Bureaus and that the Bureaus may use the information for any approved business purpose as may from time to time be prescribed by the CBN and/or any relevant statute
                    
                    b. The Applicant understands that information held by the Credit Bureaus may already be linked to records relating to one or more of the partners of the Applicant, and may thus be treated as financially linked. The application will thence be assessed in reference to any 'associated' records. In addition, for any joint application made by the Applicant with any other person(s), new financial association may be created at the Credit Bureau which will link our financial records
                    
                    c. The applicant hereby releases and discharges the Bank from its obligations under the Banker's duty of secrecy and forfeit any right to any claim, damages and/or loss on account of such disclosure to Credit Bureaus in accordance with the provisions of any CBN guideline and/or relevant statute.
</div>
                <h4>Indemnity</h4>
                <div>
                    The Applicant agrees to fully indemnify the bank against all costs and expenses (including legal fees, collection commission, et cetera) arising in any way in connection with the Applicant, in enforcing these terms and conditions or in recovering any amounts due to the Bank in any legal proceeding of whatever nature
</div>
                <h4>Waiver</h4>
                <div>
                    No forbearance, neglect or waiver by the Bank in enforcing these terms and conditions shall prejudice the Bank's right to strictly enforce the same. No waiver by the Bank shall be effective unless it is in writing.
                    
                    In so far as any right is conferred on the Applicant with regard to any obligation imposed on the Applicant by this contract, the Applicant hereby waives and forgoes all such rights and benefits, whether conferred by a statute, common law, equity and any other law in force.
</div>
                <h4>General</h4>
                <div>
                    This Agreement represents the entire understanding between us and your good self with respect to the provision of this service.
                    
                    Any amendment to this Agreement shall be made by us from time to time and communicated to you in writing.
                    
                    You agree and undertake that for the period of this Agreement, you will continue to maintain your ALAT account.
                    
                    This Agreement shall be governed and construed in accordance with the laws of the Federal Republic of Nigeria and, in the event of a dispute, same shall be subject to Arbitration in accordance with the provisions of the Arbitration and Conciliation Act, Cap A18 Laws of the Federation of Nigeria 2004. The Arbitration shall be held in English Language. The Arbitration shall be held in Lagos and the arbitral award shall be final.
                    
                    We reserve the right to transfer or assign our rights and obligations under this Agreement (including its obligation to lend money to the Borrower or the amount owed under this Agreement) to another person. The Lender will only inform the Borrower if such a transfer causes the arrangements for the administration of this Agreement to change.
                    
                    The Borrower authorizes and consents to all lawful access, use or disclosure of the Borrower's particulars, data and information in the application by the Lender which may include but shall not be limited to purposes necessary to promote or sustain the business of the Lender; and the Borrower waives any claims the Borrower may have against the Lender arising from any such access, use or disclosure.
</div>
                <div className="termscta-wrap">
                    
                    <button type="button" 
                        className="btn-alat m-t-10 m-b-20 text-center btn-block"
                        onClick={()=>this.setState({showTerms:false, amountError:''})}
                        >Okay  </button>
                </div>
            </div>
        )
    }

    

    render() {
        let {
            showTerms
        } =this.state;
        
        let {ratingRequest} = this.props;

        let getCustomerData = this.props.offlineLoanGetCustomerDataRequest;
        let sendCustomerData = this.props.offlineLoanSendCustomerDataRequest;
        
        return (
            <Fragment>
                <InnerContainer>
                    <div className="offline-loan-wrap">
                        <div className="heading-icon">
                            {/* <img src={ratingHeader} /> */}
                        </div>
                        {
                            (getCustomerData.processing_status === OFFLINELOAN_GET_DATAOF_CUSTOMER_SUCCESS && 
                                sendCustomerData.processing_status !==OFFLINELOAN_SEND_RESPONSEOF_CUSTOMER_SUCCESS) && 
                            <h3 className="text-center loanheader">Loan Offer!</h3>
                        }
                        
                        <div className="offlineloan-wrap">
                            
                            <div className= {showTerms?"offlineloan-container p-20":"offlineloan-container"}>
                                
                                
                                    <div>{this.renderFetchingData()}</div> 
                                

                                

                                {(!showTerms && 
                                    getCustomerData.processing_status === OFFLINELOAN_GET_DATAOF_CUSTOMER_SUCCESS &&
                                    sendCustomerData.processing_status !==OFFLINELOAN_SEND_RESPONSEOF_CUSTOMER_SUCCESS)  
                                    && this.renderDataOfCustomer()}
                                

                                {showTerms && this.renderTerms()}

                                {sendCustomerData.processing_status===OFFLINELOAN_SEND_RESPONSEOF_CUSTOMER_SUCCESS &&
                                    this.renderSuccessfulApplication()
                                }
                                {/* {setTimeout(() => {
                                    {this.state.showNow!==true && this.renderFetchingData()}
                                    this.setState({showNow:true})
                                }, 3000)}

                                {setTimeout(() => {
                                    {(!showTerms && this.state.showNow===true) && this.renderDataOfCustomer()}
                                }, 3000)} */}
                                
                                {/* Mock tests */}


                            </div>
                        </div>
                        
                        
                            {/* <div className="rating-wrap">
                                <center  className="m-t-30">
                                    <img src={successIcon} />
                                </center>
                                <div className="m-t-10 width-300">
                                    <h4 className="success-heading">Thank you for rating us</h4>
                                </div>  
                            </div> */}
                        
                    </div>
            </InnerContainer>
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        ratingRequest   : state.send_rating_request,
        offlineLoanGetCustomerDataRequest   : state.offlineloan_get_customer_data_request,
        offlineLoanSendCustomerDataRequest   : state.offlineloan_send_customer_data_request,
    }
}

export default connect(mapStateToProps)(OfflineLoans); 