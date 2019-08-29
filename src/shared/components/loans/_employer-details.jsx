import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import * as onboardingActions from '../../../redux/actions/onboarding/loan.actions';
import { loanOnboardingConstants } from '../../../redux/constants/onboarding/loan.constants';

import * as loanActions from '../../../redux/actions/loans/loans.action';
import * as userActions from '../../../redux/actions/onboarding/user.actions';
import { loanConstants } from '../../../redux/constants/loans/loans.constants';
import { SystemConstant } from "../../../shared/constants";

import ImageUploader from 'react-images-upload';
import '../../../assets/css/docupload/custom-upload.css';

import * as util from '../../utils'
//import LoanOnboardingContainer from './loanOnboarding-container';
//import OtpValidation from '../../../shared/components/otpvalidation';
import Select from 'react-select';
import {
    FETCH_BANK_PENDING,
    FETCH_BANK_SUCCESS,
    FETCH_BANK_FAILURE,
} from "../../../redux/constants/transfer.constants";

const frontSide = "FrontSide";
const backSide = "BackSide";


class EmployerDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            employerName: "",
            accountNumber: "",
            isTermChecked: "",
            bankCode: "",
            isAccepted: false,
            selectedBank: null,
            isSubmitted: false,
            selectedIndustry: { label: "", value: "" },
            EmployerList: [],
            selectedEmployer: { label: "", value: "" },
            employerActionFired: false,
            workIDFront: { file: '', name: '' },
            workIDBack: { file: '', name: '' },
            workIDFrontUploadCount: 0,
            workIDBackUploadCount: 0,

            employerNameInvalid: false,
            IndustryNameInvalid: false,
            employNameOthersInvalid: false,
            workIdFrontUploadInvalid : false,
            workIdBackUploadInvalid: false,
            actions: {
                pending: "",
                success: "",
                failure: ""
            }
        }

        this.onIDUpload = this.onIDUpload.bind(this);
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

    onFrontUpload = (picture) => {
        if (this.props.workid_front.loan_frontId_status != loanConstants.LOAN_WORkID_FRONT_PENDING 
            || this.props.workid_front.loan_frontId_status != loanConstants.LOAN_WORkID_FRONT_SUCCESS )
            this.setState({
                actions: {
                    pending: loanConstants.LOAN_WORkID_FRONT_PENDING,
                    success: loanConstants.LOAN_WORkID_FRONT_SUCCESS,
                    failure: loanConstants.LOAN_WORkID_FRONT_FAILURE
                }
            }, () => {
                this.onIDUpload(picture, "workIDFront");
            })
    }

    returnOnFrontUploadText = () => {
        if (this.props.workid_front.loan_frontId_status == loanConstants.LOAN_WORkID_FRONT_PENDING) {
            return "Upload in Progress...";
        }
        else if (this.props.workid_front.loan_frontId_status == loanConstants.LOAN_WORkID_FRONT_SUCCESS) {
            return "Work ID (Front) Upload Successful";
        } else if (this.props.workid_front.loan_frontId_status == loanConstants.LOAN_WORkID_FRONT_FAILURE) {
            return "Upload Failed, Click to try again";
        } else {
            return "Click here to upload work ID (Front)";
        }
    }

    onBackUpload = (picture) => {
        if (this.props.workid_back.loan_backId_status != loanConstants.LOAN_WORkID_BACK_PENDING 
            || this.props.workid_back.loan_backId_status != loanConstants.LOAN_WORkID_BACK_SUCCESS )
        this.setState({
            actions: {
                pending: loanConstants.LOAN_WORkID_BACK_PENDING,
                success: loanConstants.LOAN_WORkID_BACK_SUCCESS,
                failure: loanConstants.LOAN_WORkID_BACK_FAILURE
            }
        }, () => {
            this.onIDUpload(picture, "workIDBack");
        })
    }

    returnOnBackUploadText = () => {
        if (this.props.workid_back.loan_backId_status == loanConstants.LOAN_WORkID_BACK_PENDING) {
            return "Upload in Progress...";
        }
        else if (this.props.workid_back.loan_backId_status == loanConstants.LOAN_WORkID_BACK_SUCCESS) {
            return "Work ID (Back) Upload Successful";
        } else if (this.props.workid_back.loan_backId_status == loanConstants.LOAN_WORkID_BACK_FAILURE) {
            return "Upload Failed, Click to try again";
        } else {
            return "Click here to upload work ID (Back)";
        }
    }

    componentDidMount = () => {
        this.init();
    }

    init = () => {
        this.getIndustries();
        // if (this.props.loan_step3)
        //     if (this.props.loan_step3.loan_step3_status == loanOnboardingConstants.LOAN_STEP3_SUCCESS) {
        //         this.fetchBanks();
        //         // this.setState({ FirstName :this.props.user_detail.loan_userdetails_data.data.FirstName });   
        //     } else this.props.history.push("/loan/bvn-info");
        // else { this.props.history.push("/loan/bvn-info") }
    }

    getIndustries = () => {
        this.props.dispatch(loanActions.getIndustries(this.state.user.token));
    }

    getEmployers = (industryId) => {
        this.props.dispatch(loanActions.getEmployers(this.state.user.token, industryId));
    }

    handleIndustryChange = (Industry) => {
        this.setState({ selectedIndustry: Industry, employerActionFired: true },
            () => { this.getEmployers(Industry.value); })
        this.setState({ selectedEmployer: { value: "", label: "" }, EmployerList: [] });
        if (Industry.label != "")
            this.setState({ IndustryNameInvalid: false })
    }

    handleEmployerChange = (Employer) => {
        this.setState({ selectedEmployer: Employer });
        if (Employer.value != "") {
            this.setState({ employerNameInvalid: false });
        }
    }

    validateFields = () => {
        var employerNameInvalid = false;
        var industryInvalid = false;
        var otherEmployerInvalid = false;
        var workIdFrontUploadInvalid = false;
        var workIdBackUploadInvalid = false;

        //selected Industry validation
        if (this.state.selectedIndustry.label.length == 0 || this.state.selectedIndustry.label == "") {
            this.setState({ IndustryNameInvalid: true });
            industryInvalid = true
        }

        if (this.state.selectedIndustry.label.length != 0) {
            this.setState({ IndustryNameInvalid: false });
            industryInvalid = false
        }

        //selected Employer Validation
        if (this.state.selectedEmployer.label.length == 0 || this.state.selectedEmployer.label == "") {
            this.setState({ employerNameInvalid: true })
            employerNameInvalid = true;
        }

        if (this.state.selectedEmployer.label.length != 0) {
            this.setState({ employerNameInvalid: false })
            employerNameInvalid = false;
        }

        if (this.state.selectedEmployer.label == "Others" && this.state.employerName.length == 0 || this.state.employerName == "") {
            this.setState({ employNameOthersInvalid: true })
            otherEmployerInvalid = true;
        }

        if (this.state.selectedEmployer.label == "Others" && this.state.employerName.length > 0) {
            this.setState({ employNameOthersInvalid: false })
            otherEmployerInvalid = false;
        }
        if (this.state.selectedEmployer.label != "Others") {
            this.setState({ employNameOthersInvalid: false })
            otherEmployerInvalid = false;
        }

        if(this.state.workIDBack.file===''){
            this.setState({workIdBackUploadInvalid :true});
            workIdBackUploadInvalid = true
        }
        if(this.state.workIDFront.file===''){
            this.setState({workIdFrontUploadInvalid :true});
            workIdFrontUploadInvalid = true;
        }

        if(this.state.workIDBack.file!=''){
            this.setState({workIdBackUploadInvalid :false});
            workIdBackUploadInvalid = false;
        }
        if(this.state.workIDFront.file!=''){
            this.setState({workIdFrontUploadInvalid :false});
            workIdFrontUploadInvalid = false;
        }

        if (industryInvalid || otherEmployerInvalid || employerNameInvalid || workIdBackUploadInvalid || workIdFrontUploadInvalid)
            return true;
        else return false;
    }

    getImageToUpload = (uploadType, imageToUpload) => {
        var imageFile = new FormData();

        if (uploadType === 'workIDFront') {
            imageFile.set('DocumentType', SystemConstant.DOCUMENT_TYPE.workid);
        }
        else
            if (uploadType === 'workIDBack') {
                imageFile.set('DocumentType', SystemConstant.DOCUMENT_TYPE.workidBack);
            }

        imageFile.append('File', util.canvasToFile(imageToUpload.file), imageToUpload.name)

        return imageFile;
    }

    renderIndustries = (props) => {
        let industStatus = this.props.industries.loan_industries_status
        switch (industStatus) {
            case loanConstants.LOAN_GETINDUSTRIES_SUCCESS:
                let industriesList = this.props.industries.loan_industries_data.response.Response;
                 var industriesOptions = [];
                for (var industry in industriesList) {
                    // console.log(industry);
                    industriesOptions.push({ value: industriesList[industry].Id, label: industriesList[industry].Name });
                }
                return (<Select
                    options={industriesOptions}
                    onChange={this.handleIndustryChange}
                />);
            case loanConstants.LOAN_GETINDUSTRIES_PENDING:
                return (<select disabled>
                    <option>Fetching Industries...</option>
                </select>
                );
            case loanConstants.LOAN_GETINDUSTRIES_FAILURE:
                return (<Fragment>
                    <select className="error-field" disabled>
                        <option>Unable to load Industries</option>
                    </select>
                    <a className="cta-link to-right" onClick={this.getIndustries}>Try again</a>
                </Fragment>)
        }
    }

    renderEmployer = (props) => {
        let employerStatus = this.props.employer.loan_employer_status;
        switch (employerStatus) {
            case loanConstants.LOAN_EMPLOYER_SUCCESS:
                let employerList = this.props.employer.loan_employer_data.response.Response;
                var _employerList = [];
                for (var employer in employerList) {
                    _employerList.push({ value: employerList[employer].Id, label: employerList[employer].Name });
                }
                _employerList.push({ value: employerList.length + 1, label: "Others" })
                if (this.state.employerActionFired) {
                    this.setState({ EmployerList: _employerList, employerActionFired: false })
                }
                return (
                    <Fragment>
                        <Select
                            options={_employerList}
                            onChange={this.handleEmployerChange}
                        />
                    </Fragment>)
            case loanConstants.LOAN_EMPLOYER_PENDING:
                return (<select disabled>
                    <option>Fetching employers...</option>
                </select>
                );
            case loanConstants.LOAN_EMPLOYER_FAILURE:
                return (<Fragment>
                    <select className="error-field" disabled>
                        <option>Unable to load Industries</option>
                    </select>
                    <a className="cta-link to-right" onClick={this.getEmployers(this.state.selectedIndustry.value)}>Try again</a>
                </Fragment>);
            default: return (<select className="" disabled>
                <option>select industry first</option>
            </select>)
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({ isSubmitted: true });
        if (this.validateFields()) {

        } else {

            var data = {
                //AccountNumber: this.state.accountNumber,
                //BankId: this.state.bankCode,
                EmployerName: this.state.selectedEmployer.label,
                EmployerIndustryId: this.state.selectedIndustry.value,
                EmployerId: this.state.selectedEmployer.value,
                Page: "WorkDetails"
            };
            if (data.EmployerName == "Others") {
                data.EmployerName = this.state.employerName;
                data.EmployerId = "999";
            }
            //let url = `accountNumber=${this.state.accountNumber}&bankId=${this.state.bankCode}&employersName=${this.state.employerName}`;
            //this.props.dispatch(onboardingActions.requestStatement(this.props.loan_step3.loan_step3_data.data.response.token, url));
            //this.props.dispatch(onboardingActions.requestStatement(this.props.token, data));
            this.props.dispatch(loanActions.saveWorkDetails(data));
        }
    }

    handleInputChange = (e) => {
        if (e.target.name == "employerName") {
            this.setState({ employerName: e.target.value }, () => {
                if (this.state.isSubmitted)
                    this.validateFields();
            });
        }
    }


    gotoNextPage = () => {
        if (this.props.loan_reqStat)
            if (this.props.loan_reqStat.loan_reqStat_status == loanOnboardingConstants.LOAN_REQUEST_STATEMENT_SUCCESS) {
              return (<Redirect to={this.props.forwardUrl} />)
            }
    }

    testSelectedEmployer = () => {
        if (this.state.selectedEmployer == null) {
            return false
        } else { return true; }
    }

    uploadImage = (data) => {
        this.props.dispatch(userActions.uploadDocument(this.state.user.token, data, this.state.actions))
    }

    render() {
        const { employerName, accountNumber, employerNameInvalid, IndustryNameInvalid, employNameOthersInvalid, accountNumberInvalid, selectedEmployer,
            selectedBankInvalid } = this.state;
        let props = this.props;
        let frontp = "frontside";
        return (
            <Fragment>
             {this.gotoNextPage()}
                <div className="col-sm-12">
                    <div className="max-500">
                        <div className="loan-header-text text-center">
                            <h4 className="text-black">Input your salary account details</h4>
                            <p>Your loan will be disbursed into this account</p>
                        </div>
                        <div className="al-card no-pad">
                            <div className="transfer-ctn">
                                {this.props.alert && this.props.alert.message &&
                                    <div className={`info-label ${this.props.alert.type}`}>{this.props.alert.message}</div>
                                }
                                <form onSubmit={this.onSubmit}>
                                    <div className={IndustryNameInvalid ? "input-ctn form-error" : "input-ctn"}>
                                        <label>Industry</label>
                                        {this.renderIndustries()}
                                        {IndustryNameInvalid &&
                                            <div className="text-danger">You have to select an Industry</div>
                                        }
                                    </div>
                                    <div className={employerNameInvalid ? "input-ctn form-error" : "input-ctn"}>
                                        <label>Employer</label>
                                        {this.renderEmployer()}
                                        {employerNameInvalid &&
                                            <div className="text-danger">You have to select an Employer or select Others so you can type in your employers name</div>
                                        }
                                    </div>
                                    {this.testSelectedEmployer() &&
                                        selectedEmployer.label == "Others" &&
                                        <div className={employNameOthersInvalid ? "input-ctn form-error" : "input-ctn"}>
                                            <label>Employer Name if Others</label>
                                            <input type="text" name="employerName"
                                                value={employerName} onChange={this.handleInputChange} />
                                            {employNameOthersInvalid &&
                                                <div className="text-danger">A valid employer name is required</div>
                                            }
                                        </div>
                                    }

                                    <div className={this.state.workIdFrontUploadInvalid ? "input-ctn form-error" : "input-ctn"}>
                                        <label>Work ID (Front)</label>
                                        <ImageUploader
                                            disbaled={true}
                                            withIcon={false}
                                            singleImage={true}
                                            withPreview={false}
                                            name="frontId"
                                            label=''
                                            className="selfieBtn"
                                            buttonText={this.returnOnFrontUploadText()}
                                            onChange={this.onFrontUpload}
                                            imgExtension={['.jpg', '.png', '.jpeg']}s
                                            maxFileSize={5242880}
                                        />
                                    </div>

                                    <div className={this.state.workIdBackUploadInvalid ? "input-ctn form-error" : "input-ctn"}>
                                        <label>Work ID (Back)</label>
                                        <ImageUploader
                                            withIcon={false}
                                            singleImage={true}
                                            withPreview={false}
                                            name="backID"
                                            label=''  
                                            className="selfieBtn"
                                            buttonText={this.returnOnBackUploadText()}
                                            onChange={this.onBackUpload}
                                            imgExtension={['.jpg', '.png', '.jpeg']}
                                            maxFileSize={5242880}
                                        />
                                    </div>

                                    <div className="row">
                                        <div className="col-sm-12">
                                            <center>
                                                <button type="submit" disabled={this.props.loan_reqStat.loan_reqStat_status == loanOnboardingConstants.LOAN_REQUEST_STATEMENT_PENDING} className="btn-alat m-t-10 m-b-20 text-center">
                                                    {this.props.loan_reqStat.loan_reqStat_status == loanOnboardingConstants.LOAN_REQUEST_STATEMENT_PENDING ?
                                                        "Proceesing..." : "Proceed"}
                                                </button>
                                            </center>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {/* <center>
                            <Link to={'/loan/bvn-info'} className="add-bene m-t-50">Go Back</Link>
                        </center> */}
                    </div>
                </div>
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {   
        alert: state.alert,
        //loan_step2: state.loanOnboardingReducerPile.loanOnboardingStep2,
        loan_val_otp: state.loanOnboardingReducerPile.loanOnboardingValidateOTP,
        loan_bvn: state.loanOnboardingReducerPile.loanOnboardingBVN,
        loan_step3: state.loanOnboardingReducerPile.loanOnboardingStep3,
        bankList: state.transferReducerPile.transfer_bankList,
        loan_reqStat: state.loanOnboardingReducerPile.loanOnboardingRequestStatement,
        //user_detail: state.loanOnboardingReducerPile.loanUserDetails,

        industries: state.loanReducerPile.loanIndustries,
        employer: state.loanReducerPile.loanEmployer,
        workid_front: state.loanReducerPile.loanFrontId,
        workid_back: state.loanReducerPile.loanBackId
    };
}
export default connect(mapStateToProps)(EmployerDetails);
