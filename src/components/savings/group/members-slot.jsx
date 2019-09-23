import * as React from "react";
import {Fragment} from "react";
import InnerContainer from '../../../shared/templates/inner-container';
import SavingsContainer from './../container';
import {NavLink, Route, Redirect} from "react-router-dom";
import {Switch} from "react-router";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import {history} from '../../../_helpers/history';
import { GROUPSAVINGSCONSTANT } from '../../../redux/constants/savings/group';
import * as actions from '../../../redux/actions/savings/group-savings/rotating-group-saving-action';


var theMembers = [];
var element = {};
var arraysOfSlot = [];
var membersAccordingToSlot = []; // accending order
var slot = [];
var groupMembers;
var selectCounter = 0;


class MemberSlots extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            members: [
                {value: 'Mike Pence', label: 'Mike Pence'},
                {value: 'Donald Trump', label: 'Donald Trump'}
            ],
            aMember1: '',
            aMember2: '',
            aMember3: '',
            aMember4: '',
            aMember5: '',
            aMember6: '',
            aMember7: '',
            aMember8: '',
            aMember9: '',
            aMember10: '',
            aMember11: '',
            aMember12: '',
            counter: 10,
            sortedMembers: '',
            renderCalled: false
        }

        this.GenerateOptions = this.GenerateOptions.bind(this);
    }

    componentDidMount = () => {
        if(this.props.groupDetails != undefined){
                let storageL = window.localStorage;
                    storageL.setItem('rotatingGroupId', this.props.groupDetails.response.id);
                         
                const members = this.props.groupDetails.response.members; // an array
                for(var i=0; i<members.length; i++){
                    arraysOfSlot.push(members[i]['slot']);
                }

                arraysOfSlot.sort((a, b) => {
                    return a - b;
                });
        
                const setMember = (aMember) => {
                    for(var i=0; i<members.length; i++){
                        if(aMember == members[i]['slot'])
                                membersAccordingToSlot.push(members[i]);
                                groupMembers = membersAccordingToSlot;
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
        
                this.setState({'sortedMembers': groupMembers}, () => {
                    console.log(this.state.sortedMembers);
                });
                this.setState({'renderCalled': true});
                setOptions(membersAccordingToSlot);
                console.log(members);
                this.setState({'members': theMembers})
                this.MembersInitialValues();
                console.log('Rotating Group Returned Undefined 99999999999')
            //     break;
            // case undefined: 
            //     console.log('Rotating Group Returned Undefined ')
            //     this.FetchRotatingGroupDetails();
        }

        if(this.props.groupDetails == undefined){

        }
    }

    FetchRotatingGroupDetails = () => {
        let storage = window.localStorage;
        let data = {
            groupId: JSON.parse(storage.getItem('rotatingGroupId'))
        }
        console.log('DEW SOME ONE IS GOING TO REALLY LIKE THIS')
        this.props.dispatch(actions.rotatingGroupDetails(this.state.user.token, data));
    }


    MembersInitialValues = () => {
        let container = [];
        let objectState = this.state;
        for(let u in objectState){
            if(typeof objectState[u] == 'string'){
                if(u.search('aMember') != -1){
                    let obj = {}
                    obj[u] = this.state[u];
                    container.push(obj);
                    obj = {};
                }
            }
        }
        
        let UseMembers = (aPerticularMember, positionInArray) => {
                let index = 0; 
                for(let count=0; count<container.length; count++){
                     if(positionInArray == index){
                        let superfix = index + 1;
                        container[count]['aMember' + superfix] = aPerticularMember.firstName + " " + aPerticularMember.lastName;
                     }
                     index++;
                }
        }

        let index = 0;
        for(let count = 0; count < groupMembers.length; count++){
            UseMembers(groupMembers[count], index)
            index++;
            if(count == groupMembers.length - 1){
                this.UpdateInitialStateValues(container);
            }
        }
    }

    UpdateInitialStateValuesContinued = (element) => {
        for(let u in element)
            this.setState({[u]: element[u]}, () =>{
                console.log(this.state);
            });
        
        let state = this.state;
    }

    UpdateInitialStateValues = (container) => {
            for(let count=0; count<container.length; count++){
                this.UpdateInitialStateValuesContinued(container[count]);
            }
    }

    ReturnComponentState = () => {
        return this.state;
    }

    handleSelectChange = (event) => {
       let memberSlot = event.target.id;
       let memberName = event.target.value;
       let parent = this.state.sortedMembers;
       
       for(let count=0; count<parent.length; count++){
             if(parent[count].firstName == memberName.split(' ')[0] && parent[count].lastName == memberName.split(' ')[1])
                    parent[count].slot = memberSlot;
       }

       this.setState({"sortedMembers": parent});
    }

    GenerateOptions = () => {
          if(this.state.renderCalled != true)
              return <option>empty</option>;
          let optionsElm = (aMember) => {
                console.log(aMember)
                let members = this.state.sortedMembers.map((element, index) => {
                     if(element.firstName == aMember.firstName && element.lastName == aMember.lastName)
                           return <option value={element.firstName + ' ' + element.lastName} selected='selected'>
                                         {element.firstName + ' ' + element.lastName}</option>;

                     return <option value={element.firstName + ' ' + element.lastName}>
                                          {element.firstName + ' ' + element.lastName}</option>
                });

                return members;
          }

          let slots = this.state.sortedMembers.map((element, index) => {
                return <select name="" className="membersSlots" id={element.slot} onChange={this.handleSelectChange}>
                            {optionsElm(element)}
                       </select>
          });

          return slots;
    }

    SubmitNewSlots = () => {
        let theSlots = [];
        let members = this.state.sortedMembers;
    
        for(var i=0; i<members.length; i++){
            let acustomer = {};
            acustomer.customerId = members[i]['customerId'];
            acustomer.slot = members[i]['slot'];
            theSlots.push(acustomer);
        }

        let data = {
            groupId: this.props.groupDetails.response.id,
            slots: theSlots
        }

        console.log(theSlots);
        return;
        // this.props.dispatch(actions.EditSlot(this.state.user.token, data));
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.SubmitNewSlots();
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

    render(){
        if(this.props.rotatingGroupDetails.message === GROUPSAVINGSCONSTANT.ROTATING_GROUP_DETAILS){
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
                                            {/* <NavLink to="/savings/goal/group-savings-selection"> */}
                                                <li onClick={this.NavigateToGroupSavings}><a className="active">Group Savings</a></li>
                                            {/* </NavLink> */}
                                                <li><a href="#">Investments</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                               <p>Loading Data, wait for it...</p>
                            </div>
                        </SavingsContainer>
                    </InnerContainer>
                </Fragment>
            );
        }
        if(this.props.rotatingGroupDetails.message === GROUPSAVINGSCONSTANT.ROTATING_GROUP_DETAILS_SUCCESS){
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
                                            {/* <NavLink to="/savings/goal/group-savings-selection"> */}
                                                <li onClick={this.NavigateToGroupSavings}><a className="active">Group Savings</a></li>
                                            {/* </NavLink> */}
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
                                                            {this.GenerateOptions(groupMembers)}
                                                        </div>
                                                    </div>
                            
                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                            <center>
                                                                {/* <NavLink to='/savings/group/group-created'> */}
                                                                      <button type="submit" id="upDateButton">
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
        if(this.props.rotatingGroupDetails.message === GROUPSAVINGSCONSTANT.ROTATING_GROUP_DETAILS_ERROR){
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
                                            {/* <NavLink to="/savings/goal/group-savings-selection"> */}
                                                <li onClick={this.NavigateToGroupSavings}><a className="active">Group Savings</a></li>
                                            {/* </NavLink> */}
                                                <li><a href="#">Investments</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                               <p>Please Check Your Internet Connection ...</p>
                            </div>
                        </SavingsContainer>
                    </InnerContainer>
                </Fragment>
            );
        }
        if(this.props.rotatingGroupDetails.data == undefined){
            this.FetchRotatingGroupDetails();
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
                                            {/* <NavLink to="/savings/goal/group-savings-selection"> */}
                                                <li onClick={this.NavigateToGroupSavings}><a className="active">Group Savings</a></li>
                                            {/* </NavLink> */}
                                                <li><a href="#">Investments</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                               <p>Loading Data ...</p>
                            </div>
                        </SavingsContainer>
                    </InnerContainer>
                </Fragment>
            );
        }
        if(this.props.rotatingGroupDetails.data != undefined){
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
                                            {/* <NavLink to="/savings/goal/group-savings-selection"> */}
                                                <li onClick={this.NavigateToGroupSavings}><a className="active">Group Savings</a></li>
                                            {/* </NavLink> */}
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
                                                            {this.GenerateOptions(groupMembers)}
                                                        </div>
                                                    </div>
                            
                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                            <center>
                                                                {/* <NavLink to='/savings/group/group-created'> */}
                                                                      <button type="submit" id="upDateButton">
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
}

function mapStateToProps(state){
    return {
        groupDetails: state.rotatingGroupDetails.data,
        groupSavingsEsusu: state.getGroupSavingsEsusu.data,
        groups: state.customerGroup.data,
        rotatingGroupDetails: state.rotatingGroupDetails
    }
}

export default connect(mapStateToProps)(MemberSlots);