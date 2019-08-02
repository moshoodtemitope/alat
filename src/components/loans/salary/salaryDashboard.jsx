import React, { Fragment } from 'react';

class LoansDashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<Fragment>
            <div className="al-card">
                <div className="row">
                    <div className="col-sm-12">
                        <center>
                            <button type="submit" onClick={() => { this.props.history.push("/loans/salary/calc") }} className="btn-alat m-t-10 m-b-20 text-center">
                                New Loan
                                </button>
                        </center>
                    </div>
                </div>
            </div>
        </Fragment>);
    }

}

export default LoansDashboard;