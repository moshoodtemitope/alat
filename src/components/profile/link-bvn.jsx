import React, { Component } from 'react';
import "./profile.css";
import DatePicker from "react-datepicker";
import * as actions from '../../redux/actions/profile/profile-action';

class LinkBvN extends Component {
   constructor(props){
       super(props);
       this.state = {
        BVNValidity: false,
        dateValidity: false,
        bvnNumber: null,
        dateValue: null
       }
   }

   checkValidity = () => {
       let result = 'valid';
       for(let x in this.state){
            switch(x){
                case 'bvnNumber':
                        if(this.state[x] == null || this.state[x] == ""){
                            console.log(x)
                            result = null;
                            break;
                        }
                case 'dateValue':
                        if(this.state[x] == null || this.state[x] == ""){
                            console.log(x)
                            result = null;
                            break;
                        }
            }
        }

       console.log(result);
       return result;
   }

   InitiateNetworkCall = () => {
       let data = {
           bvn: this.state.bvnNumber,
           date: this.state.dateValue
       }

       this.props.dispatch(actions.linkBVN(this.state.user.token, data));
   }

   HandleSubmit = () => {
       event.preventDefault();

       switch(this.checkValidity()){
           case null:
             console.log('Empty value was found');
             break;
           case 'valid': 
             console.log("No Empty Value Found");
             this.InitiateNetworkCall();
             break;
       }
   }



   render(){
       return(
           <Fragment>
                <div>
                    <div className="col-sm-12">
                        <p className="page-title">Account Setting</p>
                    </div>

                    <div className="col-sm-12">
                        <div>
                            <div className="sub-tab-nav" style={{marginBottom: 10}}>
                                <ul>
                                    <li><NavLink to={'/lifestyle/movie'}>Profile</NavLink></li>
                                    <li><NavLink to={'/lifestyle/event'}>Pin Management</NavLink></li>
                                    <li><NavLink to={'/lifestyle/preference'}>Security Questions</NavLink></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* {this.renderEvent(userEvent)} */}

                    <div>
                        <form onSubmit={this.HandleSubmit}>
                            <div className="form-row">
                                        <div className={BVNValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                            <label className="label-text">Amount to contribute per person (optional)</label>
                                            <input type="Number" className="form-control" onChange={this.SetAmountToContributeIndividually} placeholder="E.g. ₦100,000"/>
                                        </div>
                            </div>
                            
                            <div className="form-row">
                                    <div className={dateValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                            <label className="label-text">when does the group want to meet this goal</label>
                                            <DatePicker className="form-control" selected={targetDate} 
                                            placeholder="June 31, 2019"
                                            dateFormat=" MMMM d, yyyy"
                                            showMonthDropdown
                                            showYearDropdown
                                            onChange={this.SetStartDate}
                                            dropdownMode="select"
                                            // minDate={new Date()}
                                            />
                                            
                                    </div>
                            </div>
                            <div className="form-row">
                                    <center>
                                        <button type="submit">Next</button>
                                        <button type="submit">Back</button>
                                    </center>
                            </div>
                        </form>
                    </div>
       
                </div>
            </Fragment>
       )
   }
}

export default LinkBvN;