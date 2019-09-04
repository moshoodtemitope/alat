import React, { Component } from 'react';
import "./profile.css";
import DatePicker from "react-datepicker";
import * as actions from '../../redux/actions/profile/profile-action';
import {Fragment} from "react";
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import InnerContainer from '../../shared/templates/inner-container';
import {history} from '../../_helpers/history';
import { connect } from 'react-redux';
import {profile} from '../../redux/constants/profile/profile-constants';
import moment from 'moment'

class LinkBvN extends Component {
   constructor(props){
       super(props);
       this.state = {
        user: JSON.parse(localStorage.getItem("user")),
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
                        }else{
                            if(this.state[x].toString().length < 11){
                                console.log(this.state[x]);
                                result = null;
                                break;
                            }
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
           channelId: 2,
           dob: moment(this.state.birthDate).format("MMMM,DD,YYYY"),
           phoneNo: this.state.user.phoneNo,
           isOnBoarding: false
       }

       console.log(data)
    //    return;
       this.props.dispatch(actions.linkBVN(this.state.user.token, data));
   }

   SetBvNNumber = (event) => {
       this.setState({bvnNumber: event.target.value});
   }

   SetBirthDay = (birthDate) => {
       console.log(birthDate + " " + "ududududu");
        this.setState({
            birthDate: birthDate
        }, () => {
            console.log(this.state.birthDate);
        });

        console.log("fififififif");
   }

   HandleSubmit = () => {
       event.preventDefault();
       this.SetDateValidity();
       this.SetBVNValidityStatus();

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

   DispatchSuccessMessage = (data) => {
        this.props.dispatch(actions.profileSuccessMessage(data));
   }
  
   NavigateToSuccessPage = () => {
        this.DispatchSuccessMessage("BVN Linked Successfully!");
   }
 
   render(){
       const {dateValidity, BVNValidity, birthDate} = this.state;
    //    if(this.props.linkBvn == "LINK_BVN_SUCCESS"){
    //          this.NavigateToSuccessPage();
    //    }
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
                                                    <li><NavLink to={'/default-page'} className="active">Profile</NavLink></li>
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
                                    <div className="col-sm-6">
                                    <form onSubmit={this.HandleSubmit} className="parentForm">
                                            <p className="formHeading">Link BVN</p>
                                            <div className="form-row">
                                                        <div className={BVNValidity ? "form-group form-error col-md-10" : "form-group col-md-10"}>
                                                            <label className="label-text">BVN</label>
                                                            <input type="Number" className="form-control linkBVN" onChange={this.SetBvNNumber} placeholder="0000 0000 0000"/>
                                                        </div>
                                            </div>
                                            
                                            <div className="form-row">
                                                    <div className={dateValidity ? "form-group form-error col-md-10" : "form-group col-md-10"}>
                                                            <label className="label-text">Date of Birth</label>
                                                            <DatePicker className="form-control linkBVN" selected={birthDate} 
                                                            placeholder="June 31, 2019"
                                                            dateFormat="MMMM d, yyyy"
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            onChange={this.SetBirthDay}
                                                            dropdownMode="select"
                                                            // minDate={new Date()}
                                                            />
                                                            
                                                    </div>
                                            </div>
                                            <div className="form-row">
                                                    <div className="form-group col-md-5">
                                                            <button type="submit" className="twoBut">Back</button>
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                            <button type="submit" className="twoBut1">Submit</button>       
                                                    </div>
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

const mapStateToProps = (state) => {
    return {
        profileSuccessMessage: state.profileSuccessMessage.data,
        linkBvn: state.linkBVN.message
    }
}

export default connect(mapStateToProps)(LinkBvN);