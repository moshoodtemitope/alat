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
import moment from 'moment';


class LinkBvN extends Component {
   constructor(props){
       super(props);
       this.state = {
        user: JSON.parse(localStorage.getItem("user")),
        BVNValidity: false,
        dateValidity: false,
        bvnNumber: null,
        dateValue: null,
        birthDate: null,

        isBvNLinked: false,
        isProfileInformation: false,
        isContactDetails: false,
        isDocument: false,
        navToNextOfKin: false,
        isImageUploaded: false
       }
   }

   componentDidMount = () => {
       this.CheckIfStoreInformationIsSet();
   }

   CheckIfStoreInformationIsSet = () => {
       
    if(this.props.profileMenu.message == profile.GET_PROFILE_MENU_SUCCESS){
     //    console.log(this.props.profileMenu.response.personalInfoComplete);
        this.setState({isProfileInformation: this.props.profileMenu.data.response.personalInfoComplete});
        this.setState({isContactDetails: this.props.profileMenu.data.response.contactDetailsComplete});
        this.setState({isDocument: this.props.profileMenu.data.response.documentUploaded});
        this.setState({navToNextOfKin: this.props.profileMenu.data.response.nextOfKinComplete});
        this.setState({isBvNLinked: this.props.profileMenu.data.response.bvnLinked});
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

   HandleSubmit = (event) => {
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

   NavigateToBVN = () => {
    if(this.props.profileMenu.data.response.bvnLinked == true){
          this.DispatchSuccessMessage('BVN has Been Linked');
          return;
    }

    history.push('/profile/linkBVN');
}

NavigateToPersonalInfo = () => {
     if(this.props.profileMenu.data.response.personalInfoComplete == true){
         this.DispatchSuccessMessage('Personal Information Created');
         return;
     }

     history.push('/profile/profile-personalInfo');
}

NavigateToContact = () => {
     if(this.props.profileMenu.data.response.contactDetailsComplete == true){
             this.DispatchSuccessMessage('Contact Created Successfully');
             return;
     }

     history.push('/profile/profile-contact-detail');
}


NavigateToDocuments = () => {
     if(this.props.profileMenu.data.response.documentUploaded == true){
         this.DispatchSuccessMessage('Document uploaded successfully');
         return;
     }

     history.push('/profile/profile-documents');
}

NavigateToNextOfKin = () => {
     if(this.props.profileMenu.data.response.nextOfKinComplete == true){
         this.DispatchSuccessMessage('Next of kin has been Created');
         return
     }

    history.push('/profile/profile-next-of-kin');
}

DispatchSuccessMessage = (data) => {
    this.props.dispatch(actions.profileSuccessMessage(data));
}

GetUserProfileMenu = () => {
    this.props.dispatch(actions.profileMenu(this.state.user.token));
 }

 
   render(){
       const {isImageUploaded, dateValidity, BVNValidity, birthDate,  isBvNLinked, isProfileInformation, isContactDetails, isDocument, navToNextOfKin} = this.state;
    //    if(this.props.linkBvn == "LINK_BVN_SUCCESS"){
    //          this.NavigateToSuccessPage();
    //    }

            // if(this.props.profileMenu.message === profile.LINK_BVN_SUCCESS){
                return(
                    <Fragment>
                                <div className="">
                                     <div className="container"> 
                                             <div className="coverPropertiesofComponent"> 
                                                <div className="col-sm-12">
                                                    <p className="page-title">Account Setting</p>
                                                </div>
            
                                                <div className="col-sm-12">
                                                    <div>
                                                        <div className="sub-tab-nav" style={{marginBottom: 10}}>
                                                            <ul>
                                                                <li><NavLink to={'/profile'} >Profile</NavLink></li>
                                                                
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                {this.props.alert && this.props.alert.message &&
                                                 <div style={{width: "100%", marginRight:"120px",marginLeft:"120px"}} className={`info-label ${this.props.alert.type}`}>{this.props.alert.message}</div>
                                            }
                                            
                                            <div className="row packageContent">
                                                <div className="col-sm-4">
                                                    <div className="forProfilePicture">
                                                        {isImageUploaded ? <div className="profilePixCircle" style={{backgroundImage: 'url("'+this.props.profileMenu.data.response.imagePath+'")'}}></div>
                                                        : <div className="profilePixCircle"></div> }
                                                            <p className="personsName">{this.props.profileMenu.data.response.fullName}</p>
                                                            <p className="details">{this.props.profileMenu.data.response.username}</p>
                                                            <p className="details">{moment(this.props.profileMenu.data.response.lastLoginDate).format("MMMM Do YYYY, h:mm:ss a")}</p>
                                                            <hr />
            
                                                            <div className="tickItems" onClick={this.NavigateToBVN}>
                                                                {isBvNLinked === true ? <img className="improveImgSize" src="/src/assets/img/Vector.svg" alt="" /> : <img src="/src/assets/img/Vector2.png" alt="" className="largeVectorI"/>}
                                                                <p className="pSubs">Link BVN</p>
                                                            </div>
                                                            <div className="tickItems" onClick={this.NavigateToPersonalInfo}>
                                                                {isProfileInformation ? <img className="improveImgSize" src="/src/assets/img/Vector.svg" alt="" /> : <img src="/src/assets/img/Vector2.png" alt="" className="largeVectorI"/>}
                                                                <p className="pSubs">Personal Information</p>
                                                            </div>
                                                            <div className="tickItems" onClick={this.NavigateToContact}>
                                                                {isContactDetails ? <img className="improveImgSize" src="/src/assets/img/Vector.svg" alt="" /> : <img src="/src/assets/img/Vector2.png" alt="" className="largeVectorI"/>}
                                                                <p className="pSubs">Contact Details</p>
                                                            </div>
                                                            <div className="tickItems" onClick={this.NavigateToDocuments}>
                                                                {isDocument ? <img className="improveImgSize" src="/src/assets/img/Vector.svg" alt="" /> : <img src="/src/assets/img/Vector2.png" alt=""  className="largeVectorI" />}
                                                                <p className="pSubs">Document Upload</p>
                                                            </div>
                                                            <div className="tickItems" onClick={this.NavigateToNextOfKin}>
                                                                {navToNextOfKin ? <img className="improveImgSize" src="/src/assets/img/Vector.svg" alt="" /> : <img src="/src/assets/img/Vector2.png" alt="" className="largeVectorI"/>} 
                                                                <p className="pSubs">Next of Kin</p>
                                                            </div>
                                                    </div>
                                                    
                                                </div>
                                                <div className="col-sm-6">
                                                <form onSubmit={this.HandleSubmit} className="parentForm">
                                                        <p className="formHeading">Link BVN</p>
                                                        <div className="form-row">
                                                                    <div className={BVNValidity ? "form-group form-error col-md-10" : "form-group col-md-10"}>
                                                                        <label className="label-text">BVN</label>
                                                                        <input type="Number" className="form-control linkBVN input-border-radius" onChange={this.SetBvNNumber} placeholder="0000 0000 0000"/>
                                                                    </div>
                                                        </div>
                                                        
                                                        <div className="form-row">
                                                                <div className={dateValidity ? "form-group form-error col-md-10" : "form-group col-md-10"}>
                                                                        <label className="label-text">Date of Birth</label>
                                                                        <DatePicker className="form-control linkBVN input-border-radius" selected={birthDate} 
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
                                                        <div className="button-alignment">
                                                                
                                                            <button type="submit" className="twoBut button-size no-border">Back</button>
                                                    
                                                    
                                                            <button disabled={this.props.linkBvn === profile.LINK_BVN_PENDING} type="submit" className="twoBut no-border">
                                                            {this.props.linkBvn === profile.LINK_BVN_PENDING ? "Processing..." :"Submit"}
                                                    </button>
                                                                
                                                        </div>
                                                    </form>
                                                
                                                </div>
                                            </div>
            
                                            
                                                
                                
                                            </div>
                                        </div>
                                        </div>
            
                     </Fragment>
                   )
              }
}

const mapStateToProps = (state) => {
    return {
        profileMenu:state.profileMenu,
        profileSuccessMessage: state.profileSuccessMessage.data,
        linkBvn: state.linkBVN.message,
        alert:state.alert,
    }
}

export default connect(mapStateToProps)(LinkBvN);




// import React, { Component } from 'react';
// import "./profile.css";
// import DatePicker from "react-datepicker";
// import * as actions from '../../redux/actions/profile/profile-action';
// import {Fragment} from "react";
// import { Link, NavLink, Route, Switch } from 'react-router-dom';
// import InnerContainer from '../../shared/templates/inner-container';
// import {history} from '../../_helpers/history';
// import { connect } from 'react-redux';
// import {profile} from '../../redux/constants/profile/profile-constants';
// import moment from 'moment';


// class LinkBvN extends Component {
//    constructor(props){
//        super(props);
//        this.state = {
//         user: JSON.parse(localStorage.getItem("user")),
//         BVNValidity: false,
//         dateValidity: false,
//         bvnNumber: null,
//         dateValue: null,
//         birthDate: null,

//         isBvNLinked: false,
//         isProfileInformation: false,
//         isContactDetails: false,
//         isDocument: false,
//         navToNextOfKin: false
//        }
//    }

//    componentDidMount = () => {
//        this.CheckIfStoreInformationIsSet();
//    }

//    CheckIfStoreInformationIsSet = () => {
       
//     if(this.props.profileMenu.message == profile.GET_PROFILE_MENU_SUCCESS){
//      //    console.log(this.props.profileMenu.response.personalInfoComplete);
//         this.setState({isProfileInformation: this.props.profileMenu.data.response.personalInfoComplete});
//         this.setState({isContactDetails: this.props.profileMenu.data.response.contactDetailsComplete});
//         this.setState({isDocument: this.props.profileMenu.data.response.documentUploaded});
//         this.setState({navToNextOfKin: this.props.profileMenu.data.response.nextOfKinComplete});
//         this.setState({isBvNLinked: this.props.profileMenu.data.response.bvnLinked});
//     }
//    }

//    SetBVNValidityStatus = () => {
//       console.log();
//       if(this.state.bvnNumber == null || this.state.bvnNumber  == "" || this.state.bvnNumber.toString().length < 11){
//           this.setState({BVNValidity: true});
//       }else{
//           this.setState({BVNValidity: false});
//       }
//    }
   
//    SetDateValidity = () => {
//        if(this.state.birthDate == null || this.state.birthDate == ""){
//            this.setState({dateValidity: true});
//        }else{
//            this.setState({dateValidity: false});
//        }
//    }

//    checkValidity = () => {
//        let result = 'valid';
//        for(let x in this.state){
//             switch(x){
//                 case 'bvnNumber':
//                         if(this.state[x] == null || this.state[x] == ""){
//                             console.log(x)
//                             result = null;
//                             break;
//                         }else{
//                             if(this.state[x].toString().length < 11){
//                                 console.log(this.state[x]);
//                                 result = null;
//                                 break;
//                             }
//                         }
//                 case 'birthDate':
//                         if(this.state[x] == null || this.state[x] == ""){
//                             console.log(x)
//                             result = null;
//                             break;
//                         }
//             }
//         }

//        console.log(result);
//        return result;
//    }

//    InitiateNetworkCall = () => {
//        let data = {
//            bvn: this.state.bvnNumber,
//            channelId: 2,
//            dob: moment(this.state.birthDate).format("MMMM,DD,YYYY"),
//            phoneNo: this.state.user.phoneNo,
//            isOnBoarding: false
//        }

//        console.log(data)
//     //    return;
//        this.props.dispatch(actions.linkBVN(this.state.user.token, data));
//    }

//    SetBvNNumber = (event) => {
//        this.setState({bvnNumber: event.target.value});
//    }

//    SetBirthDay = (birthDate) => {
//        console.log(birthDate + " " + "ududududu");
//         this.setState({
//             birthDate: birthDate
//         }, () => {
//             console.log(this.state.birthDate);
//         });

//         console.log("fififififif");
//    }

//    HandleSubmit = () => {
//        event.preventDefault();
//        this.SetDateValidity();
//        this.SetBVNValidityStatus();

//        console.log('was fired');

//        switch(this.checkValidity()){
//            case null:
//              console.log('Empty value was found');
//              break;
//            case 'valid': 
//              console.log("No Empty Value Found");
//              this.InitiateNetworkCall();
//              break;
//        }
//    }

//    DispatchSuccessMessage = (data) => {
//         this.props.dispatch(actions.profileSuccessMessage(data));
//    }
  
//    NavigateToSuccessPage = () => {
//         this.DispatchSuccessMessage("BVN Linked Successfully!");
//    }

//    NavigateToBVN = () => {
//     if(this.props.profileMenu.data.response.bvnLinked == true){
//           this.DispatchSuccessMessage('BVN has Been Linked');
//           return;
//     }

//     history.push('/profile/linkBVN');
// }

// NavigateToPersonalInfo = () => {
//      if(this.props.profileMenu.data.response.personalInfoComplete == true){
//          this.DispatchSuccessMessage('Personal Information Created');
//          return;
//      }

//      history.push('/profile/profile-personalInfo');
// }

// NavigateToContact = () => {
//      if(this.props.profileMenu.data.response.contactDetailsComplete == true){
//              this.DispatchSuccessMessage('Contact Created Successfully');
//              return;
//      }

//      history.push('/profile/profile-contact-detail');
// }


// NavigateToDocuments = () => {
//      if(this.props.profileMenu.data.response.documentUploaded == true){
//          this.DispatchSuccessMessage('Document uploaded successfully');
//          return;
//      }

//      history.push('/profile/profile-documents');
// }

// NavigateToNextOfKin = () => {
//      if(this.props.profileMenu.data.response.nextOfKinComplete == true){
//          this.DispatchSuccessMessage('Next of kin has been Created');
//          return
//      }

//     history.push('/profile/profile-next-of-kin');
// }

// DispatchSuccessMessage = (data) => {
//     this.props.dispatch(actions.profileSuccessMessage(data));
// }

// GetUserProfileMenu = () => {
//     this.props.dispatch(actions.profileMenu(this.state.user.token));
//  }

 
//    render(){
//        const {dateValidity, BVNValidity, birthDate,  isBvNLinked, isProfileInformation, isContactDetails, isDocument, navToNextOfKin} = this.state;
//     //    if(this.props.linkBvn == "LINK_BVN_SUCCESS"){
//     //          this.NavigateToSuccessPage();
//     //    }

//             // if(this.props.profileMenu.message === profile.LINK_BVN_SUCCESS){
//                 return(
//                     <Fragment>
//                                 <div className="">
//                                      <div className="container"> 
//                                              <div className="coverPropertiesofComponent"> 
//                                                 <div className="col-sm-12">
//                                                     <p className="page-title">Account Setting</p>
//                                                 </div>
            
//                                                 <div className="col-sm-12">
//                                                     <div>
//                                                         <div className="sub-tab-nav" style={{marginBottom: 10}}>
//                                                             <ul>
//                                                                 <li><NavLink to={'/profile'} >Profile</NavLink></li>
                                                                
//                                                             </ul>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 {this.props.alert && this.props.alert.message &&
//                                                 <div style={{width: "100%", marginRight:"120px",marginLeft:"120px"}} className={`info-label ${this.props.alert.type}`}>{this.props.alert.message}</div>
//                                             }
                                            
//                                             <div className="row packageContent">
//                                                 <div className="col-sm-4">
//                                                     <div className="forProfilePicture">
//                                                             <div className="profilePixCircle">
            
//                                                             </div>
//                                                             <p className="personsName">{this.props.profileMenu.data.response.fullName}</p>
//                                                             <p className="details">{this.props.profileMenu.data.response.username}</p>
//                                                             <p className="details">{moment(this.props.profileMenu.data.response.lastLoginDate).format("MMMM Do YYYY, h:mm:ss a")}</p>
//                                                             <hr />
            
//                                                             <div className="tickItems" onClick={this.NavigateToBVN}>
//                                                                 {isBvNLinked === true ? <img className="improveImgSize" src="/src/assets/img/Vector.svg" alt="" /> : <img src="/src/assets/img/Vector2.png" alt="" className="largeVectorI"/>}
//                                                                 <p className="pSubs">Link BVN</p>
//                                                             </div>
//                                                             <div className="tickItems" onClick={this.NavigateToPersonalInfo}>
//                                                                 {isProfileInformation ? <img className="improveImgSize" src="/src/assets/img/Vector.svg" alt="" /> : <img src="/src/assets/img/Vector2.png" alt="" className="largeVectorI"/>}
//                                                                 <p className="pSubs">Personal Information</p>
//                                                             </div>
//                                                             <div className="tickItems" onClick={this.NavigateToContact}>
//                                                                 {isContactDetails ? <img className="improveImgSize" src="/src/assets/img/Vector.svg" alt="" /> : <img src="/src/assets/img/Vector2.png" alt="" className="largeVectorI"/>}
//                                                                 <p className="pSubs">Contact Details</p>
//                                                             </div>
//                                                             <div className="tickItems" onClick={this.NavigateToDocuments}>
//                                                                 {isDocument ? <img className="improveImgSize" src="/src/assets/img/Vector.svg" alt="" /> : <img src="/src/assets/img/Vector2.png" alt=""  className="largeVectorI" />}
//                                                                 <p className="pSubs">Document Upload</p>
//                                                             </div>
//                                                             <div className="tickItems" onClick={this.NavigateToNextOfKin}>
//                                                                 {navToNextOfKin ? <img className="improveImgSize" src="/src/assets/img/Vector.svg" alt="" /> : <img src="/src/assets/img/Vector2.png" alt="" className="largeVectorI"/>} 
//                                                                 <p className="pSubs">Next of Kin</p>
//                                                             </div>
//                                                     </div>
                                                    
//                                                 </div>
//                                                 <div className="col-sm-6">
//                                                 <form onSubmit={this.HandleSubmit} className="parentForm">
//                                                         <p className="formHeading">Link BVN</p>
//                                                         <div className="form-row">
//                                                                     <div className={BVNValidity ? "form-group form-error col-md-10" : "form-group col-md-10"}>
//                                                                         <label className="label-text">BVN</label>
//                                                                         <input type="Number" className="form-control linkBVN" onChange={this.SetBvNNumber} placeholder="0000 0000 0000"/>
//                                                                     </div>
//                                                         </div>
                                                        
//                                                         <div className="form-row">
//                                                                 <div className={dateValidity ? "form-group form-error col-md-10" : "form-group col-md-10"}>
//                                                                         <label className="label-text">Date of Birth</label>
//                                                                         <DatePicker className="form-control linkBVN" selected={birthDate} 
//                                                                         placeholder="June 31, 2019"
//                                                                         dateFormat="MMMM d, yyyy"
//                                                                         showMonthDropdown
//                                                                         showYearDropdown
//                                                                         onChange={this.SetBirthDay}
//                                                                         dropdownMode="select"
//                                                                         // minDate={new Date()}
//                                                                         />
                                                                        
//                                                                 </div>
//                                                         </div>
//                                                         <div className="button-alignment">
                                                                
//                                                             <button type="submit" className="twoBut button-size no-border">Back</button>
                                                    
                                                    
//                                                             <button type="submit" className="twoBut1 button-size">Submit</button>       
                                                                
//                                                         </div>
//                                                     </form>
                                                
//                                                 </div>
//                                             </div>
            
                                            
                                                
                                
//                                             </div>
//                                         </div>
//                                         </div>
            
//                      </Fragment>
//                    )
//             // }

//                }
// }

// const mapStateToProps = (state) => {
//     return {
//         profileMenu:state.profileMenu,
//         profileSuccessMessage: state.profileSuccessMessage.data,
//         linkBvn: state.linkBVN.message,
//         alert:state.alert,
//     }
// }

// export default connect(mapStateToProps)(LinkBvN);