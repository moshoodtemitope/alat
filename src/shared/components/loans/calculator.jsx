import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../redux/actions/onboarding/loan.actions';
import { alertActions } from '../../../redux/actions/alert.actions'
import { loanOnboardingConstants } from '../../../redux/constants/onboarding/loan.constants';
//import LoanOnboardingContainer from './loanOnboarding-container';
import SliderComponent from '../sharedSlider';
//import { dispatch } from 'rxjs/internal/observable/range';
import * as util from '../../utils'

class LoanEstimator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // Term: 6,
            Term: 0,
            LoanAmount: "",
            LoanAmountText: "",
            repaymentAmount: "",
            MaxAmount: "",
            PhoneNumber: "",
            InterestRate: "",
            LoanAmountInvalid: false,
            isSubmitted: false,
            applyButtonDisabled : false
        }
    }

    componentDidMount = () => {
        this.init();
    }

    init=()=>{
        this.props.init();
    }

    SliderChange = (e) => {
        this.setState({ Term: e[0] }, this.updateRepayment())
        if (this.state.isSubmitted)
            if (e[0] > 0) {
                this.props.dispatch(alertActions.clear());
            }
    }

    handleAmount = (e) => {
        // console.log
        var intVal = e.target.value.replace(/,/g, '');
        if (/^\d+(\.\d+)?$/g.test(intVal)) {
            // if (parseInt(intVal, 10) <= 2000000) {
            this.setState({ LoanAmount: intVal, LoanAmountText: this.toCurrency(intVal) },
                () => this.updateRepayment());
            // }
        } else if (e.target.value == "") {
            this.setState({ LoanAmount: "", LoanAmountText: "" },
                () => this.updateRepayment());
        }

        if (this.state.isSubmitted == true)
            if (this.state.LoanAmount > 0 || this.state.LoanAmount <= this.props.MaxAmount) {
                this.setState({ LoanAmountInvalid: false })
            }
    }

    toCurrency(number) {
        // console.log(number);
        const formatter = new Intl.NumberFormat('en-US', {
            style: "decimal",
            currency: "USD",
            maximumFractionDigits: 2
        });

        return formatter.format(number);
    }

    LoanAplyClick = () => {
        this.setState({ isSubmitted: true });
        if (this.state.Term >= 1) {
            if (this.state.LoanAmount >= this.props.minimumLoanAmount && this.state.LoanAmount <= this.props.maxAmount) {
                this.setState({applyButtonDisabled :  true},()=>{
                    this.props.LoanApplyClick({
                        "LoanAmount": this.state.LoanAmount,
                        "Term": this.state.Term,
                        "PhoneNumber": this.state.PhoneNumber
                    });
                })
            } else {
                this.setState({ LoanAmountInvalid: true })
            }
        } else {
            this.props.dispatch(alertActions.error("You need to select at least a month on the slider"));
        }


    }

    updateRepayment = () => {
        this.setState({ repaymentAmount: this.CalculateMonthlyRepayment(this.state.LoanAmount, this.props.interestRate, this.state.Term) })
    }

    CalculateMonthlyRepayment(loanAmount, percentageInterestRate, numberOfPayments) {
        // rate of interest and number of payments for monthly payments
        var rateOfInterest = (percentageInterestRate/100) / 12;

        // loan amount = (interest rate * loan amount) / (1 - (1 + interest rate)^(number of payments * -1))
        var paymentAmount = (rateOfInterest * loanAmount) / (1 - Math.pow(1 + rateOfInterest, numberOfPayments * -1));
        return paymentAmount;
    }

    goToStep3 = () => {
        if (this.props.loan_step2)
            if (this.props.loan_step2.loan_step2_status == loanOnboardingConstants.LOAN_STEP2_SUCCESS) {
                return (<Redirect to="/loan/step-3" />);
            }
    }

    goToNextPage = () => {
        this.props.goToNextPage();
    }

    setLoanCalculatorData =()=>{
        this.props.setLoanCalculatorDataFunc()
            // this.setState({ InterestRate: this.props.InterestRate, MaxAmount : this.props.MaxAmount });
    }

    render() {

        const { LoanAmount, Term, LoanAmountText } = this.state;
        var sliderStyle = {

        };

        return (
            <Fragment>
                {/* {this.goToNextPage()} */}
                {this.setLoanCalculatorData()}
                <div className="col-sm-12">
                    <div className="max-750">
                        <div className="loan-header-text">
                            <h4 className="text-black">Try our loan calculator to see</h4>
                            <h4 className="text-black">What your payments could be</h4>
                            <p className="m-t-20 text-black">This gives you an estimate of what your monthly
                                repayment
										could be</p>
                        </div>
                        <div className="al-card loan-al-card row">
                            <div className="col-7">
                                <div className="inner-div right-inner-div">
                                    {this.props.alert && this.props.alert.message &&
                                        <div className={`info-label ${this.props.alert.type}`}>{this.props.alert.message}</div>
                                    }
                                    <p>How much do you want to borrow? (max {util.mapCurrency('NGN')}{util.formatAmountNoDecimal(this.props.maxAmount)})</p>
                                    <div className={this.state.LoanAmountInvalid ? "input-ctn form-error" : "input-ctn"}>
                                        <span className="input-span">{util.mapCurrency('NGN')}</span>
                                        <input value={this.state.LoanAmountText} className="input-borderless"
                                            onChange={this.handleAmount}
                                            maxLength={10}
                                            type="text" />
                                        {this.state.LoanAmountInvalid &&
                                            <div className="text-danger">{`Amount to borrow must be greater than ${util.formatAmount(this.props.minimumLoanAmount)} and not more than ${util.formatAmount(this.props.maxAmount)}`} </div>
                                        }
                                    </div>
                                    
                                    <p>Payment Terms(months) <span>{(this.state.Term>=1?this.state.Term:'')}</span></p>
                                    <div className="input-ctn">
                                        {/* <span className="input-span">N</span>
                                    <input className="input-borderless" type="text" /> */}
                                        <SliderComponent onUpdate={this.SliderChange} onChange={this.SliderChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-5 al-card-left">
                                <div className="inner-div m-b-20">
                                    <p className="m-b-0">Estimated monthly repayment</p>
                                    <h3 className="text-white m-b-55">{util.mapCurrency('NGN')}{util.formatAmount(this.state.repaymentAmount)}</h3>
                                    <span className="al-text">Please note that the salary based loan is granted based on your
                                        credit score rating.
                                        Other relevant information will be required. 
                                        {/* can be provided */}
											</span>
                                </div>
                                <div className="row loan-btn">
                                    <a onClick={this.LoanAplyClick} disabled={this.state.applyButtonDisabled} style={{ cursor: 'pointer' }}><button className="btn-alat m-t-10 text-center"
                                        type="submit">Apply for Loan</button></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>);
    }

}
function mapStateToProps(state) {
    return {
        alert: state.alert,
        loan_step1: state.loanOnboardingReducerPile.loanOnboardingStep1,
        loan_step2: state.loanOnboardingReducerPile.loanOnboardingStep2
    };
}
export default connect(mapStateToProps)(LoanEstimator);