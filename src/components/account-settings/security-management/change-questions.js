import React, { Component, Fragment } from 'React';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Input } from '../../airtime-bills/data/input';
import Success from '../shared/success';

import { alertActions } from "../../../redux/actions/alert.actions";
import * as settingsActions from "../../../redux/actions/account-settings/export";

const pattern = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;
class ChangeQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // selectedAccounts: null,
            hasError: false,
            repeatQuestion: false,
            changeQuestionForm: {
                question1: {
                    elementType: 'select',
                    elementConfig: {
                        options: [],
                    },
                    label: 'Security Question 1',
                    value: '',
                    selectedOption: null,
                    loaded: false,
                },
                answer1: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: ''
                    },
                    value: '',
                    label: 'Answer',
                },
                question2: {
                    elementType: 'select',
                    elementConfig: {
                        options: [],
                    },
                    label: 'Security Question 2',
                    value: '',
                    selectedOption: null,
                    loaded: false,
                },
                answer2: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: ''
                    },
                    value: '',
                    label: 'Answer',
                },
                question3: {
                    elementType: 'select',
                    elementConfig: {
                        options: [],
                    },
                    label: 'Security Question 3',
                    value: '',
                    selectedOption: null,
                    loaded: false,
                },
                answer3: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: ''
                    },
                    value: '',
                    label: 'Answer',
                },
            },
            user: JSON.parse(localStorage.getItem("user")),
        };
    }


    componentDidMount() {
        // console.log(this.props.questionsData);
    }


    sortQuestionsForSelect = () => {
        var arrayToDisplay = [];
        // console.log(this.props.questionsData);
        // console.log("this.props.questionsData");
        this.props.questionsData.questions.map((data => arrayToDisplay.push({ value: data.question, label: data.question, id: data.id })));
        // console.log(arrayToDisplay)

        const updatedSelectOption = {
            ...this.state.changeQuestionForm
        }
        updatedSelectOption.question1.elementConfig.options = arrayToDisplay;
        updatedSelectOption.question2.elementConfig.options = arrayToDisplay;
        updatedSelectOption.question3.elementConfig.options = arrayToDisplay;
        updatedSelectOption.question1.loaded = true;
        if (this.props.questionsData.answeredQuestions && this.props.questionsData.answeredQuestions.length) {
            let counter = 1;
            let questionName = "";
            for (var data of this.props.questionsData.answeredQuestions) {
                questionName = "question" + counter;
                updatedSelectOption[questionName].selectedOption = { value: data.question, label: data.question, id: data.id }
                counter++;
                if (counter > 3) return;
            }
        }
        this.setState({ changeQuestionForm: updatedSelectOption });
    }

    accountChangedHandler = (selectedOption, selectIndentifier) => {
        // console.log(`Option selected:`, selectedOption);
        const updatedQuestionDataForm = {
                ...this.state.changeQuestionForm
            }
        const updatedSelectElement = {
            ...updatedQuestionDataForm[selectIndentifier]
        };
        updatedSelectElement.selectedOption = selectedOption;
        updatedQuestionDataForm[selectIndentifier] = updatedSelectElement;
        this.setState({ changeQuestionForm: updatedQuestionDataForm, repeatQuestion : false });
    }


    inputChangedHandler = (event, inputIdentifier) => {
        if (this.props.alert.message) this.props.clearError();
        const updatedQuestionDataForm = {
            ...this.state.changeQuestionForm
        }
        const updatedFormElement = {
            ...updatedQuestionDataForm[inputIdentifier]
        };

        if (event.target.value.length > 40 || (!pattern.test(event.target.value) && event.target.value != '')) {
            return;
        }
        if (this.state.hasError) this.setState({ hasError: false });
        updatedFormElement.value = event.target.value;
        updatedQuestionDataForm[inputIdentifier] = updatedFormElement;
        this.setState({ changeQuestionForm: updatedQuestionDataForm });
    }

    goHome = (event) => {
        event.preventDefault();
        if(this.props.questionsData) this.props.clearQuestionData();
        this.props.resetPageState();
    }

    goBack = (event) => {
        event.preventDefault();
        this.props.history.goBack();
    }

    onSubmitForm = (event) => {
        event.preventDefault();
        if (this.props.alert.message) this.props.clearError();
        let data = [];
        let answer = ""

        for (var input in this.state.changeQuestionForm) {
            if (input == "question1" || input == "question2" || input == "question3") {
                if (this.state.changeQuestionForm[input].selectedOption != null) {
                    answer = "answer" + input.replace(/\D/g, '');
                    if(this.state.changeQuestionForm[answer].value != ""){
                        data.push({
                            question: this.state.changeQuestionForm[input].selectedOption.value,
                            answer: this.state.changeQuestionForm[answer].value,
                            id: this.state.changeQuestionForm[input].selectedOption.id
                        })
                    }
                }
            } else {
                continue;
            }

        }
        if (data.length < 1) {
            this.setState({ hasError: true })
            return;
        }
        if(data.length > 1){
            let arr;
            for(var selected in data){
                arr = data.filter(x => selected.value == x.value );
                if (arr.length > 1){
                    this.setState({repeatQuestion: true});
                    return;
                }
            }
        }

        let payload = {
            securityQuestion: data
        }
        this.props.saveSecurityQuestion(this.state.user.token, payload, this.props.clearQuestionData);
        // console.log(payload);
    }




    render() {
        let form = <Redirect to="/settings/security-questions" />
        if (this.props.questionsData) {
            const formElementArray = [];
            let counter = 1;
            for (let key in this.state.changeQuestionForm) {
                formElementArray.push({
                    id: key,
                    config: this.state.changeQuestionForm[key],
                    position: counter
                });
                counter++;
            }
            if (this.props.questionsData && !this.state.changeQuestionForm.question1.loaded) {
                this.sortQuestionsForSelect();
            }

            form = (
                <Fragment>

                    <div className="col-sm-12">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="max-600">
                                    <div className="al-card no-pad">
                                        <h4 className="m-b-10 center-text hd-underline">Security Questions</h4>
                                        <div className="transfer-ctn">
                                            <form>
                                                {(this.props.alert.message) ?
                                                    <div className="info-label error">{this.props.alert.message}</div> : null
                                                }
                                                {formElementArray.map((formElement) => {
                                                    if (formElement.config.elementType !== "input") {
                                                        return (
                                                            <div className="input-ctn" key={formElement.id}>
                                                                <label>{formElement.config.label}</label>
                                                                <Select key={formElement.id}
                                                                    value={formElement.config.selectedOption == null ? [] : formElement.config.selectedOption}
                                                                    onChange={(selected) => this.accountChangedHandler(selected, formElement.id)}
                                                                    options={formElement.config.elementConfig.options}
                                                                    placeholder={formElement.config.elementConfig.options.length > 0 ? "Select..." : "Loading Questions..."}
                                                                />
                                                                {/* {this.state.validation.accountError.hasError ? <small className="text-danger">{this.state.validation.accountError.error}</small> : null} */}
                                                            </div>
                                                        )
                                                    };
                                                    return (
                                                        <div className="input-ctn" key={formElement.id}>
                                                            <label>{formElement.config.label}</label>
                                                            <Input
                                                                elementType={formElement.config.elementType}
                                                                elementConfig={formElement.config.elementConfig}
                                                                value={formElement.config.value}
                                                                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                                                                isDisabled={this.state.changeQuestionForm["question" + (formElement.position / 2)].selectedOption == null}
                                                            />
                                                            {/* {this.state.validation.pinError.hasError ? <small className="text-danger">{this.state.validation.pinError.error}</small> : null} */}
                                                        </div>
                                                    )

                                                })}



                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <center>
                                                            {this.state.hasError ? <span className="text-danger">Please pick and answer atleast one security question</span> : null}
                                                            
                                                            {this.state.repeatQuestion ? <span className="text-danger">You can't select a question twice</span> : null}
                                                            <button disabled={this.props.fetching} onClick={this.onSubmitForm} style={{ width: "100%" }} className="btn-alat m-t-10 m-b-20 text-center">{this.props.fetching ? "Processing..." : "Confirm"}</button>
                                                        </center>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>

                                    <center>
                                        <button onClick={this.goBack} className="add-bene m-t-50 goback">Go Back</button>
                                    </center>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>

            );
        }
        if (this.props.pageState == 0) {
            form = <Success
                message="Security question(s) updated successfully"
                homeUrl="/settings/security-questions"
                isActionButton={true}
                clicked={this.goHome}
            />
        }
        return form;
    }
}

const mapStateToProps = state => {
    return {
        alert: state.alert,
        fetching: state.settings_reducer.isFetching,
        pageState: state.settings_reducer.pageState,
        questionsData: state.settings_reducer.questionsData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetPageState: () => dispatch(settingsActions.resetPageState()),
        saveSecurityQuestion: (token, payload, callback) => dispatch(settingsActions.saveSecurityQuestion(token, payload, callback)),
        clearQuestionData: () => dispatch(settingsActions.clearQuestionData()),
        clearError: () => dispatch(alertActions.clear()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeQuestion);
