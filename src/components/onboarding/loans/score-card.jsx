import React, { Fragment } from 'react';

import Select from 'react-select';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../redux/actions/onboarding/loan.actions';
import { loanOnboardingConstants } from '../../../redux/constants/onboarding/loan.constants';
import LoanOnboardingContainer from './loanOnboarding-container';

class LoanOnboardingScoreCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            // EducationQualifications : [],
            // YearsOfExperience: [],
            // NumberOfDependants: [],
            EducationQualifications: [
                // {
                //     "Id": 1,
                //     "Text": "Primary School"
                // },
                // {
                //     "Id": 2,
                //     "Text": "Secondary School"
                // },
                // {
                //     "Id": 3,
                //     "Text": "Diploma"
                // },
                // {
                //     "Id": 4,
                //     "Text": "Graduate"
                // },
                // {
                //     "Id": 5,
                //     "Text": "Post Graduate"
                // },
                // {
                //     "Id": 6,
                //     "Text": "Professional/Technhnical Degree"
                // }
            ],
            YearsOfExperience: [
                // {
                //     "Id": 1,
                //     "Text": "< 2 Years"
                // },
                // {
                //     "Id": 2,
                //     "Text": "2 - 5 Years"
                // },
                // {
                //     "Id": 3,
                //     "Text": "5 - 10 Years"
                // },
                // {
                //     "Id": 4,
                //     "Text": "10 - 15 Years"
                // },
                // {
                //     "Id": 5,
                //     "Text": "> 15 Years"
                // }
            ],
            NumberOfDependants: [
                // {
                //     "Id": 1,
                //     "Text": "No Dependants"
                // },
                // {
                //     "Id": 2,
                //     "Text": "1-2 Dependants"
                // },
                // {
                //     "Id": 3,
                //     "Text": "3-4 Dependants"
                // },
                // {
                //     "Id": 4,
                //     "Text": "> 4 Dependants"
                // }
            ],


            selectedDependant: null,
            selectedYOE: null,
            selectedQualification: null,
            isPopulated: false
        }
        //this.submitScoreCardAnswer = this.submitScoreCardAnswer.bind(this);
    }

    componentDidMount = () => {
        this.init();
    }

    init = () => {
        if (this.props.salary_entry)
            if (this.props.salary_entry.loan_salEnt_status == loanOnboardingConstants.LOAN_SALARYENTRY_SUCCESS) {
                this.props.dispatch(actions.getScoreCard(this.state.user.token));
            } else {
                return (this.props.history.push("/loan/salary-entry"));
            }
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
                        isPopulated : true
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

    getScoreCardAnswerPendingStatus =()=>{
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
                ||  this.props.score_card_A.loan_scoreA_status == loanOnboardingConstants.LOAN_SCORECARD_ANSWER_FAILURE) {
                this.props.history.push("/loan/card-result");
            }
    }

    render() {
        const { YearsOfExperience, NumberOfDependants, EducationQualifications, selectedQualification, selectedDependant, selectedYOE } = this.state;
        return (
            <LoanOnboardingContainer>
                {this.populateOptions()}
                {this.gotoNextPage()}
                <div className="col-sm-12">
                    <div className="max-500">
                        <div className="loan-header-text text-center">
                            <h4 className="text-black">Score Card</h4>
                            <p>Kindly select the answer that best describes you.</p>
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
            </LoanOnboardingContainer>
        );
    }
}

function mapStateToProps(state) {
    return {
        alert: state.alert,
        //loan_step2: state.loanOnboardingReducerPile.loanOnboardingStep2,
        //loan_val_otp: state.loanOnboardingReducerPile.loanOnboardingValidateOTP,
        //loan_bvn: state.loanOnboardingReducerPile.loanOnboardingBVN,
        //loan_step3: state.loanOnboardingReducerPile.loanOnboardingStep3,
        //bankList: state.transferReducerPile.transfer_bankList,
        loan_reqStat: state.loanOnboardingReducerPile.loanOnboardingRequestStatement,
        loan_genStat: state.loanOnboardingReducerPile.loanOnboardingGenerateStatement,
        salary_trans: state.loanOnboardingReducerPile.loanOnboardingSalaryTransaction,
        salary_entry: state.loanOnboardingReducerPile.loanSalaryEntryReducer,
        score_card_Q: state.loanOnboardingReducerPile.loanGetScoreCardQuestion,
        score_card_A: state.loanOnboardingReducerPile.loanPostScoreCardAnswer,
    }
}

export default connect(mapStateToProps)(LoanOnboardingScoreCard);