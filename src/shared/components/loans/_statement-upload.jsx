import React, { Fragment } from 'react';
import ImageUploader from 'react-images-upload';
import '../../../assets/css/docupload/doc-upload.scss';
import deleteIcn from '../../../assets/img/delete.svg';

import { SystemConstant } from "../../../shared/constants";

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as userActions from '../../../redux/actions/onboarding/user.actions';
import * as util from '../../../shared/utils';
import * as actions from '../../../redux/actions/loans/loans.action';

class StatementUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pdf: { name: "" }
        }
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

    handleChange = (e) => {
        console.log(e);
    }

    pdfInputChange = (pdf, e) => {
        console.log(pdf);
        console.log(e);
        this.setState({ pdf: pdf },()=>{
            console.log(this.state.pdf);
        });
    }

    deletePdf =(pdf)=>{
        this.setState({pdf: {name: ""}});
    }


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
                                    {/* <input type="file" id="input-file-now" className="dropify" data-height="150"/> */}


                                    <label className="text-center" style={{ color: "red"}}>Account label <img src={deleteIcn}></img></label>
                                    <div className="col-sm-12">
                                        <center>
                                            <label className="btn-alat m-t-20 m-b-20 text-center" >
                                                <input type="file" name="upload" accept="application/pdf"
                                                    onChange={(e) => this.handleChange(e.target.files)} />
                                                Upload
                                             </label>
                                            {/* <input type="button" value="Upload" className="btn-alat m-t-20 m-b-20 text-center" /> */}
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