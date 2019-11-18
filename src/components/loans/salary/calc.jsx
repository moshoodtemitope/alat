import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/loans/loans.action';
import { loanConstants } from '../../../redux/constants/loans/loans.constants';

import LoanEstimator from '../../../shared/components/loans/calculator';

class LoanCalculator extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user : JSON.parse(localStorage.getItem("user")),
            MaxAmount : "",
            InterestRate: "",
            isDataInit: false,
            MinimumLoanAmount: ""
        }
    }
    componentDidMount=()=>{
        //this.init();
    }

    LoanApplyClick = (loanInput) => {
       var data = {
            LoanTenure: loanInput.Term,
            LoanAmount: loanInput.LoanAmount,
          };
        this.props.dispatch(actions.loanApply(this.state.user.token, data));
    }

    init = () => {
        this.props.dispatch(actions.loanCalcData(this.state.user.token));
    }

    setLoanCalculatorData=()=>{
      if(this.props.loan_data)
      if(this.props.loan_data.loan_calcData_status == loanConstants.LOAN_CALC_DATA_SUCCESS && !this.state.isDataInit){
          var data= {
              ...this.props.loan_data.loan_calcData_data.response.Response
          };
        //   console.log(data);
          this.setState({ MaxAmount : data.MaximumLoanAmount, MinimumLoanAmount: data.MinimumLoanAmount, InterestRate : data.InterestRate, isDataInit : true },()=>{ return true; });
      }
    }

    goToNextPage=()=>{
        if(this.props.loan_apply)
        if(this.props.loan_apply.loan_apply_status == loanConstants.LOAN_APPLY_SUCCESS){
            this.props.history.push("/loans/salary/employer"); //update path
        }
    }



    render() {
       
        return (
            <div className="max-750">
                 {/* {this.setLoanCalculatorData()} */}
                 {this.goToNextPage()}
                <LoanEstimator
                    LoanApplyClick={this.LoanApplyClick}
                    setLoanCalculatorDataFunc = {this.setLoanCalculatorData }
                    maxAmount = { this.state.MaxAmount}
                    interestRate = { this.state.InterestRate}
                    minimumLoanAmount ={this.state.MinimumLoanAmount }
                    init={this.init}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        alert: state.alert,
        loan_data: state.loanReducerPile.loanCalcData,
        loan_apply: state.loanReducerPile.loanApply,
    }
}

export default connect(mapStateToProps)(LoanCalculator);