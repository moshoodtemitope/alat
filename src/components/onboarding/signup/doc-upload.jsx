import * as React from 'react';
import ImageUploader from 'react-images-upload';

import "../../../assets/css/docupload/doc-upload.scss";

import { NavLink} from "react-router-dom";
import OnboardingContainer from "../Container";
import {connect} from "react-redux";

import {ApiService} from "../../../services/apiService";
import {SystemConstant} from "../../../shared/constants";
import {routes} from "../../../services/urls";
import * as utils from "../../../shared/utils";
import {USER_REGISTER_FETCH, USER_REGISTER_SAVE} from "../../../redux/constants/onboarding/user.constants";
import {userActions} from "../../../redux/actions/onboarding/user.actions";
import {history} from "../../../_helpers/history";
import { alertActions } from '../../../redux/actions/alert.actions';
import Modal from 'react-responsive-modal';
import { error } from 'util';


class DocumentUplaod extends React.Component{

    constructor(props){
        super(props);
            this.state={
                profilePicCount:0,
                SignupPicCount:0,
                profileUp: { file:'', name:'name word'},
                signUp: {file: '', name: ''},
                ctaStatus: false,
                openModal : false
            };
            this.onSignClick = this.onSignClick.bind(this);
            this.onProfileUpload = this.onProfileUpload.bind(this);
            this.onSubmit = this.onSubmit.bind(this);
            this.toggleModal = this.toggleModal.bind(this);
            this.submitSkipUpload = this.submitSkipUpload.bind(this);
            
    }
    
    componentDidMount() {
        this.getRegistrationDetails();
        this.attachEvent();
      //  this.setState({profileUp : { file: 'file', name: this.state.profileUp.name }},()=>{ console.log(this.state.profileUp)});
    }

    attachEvent(){
        var elementList = document.getElementsByClassName("chooseFileButton");
        for(var i=0; i< elementList.length; i++ ){
        elementList[i].nextSibling.addEventListener("change", this.clicked.bind(elementList[i]));
        }
    }
   
    clicked(element){
       var previewFrame =element.target.nextSibling.firstChild;
       if(previewFrame.childNodes.length >=1)
       {
         previewFrame.removeChild(previewFrame.firstChild); 
       }
    }
    
    getRegistrationDetails(){
        const { dispatch } = this.props;
        let props = this.props;
        let userData;
        let userDetails = props.user_details;
        if('registration_status' in userDetails && userDetails.registration_status === USER_REGISTER_SAVE){
            if(userDetails.registration_data.user !== undefined){
            userData =  userDetails.registration_data.user;
            this.setState({phone: userData.phone, 
                email: userData.email,
                password: userData.password });
            }
            else {
                //history.push('/register');
            }
        }
        else{
           //history.push('/register');
        }
    }

    toggleModal(){
        if(this.state.openModal == false)
         this.setState({openModal : true});
         else if(this.state.openModal == true)
         this.setState({openModal : false});
    }

    onSignClick(picture) {
        if(picture.length > this.state.SignupPicCount){
        if(picture.length>=1){
            // this.props.dispatch(alertActions.clear());
            //console.log('picture is', picture);
            this.getBase64(picture[picture.length-1], (result) => {
                    debugger
                    this.setState({signUp: {file: result, name:picture[picture.length-1].name}}, ()=>{
                        console.log('signature photo', this.state.profileUp);
                    });
             });
        }
        else {
            this.setState({signUp: ''});
            this.props.dispatch(alertActions.error("You need to add a signature"));
        }
      }else if(picture.length <= this.state.SignupPicCount){
        this.setState({signUp: ''});
        this.props.dispatch(alertActions.error("You need to add a signature"));
      }
      this.setState({SignupPicCount : picture.length});
    }


    getBase64(file, cb) {
        let reader = new FileReader();
        // reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.readAsDataURL(file);
        reader.onerror = function (error) {
           
        };
    }

    readFile(file, reader, cb) {
        reader.onload = () => {
            cb(reader.result);
        };
        reader.readAsDataURL(file);
    }

    onProfileUpload(picture) {
        
        //cheking if picture was deleted
        if(picture.length > this.state.profilePicCount){
        if(picture.length>=1){
            // this.props.dispatch(alertActions.clear());
            this.getBase64(picture[picture.length-1], (result) => {
              this.setState({profileUp: { file: result, name: picture[picture.length-1].name} },()=>{
                  console.log('profile photo', this.state.profileUp);
               });
           });
        }
        else {
            this.setState({profileUp: ''});
            this.props.dispatch(alertActions.error("You need to add a selfie"));
        }
      }else if(picture.length <= this.state.profilePicCount){
        this.setState({profileUp: ''});
        this.props.dispatch(alertActions.error("You need to add a selfie"));
      }
      this.setState({profilePicCount : picture.length});
    }

    submitUserDetails(userDetails){
        // console.log("getImageToUpload",this.getImageToUpload('dp', this.state.profileUp));
        // let payload = this.props.user_details.registration_data.user,
        //     consume = ApiService.request(routes.REGISTRATIONURLV2, "POST", payload);
        //     return  consume.then((response)=>{
                        //if(this.state.profileUp !==null){
                            
                           this.submitUploads();
                          
                       // } 
                        // history.push('/register/doc-upload');
                    // })
                    // .catch(error=>{
                    //     console.log('error', error);
                    // });
    }

