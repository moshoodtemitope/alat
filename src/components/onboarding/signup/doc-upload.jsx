import * as React from 'react';
import ImageUploader from 'react-images-upload';

import "../../../assets/css/docupload/doc-upload.scss";

import { NavLink} from "react-router-dom";
import OnboardingContainer from "../Container";
import {connect} from "react-redux";



import {USER_REGISTER_FETCH, USER_REGISTER_SAVE} from "../../../redux/constants/onboarding/user.constants";
import {userActions} from "../../../redux/actions/onboarding/user.actions";
import {history} from "../../../_helpers/history";


class DocumentUplaod extends React.Component{

    constructor(props){
        super(props);
            this.state={
                pictures: [],
                profileUp: '',
                signUp:''
            };
            this.onSignClick = this.onSignClick.bind(this);
            this.onProfileUpload = this.onProfileUpload.bind(this);
    }
    
    componentDidMount() {
        //this.getRegistrationDetails();
    }
    
    onSignClick(picture) {
        this.getBase64(picture[0], (result) => {
                this.setState({signUp: result});
         });
    }

    onProfileUpload(picture) {
        this.getBase64(picture[0], (result) => {
          this.setState({profileUp: result});
       });
    }

    getBase64(file, cb) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

 

    render(){
        
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
                    <form className="onboard-form">
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
                                            buttonText='Choose image'
                                            onChange={this.onProfileUpload}
                                            imgExtension={['.jpg', '.png']}
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
                                            imgExtension={['.jpg', '.png']}
                                            maxFileSize={5242880}
                                            />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <input type="submit" value="Upload Documents" className="btn-alat btn-block"/>
                    </form>
                    <p className="text-center"><a href="#">Skip for now</a></p>
                </div>
            </div>
            </OnboardingContainer>
        );
    }
}

function mapStateToProps(state){
    
    return {
         user_details: state.onboarding_user_details.state,
        // bvn_details: state.onboarding_bvn_details,
         alert: state.alert
    }
}

export default connect(mapStateToProps)(DocumentUplaod);