import React, {Fragment} from 'react';
import {connect} from 'react-redux';

import fundwema from '../../assets/img/fund-wema.svg';
import fundwemaHover from '../../assets/img/fund-wema-white.svg';
import creditcard from '../../assets/img/credit-card.svg';
import creditcardHover from '../../assets/img/credit-card-white.svg';
import fundworld from '../../assets/img/fund-world.svg';
import fundworldHover from '../../assets/img/fund-world-white.svg';
import {Link} from 'react-router-dom';

class FundAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state= {

        };
    }

    onNavigate=()=>{
        this.props.history.push("/fund/wema");
    }

    render(){
        return(<div className="al-card fund-al-card no-pad">
        <h4 className="m-b-10 center-text hd-underline">Select Funding Option</h4>

        <div className="fund-option-ctn" >
            <div className="fund-option" onClick={this.onNavigate}>
                <i className="toshow"><img src={fundwema}/></i>
                <i className="hoveraction"><img src={fundwemaHover}/></i>
                <p>Fund from WEMA account</p>
            </div>
            {/* <div className="fund-option">
                  <i className="toshow"><img src={creditcard}/></i>
                  <i className="hoveraction"><img src={creditcardHover}/></i>
              <p>Fund from other banks</p>
          </div> */}

          <div className="fund-option" onClick={()=>this.props.history.push("/fund/card")}>
                  <i className="toshow"><img src={fundworld}/></i>
                  <i className="hoveraction"><img src={fundworldHover}/></i>
              <p>Fund from cards</p>
          </div>
      </div>
    </div>);
    }
}

function mapStateToProps(state){
    // const { authentication } = state;
    // const { user } = authentication;
    return {
        state : state
   };
}

export default connect(mapStateToProps)(FundAccount);