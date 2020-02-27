import React, { Fragment } from 'react';

import Select from 'react-select';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../redux/actions/onboarding/loan.actions';
import { loanOnboardingConstants } from '../../../redux/constants/onboarding/loan.constants';
import { LoanApplicationProgress } from '../../../shared/constants';
import ExtendModal from '../_modal';
import {history} from "../../../_helpers/history";
class ScoreCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),

            EducationQualifications: [],
            YearsOfExperience: [],
            NumberOfDependants: [],

            selectedDependant: null,
            selectedYOE: null,
            selectedQualification: null,
            isPopulated: false,
            ///////////////////Modal prperties
            openModal: false,
            IsSuccess: false,
            modalMessage: "",
            modalFired: false,
        }
        //this.submitScoreCardAnswer = this.submitScoreCardAnswer.bind(this);
    }

    componentDidMount = () => {
        this.init();
    }

    init = () => {
        this.props.dispatch(actions.getScoreCard(this.state.user.token));
        if (this.props.salary_entry) {
            if (this.props.salary_entry.loan_salEnt_status == loanOnboardingConstants.LOAN_SALARYENTRY_SUCCESS) {
                this.props.dispatch(actions.getScoreCard(this.state.user.token));
            } else {
                // return (<Redirect to={this.props.backwardUrl}/>);  //this.props.history.push());
                // this.props.gotoPreviosuPageMethod();
            }
        } else
            if (this.props.loan_status) {
                if (this.props.loan_status.loan_app_data.data == LoanApplicationProgress.Inprogress_ScoreCard) {
                    this.props.dispatch(actions.getScoreCard(this.state.user.token));
                }
                else { this.props.gotoPreviosuPageMethod(); }
            }
            else { this.props.gotoPreviosuPageMethod(); }

    }


    populateOptions = () => {
        if (!this.state.isPopulated) {
            if (this.props.score_card_Q)
                if (this.props.score_card_Q.loan_scoreQ_status == loanOnboardingConstants.LOAN_SCORECARD_QUESTION_SUCCESS) {
                    var data = {
                        ...this.props.score_card_Q.loan_scoreQ_data.data.response.Response
                    }

                    this.setState({
                        EducationQualifications: data.EducationQualifications,
                        YearsOfExperience: data.YearsOfExperience,
                        NumberOfDependants: data.NumberOfDependants,
                        isPopulated: true
                    })
                }
        }
    }

    mapToLabelValuePair = (arrayToMap) => {
        var newArray = [];
        arrayToMap.map((entry, key) => {
            var obj = {
                label: entry.Text,
                value: entry.Id
            }
            newArray.push(obj);
        })
        return newArray;
    }

    getScoreCardQuestionPendingStatus = () => {
        if (this.props.score_card_Q)
            if (this.props.score_card_Q.loan_scoreQ_status == loanOnboardingConstants.LOAN_SCORECARD_QUESTION_PENDING)
                return true;
            else return false;
    }

    getScoreCardAnswerPendingStatus = () => {
        if (this.props.score_card_A)  //loanOnboardingConstants.LOAN_SCORECARD_ANSWER_SUCCESS
            if (this.props.score_card_A.loan_scoreA_status == loanOnboardingConstants.LOAN_SCORECARD_ANSWER_PENDING)
                return true;
            else return false
    }

    QualificationChangeHandler = (QualificationSelected) => {
        this.setState({ selectedQualification: QualificationSelected })
    }

    NumberOfDependantsChangeHandler = (SelectedNod) => {
        this.setState({ selectedDependant: SelectedNod });
    }

    selectedYOEChangeHandle = (selectedYOE) => {
        this.setState({ selectedYOE: selectedYOE });
    }

    submitScoreCardAnswer = (e) => {
        e.preventDefault();
        this.props.dispatch(actions.postScoreCardAnswer(this.state.user.token, {
            YearsOfExperienceId: this.state.selectedYOE.value,
            EducationQualificationLevelId: this.state.selectedQualification.value,
            NumberOfDependantId: this.state.selectedDependant.value
        }));
    }

    gotoNextPage = () => {
        if (this.props.score_card_A)  //loanOnboardingConstants.LOAN_SCORECARD_ANSWER_SUCCESS
            if (this.props.score_card_A.loan_scoreA_status == loanOnboardingConstants.LOAN_SCORECARD_ANSWER_SUCCESS
                // || this.props.score_card_A.loan_scoreA_status == loanOnboardingConstants.LOAN_SCORECARD_ANSWER_FAILURE
                ) {
                // this.props.history.push(this.props.forwardUrl);
                history.push(this.props.forwardUrl);
                // this.props.gotoNextPageMethod();
            }
    }

    //Modal Methods
    PopupModal = () => {
        if (this.props.alert) {
            if (this.props.alert.status_code && !this.state.modalFired) {
                // console.log(this.props.alert);
                // console.log(this.props.alert.status_code);
                if (this.props.alert.status_code == 400)
                    this.controlModal();
                this.setState({ modalFired: true })
            }
        }
    }

    //Modal Methods
    controlModal = () => {
        this.setState({ openModal: !this.state.openModal });
    }

    SubmitModal = () => {
        this.props.dispatch(actions.clearLoanOnboardingStore());
        this.props.gotoDashBoard();
    }

    //Modal Methods ends

    render() {
        const { YearsOfExperience, NumberOfDependants, EducationQualifications, selectedQualification, selectedDependant, selectedYOE } = this.state;
        this.PopupModal();
        return (
            <Fragment>
                {this.populateOptions()}
                {this.gotoNextPage()}
                <div className="col-sm-12">
                    <div className="max-500">
                        <div className="loan-header-text text-center">
                            <h4 className="text-black">Score Card</h4>
                            <p>You're almost there. Tell us a bit more about you.</p>
                        </div>
                        <div className="al-card no-pad">
                            {this.props.alert && this.props.alert.message &&
                                <div className={`info-label ${this.props.alert.type}`}>{this.props.alert.message}</div>
                            }
                            <div className="transfer-ctn">
                                <form onSubmit={this.submitScoreCardAnswer}>
                                    <div className="input-ctn">
                                        <label>1. Educational Qualification</label>
                                        <Select
                                            disabled={this.getScoreCardQuestionPendingStatus()}
                                            value={selectedQualification}
                                            onChange={this.QualificationChangeHandler}
                                            options={this.mapToLabelValuePair(EducationQualifications)}
                                            placeholder={this.getScoreCardQuestionPendingStatus() ? "Loading..." : "Select"}
                                        />
                                        {/* {this.state.validation.networkSelector.hasError ? <small className="text-danger">{this.state.validation.networkSelector.error}</small> : null} */}
                                    </div>

                                    <div className="input-ctn">
                                        <label>2. Number of dependants</label>
                                        <Select
                                            disabled={this.getScoreCardQuestionPendingStatus()}
                                            value={selectedDependant}
                                            onChange={this.NumberOfDependantsChangeHandler}
                                            options={this.mapToLabelValuePair(NumberOfDependants)}
                                            placeholder={this.getScoreCardQuestionPendingStatus() ? "Loading..." : "Select"}
                                        />
                                    </div>

                                    <div className="input-ctn">
                                        <label>3. Number of years of experience in jobs</label>
                                        <Select
                                            disabled={this.getScoreCardQuestionPendingStatus()}
                                            value={selectedYOE}
                                            onChange={this.selectedYOEChangeHandle}
                                            options={this.mapToLabelValuePair(YearsOfExperience)}
                                            placeholder={this.getScoreCardQuestionPendingStatus() ? "Loading..." : "Select"}
                                        />
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <center>
                                                <button type="submit" disabled={this.getScoreCardAnswerPendingStatus()}
                                                    className="btn-alat m-t-10 m-b-20 text-center" >{this.getScoreCardAnswerPendingStatus() ? "Processing..." : "Proceed"}</button>
                                            </center>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {/* <center>
                            <Link to={"/loan/"} className="add-bene m-t-50">Go Back</Link>
                        </center> */}
                    </div>
                </div>
                <ExtendModal openModal={this.state.openModal} onCloseModal={this.controlModal} showCloseIcon={false}
                    IsSuccess={this.state.IsSuccess} message={this.props.alert.message} SubmitAction={this.SubmitModal}
                />
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        alert: state.alert,

        loan_reqStat: state.loanOnboardingReducerPile.loanOnboardingRequestStatement,
        loan_genStat: state.loanOnboardingReducerPile.loanOnboardingGenerateStatement,
        salary_trans: state.loanOnboardingReducerPile.loanOnboardingSalaryTransaction,
        salary_entry: state.loanOnboardingReducerPile.loanSalaryEntryReducer,
        score_card_Q: state.loanOnboardingReducerPile.loanGetScoreCardQuestion,
        score_card_A: state.loanOnboardingReducerPile.loanPostScoreCardAnswer,
        loan_status: state.loanReducerPile.loanAppStatus,
    }
}

export default connect(mapStateToProps)(ScoreCard);