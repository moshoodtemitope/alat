import React, { Fragment } from 'react';
import '../../../assets/css/docupload/doc-upload.scss';
import deleteIcn from '../../../assets/img/delete-bin.svg';

import { SystemConstant } from "../../../shared/constants";
import { loanConstants } from '../../../redux/constants/loans/loans.constants';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as userActions from '../../../redux/actions/onboarding/user.actions';
import * as util from '../../../shared/utils';
import * as actions from '../../../redux/actions/loans/loans.action';

class StatementUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            pdf: { name: "" },
            file: {},
            maxSizeExceeded:false,
            actions: {
                pending: loanConstants.LOAN_STATEMENT_UPLOAD_PENDING,
                success: loanConstants.LOAN_STATEMENT_UPLOAD_SUCCESS,
                failure: loanConstants.LOAN_STATEMENT_UPLOAD_FAILURE
            }
        }
    }

    componentDidMount=()=>{
        // if (this.props.loan_reqStat) {
        //     if (this.props.loan_reqStat.loan_reqStat_status == loanConstants.LOAN_REQUEST_STATEMENT_SUCCESS) {

        //     } else {
        //         this.props.gotoPreviousPageMethod();
        //     }
        // }
    }

    uploadImage = (data) => {
        this.props.dispatch(userActions.uploadDocument(this.state.user.token, data, this.state.actions))
    }

    getImageToUpload = (imageToUpload) => {
        var imageFile = new FormData();

        imageFile.set('DocumentType', SystemConstant.DOCUMENT_TYPE.statement);

        imageFile.append('File', util.canvasToFile(imageToUpload.file), imageToUpload.name)

        return imageFile;
    }

    uploadStatement = (pdf) => {
        //console.log(this.state.pdf);
        util.getBase64(pdf, (result) => {
            this.setState({ file: { file: result, name: pdf.name } }, () => {
               // console.log(this.state.file);
                this.uploadImage(this.getImageToUpload(this.state.file));
            });
        });
        // else {
        //     this.setState({ [e]: { file: '', name: '' } });
        //     this.props.dispatch(alertActions.error("You need to upload a work id"));
        // }
    }

    proceedClick = () => {
       
        
        this.uploadStatement(this.state.pdf);
        // 
    }

    pdfInputChange = (pdf) => {
        let maxFileSize = 7168000;
        console.log("file os", this.state.pdf.size);
        if (pdf[0].size <= maxFileSize) {

            this.setState({ maxSizeExceeded: false })
            this.setState({ pdf: pdf[0] }, () => {
            });
            this.uploadStatement(this.state.pdf);
        } else {
            this.setState({ maxSizeExceeded: true })

        }

        
    }

    deletePdf = (pdf) => {
        this.setState({ pdf: { name: "" } });
    }

    goToNextPage=()=>{
        if (this.props.statement_upload) {
            if (this.props.statement_upload.loan_statement_status == loanConstants.LOAN_STATEMENT_UPLOAD_SUCCESS) {
                this.props.ParentGoToNextPage();
            }
        }
    }


    render() {
        this.goToNextPage();
        let {maxSizeExceeded} = this.state;
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

                                    <div className="col-sm-12">
                                        <div>
                                            {this.state.pdf.name != "" &&
                                                <label className="text-center" style={{ color: "red", display: "block" }}>{this.state.pdf.name}
                                                    <img onClick={this.deletePdf} src={deleteIcn} style={{ height: "20px", cursor: "pointer", marginLeft: "10px" }}></img>
                                                </label>
                                            }
                                        </div>
                                        <center>
                                        {maxSizeExceeded===true && 
                                            <div className="info-label error">Maximum filesize of 7mb is allowed</div>
                                        }
                                        
                                            {this.state.pdf.name == "" && <label className="btn-alat m-t-20 m-b-20 text-center">
                                                <input type="file" name="upload" accept="application/pdf"
                                                    onChange={(e) => this.pdfInputChange(e.target.files)} />
                                                Upload
                                             </label>}

                                            {this.state.pdf.name != "" && <button onClick={this.proceedClick} type="button" disabled={this.props.statement_upload.loan_statement_status == loanConstants.LOAN_STATEMENT_UPLOAD_PENDING} 
                                             className="btn-alat m-t-20 m-b-20 text-center">{ this.props.statement_upload.loan_statement_status == loanConstants.LOAN_STATEMENT_UPLOAD_PENDING ? "Processing..." : "Proceed" }</button>}
                                            <div className={maxSizeExceeded===true?"error-text":""}>Maximum filesize of 7mb is allowed</div>
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
      alert : state.alert,
      loan_reqStat: state.loanOnboardingReducerPile.loanOnboardingRequestStatement,
      statement_upload: state.loanReducerPile.loanStament
    }
}

export default connect(mapStateToProps)(StatementUpload);