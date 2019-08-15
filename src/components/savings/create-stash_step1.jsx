import * as React from "react";
import {Fragment} from "react";
import InnerContainer from '../../shared/templates/inner-container';
import SavingsContainer from './container';
import {NavLink, Redirect} from "react-router-dom";
import Select from 'react-select';
import { connect } from 'react-redux';
import {createGoalConstants} from '../../redux/constants/goal/create-stash.constant'
import * as actions from '../../redux/actions/savings/goal/create-stash-goal.actions'
import * as util from '../../shared/utils'
import moment from 'moment';
import SelectDebitableAccounts from '../../shared/components/selectDebitableAccounts';



const selectedTime = [
           
    { value: 'yes' ,label:"Yes" },
    {  value: 'no' , label:"No" },
   
];





class CreateStash extends React.Component {

    constructor(props){
        super(props);
        this.state={
            goalName:"",
            targetAmount:"",
            isAutomaticDebit: true,
            payOutInterest:"",
            showInterest:"",
            debitAmount:"",
            InterestCashout:"",
            isSubmitted : false,
            targetAmountInvalid:false,
            GoalNameInvalid:false,
            PayOutInterestInvalid:false,
            goalFrequencyInvalid:false,
            showMessage: false,
            StartDate:  moment().format('YYYY-MM-DDTHH:mm:ss.SSSZZ'),
            FrequencyId: 8,
            FrequencyDurationId: 1,
            isAccountInvalid:false,


        };
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelectDebitableAccounts = this.handleSelectDebitableAccounts.bind(this);
    }
    componentDidMount(){
        console.log('interest loan rate',this.state.targetAmount)
    }
    
    handleChange = (e) => {
        let name = e.target.name;
        this.setState({ [name]: e.target.value })
    };
    checkGoalName = () => {
        if (this.state.goalName === "") {
            this.setState({ GoalNameInvalid: true });
            return true;
        }
    };
    
    checkAmount = () => {
        if (this.state.targetAmount === "") {
            this.setState({ targetAmountInvalid: true });
            return true;
        }
    };
    checkPayOutInterest = () => {
        if (this.state.goalFrequency === "") {
            this.setState({ PayOutInterestInvalid: true });
            return true;
        }
    };
    
    handleAmount = (e) => {
        // console.log
         let intVal = e.target.value.replace(/,/g, '');
         if (/^\d+(\.\d+)?$/g.test(intVal)) {
             // if (parseInt(intVal, 10) <= 2000000) {
             this.setState({ targetAmount: intVal, targetAmount: this.toCurrency(intVal) },
                 () => this.setFregValue());
             // }
         } else if (e.target.value === "") {
             this.setState({ targetAmount: "", targetAmount: "" },
                 () => this.setFregValue());
         }
 
         if(this.state.isSubmitted === true)
         if (this.state.formsubmitted) {
                    if (e !== "")
                        this.setState( { targetAmountInvalid: false });
        }
    };
 
    toCurrency(number) {
         // console.log(number);
         const formatter = new Intl.NumberFormat('en-US', {
             style: "decimal",
             currency: "USD",
             maximumFractionDigits: 2
         });
 
         return formatter.format(number);
    }
    removeComma(currencyValue) {
        return currencyValue.replace(/,/g, '');
    }
    
 
    handleSelectChange = (InterestCashout) => {
        this.setState({ "showInterests": InterestCashout.value,
                        "showInterest" : InterestCashout.label
              });
        if (this.state.formsubmitted && InterestCashout.value !== "")
            this.setState({ PayOutInterestInvalid: false })
    };
    setFregValue = () => {
        this.setState({ payOutInterest: this.calculateInterest() });


    };
    calculateInterest(){
    
        var days = null;
        var res;
        if(this.state.targetAmount){
          let amount = this.removeComma(this.state.targetAmount);
          var ia = ((amount / 365) * 0.10 );
          let dailycontribution = 1 * ( ia - (0.10) *ia);
          this.interest =  parseFloat(dailycontribution).toFixed(2);
          this.showInterests = true;
          return this.interest
        }else{
          this.showInterests= false;
          return this.interest
        }
    }
    
    handleSelectDebitableAccounts(account) {
        console.log('dss', account);
        this.setState({ debitAccount: account });
        if (this.state.isSubmitted) { 
            if(account.length === 10)
            this.setState({ isAccountInvalid: false })
         }
    }
    
    
  
    onSubmit(event){
        event.preventDefault();

        if (this.checkGoalName()||this.checkAmount()||this.checkPayOutInterest()) {

        } else {
            this.setState({isSubmitted : true });
            this.props.dispatch(actions.createStashGoalStep1({
                "goalName":this.state.goalName,
                "targetAmount":this.state.targetAmount,
                "debitAccount":this.state.debitAccount,
                "payOutInterest":this.state.payOutInterest,
                "FrequencyId":this.state.FrequencyId,
                "FrequencyDurationId":this.state.FrequencyDurationId,


               
            }));
            console.log('tag', '')
        }
        
       
    }
    
