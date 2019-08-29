import React, { Fragment } from 'react';

import Select from 'react-select';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import * as actions from '../../../redux/actions/loans/loans.action';
import { loanConstants } from '../../../redux/constants/loans/loans.constants';
import * as util from '../../utils';
import { SystemConstant } from "../../../shared/constants";
import * as userActions from '../../../redux/actions/onboarding/user.actions';
import { userConstants } from '../../../redux/constants/onboarding/user.constants';
import { alertActions } from '../../../redux/actions/alert.actions';
import ImageUploader from 'react-images-upload';



//temporary component to test my entire collection flow.
class LoanKycComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Passport: { name: "" },
            Signature: { name: "" }
        }
    }

    componentDidMount = () => {
        this.attachEvent();
    }

    attachEvent() {
        var elementList = document.getElementsByClassName("chooseFileButton");
        for (var i = 0; i < elementList.length; i++) {
            elementList[i].nextSibling.addEventListener("change", this.clicked.bind(elementList[i]));
        }
    }

    clicked(element) {
        var previewFrame = element.target.nextSibling.firstChild;
        if (previewFrame.childNodes.length >= 1) {
            previewFrame.removeChild(previewFrame.firstChild);
        }
    }

    validateImages = () => {
        if (this.state.Passport.name == "") {
            this.props.dispatch(alertActions.error("You need to upload your Passport Image"));
            return false;
        }

        if (this.state.Signature.name == "") {
            this.props.dispatch(alertActions.error("You need to upload Signature Image"));
            return false;
        }
    }

    formSubmit = (e) => {
        e.preventDefault();
        if (this.validateImages() != false) {
            console.log("after validate image");
            this.uploadImage(this.getImageToUpload('Signature', this.state.Signature), {
                pending: userConstants.SIGNATURE_UPLOAD_PENDING,
                success: userConstants.SIGNATURE_UPLOAD_SUCCESS,
                failure: userConstants.SIGNATURE_UPLOAD_FAILURE
            });
            this.uploadImage(this.getImageToUpload('Passport', this.state.Passport), {
                pending: userConstants.PASSPORT_UPLOAD_PENDING,
                success: userConstants.PASSPORT_UPLOAD_SUCCESS,
                failure: userConstants.PASSPORT_UPLOAD_FAILURE
            });
        }
    }



    onImageUpload = (picture, e) => {
        console.log(picture);
        console.log(e);
        if (picture.length >= 1) {
            util.getBase64(picture[picture.length - 1], (result) => {
                this.setState({ [e]: { file: result, name: picture[picture.length - 1].name } }, () => {
                    this.props.dispatch(alertActions.clear());
                    //console.log(this.state[e]);
                    //this.uploadImage(this.getImageToUpload(e, this.state[e]));
                });
            });
        }
        else {
            this.setState({ [e]: { file: '', name: '' } });
            this.props.dispatch(alertActions.error("You need to upload a "+e+""));
        }
    }

    getImageToUpload = (uploadType, imageToUpload) => {
        var imageFile = new FormData();

        if (uploadType === 'Signature') {
            imageFile.set('DocumentType', SystemConstant.DOCUMENT_TYPE.signature);
        }
        else
            if (uploadType === 'Passport') {
                imageFile.set('DocumentType', SystemConstant.DOCUMENT_TYPE.passport);
            }

        imageFile.append('File', util.canvasToFile(imageToUpload.file), imageToUpload.name)

        return imageFile;
    }

    uploadImage = (data, action) => {
        this.props.dispatch(userActions.uploadDocument(this.state.user.token, data, action))
    }

    gotoNextPage=()=>{
        if(this.props.passport && this.props.signature)
        if(this.props.passport.passport_status == userConstants.PASSPORT_UPLOAD_SUCCESS && this.props.signature.signature_status == userConstants.SIGNATURE_UPLOAD_SUCCESS){
            this.props.goForward();
        }
    }


    render() {
        return (
            <div className="row">
                <div className="col-sm-12">
                    <div className="max-500">
                        <div className="loan-header-text text-center">
                            <h4 className="text-black">Let's know more about you</h4>
                            <p>complete the form below to create your profile</p>
                        </div>
                        <div className="al-card no-pad">
                            <div className="transfer-ctn">
                                <form onSubmit={this.formSubmit} className="onboard-form">
                                    {this.props.alert && this.props.alert.message &&
                                        <div className={`info-label ${this.props.alert.type}`}>{this.props.alert.message}</div>
                                    }
                                     {this.props.passport && this.props.passport.passport_status == userConstants.PASSPORT_UPLOAD_FAILURE &&
                                        <div className={`info-label failure`}>{this.props.passport.passport_data.error.Respone}</div>
                                    }
                                    {this.props.signature && this.props.signature.signature_status == userConstants.SIGNATURE_UPLOAD_FAILURE &&
                                        <div className={`info-label failure`}>{this.props.signature.signature_data.error.Respone}</div>
                                    }
                                    <div className="row">
                                        <div className="col-sm-12 col-md-6">
                                            <div className="upload-div">
                                                <p className="bold-text">Picture Upload</p>
                                                <div className="upload-box">
                                                    {/* <input type="file" id="input-file-now" className="dropify" data-height="150"/> */}
                                                    <ImageUploader
                                                        disbaled={true}
                                                        withIcon={true}
                                                        singleImage={true}
                                                        withPreview={true}
                                                        name="frontId"
                                                        label=''
                                                        className="asd"
                                                        // buttonText={this.returnOnFrontUploadText()}
                                                        onChange={(picture) => this.onImageUpload(picture, "Passport")}
                                                        imgExtension={['.jpg', '.png', '.jpeg']}
                                                        maxFileSize={5242880}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-sm-12 col-md-6">
                                            <div className="upload-div">
                                                <p className="bold-text">Signature Upload</p>
                                                <ImageUploader
                                                    disbaled={true}
                                                    withIcon={true}
                                                    singleImage={true}
                                                    withPreview={true}
                                                    name="frontId"
                                                    label=''
                                                    className="asd"
                                                    // buttonText={this.returnOnFrontUploadText()}
                                                    onChange={(picture) => this.onImageUpload(picture, "Signature")}
                                                    imgExtension={['.jpg', '.png', '.jpeg']}
                                                    maxFileSize={5242880}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <input type="submit" value={this.props.passport.paspport_status == userConstants.PASSPORT_UPLOAD_PENDING || this.props.signature.signature_status == userConstants.SIGNATURE_UPLOAD_PENDING ? "Processing..." : "Upload Documents"}
                                        disabled={this.props.passport.paspport_status == userConstants.PASSPORT_UPLOAD_PENDING || this.props.signature.signature_status == userConstants.SIGNATURE_UPLOAD_PENDING}
                                        className="btn-alat btn-block" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        alert: state.alert,
        passport: state.loanReducerPile.passport,
        signature: state.loanReducerPile.signature,
    }
}

export default connect(mapStateToProps)(LoanKycComponent);