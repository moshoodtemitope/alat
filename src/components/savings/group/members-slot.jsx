import * as React from "react";
import {Fragment} from "react";
import InnerContainer from '../../../shared/templates/inner-container';
import SavingsContainer from './../container';
import {NavLink, Route, Redirect} from "react-router-dom";
import {Switch} from "react-router";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import SlotSelection from './members-slot';

var theMembers = [];
var element = {};
var arraysOfSlot = [];
var membersAccordingToSlot = []; // accending order
var slot = [];
var groupMembers;

class MemberSlots extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            members: null
        }
    }

    componentDidMount = () => {
        const members = this.props.groupDetails.response.members; // an array
        groupMembers = members;
        for(var i=0; i<members.length; i++){
            arraysOfSlot.push(members[i]['slot']);
        }

        /// sorting in accending order!
        arraysOfSlot.sort((a, b) => {
            return a - b;
        });

        const setMember = (aMember) => {
             for(var i=0; i<members.length; i++){
                  if(aMember == members[i]['slot'])
                        membersAccordingToSlot.push(members[i]);
             }
        }

        for(var i=0; i<arraysOfSlot.length; i++){
              setMember(arraysOfSlot[i]);
        }

        const setOptions = (members) => {  
            for(var i=0; i<members.length; i++){
                   element.value = members[i].firstName + " " + members[i].lastName;
                   element.label = members[i].firstName + " " + members[i].lastName;
                   theMembers.push(element);
                   element = {};
            }
       }

       setOptions(membersAccordingToSlot);
       this.setState({members: theMembers})
    }

    handleSelectChange = (member) => {
       const allGroupMembers = this.props.groupDetails.response.members;
       const SetSlot = (aMember, memberSlot) => {
            for(var i=0; i<groupMembers; i++){
                if(element.firstName == aMember.firstName && element.lastName == aMember.lastName)
                    groupMembers[i].slot = memberSlot;
            } 
       }

       for(var i=0; i<allGroupMembers.length; i++){
            if(allGroupMembers[i].firstName == member.value.split(' ')[0] && allGroupMembers[i].lastName == member.value.split(' ')[1]){
                SetSlot(allGroupMembers[i], member.key);
            }
       }
    }

    SubmitNewSlots = () => {
        const theSlots = [];
 
        for(var i=0; i<groupMembers.length; i++){
            var acustomer = {};
            acustomer.customerId = groupMembers[i]['customerId'];
            acustomer.slot = groupMembers[i]['slot'];
            theSlots.push(acustomer);
        }
        
        const data = {
            groupId: this.props.groupDetails.response.id,
            slots: theSlots
        }
        console.log(theSlots);
        return;
        this.props.dispatch(actions.EditSlot(this.state.user.token, data));
    }

    handleSubmit = () => {
        event.preventDefault();
        return;
        this.SubmitNewSlots();
    }

    render(){
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
                                        <NavLink to="/savings/goal/group-savings-selection">
                                            <li><a className="active">Group Savings</a></li>
                                        </NavLink>
                                            <li><a href="#">Investments</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {this.props.alert && this.props.alert.message &&
                            <div style={{width: "100%"}} className={`info-label ${this.props.alert.type}`}>{this.props.alert.message}</div>
                            }
                            <div className="col-sm-12">
                                <div className="row">
                                    <div className="col-sm-12">
                                      <div className="max-600">
                                       <div className="al-card no-pad">
                                       <h4 className="m-b-10 center-text hd-underline">Members Slot</h4>

                                            <form onSubmit={this.handleSubmit}>
                                                
                                                <div className="form-group">
                                                    <div className='form-row'>

                                                        <SlotSelection 
                                                           groupMembers={theMembers}
                                                           handleSelectChange={this.handleSelectChange()}
                                                           value={}
                                                        />
                                            
                                                    </div>
                                                </div>
                        
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <center>
                                                            {/* <NavLink to='/savings/group/group-created'> */}
                                                                  <button type="submit" >
                                                                     Update
                                                                   </button>
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
        groupDetails: state.rotatingGroupDetails.data
    }
}

export default connect(mapStateToProps)(MemberSlots);