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

class GroupAnalyticsMini extends React.Component {
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
                                                <ProgressBar 
                                                    discTopSpan="Group Progress"
                                                    discTopRight="40% completion"
                                                    percentage="40"
                                                    discBottom="N20,0000 of "
                                                    discSpan="N2,000,000"
                                                    discBottomSib="Pot Total"
                                                    />        
                                                    <p id="firstPoint">Payment</p>
                                                    <p id='secondPoint'>Francis Key</p>
                                                    <p id='thirdPoint'>Up Next</p>
                                                
                                                    <Buttons
                                                        buttonType={this.state.buttonType}
                                                        buttonName="Start"
                                                        
                                                        />  
                                                    
                                                    <div className='miniNav'>
                                                        <div className='left'>
                                                            <p>Edit</p>
                                                        </div>
                                                        <div className='right'>
                                                            <p>Delete</p>
                                                        </div>
                                                </div>        
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


export default GroupAnalyticsMini;








