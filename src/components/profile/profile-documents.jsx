import React, { Component } from 'react';
import "./profile.css"; 
import DatePicker from "react-datepicker";
// import * as actions from '../../redux/actions/profile/profile-action';
import {Fragment} from "react";
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import InnerContainer from '../../shared/templates/inner-container';
import * as actions from '../../redux/actions/profile/profile-action';


class ProfileDocuments extends Component {
   constructor(props){
       super(props);
       this.state = {
          user: JSON.parse(localStorage.getItem("user")),
          file1: null,
          file2: null,
          file3: null,

          photoGraphUploadValidity: false, 
          signatureValidity: false, 
          idCardValidity: false
       }
   }


   checkPhotoGraphUploadValidity = () => {
       if(this.state.file1 == null || this.state.file1 == ""){
           this.setState({photoGraphUploadValidity: true});
       }else{
           this.setState({photoGraphUploadValidity: false});
       }
   }

   checkSignatureValidity = () => {
        if(this.state.file2 == null || this.state.file2 == ""){
            this.setState({signatureValidity: true});
        }else{
            this.setState({signatureValidity: false});
        }
   }
   
   checkIdCardValidity = () => {
        if(this.state.file3 == null || this.state.file3 == ""){
            this.setState({idCardValidity: true});
            console.log('CODE NEVER RAN2')
        }else{
            console.log('CODE NEVER RAN1')
            this.setState({idCardValidity: false});
        }

        console.log('CODE NEVER RAN')
   }


   checkValidity = () => {
       let result = 'valid';
       for(let x in this.state){
           switch(x){
               case 'file1':
                    if(this.state[x] == null || this.state[x] == ""){
                        console.log(this.state[x]);
                        result = null;
                        break;
                    }
               case 'file2':
                    if(this.state[x] == null || this.state[x] == ""){
                        console.log(this.state[x]);
                        result = null;
                        break;
                    }
               case 'file3':
                    if(this.state[x] == null || this.state[x] == ""){
                        console.log(this.state[x]);
                        result = null;
                        break;
                    }
           }
       }

       console.log(result);
       return result;
   }

   HandleFileUpLoad = (event) => {
       let name = event.target.name;
       console.log(name);
       console.log(event.target.value);
    //    return;
       this.setState({[name]: event.target.value});
   }

   SubmitDocuments = () => {
       let payload = {
          file1: this.state.file1,
          file2: this.state.file2,
          file2: this.state.file3
       }

       this.props.dispatch(addDocuments(payload(this.state.user.token, payload)));
   }


   HandleSubmit = (event) => {
        event.preventDefault();

        this.checkIdCardValidity();
        this.checkSignatureValidity(); 
        this.checkPhotoGraphUploadValidity();
        console.log("code Got here");

        switch(this.checkValidity()){
            case null: 
                console.log('Empty Field Found');
                break;
            case 'valid': 
                console.log('No Empty Field Found');
                this.SubmitDocuments();
        }
   }


   render(){
      const {photoGraphUploadValidity, signatureValidity, idCardValidity} = this.state;
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
                                    <form onSubmit={this.HandleSubmit} className="parentForm docUpLoadFormProfile">
                                           <p className="formHeading">Documents</p>
                                           <div className="form-row">
                                                <div className={photoGraphUploadValidity ? "form-group form-error col-md-10" : "form-group col-md-10"}>
                                                        <label htmlFor="file-upload1">Photograph</label>
                                                        <input type="file" name="file1" id="file-upload1" onChange={this.HandleFileUpLoad}/>
                                                </div>
                                           </div>

                                           <div className="form-row">
                                                <div className={signatureValidity ? "form-group form-error col-md-10" : "form-group col-md-10"}>
                                                            <label htmlFor="file-upload2">Signature</label>
                                                            <input name="file2" type="file" id="file-upload2"  onChange={this.HandleFileUpLoad}/>
                                                </div>
                                           </div>

                                           <div className="form-row">
                                                <div className={idCardValidity ? "form-group form-error col-md-10" : "form-group col-md-10"}>
                                                            <label htmlFor="file-upload3">Identity Card</label>
                                                            <input name="file3" type="file" id="file-upload3"  onChange={this.HandleFileUpLoad}/>
                                                </div>
                                           </div>
                                           
                                           <button type="submit" className="twoBut">Submit</button>
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

export default ProfileDocuments;