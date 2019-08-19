import React from 'react';

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
                                    <div className="no-pad text-center" style={{ padding: "0 10px 10px 10px" }}>
                                        <p className="s-info" style={{ color: "#A6A6A6" }}>To make your password secure, make sure you use <b>at least 8 characters</b> which <b>must include letters, numbers & special characters.</b></p>
                                    </div>
                                    {(this.props.alert.message) ?
                                        <div className="info-label error">{this.props.alert.message}</div> : null
                                    }
                                    {formElementArray.map((formElement) => {
                                        return (
                                            <div className="input-ctn" key={formElement.id}>
                                                <label>{formElement.config.label}</label>
                                                <Input
                                                    elementType={formElement.config.elementType}
                                                    elementConfig={formElement.config.elementConfig}
                                                    value={formElement.config.value}
                                                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                                                    wrongInput={!formElement.config.valid}
                                                    isTouched={formElement.config.touched}
                                                    errormsg={formElement.config.error}
                                                // isDisabled={formElement.config.isDisabled} 
                                                />

                                            </div>
                                        )

                                    })}

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