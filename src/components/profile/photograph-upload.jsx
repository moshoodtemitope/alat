import React, { Component } from 'react';
import "./profile.css"; 
import DatePicker from "react-datepicker";
// import * as actions from '../../redux/actions/profile/profile-action';
import {Fragment} from "react";
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import InnerContainer from '../../shared/templates/inner-container';
import * as actions from '../../redux/actions/profile/profile-action';


class PhotographUpload extends Component {
   constructor(props){
       super(props);
       this.state = {
          user: JSON.parse(localStorage.getItem("user")),
          file1: null,
          file2: null,
          file3: null,

          idCardType: null,
          idCardNumber: null,

          idCardNumberValidity: false,
          idTypeValidity: false, 
          idFrontFace: false, 
          idPhotographValid: false
       }
   }


   checkidFrontFace = () => {
        if(this.state.file2 == null || this.state.file2 == ""){
            this.setState({idFrontFace: true});
        }else{
            this.setState({idFrontFace: false});
        }
   }
   

   checkValidity = () => {
       let result = 'valid';
       for(let x in this.state){
           switch(x){
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

   HandleSelectedCardType = (event) => {
       this.setState({idCardType: event.target.value});
   }

   HandleFileUpLoad = (event) => {
       let name = event.target.name;
       console.log(name);
       console.log(event.target.files[0]);
    //    return;
       this.setState({[name]: event.target.files[0]});
   }

   SubmitDocuments = () => {
       let payload = {
           DocumentType: "Passport",
           File: this.state.file3
       }
       
       console.log(payload);
       return;
       this.props.dispatch(addDocuments(payload(this.state.user.token, payload)));
   }


   HandleSubmit = (event) => {
        event.preventDefault();

        
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

   GetIdCardInputs = (event) => {
       this.setState({idCardNumber: event.target.value});
   }

   render(){
      const {idTypeValidity, idFrontFace, idPhotographValid, idCardNumberValidity} = this.state;
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
                                                    <li><NavLink to={'/default-page'}>Pin Management</NavLink></li>
                                                    <li><NavLink to={'/default-page'}>Security Questions</NavLink></li>
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
                                           <p className="formHeading">Passport Upload</p>
                                           <div className="form-row">
                                                <div className={idPhotographValid ? "form-group form-error col-md-10" : "form-group col-md-10"}>
                                                    <p className="upLoadDiscription">take a picture of your face in a well lit place with your ears clearly visible</p>
                                                    <div className="signatureUploadTemp">
                                                            <label htmlFor="file-upload3" className="resizeLabel">Upload</label>
                                                            <input name="file3" type="file" id="file-upload3"  onChange={this.HandleFileUpLoad}/>
                                                    </div>
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

export default PhotographUpload;