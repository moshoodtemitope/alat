import * as React from "react";
import {Fragment} from "react";
import {NavLink, Route} from "react-router-dom";
import { connect } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import * as actions from '../../../redux/actions/savings/group-savings/group-savings-actions';
import * as actions1 from '../../../redux/actions/savings/group-savings/rotating-group-saving-action';
import {history} from '../../../_helpers/history';
import { GROUPSAVINGSCONSTANT } from '../../../redux/constants/savings/group';
import { iif } from "rxjs";

// var groupDetailsId = null;
// var groupDetailsStore = null;
class GroupCreated extends React.Component {
    constructor(props){
        super(props)
        this.state= {
            user: JSON.parse(localStorage.getItem("user"))
        }
    }

    componentDidMount(){
        this.GetGroupSummary();
        this.CheckGroupSavingsAvailability();
        this.CheckRotatingSavingsAvailability();
    }

    CheckRotatingSavingsAvailability = () => {
        this.props.dispatch(actions1.GetGroupsEsusu(this.state.user.token, null));
    }

    CheckGroupSavingsAvailability = () => {
        this.props.dispatch(actions.customerGroup(this.state.user.token, null));
    }

    GetGroupDetails = () => {
        // console.log('THE CODE GOT HERE OH!');
        const groupDetailsStore = window.localStorage;
        const id = groupDetailsStore.getItem('groupDetialsId');
        const data = {
            groupId: parseInt(id)
        }
        this.props.dispatch(actions.groupDetails(this.state.user.token, data));
    }

    GetGroupSummary = () => {
        const groupDetailsStore = window.localStorage;
        
        if(this.props.payload != undefined){
            groupDetailsStore.setItem('groupDetialsId', this.props.payload.response.id);
            const id = this.props.payload.response.id;
            const data = {
                groupId: id
            }
            this.props.dispatch(actions.groupDetails(this.state.user.token, data));
        }
        
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
        // console.log(this.textInputHidden);
        this.textInputHidden.select();
        document.execCommand("copy");
        // console.log('its here now');
    }

    render() {
        
        
        // for pending detials
        if(this.props.groupDetails.message === GROUPSAVINGSCONSTANT.GROUPDETAILS && this.props.payload == undefined){
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
                                        {/* <NavLink to="/savings/goal/group-savings-selection"> */}
                                            <li onClick={this.NavigateToGroupSavings}><a className="active">Group Savings</a></li>
                                        {/* </NavLink> */}
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
                                       <h4 className="m-b-10 center-text hd-underline">Loading Referral Code ...</h4>
                                           
                                        </div>
                                        
                                       </div>

                                      </div>

                                </div>

                            </div>

                        </div>

                    


            </Fragment>
             );
        }

        if(this.props.groupDetails.message === GROUPSAVINGSCONSTANT.GROUPDETAILS_SUCCESS && this.props.payload == undefined){
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
                                            {/* <NavLink to="/savings/goal/group-savings-selection"> */}
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
                                                    <input type="text" id='hiddenReferralCode' ref={ele => this.textInputHidden = ele} value={this.props.groupDetails.data.response.referralCode}/>
                                                    <div className="form-group instruction">
                                                        <h6>Use the code below to invite your friends to join the group.</h6>
                                                    </div>
                                                    <div className="forCode">
                                                            <div className="left">
                                                                <h2 id='itemToCopy' ref={element => this.textInput = element}>{this.props.groupDetails.data.response.referralCode}</h2>
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
                                                            <NavLink to='/savings/group/group-analytics'>
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

        if(this.props.groupDetails.message === GROUPSAVINGSCONSTANT.GROUPDETAILS_ERROR && this.props.payload == undefined){
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
                                        {/* <NavLink to="/savings/goal/group-savings-selection"> */}
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
                                       <h4 className="m-b-10 center-text hd-underline">Please Check Your Internet Connection ...</h4>
                                           
                                        </div>
                                        
                                       </div>

                                      </div>

                                </div>

                            </div>

                        </div>

                    


            </Fragment>
             );
        }

        if(this.props.payload != undefined){
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
                                           <h4 className="m-b-10 center-text hd-underline">Group HH Created</h4>
                                                <form onSubmit={this.handleSubmit}>
                                                    <input type="text" id='hiddenReferralCode' ref={ele => this.textInputHidden = ele} value={this.props.payload.response.referralCode}/>
                                                    <div className="form-group instruction">
                                                        <h6>Use the code below to invite your friends to join the group.</h6>
                                                    </div>
                                                    <div className="forCode">
                                                            <div className="left">
                                                                <h2 id='itemToCopy' ref={element => this.textInput = element}>{this.props.payload.response.referralCode}</h2>
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
                                                            <NavLink to='/savings/group/group-analytics'>
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

        if(this.props.payload == undefined){
            this.GetGroupDetails();
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
                                       <h4 className="m-b-10 center-text hd-underline">Loading Referral Code ...</h4>
                                           
                                        </div>
                                        
                                       </div>

                                      </div>

                                </div>

                            </div>

                        </div>




            </Fragment>
             );
        }

        if(this.props.groupDetails.data == undefined && this.props.payload == undefined){
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
                                      <h4 className="m-b-10 center-text hd-underline">Loading Group Data ...</h4>
                                          
                                       </div>
                                       
                                      </div>

                                     </div>

                               </div>

                           </div>

                       </div>

                   


           </Fragment>
            );
        }
    }
}

function mapStateToProps(state){
    return {
        payload: state.groupSavings.data,
        groupSavingsEsusu: state.getGroupSavingsEsusu.data,
        groups: state.customerGroup.data,
        groupDetails: state.groupDetails
    }
}
export default connect(mapStateToProps)(GroupCreated);
