import React, {Fragment} from 'react';

const securityQuestion = (props) => (
    <Fragment>

        <div className="col-sm-12">
            <div className="row">
                <div className="col-sm-12">
                    <div className="max-600">
                        <div className="al-card no-pad">
                            <h4 className="m-b-10 center-text hd-underline">{props.heading}</h4>
                            <div className="transfer-ctn">
                                <form>
                                    {(props.errorMessage) ?
                                        <div className="info-label error">{props.errorMessage}</div> : null
                                    }
                                    <div className="input-ctn">
                                        <label>Security Question</label>
                                        <input type="text" readOnly disabled value={props.question} />
                                    </div>
                                    <div className="input-ctn">
                                        <label>Security Answer</label>
                                        <input type="password" onChange={props.changed} value={props.answer} />
                                        {props.isEmpty ? <span className="text-danger">Please provide an answer</span> : null}
                                    </div>

                                    <div className="row">
                                        <div className="col-sm-12 m-b-20">
                                            <center>
                                                <button disabled={props.fetching} onClick={props.checkAnswer} className="btn-alat m-t-10 m-b-20 text-center">{props.fetching ? "Processing..." : "Continue"}</button>
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
    </Fragment>
)

export default securityQuestion;