    gotoStep2 = () => {
        if (this.props.create_stash_goal_step1)
            if (this.props.create_stash_goal_step1.stash_goal_step1_status === createGoalConstants.CREATE_STASH_GOAL_SUCCESS_STEP1) {
                return <Redirect to="/savings/create-stash_step2" />
            }
    };

    showInterest = () =>  {
        this.setState({showMessage: true})
    };
    render() {
        
        let {GoalNameInvalid,targetAmountInvalid,showInterest,PayOutInterestInvalid}=this.state;

        return (
            <Fragment>
                <InnerContainer>
                    <SavingsContainer>
                    {this.gotoStep2()}
                        <div className="row">
                            <div className="col-sm-12">
                                <p className="page-title">Savings & Goals</p>
                            </div>
                            <div className="col-sm-12">
                                <div className="tab-overflow">
                                    <div className="sub-tab-nav">
                                        <ul>
                                            <li><a href="accounts.html" className="active">Goals</a></li>
                                            <li><a href="statement.html">Group Savings</a></li>
                                            <li><a href="#">Investments</a></li>
                                        
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="row">
                                    <div className="col-sm-12">
                                      <div className="max-600">
                                       <div className="al-card no-pad">
                                       <h4 className="m-b-10 center-text hd-underline">Create a Stash</h4>
                                           <center>
                                                <p className="header-info">Save what ever you want, earn and<span style={{color:"#AB2656"}}> 10% interest</span></p>
                                           </center>

                                            <form onSubmit={this.onSubmit}>
                                                <div className={GoalNameInvalid ? "form-group form-error" : "form-group"}>
                                                    <label className="label-text">Give this stach a name</label>
                                                    <input 
                                                        type="text" 
                                                        autoComplete="off" 
                                                        className="form-control" 
                                                         placeholder="Dubai Goal"
                                                         name="goalName"
                                                         value={this.state.goalName}
                                                         onChange={this.handleChange}
                                                    />
                                                    {GoalNameInvalid &&
                                                        <div className="text-danger">select a goal name please</div>}
                                                    
                                                </div>
                                                <div className="form-row">
                                                    <div className={targetAmountInvalid ? "form-group col-md-6 form-error" : "form-group col-md-6"}>
                                                        <label className="label-text">How much would you like to save</label>
                                                        <input 
                                                            onKeyUp= {this.showInterest}
                                                            className="form-control" 
                                                            autoComplete="off" 
                                                            name="targetAmount"
                                                            onChange={this.handleAmount}
                                                            placeholder="E.g. ₦100,000"
                                                            value={this.state.targetAmount}

                                                          
                                                         />
                                                         {targetAmountInvalid && 
                                                            <div className="text-danger">Enter the amount you want to save</div>}
                                                            {
                                                            this.state.showMessage ? 
                                                              <div className="text-purple"><h3 className="text-purple"> You will earn approximately  
                                                              ₦ {util.formatAmount(this.state.payOutInterest)} in interest daily. Your stash will need to exist for a minimum of 30 days to qualify for interest </h3></div> 
                                                              : null
                                                            }
                                                        </div>
                                                    

                                                    <div className={PayOutInterestInvalid ? "form-group col-md-6 form-error" : "form-group col-md-6"}>
                                                        <label className="label-text">Cashout Interest Monthly ?</label>
                                                        <Select type="text" 
                                                            options={selectedTime}
                                                            name=""
                                                            onChange={this.handleSelectChange}
                                                            value={showInterest.label}
                                                          />
                                                          {PayOutInterestInvalid && <div className='text-danger'>Enter saving duration</div>}
                                                    </div>
                                                    
                                                </div>
                                                <div className="form-group">
                                                    <SelectDebitableAccounts
                                                    value={this.state.accountNumber}
                                                    accountInvalid={this.state.isAccountInvalid}
                                                    onChange={this.handleSelectDebitableAccounts} />
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <center>


                                                            <button 
                                                            disabled={this.props.create_stash_goal_step1.stash_goal_step1_status === createGoalConstants.CREATE_STASH_GOAL_PENDING_STEP1}

                                                            type="submit" className="btn-alat m-t-10 m-b-20 text-center">
                                                            {this.props.create_stash_goal_step1.stash_goal_step1_status === createGoalConstants.CREATE_STASH_GOAL_PENDING_STEP1 ? "Processing..." :"Next"}

                                                            </button>
                                                        </center>
                                                    </div>
                                                </div>
                                            
                                            </form>

                                            
                                            
                                        </div>

                                       
                                       </div>
                                      
                                      </div>
                                    
                                </div>
                            
                            </div>
                        
                        </div>

                    
                    </SavingsContainer>

                </InnerContainer>


            </Fragment>
        );
    }
}
const mapStateToProps = state => ({
    create_stash_goal_step1:state.create_stash_step1
});
export default connect(mapStateToProps)(CreateStash);