    submitUploads(){
       // console.log(loginResult);
        
        const requestHeaders =  Object.assign({},SystemConstant.HEADER);
        // console.log('requestHeaders',requestHeaders);
        // console.log('SystemConstant.HEADER',SystemConstant.HEADER );
    delete requestHeaders['Content-Type'];
    delete requestHeaders['Accept'];

    requestHeaders['alat-token'] = "";//loginResult.data.token;
        // console.log('request header', requestHeaders);
        // console.log('system constant header', SystemConstant.HEADER);

        console.log("getImageToUpload", this.getImageToUpload('dp', this.state.profileUp));
        console.log("Image object",  this.state.profileUp);

        let consume = ApiService.request(routes.DOCUMENT_UPLOAD, "POST", this.getImageToUpload('dp', this.state.profileUp), requestHeaders, true);
        return consume.then((response)=>{
            console.log('DP uploaded', response);
            console.log('Header sent', requestHeaders);
            consume = ApiService.request(routes.DOCUMENT_UPLOAD, "POST", this.getImageToUpload('userSignature', this.state.signUp), requestHeaders, true);
            // history.push('/register/doc-upload');
            return consume.then((response2)=>{
                console.log('signature uploaded', response2);
            })
        })
        .catch(errorMessage=>{
            console.log('error on user img upload', errorMessage);
        })
    }

    getImageToUpload(uploadType, imageToUpload){
        var imageFile = new FormData();

        if(uploadType ==='dp'){
            imageFile.append('DocumentType', SystemConstant.DOCUMENT_TYPE.passport);
        }

        if(uploadType ==='userSignature'){
            imageFile.append('DocumentType', SystemConstant.DOCUMENT_TYPE.signature);
        }
        
        // console.log('file is ',imageFile);
        imageFile.append('File', utils.canvasToFile(imageToUpload.file), imageToUpload.name)
       // imageFile.append('File', imageToUpload.file, imageToUpload.name)

       var formEntries = imageFile.entries();
       do {
        console.log(formEntries.next().value);
      } while (!formKeys.next().done)
        console.log('Image is', imageFile);
        return imageFile;
    }

    

    onSubmit(e){
        e.preventDefault();
        let {dispatch} = this.props;
        if(this.state.profileUp.file.length > 5 ){
            if(this.state.signUp.file.length > 5){
                // dispatch(userActions.register(this.state, USER_REGISTER_SAVE));
                // history.push('/register/security-questions');
                this.submitUserDetails();
                return;
            }else {
                dispatch(alertActions.error("You need to upload your signature"));
                return;
           }
        }else{
            dispatch(alertActions.error("You need to upload a selfie"))
            return;
        }
    }

    submitSkipUpload(){
        //send null when user skips profile upload.
        this.setState({profileUp: null, signUp: null, ctaStatus:true},()=>{
            this.submitUserDetails();
        });
        this.props.dispatch(userActions.register(this.state, USER_REGISTER_SAVE));
        history.push('/register/security-questions');
    }
    
 

    render(){
        const {openModal} = this.state;
        let props= this.props;
        return (
            <OnboardingContainer>
                <div className="row">
                {/* -- Header -- */}
                <div className="col-12">
                    <h3>Documents Upload<span></span></h3>
                    <p>
                        One last thing. Upload a picture of your face (Selfie) and a photo of your signature on a white sheet of paper.
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <form className="onboard-form" onSubmit={this.onSubmit}>
                     {props.alert && props.alert.message &&
                             <div className={`info-label ${props.alert.type}`}>{props.alert.message}</div>
                            }
                        <div className="row">
                            <div className="col-sm-12 col-md-6">
                                <div className="upload-div">
                                    <p className="bold-text">Picture Upload</p>
                                    <div className="upload-box">
                                        {/* <input type="file" id="input-file-now" className="dropify" data-height="150"/> */}
                                        <ImageUploader
                                            withIcon={true}
                                            singleImage = {true}
                                            withPreview={true}
                                            label=''
                                            className ="selfieBtn"
                                            buttonText='Choose image'
                                            onChange={this.onProfileUpload}
                                            imgExtension={['.jpg', '.png', '.jpeg']}
                                            maxFileSize={5242880}
                                            />
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-12 col-md-6">
                                <div className="upload-div">
                                    <p className="bold-text">Signature Upload</p>
                                    <div className="upload-box">
                                        {/* <input type="file" id="input-file-now" className="dropify" data-height="150"/> */}
                                        <ImageUploader
                                            withIcon={true}
                                            singleImage = {true}
                                            withPreview={true}
                                            label=''
                                            buttonText='Choose image'
                                            onChange={this.onSignClick}
                                            imgExtension={['.jpg', '.png', '.jpeg']}
                                            maxFileSize={5242880}
                                            />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <input type="submit" value="Upload Documents" className="btn-alat btn-block"/>
                    </form>
                    <p className="text-center"><a href="#" onClick={this.toggleModal}>Skip for now</a></p>
                </div>
            </div>
            <Modal open={openModal} onClose={this.toggleModal} center>
                  <div>
                  <div className="div-modal">
                        <h3>By skipping this step, your new account won’t be operational till you have uploaded these documents.</h3>
                    <div className="btn-opt">
                        <button onClick={this.toggleModal} disabled={this.state.ctaStatus} className="border-btn">Cancel</button>
                        <button onClick={this.submitSkipUpload} disabled={this.state.ctaStatus} className="btn-alat">Proceed</button>
                    </div>
                    </div>
                  </div>
                </Modal>
            </OnboardingContainer>
        );
    }
}

function mapStateToProps(state){
    
    return {
         user_details: state.onboarding_user_details,
        // bvn_details: state.onboarding_bvn_details,
         alert: state.alert
    }
}

export default connect(mapStateToProps)(DocumentUplaod);