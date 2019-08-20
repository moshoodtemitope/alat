import * as React from "react";
import {Fragment} from "react";
import InnerContainer from '../../../shared/templates/inner-container';
import SavingsContainer from '../container';
import {NavLink, Route} from "react-router-dom";
import {Switch} from "react-router";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import SelectDebitableAccounts from '../../../shared/components/selectDebitableAccounts';
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import * as actions from '../../../redux/actions/savings/group-savings/rotating-group-saving-action';
import {history} from '../../../_helpers/history';

// if(window.performance.navigation.type == 1)
//     window.location.replace("http://localhost:8080/");

class JoinAGroup extends React.Component {
    constructor(props){
        super(props)
        this.state= {
            user: JSON.parse(localStorage.getItem("user")),
            referralCode: null,
            warning: 'notValid',
            warningStyle: 'notValid'
        }
    }

    componentDidMount = () => {
        setTimeout(() => {
            this.setState({'warningStyle': 'valid'});
        }, 1);
    }


    handleReferralCode = (event) => {
        this.setState({'warningStyle': 'valid'}); // remove warning sign.
        let container = event.target.value.split('');
        let count = 0;
        container.map(() => {
           if(count == 9)
               this.setState({'warning': 'valid'});
               this.setState({'warningStyle': 'valid'});
           count++;
        });

        if(count != 9)
               return;
        
        this.setState({
            'referralCode': event.target.value
        });
    }

    // JoinAGroup = () => {
    //    if(this.state.warning == true)
    //        return;

    //    const data = {
    //        referralCode: this.state.referralCode,
    //        DebitAccount: this.state.selectedAccount
    //    }
    //    console.log(data)
    //    this.props.dispatch(actions.joinAGroup(this.state.user.token, data))
    // }

    NavigateToSummary = () => {
        console.log(this.state.referralCode);
        if(this.state.referralCode.split('').length != 10)
             this.setState({'warningStyle': 'notValid'});   // display warning sign
        if(this.state.warning == 'notValid')
            return; 
        this.props.dispatch(actions.refferalCode(this.state.referralCode));
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.NavigateToSummary();
        return null;
    }

    NavigateToGroupSavings = () => {
        let groupSavings = Object.keys(this.props.groups); //returns an array
        let rotatingSavings = Object.keys(this.props.groupSavingsEsusu); //returns an array
        if(groupSavings.length != 0 || rotatingSavings.length != 0){
            history.push('/savings/activityDashBoard');
            return;
        }
        history.push('/savings/goal/group-savings-selection');
    }

    render() {
        const {selectedAccount} = this.state;
        return (
            <Fragment>
                <InnerContainer>
                    <SavingsContainer>
                        <div className="row">
                            <div className="col-sm-12">
                                <p className="page-title">Savings & Goals</p>
                            </div>
                            <div className="col-sm-12">
                                <div className="tab-overflow">
                                    <div className="sub-tab-nav">
                                        <ul>
                                        <NavLink to='/savings/choose-goal-plan'>
                                            <li><a href="#">Goals</a></li>
                                        </NavLink>
                                        {/* <NavLink to='/savings/goal/group-savings-selection'> */}
                                            <li onClick={this.NavigateToGroupSavings}><a className="active">Group Savings</a></li>
                                        {/* </NavLink> */}
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
                                       <h4 className="m-b-10 center-text hd-underline">Join A Group</h4>

                                            <form onSubmit={this.handleSubmit}>
                                                <div className="form-group instruction">
                                                    <h6></h6>
                                                </div>
                                                <div className='form-row'>
                                                    <div className='form-group col-md-12 joinGroup'>
                                                        <h6>Enter Group Code</h6>
                                                        <input type="text" placeholder='GPEFA34UE' id='enterCode' onChange={this.handleReferralCode}/>
                                                        <p id={this.state.warningStyle}>character must not exceed or below 10</p>
                                                    </div>
                                                </div>
                                               
                                                <div className="form-row">
                                                   
                                                    <div className="form-group col-md-12 butLeft joinButton">
                                                       <center>
                                                           {/* <NavLink to='/savings/group/joingroup-success-message'> */}
                                                                 <button>Join Group</button>
                                                           {/* </NavLink> */}
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

function mapStateToProps(state){
   return {
       groupSavingsEsusu: state.getGroupSavingsEsusu.data,
       groups: state.customerGroup.data
   }
}

export default connect(mapStateToProps)(JoinAGroup);
