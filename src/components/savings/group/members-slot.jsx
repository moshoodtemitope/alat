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
class MemberSlots extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    componentDidMount = () => {
        const members = this.props.groupDetails.response.members; // an array

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

       //default slot that came from server!
       for(var i=0; i<members.length; i++){
            var acustomer = {};
            acustomer.customerId = members[i]['customerId'];
            acustomer.slot = members[i]['slot'];
            slot.push(acustomer);
       }
    }

    handleSelectChange = (member) => {
       const groupMembers = this.props.groupDetails.response.members;
       slot.map((element, index) => {
          // if(element.)
       });
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