import * as React from "react";
import {Fragment} from "react";
import InnerContainer from '../../shared/templates/inner-container';
import SavingsContainer from './container';
import {NavLink, Route} from "react-router-dom";
import {Switch} from "react-router";
import "react-datepicker/dist/react-datepicker.css";
import Members from './multiple-selection';
import {history} from '../../../_helpers/history';

if(window.performance.navigation.type == 1)
    window.location.replace("http://localhost:8080/");
    
class MembersSlot extends React.Component {
    constructor(props){
        super(props)
        this.state={
            numberOfPersonsInGroup: 7,
            groupMembers: [
                { value: 'Sam Loko' ,label:"Sam" },
                {  value: 'Ebenizer' , label:"Ebenizer" }
            ],
            name: "Jacinth",
            value: "Rob Rosinstein"
        }

        this.GenerateSelectionElements = this.GenerateSelectionElements.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    // GenerateSelectionElements = () => {
    //     const elem = '';
    //     const anArray = [];
    //     for(var i=0; i < numberOfPersonsInGroup.length; i++){
    //         anArray.push(0);
    //     }
        
    //     const count = 0;
    //     return anArray.map(() => {
    //          count++;
    //                 return  <div className='col-sm-12'>
    //                             <label>Slot {count}</label>
    //                             <Select type="text" 
    //                             options={this.state.groupMembers}
    //                             name="timeSaved"
    //                             onChange={this.handleSelectChange}
    //                             value="Select A name"
    //                             />
    //                         </div>
                              
    //     });
    // }

    handleSelectChange = (event) => {
        event.preventDefault();
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
                            <div className="col-sm-12">
                                <div className="row">
                                    <div className="col-sm-12">
                                      <div className="max-600">
                                       <div className="al-card no-pad">
                                       <h4 className="m-b-10 center-text hd-underline">Members Slot</h4>

                                            <form onSubmit={this.handleSubmit}>
                                                <div className="row">
                                                    <Members
                                                    groupMembers={this.state.groupMembers} 
                                                    numberOfPersonsInGroup={this.state.numberOfPersonsInGroup}
                                                    handleSelectChange={this.handleSelectChange}
                                                    value={this.state.value}
                                                    name={this.state.name}
                                                    />
                                                </div>

                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <center>
                                                            <button type="submit" className="btn-alat m-t-10 m-b-20 text-center">Update</button>
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
export default connect(mapStateToProps)(MembersSlot);
