import React, { Fragment } from 'react';
import ImageUploader from 'react-images-upload';
import { SystemConstant } from "../../../shared/constants";

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as userActions from '../../../redux/actions/onboarding/user.actions';
import * as util from '../../../shared/utils';
import * as actions from '../../../redux/actions/loans/loans.action';

class StatementUpload extends React.Component {
    constructor(props) {
        super(props);
    }

    uploadImage = (data) => {
        this.props.dispatch(userActions.uploadDocument(this.state.user.token, data, this.state.actions))
    }

    getImageToUpload = (uploadType, imageToUpload) => {
        var imageFile = new FormData();

        imageFile.set('DocumentType', SystemConstant.DOCUMENT_TYPE.workid);

        imageFile.append('File', util.canvasToFile(imageToUpload.file), imageToUpload.name)

        return imageFile;
    }

    onIDUpload = (picture, e) => {
        if (picture.length >= 1) {
            util.getBase64(picture[picture.length - 1], (result) => {
                this.setState({ [e]: { file: result, name: picture[picture.length - 1].name } }, () => {
                    console.log(this.state[e]);
                    this.uploadImage(this.getImageToUpload(e, this.state[e]));
                });
            });
        }
        // else {
        //     this.setState({ [e]: { file: '', name: '' } });
        //     this.props.dispatch(alertActions.error("You need to upload a work id"));
        // }
    }

    dummyUpload=()=>{}


    render() {
        return (
            <div className="col-sm-12">
                <div className="max-500">
                    <div className="loan-header-text text-center">
                        <h4 className="text-black">Upload Statement of Account</h4>
                        <p>Upload PDF version of your bank account statement.</p>
                    </div>
                    <div className="al-card no-pad">
                        <div className="transfer-ctn">
                            <form>
                                <div className="row">
                                    <div className="upload-div">
                                        <p className="bold-text">Picture Upload</p>
                                        <div className="upload-box">
                                            {/* <input type="file" id="input-file-now" className="dropify" data-height="150"/> */}
                                            <ImageUploader
                                                withIcon={false}
                                                singleImage={true}
                                                withPreview={false}
                                                label=''
                                                className=""
                                                buttonText='Choose image'
                                                onChange={this.dummyUpload}
                                                imgExtension={['.jpg', '.png', '.jpeg']}
                                                maxFileSize={5242880}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <center>
                                            <input type="button" value="Upload" className="btn-alat m-t-20 m-b-20 text-center" />
                                        </center>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {

    }
}

export default connect(mapStateToProps)(StatementUpload);