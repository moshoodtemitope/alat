import React, { Component } from 'react';
import "./profile.css";
import DatePicker from "react-datepicker";
import * as actions from '../../redux/actions/profile/profile-action';
import {Fragment} from "react";
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import InnerContainer from '../../shared/templates/inner-container';
import {history} from '../../_helpers/history';


class PersonalInfoMation extends Component {
   constructor(props){
       super(props);
       this.state = {
        BVNValidity: false,
        dateValidity: false,
        bvnNumber: null,
        dateValue: null,
        birthDate: null
       }
   }

   SetBVNValidityStatus = () => {
      console.log();
      if(this.state.bvnNumber == null || this.state.bvnNumber  == "" || this.state.bvnNumber.toString().length < 11){
          this.setState({BVNValidity: true});
      }else{
          this.setState({BVNValidity: false});
      }
   }
   
   SetDateValidity = () => {
       if(this.state.birthDate == null || this.state.birthDate == ""){
           this.setState({dateValidity: true});
       }else{
           this.setState({dateValidity: false});
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
                case 'birthDate':
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

   SetBvNNumber = (event) => {
       this.setState({bvnNumber: event.target.value});
   }

   SetBirthDay = (birthDate) => {
        this.setState({
            birthDate: birthDate
        });
   }

   NavigateToSuccessPage = () => {
       history.push('/profile-success-message');
   }

   HandleSubmit = () => {
       event.preventDefault();
       this.SetDateValidity();
       this.SetBVNValidityStatus();
       //Navigate (Test Cenaro)
    //    this.NavigateToSuccessPage();
       console.log('was fired');

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

   NavigateToSuccessPage = () => {
    history.push('/profile-success-message');
   }

   render(){
       const {dateValidity, BVNValidity, birthDate} = this.state;
       return(
        <Fragment>
             <InnerContainer>
                    <div className="dashboard-wrapper">
                         <div className="container">
                                <div className="coverPropertiesofComponent">
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
                                
                                <div className="row packageContent">
                                    <div className="col-sm-4">
                                        <div className="forProfilePicture">
                                                <div className="profilePixCircle">

                                                </div>
                                                <p className="personsName">Laketu Adeleke</p>
                                                <p className="details">subrigana@gmail.com</p>
                                                <p className="details">Last Login: 8th January 2019, 11:00am</p>
                                                <hr />

                                                <div className="tickItems">
                                                    <img src="" alt="" />
                                                    <p>Link BVN</p>
                                                </div>
                                                <div className="tickItems">
                                                    <img src="" alt="" />
                                                    <p>Personal Information</p>
                                                </div>
                                                <div className="tickItems">
                                                    <img src="" alt="" />
                                                    <p>Contact Details</p>
                                                </div>
                                                <div className="tickItems">
                                                    <img src="" alt="" />
                                                    <p>Document Upload</p>
                                                </div>
                                                <div className="tickItems">
                                                    <img src="" alt="" />
                                                    <p>Next of Kin</p>
                                                </div>
                                        </div>
                                        
                                    </div>
                                    <div className="col-sm-7">
                                    <form onSubmit={this.HandleSubmit} className="parentForm">
                                            <p className="formHeading">Personal Information</p>
                                            <div className="form-row">
                                                        <div className={BVNValidity ? "form-group form-error col-md-10" : "form-group col-md-10"}>
                                                            <label className="label-text">BVN</label>
                                                            <input type="Number" className="form-control" onChange={this.SetBvNNumber} placeholder="0000 0000 0000"/>
                                                        </div>
                                            </div>

                                            <div className="form-row">
                                                        <div className={BVNValidity ? "form-group form-error col-md-10" : "form-group col-md-10"}>
                                                            <label className="label-text">Surname Name</label>
                                                            <input type="text" className="form-control" onChange={this.SetLastName} placeholder="Surname"/>
                                                        </div>
                                            </div>

                                            <div className="form-row">
                                                        <div className={BVNValidity ? "form-group form-error col-md-10" : "form-group col-md-10"}>
                                                            <label className="label-text">First Name</label>
                                                            <input type="text" className="form-control" onChange={this.SetFirstName} placeholder="First Name"/>
                                                        </div>
                                            </div>
                                            

                                            <div className="form-row">
                                                        <div className={BVNValidity ? "form-group form-error col-md-10" : "form-group col-md-10"}>
                                                            <label className="label-text">Other Name</label>
                                                            <input type="text" className="form-control" onChange={this.SetOtherName} placeholder="Other Name"/>
                                                        </div>
                                            </div>

                                            <div className="form-row">
                                                        <div className={BVNValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                            <label className="label-text">Gender</label>
                                                            <select>
                                                                <option value="Male"> Male </option>
                                                                <option value="Female"> Female</option>
                                                            </select>
                                                        </div>

                                                        <div className={BVNValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                                <label className="label-text">Date of Birth</label>
                                                                <DatePicker className="form-control" selected={birthDate} 
                                                                placeholder="June 31, 2019"
                                                                dateFormat=" MMMM d, yyyy"
                                                                showMonthDropdown
                                                                showYearDropdown
                                                                onChange={this.SetBirthDay}
                                                                dropdownMode="select"
                                                                // minDate={new Date()}
                                                                />
                                                        </div> 
                                            </div>

                                            <div className="form-row">
                                                        <div className={BVNValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                            <label className="label-text">Nationality</label>
                                                            <input type="text" className="form-control" onChange={this.SetOtherName} placeholder="Nationality"/>
                                                        </div>

                                                        <div className={BVNValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                            <label className="label-text">State of Origin</label>
                                                            <input type="text" className="form-control" onChange={this.SetOtherName} placeholder="state of origin"/>
                                                        </div>
                                            </div>

                                            <div className="form-row">
                                                        <div className={BVNValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                            <label className="label-text">Local Government</label>
                                                            <input type="text" className="form-control" onChange={this.SetOtherName} placeholder="Local Government"/>
                                                        </div>

                                                        <div className={BVNValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                            <label className="label-text">Place of Birth (State of Origin)</label>
                                                            <input type="text" className="form-control" onChange={this.SetOtherName} placeholder="Place of Birth"/>
                                                        </div>
                                            </div>

                                            <div className="form-row">
                                                        <div className={BVNValidity ? "form-group form-error col-md-10" : "form-group col-md-10"}>
                                                            <label className="label-text">Mothers Maiden Name</label>
                                                            <input type="Number" className="form-control" onChange={this.SetFirstName} placeholder="First Name"/>
                                                        </div>
                                            </div>

                                            <div className="form-row">
                                                        <div className={BVNValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                            <label className="label-text">BVN</label>
                                                            <input type="Number" className="form-control" onChange={this.SetOtherName} placeholder="BVN" />
                                                        </div>

                                                        <div className={BVNValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                            <label className="label-text">Employment Status</label>
                                                            <select>
                                                                <option value="Male"> Employed </option>
                                                                <option value="Female"> UnEmployed </option>
                                                            </select>
                                                        </div>
                                            </div>

                                            <div className="form-row">
                                                        <div className={BVNValidity ? "form-group form-error col-md-10" : "form-group col-md-10"}>
                                                            <label className="label-text">Employer's Name</label>
                                                            <input type="text" className="form-control" onChange={this.SetFirstName} placeholder="Employers Name"/>
                                                        </div>
                                            </div>

                                            <div className="form-row">
                                                        <div className={BVNValidity ? "form-group form-error col-md-10" : "form-group col-md-10"}>
                                                            <label className="label-text">Employer's Address</label>
                                                            <input type="text" className="form-control" onChange={this.SetFirstName} placeholder="Employers Address"/>
                                                        </div>
                                            </div>

                                            <div className="form-row">
                                                        <div className={BVNValidity ? "form-group form-error col-md-10" : "form-group col-md-10"}>
                                                            <label className="label-text">Employer's Phone Number</label>
                                                            <input type="number" className="form-control" onChange={this.SetFirstName} placeholder="Employers Phone Number"/>
                                                        </div>
                                            </div>

                                            <div className="form-row">
                                                        <div className={BVNValidity ? "form-group form-error col-md-10" : "form-group col-md-10"}>
                                                            <label className="label-text">Sector</label>
                                                            <input type="text" className="form-control" onChange={this.SetFirstName} placeholder="Sector"/>
                                                        </div>
                                            </div>

                                            <div className="form-row">
                                                        <div className={BVNValidity ? "form-group form-error col-md-10" : "form-group col-md-10"}>
                                                            <label className="label-text">Occupation</label>
                                                            <input type="text" className="form-control" onChange={this.SetFirstName} placeholder="Occupation"/>
                                                        </div>
                                            </div>

                                            <div className="form-row">
                                                        <div className={BVNValidity ? "form-group form-error col-md-10" : "form-group col-md-10"}>
                                                            <label className="label-text">Alat Pin</label>
                                                            <input type="text" className="form-control" onChange={this.SetFirstName} placeholder="Alat Pin"/>
                                                        </div>
                                            </div>

                                           
                                            <div className="form-row">
                                                    {/* <div className="form-group forTwoButtons"> */}
                                                      <center>
                                                             <button type="submit" className="twoBut">Submit</button>
                                                      </center>
                                                           
                                                    {/* </div> */}
                                            </div>
                                        </form>
                                    
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                 </InnerContainer>
        </Fragment>
            
       )
   }
}

export default PersonalInfoMation;