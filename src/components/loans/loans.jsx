import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import fundwema from '../../assets/img/fund-wema.svg';
import fundwemaHover from '../../assets/img/fund-wema-white.svg';

import fundworld from '../../assets/img/fund-world.svg';
import fundworldHover from '../../assets/img/fund-world-white.svg';


class Loans extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    onNavigate = () => {
        // this.props.history.push("/fund/wema");
    }

    render() {
        return (
            <div className="max-600">
                <div className="al-card fund-al-card no-pad">
                    <h4 className="m-b-10 center-text hd-underline">Select Funding Option</h4>

                    <div className="fund-option-ctn" >
                        <div className="fund-option" onClick={this.onNavigate}>
                            <i className="toshow"><img src={fundwema} /></i>
                            <i className="hoveraction"><img src={fundwemaHover} /></i>
                            <p>Goal Based Loan</p>
                        </div>
                        {/* <div className="fund-option">
                  <i className="toshow"><img src={creditcard}/></i>
                  <i className="hoveraction"><img src={creditcardHover}/></i>
              <p>Fund from other banks</p>
          </div> */}

                        <div className="fund-option" onClick={() => { this.props.history.push("/loans/salary/dashboard") }}>
                            <i className="toshow"><img src={fundworld} /></i>
                            <i className="hoveraction"><img src={fundworldHover} /></i>
                            <p>Salary based Loan</p>
                        </div>
                    </div>
                </div>
            </div>);
    }
}

function mapStateToProps(state) {
    // const { authentication } = state;
    // const { user } = authentication;
    return {
        state: state
    };
}

export default connect(mapStateToProps)(Loans);