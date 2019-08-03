import * as React from "react";
import {Fragment} from "react";
import InnerContainer from '../../../shared/templates/inner-container';
import SavingsContainer from './../container';
import {NavLink, Route, Redirect} from "react-router-dom";
import {Switch} from "react-router";
import "react-datepicker/dist/react-datepicker.css";
import SubHead from './sub-head';
import ProgressBar from './progress-bar';
import Buttons from './button';
import { NavButtons } from './component';
import MoreDetails from './details';
import Members from './list-item';

class GroupAnalyticsMini2 extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            type: 2,
            navType: 2,
            buttonType: "bigButton",
            discTopSpan: 'something'
        }
        
        this.HandleNavigation = this.HandleNavigation.bind(this);
        this.Automated = this.Automated.bind(this);
    }

    HandleNavigation = () => {
        
    }

    Automated = () => {

    }

    render() {
        const {endDate,endDateInvalid} = this.state;

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
                                            <li><a href="accounts.html">Goals</a></li>
                                            <li><a className="active">Group Savings</a></li>
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
                                   
                                             <div class='firstSubHead'>
                                                  <p>ROTATING SAVING GROUP</p>
                                                  <p>Summer Trip To Africa</p>
                                                  
                                             </div>
                                                <SubHead 
                                                type={this.state.type}
                                                rightname="Group Summary"
                                                middlename="Members"
                                                leftName="Automate Contributions"
                                                memberClicked={this.HandleNavigation}
                                                automatedwasclicked={this.Automated}
                                                />
                                           
                                             <div className='statContainer'>
                                             <Members 
                                                   userType="admin"
                                                   name="Hasan Danfodio"
                                                   position="admin"
                                                   amount="N10, 000"
                                                   intent="Contribution"/>

                                               <Members 
                                                   userType="members"
                                                   fullname="Stan Lee"
                                    
                                                   amount="N10, 000"
                                                   intent="Contribution"/>

                                                <Members 
                                                   userType="members"
                                                   fullname="Christopher Columbus"
                                    
                                                   amount="N10, 000"
                                                   intent="Contribution"/>
                                                <Members 
                                                   userType="members"
                                                   fullname="Odelade Hammed"
                                    
                                                   amount="N10, 000"
                                                   intent="Contribution"/>
                                             </div>
                                             
                                             
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


export default GroupAnalyticsMini2;









