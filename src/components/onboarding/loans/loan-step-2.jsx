import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../redux/actions/onboarding/loan.actions';
import { loanOnboardingConstants } from '../../../redux/constants/onboarding/loan.constants';
import LoanOnboardingContainer from './loanOnboarding-container';
import  SliderComponent  from '../../../shared/components/sharedSlider';
import { dispatch } from 'rxjs/internal/observable/range';

class LoanOboardingStep2 extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            Term : "",
            LoanAmount: "",
            repaymentAmount: "",
        }
        //this.init();
    }

    init(){
        if(this.props.loan_step1.loan_step1_status != loanOnboardingConstants.LOAN_STEP1_SUCCESS)
        this.props.history.push("/loan/step-1");
    }

    SliderChange=(e)=>{
        this.setState({Term : e[0]})
    }
    handleAmount = (e)=>{
        this.setState({ LoanAmount : e.target.value });
    }

    LoanAplyClick=()=>{
       this.props.dispatch(actions.loanOnbaordingStep2({"LoanAmount" : this.state.LoanAmount, "Term" : this.state.Term}));
    }

    goToStep3=()=>{
        console.log(this.props.loan_step2);
        if(this.props.loan_step2)
        if(this.props.loan_step2.loan_step2_status == loanOnboardingConstants.LOAN_STEP2_SUCCESS){
            return(<Redirect to="/loan/step-3"/>);
        }
    }

    render() {

        const { LoanAmount, Term } = this.state;
        var sliderStyle = {

        };
        
        return (<LoanOnboardingContainer>
            {this.goToStep3()}
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
                                <p>How much do you want to borrow? (max N2million)</p>
                                <div className="input-ctn">
                                    <span className="input-span">N</span>
                                    <input value={LoanAmount} className="input-borderless"
                                     onChange={this.handleAmount}
                                     type="text" />
                                </div>
                                <p>Payment Terms(months) <span>{this.state.Term}</span></p>
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
                                <h3 className="text-white m-b-55">N72,000.00</h3>
                                <span className="al-text">Please note that the loan is granted based on your
                                    credit score rating.
                                    Other relivant information can be provided here.
											</span>
                            </div>
                            <div className="row loan-btn">
                                <a onClick={this.LoanAplyClick} style={{cursor : 'pointer'}}><button className="btn-alat m-t-10 text-center"
                                    type="submit">Apply for Loan</button></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LoanOnboardingContainer>);
    }

}
function mapStateToProps(state) {
    return {
        alert: state.alert,
        loan_step1: state.loanOnboardingReducerPile.loanOnboardingStep1,
        loan_step2: state.loanOnboardingReducerPile.loanOnbaordingStep2
    };
}
export default connect(mapStateToProps)(LoanOboardingStep2);