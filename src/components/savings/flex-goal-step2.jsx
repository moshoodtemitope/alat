import * as React from "react";
import {Fragment} from "react";
import InnerContainer from '../../shared/templates/inner-container';
import SavingsContainer from './container';
import Select from 'react-select';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {flexGoalConstants} from '../../redux/constants/goal/flex-goal.constant'
import * as actions from '../../redux/actions/savings/goal/flex-goal.actions'
import SelectDebitableAccounts from '../../shared/components/selectDebitableAccounts';



import "react-datepicker/dist/react-datepicker.css";
const selectedTime = [
           
    { value: 'monthly' ,label:"Monthly" },
    {  value: 'weekly' , label:"Weekly" },
    {  value: 'daily', label:"Daily"},
   
];







class FlexGoal extends React.Component {

    constructor(props){
        super(props)
        this.state={
            AmountSavedText:"",
            startDate:"",
            endDate:"",
            goalName:"",
            timeSaved:"",
            //accountNumber:"",
            debitAccount:"",
            isSubmitted: false,
            isAccountInvalid: false,
            SelectedtimeSaved:"",
            TimeSavedInvalid:false

           
         };
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this)
        this.handleSelectDebitableAccounts = this.handleSelectDebitableAccounts.bind(this);


        
      

    }
    handleSelectChange = (SelectedtimeSaved) => {
        this.setState({ "timeSaved": SelectedtimeSaved.value,
                        "timeSaved" : SelectedtimeSaved.label
              });
        if (this.state.formsubmitted && SelectedtimeSaved.value != "")
            this.setState({ TimeSavedInvalid: false })
    }
    handleSelectDebitableAccounts(account) {
        console.log('dss', account);
        this.setState({ debitAccount: account })
        if (this.state.isSubmitted) { 
            if(account.length == 10)
            this.setState({ isAccountInvalid: false })
         }
    }
    checkAccountNumber() {
        if (this.state.debitAccount.length != 10) {
            this.setState({ isAccountInvalid: true })
            return true;
        }
    }
    checkTimeSaved = () => {
        if (this.state.timeSaved == "") {
            this.setState({ TimeSavedInvalid: true });
            return true;
        }
    }
    componentDidMount = () => {
        this.init();
    }

    init = () => {
        if (this.props.flex_goal_step1.flex_step1_status != flexGoalConstants.FETCH_FLEX_GOAL_SUCCESS)
            this.props.history.push("/savings/flex-goal");
        else {
            var data = {
                ...this.props.flex_goal_step1.flex_step1_data.data
            };
            console.log('tag', data)

            this.setState({
                AmountSavedText:data.AmountSavedText,
                startDate: data.startDate,
                endDate: data.endDate,
                goalName:data.goalName,
            });
        }
    }

    handleChange = (e) => {
        let name = e.target.name;
        this.setState({ [name]: e.target.value })
    }
    
    onSubmit(event){
        event.preventDefault();

        this.setState({ isSubmitted: true });
        if (this.checkAccountNumber()|| this.checkTimeSaved()) {

        } else {
            this.setState({isSubmitted : true });
            this.props.dispatch(actions.fetchFlexGoalStep2({
                "goalName":this.state.goalName,
                "startDate":this.state.startDate,
                "endDate":this.state.endDate,
                "AmountSavedText":this.state.AmountSavedText,
                "timeSaved":this.state.timeSaved,
                "debitAccount":this.state.debitAccount,
            }));
        }
       
    }
    gotoStep3 = () => {
        if (this.props.flex_goal_step2)
            if (this.props.flex_goal_step2.flex_step2_status == flexGoalConstants.FETCH_FLEX_GOAL_SUCCESS_STEP2) {
                return <Redirect to="/savings/flex-goal-summary" />
            }
    }
    

    


    render() {
        
        let { timeSaved,TimeSavedInvalid} =this.state
       
        return (
            <Fragment>
                <InnerContainer>
                    <SavingsContainer>
                    {this.gotoStep3()}
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
                                       <h4 className="m-b-10 center-text hd-underline">Create a Flexi Goal</h4>
                                       <p className="header-info">To achieve your target of <span style={{color:'#AB2656'}}>N{this.state.AmountSavedText} <span style={{color:'#444444'}}>by</span>  Dec 12,2018</span></p>

                                            <form onSubmit={this.onSubmit}>
                                            
                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label className="label-text">You will have to save</label>
                                                    <input type="text"
                                                     value={this.state.AmountSavedText} 
                                                     onChange={this.handleChange}
                                                      placeholder="E.g. ₦100,000"/>
                                                </div>
                                                <div className={TimeSavedInvalid ? "form-group col-md-6 form-error" : "form-group col-md-6"}>
                                                    <label className="label-text">How often would  you save</label>
                                                    <Select type="text" 
                                                    options={selectedTime} 
                                                    value={timeSaved.label}
                                                    name="timeSaved"
                                                    onChange={this.handleSelectChange}/>
                                                    {TimeSavedInvalid && <div className='text-danger'>Enter duration</div>}
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
                                            <button type="submit" className="btn-alat m-t-10 m-b-20 text-center">Next
                                            
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
    flex_goal_step1:state.flex_goal_step1,
    flex_goal_step2:state.flex_goal_step2
})
export default connect(mapStateToProps)(FlexGoal);
