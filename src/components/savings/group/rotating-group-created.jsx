import * as React from "react";
import {Fragment} from "react";
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
// import {history} from '../../../_helpers/history';
import { GROUPSAVINGSCONSTANT } from '../../../redux/constants/savings/group';


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

       if(this.props.createdGroupSavings.data != undefined){
            const data = {
                groupId: this.props.createdGroupSavings.data.response.id
            }

            console.log(data);

            let Storage = window.localStorage;
            Storage.setItem('rotatingGpId', this.props.createdGroupSavings.data.response.id);
            console.log(Storage.getItem('rotatingGpId'));
            console.log('condition never went through!  0000');
            this.props.dispatch(actions.rotatingGroupDetails(this.state.user.token, data));
       }

       if(this.props.createdGroupSavings.data == undefined){
             this.FetchRotatingSavings(); 
             console.log('condition never went through!');
       }
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
        
            history.push('/savings/activityDashBoard');
        
    }


    CopyCode = (event) => {
        console.log(this.textInputHidden);
        this.textInputHidden.select();
        document.execCommand("copy");
        console.log('its here now');
    }

    LogOutUser = () => {
        history.push('/');
    }

    FetchRotatingSavings = () => {
        let Store = window.localStorage;  
        let data = {
            groupId: JSON.parse(Store.getItem('rotatingGpId'))
        }
       
        // setTimeout(() => {
        this.props.dispatch(actions.rotatingGroupDetails(this.state.user.token, data));
        // }, 1000)
    }

    render() {

        if(this.props.rotatingGroupDetails.message === GROUPSAVINGSCONSTANT.ROTATING_GROUP_DETAILS){
            return(
                <Fragment>
                    
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
                                                <li onClick={this.NavigateToGroupSavings}><a className="active">Group Savings</a></li>
                                                {/* <li><a href="#">Investments</a></li> */}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <p>Loading Group Details ...</p>
    
                            </div>
    
                        
    
                </Fragment>
            )
        }
    
        if(this.props.rotatingGroupDetails.message === GROUPSAVINGSCONSTANT.ROTATING_GROUP_DETAILS_SUCCESS){
            return (
                <Fragment>
                    
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
                                                <li onClick={this.NavigateToGroupSavings}><a className="active">Group Savings</a></li>
                                                {/* <li><a href="#">Investments</a></li> */}
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
                                                <input type="text" id='hiddenReferralCode1' ref={ele => this.textInputHidden = ele} value={this.props.rotatingGroupDetails.data.response.referralCode}/>
                                                    <div className="form-group instruction">
                                                        <h6>Use the code below to invite your friends to join the group.</h6>
                                                    </div>
                                                    <div className="forCode">
                                                            <div className="left">
                                                                <h2 id={this.props.rotatingGroupDetails.data.response.referralCode} ref={element => this.textInput = element}>{this.props.rotatingGroupDetails.data.response.referralCode}</h2>
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
    
                        
    
    
                </Fragment>
            );
        }
    
        if(this.props.rotatingGroupDetails.message === GROUPSAVINGSCONSTANT.ROTATING_GROUP_DETAILS_ERROR){
            return(
                <Fragment>
                    
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
                                                <li onClick={this.NavigateToGroupSavings}><a className="active">Group Savings</a></li>
                                                {/* <li><a href="#">Investments</a></li> */}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <p>Please Check Your Network ...</p>
    
                            </div>
    
                        
    
                </Fragment>
            )
        }

        if(this.props.rotatingGroupDetails.data == undefined){
            // this.FetchRotatingSavings(); 
            return(
                <Fragment>
                    
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
                                                <li onClick={this.NavigateToGroupSavings}><a className="active">Group Savings</a></li>
                                                {/* <li><a href="#">Investments</a></li> */}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <p>Loading Group Details ...</p>
    
                            </div>
    
                        
    
                </Fragment>
            )
        }

        if(this.props.rotatingGroupDetails.data != undefined){
            if(Object.keys(this.props.createdGroupSavings.data.response).length != 0){
                return (
                    <Fragment>
                        
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
                                                    <li onClick={this.NavigateToGroupSavings}><a className="active">Group Savings</a></li>
                                                    {/* <li><a href="#">Investments</a></li> */}
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
                                                    <input type="text" id='hiddenReferralCode1' ref={ele => this.textInputHidden = ele} value={this.props.createdGroupSavings.data.response.referralCode}/>
                                                        <div className="form-group instruction">
                                                            <h6>Use the code below to invite your friends to join the group.</h6>
                                                        </div>
                                                        <div className="forCode">
                                                                <div className="left">
                                                                    <h2 id={this.props.createdGroupSavings.data.response.referralCode} ref={element => this.textInput = element}>{this.props.createdGroupSavings.data.response.referralCode}</h2>
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
        
                            
        
                    </Fragment>
                );
            }else{
                this.LogOutUser();
                return(
                    <div>
                        <p>something is not write ...</p>
                    </div>
                )
            }           
        }
    }
}

function mapStateToProps(state){
   return {
       createdGroupSavings: state.createRotatingGroupSavings,
       groupSavingsEsusu: state.getGroupSavingsEsusu.data,
       groups: state.customerGroup.data,
       rotatingGroupDetails: state.rotatingGroupDetails,
       createRotatingGroupSavings:state.createRotatingGroupSavings
   }
}

export default connect(mapStateToProps)(RotatingGroupCreated);
