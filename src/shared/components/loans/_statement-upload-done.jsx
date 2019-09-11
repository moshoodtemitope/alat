import React, { Fragment } from 'react';

import Select from 'react-select';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import * as actions from '../../../redux/actions/loans/loans.action';
import { loanConstants } from '../../../redux/constants/loans/loans.constants';
import * as util from '../../utils';

class StatementUploadDone extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    doneClick =()=>{
        this.props.gotoDashboard();
    }

    render() {
        return(
        <div className="row">
            <div className="col-sm-12">
                <div className="max-460">
                    <div className="loan-header-text text-center">
                        {/* {this.state.data.Message && <h4 className="text-black"><span>{this.state.data.Message}</span><br /><span></span></h4>} */}
                        <h4 className="text-black"><span>Your statement has been uploaded and is currently being reviewed. 
                            You will see your progress status on your loan dashboard</span><br /><span></span></h4>
                        {/* <p>Thank you for choosing ALAT Salary Loans.</p> */}
                    </div>

                    <div className="row">
                        <div className="col-sm-12">
                            <center>
                                <button type="button" onClick={this.doneClick}
                                    className="btn-alat m-t-10 m-b-20 text-center">Done</button>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }

}

export default StatementUploadDone;