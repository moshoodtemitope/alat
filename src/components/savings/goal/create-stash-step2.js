import * as React from "react";
import {Fragment} from "react";
import InnerContainer from '../../../shared/templates/inner-container';
import SavingsContainer from '../container';
import Select from 'react-select';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../redux/actions/savings/goal/fixed-goal.actions'
import {fixedGoalConstants} from '../../../redux/constants/goal/fixed-goal.constant';
import SelectDebitableAccounts from '../../../shared/components/selectDebitableAccounts';



import "react-datepicker/dist/react-datepicker.css";


class CreateStashContinue extends React.Component {

    constructor(props){
        super(props)
        this.state={
            AmountSavedText:"",
            startDate:"",
            endDate:"",
            goalName:"",
            timeSaved:"",
            //accountNumber:"",
            selectedAccount:"",
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
        this.setState({ selectedAccount: account })
        if (this.state.isSubmitted) { 
            if(account.length == 10)
            this.setState({ isAccountInvalid: false })
         }
    }
    checkAccountNumber() {
        if (this.state.selectedAccount.length != 10) {
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
        if (this.props.fixed_goal_step1.fixed_step1_status != fixedGoalConstants.FETCH_FIXED_GOAL_SUCCESS)
            //this.props.history.push("/savings/flex-goal");
            console.log('something is hapening')
        else {
            var data = {
                ...this.props.fixed_goal_step1.fixed_step1_data.data
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
            this.props.dispatch(actions.fetchFixedGoalStep2({
                "goalName":this.state.goalName,
                "startDate":this.state.startDate,
                "endDate":this.state.endDate,
                "AmountSavedText":this.state.AmountSavedText,
                "timeSaved":this.state.timeSaved,
                "selectedAccount":this.state.selectedAccount,
            }));
        }
    }

    gotoStep3 = () => {
        if (this.props.fixed_goal_step2)
            if (this.props.fixed_goal_step2.fixed_step2_status == fixedGoalConstants.FETCH_FIXED_GOAL_SUCCESS_STEP2) {
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
                                            <form onSubmit={this.onSubmit}>
                                            <div className="form-group">
                                                <label>Chose an account!</label>
                                                <SelectDebitableAccounts
                                                value={this.state.accountNumber}
                                                accountInvalid={this.state.isAccountInvalid}
                                                onChange={this.handleSelectDebitableAccounts} />
                                            </div>
                                            <div className="row">
                                            <div className="col-sm-12">
                                            <center>
                                            <button type="submit" className="btn-alat m-t-10 m-b-20 text-center">Save Goal
                                            </button>
                                            <p>Back</p>
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
    fixed_goal_step1: state.fixed_reducer,
    fixed_goal_step2:state.fixed_reducer2
})
export default connect(mapStateToProps)(CreateStashContinue);
