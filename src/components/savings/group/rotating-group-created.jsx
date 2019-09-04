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
import * as actions1 from '../../../redux/actions/savings/group-savings/group-savings-actions';

// if(window.performance.navigation.type == 1)
//     window.location.replace("http://localhost:8080/");
    
class RotatingGroupCreated extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            user: JSON.parse(localStorage.getItem("user"))
        }
    }

    componentDidMount = () => {
       this.CheckGroupSavingsAvailability();
       this.CheckRotatingSavingsAvailability();

       const data = {
           groupId: this.props.createdGroupSavings.response.id
       }
       console.log(data);
       this.props.dispatch(actions.rotatingGroupDetails(this.state.user.token, data))
    }

    CheckRotatingSavingsAvailability = () => {
        this.props.dispatch(actions.GetGroupsEsusu(this.state.user.token, null));
    }

    CheckGroupSavingsAvailability = () => {
        this.props.dispatch(actions1.customerGroup(this.state.user.token, null));
    }


    handleSubmit = (event) => {
        event.preventDefault();
        return null;
    } 
    
    NavigateToGroupSavings = () => {
        // let groupSavings = this.props.groups.response; //returns an array
        // let rotatingSavings = this.props.groupSavingsEsusu.response; //returns an array
        // if(groupSavings.length != 0 || rotatingSavings.length != 0){
            history.push('/savings/activityDashBoard');
        //     return;
        // }
        // history.push('/savings/goal/group-savings-selection');
    }


    CopyCode = (event) => {
        console.log(this.textInputHidden);
        this.textInputHidden.select();
        document.execCommand("copy");
        console.log('its here now');
    }

    render() {
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
                                       <h4 className="m-b-10 center-text hd-underline">Group Created</h4>

                                            <form onSubmit={this.handleSubmit}>
                                            <input type="text" id='hiddenReferralCode1' ref={ele => this.textInputHidden = ele} value={this.props.createdGroupSavings.response.referralCode}/>
                                                <div className="form-group instruction">
                                                    <h6>Use the code below to invite your friends to join the group.</h6>
                                                </div>
                                                <div className="forCode">
                                                        <div className="left">
                                                            <h2 id={this.props.createdGroupSavings.response.referralCode} ref={element => this.textInput = element}>{this.props.createdGroupSavings.response.referralCode}</h2>
                                                        </div>
                                                        <div className="right">
                                                        <img onClick={this.CopyCode} className='itemToCopy' src="/src/assets/img/Group.png" alt=""/>
                                                        </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group col-md-6 butLeft">
                                                        <button>Share Code</button>
                                                    </div>
                                                    <div className="form-group col-md-6 butRight">
                                                        <NavLink to='/savings/group-analytics-mini'>
                                                              <button>Proceed To Group</button>
                                                        </NavLink>
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
       createdGroupSavings: state.createRotatingGroupSavings.data,
       groupSavingsEsusu: state.getGroupSavingsEsusu.data,
       groups: state.customerGroup.data
   }
}

export default connect(mapStateToProps)(RotatingGroupCreated);