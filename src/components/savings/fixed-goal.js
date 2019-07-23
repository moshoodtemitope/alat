import * as React from "react";
import {Fragment} from "react";
import InnerContainer from '../../shared/templates/inner-container';
import SavingsContainer from './container';
import {NavLink, Route} from "react-router-dom";
import {Switch} from "react-router";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";







class FixedGoal extends React.Component {

    constructor(props){
        super(props)
        this.state={
            startDate:null,
            endDate:null,
            stdInvalid:false,
            edtInvalid:false,


        }
      

    }

    validateStartDate=()=>{
        if(this.state.startDate == null){
            this.setState({stdInvalid: true});
            return true;
        }
            else {this.setState({stdInvalid : false});
        return false;
        }
    }
    validateEndDate=()=>{
        if(this.state.endDate == null){
            this.setState({edtInvalid: true});
            return true;
        }
            else {this.setState({edtInvalid : false});
        return false;
        }
    }


    render() {
        const {startDate,endDate,stdInvalid,edtInvalid} = this.state;

        return (
            <Fragment>
                <InnerContainer>
                    <SavingsContainer>
                        <div className="row">
                            <div className="col-sm-12">
                                <p className="page-title">Savings & Goals</p>
                            </div>
                            <div className="col-sm-12">
                                <div className="tab-overflow">
                                    <div className="sub-tab-nav">
                                        <ul>
                                            <li><a href="accounts.html" className="active">Goals</a></li>
                                            <li><a href="statement.html">Group Savings</a></li>
                                            <li><a href="#">Investments</a></li>
                                        
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="row">
                                    <div className="col-sm-12">
                                      <div className="max-600">
                                       <div className="al-card no-pad">
                                       <h4 className="m-b-10 center-text hd-underline">Create a Fixed Goal</h4>
                                       <p className="header-info">Save daily, weekly or monthly towards a target amount, earn <span style={{color:"#AB2656"}}> 10% interest p.a </span> No withdrawal allowed and you will lose your interest if you dont meet your target</p>

                                            <form onSubmit={this.handleSubmit}>
                                                <div className="form-group">
                                                    <label>Give your goal a name</label>
                                                    <input type="text" className="form-control"  placeholder="Dubai Goal"/>
                                                    </div>
                                                <div className="form-row">
                                                    <div className={ !stdInvalid ? "form-group col-md-6" : "input-ctn form-error"}>
                                                        <label className="label-text">When would you like to start</label>
                                                        <DatePicker className="form-control" selected={startDate} 
                                                        placeholder="October 31, 2017"
                                                        dateFormat=" MMMM d, yyyy"
                                                        showMonthDropdown
                                                        showYearDropdown
                                                        dropdownMode="select"
                                                        maxDate={new Date()}
                                                        />
                                                        {stdInvalid &&
                                                            <div className="text-danger">select a valid date</div>}
                                                    </div>
                                                    <div className={ !edtInvalid ? "form-group col-md-6" : "input-ctn form-error"}>
                                                        <label className="label-text">When do you want to achieve this</label>
                                                        <DatePicker selected={endDate} className="form-control"  placeholder="October 31, 2017"
                                                        showMonthDropdown
                                                        showYearDropdown
                                                        dropdownMode="select"
                                                        maxDate={new Date()}
                                                        />
                                                        {edtInvalid &&
                                                            <div className="text-danger">select a valid date</div>}
                                                        </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group col-md-6">
                                                        <label className="label-text">How much would you like to save</label>
                                                        <input type="text" className="form-control"  placeholder="E.g. ₦100,000"/>
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <label className="label-text">How often do you want to save</label>
                                                        <Select type="text"  placeholder="October 31, 2017"/>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <center>
                                                            <button type="submit" onClick={this.continueTransfer} className="btn-alat m-t-10 m-b-20 text-center">Next</button>
                                                        </center>
                                                    </div>
                                                </div>
                                            
                                            
                                            
                                            
                                            
                                            </form>

                                            
                                            
                                        </div>

                                       
                                       </div>
                                      
                                      </div>
                                    
                                </div>
                            
                            </div>
                        
                        </div>

                    
                    </SavingsContainer>

                </InnerContainer>


            </Fragment>
        );
    }
}
export default FixedGoal;
