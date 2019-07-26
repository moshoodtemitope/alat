import * as React from "react";
import {Router, NavLink} from "react-router";
// import * as utils from "../../shared/utils";

import {Fragment} from "react";
import { Link } from 'react-router-dom';
import {connect} from "react-redux";
import Select from 'react-select';
import Modal from 'react-responsive-modal';
import {Textbox} from "react-inputs-validation";
const options = [
];

class TransactionHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
        };
        
    }

    componentDidMount() {
    }

    renderTopUpCard(){
        return(
            <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="max-600">
                                <div className="al-card no-pad">
                                    <div className="sub-tab-nav">
                                    <ul>
                                        <li> <Link to={'virtual-cards'}>Top Up</Link></li>
                                        <li> <Link to={'virtual-cards/history'}> Transaction History</Link></li>
                                        <li> <Link to={'virtual-cards/history'}>Liquidate Card</Link></li>
                                        <li> <Link to={'virtual-cards/delete'}>Delete Card</Link></li>
                                    </ul>
                                    </div>
                                    <div className="transfer-ctn">
                                        <form>
                                            History
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* here down */}
                </div>
        )
    }

    
    render() {
        

        return (
            <Fragment>
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="max-600">
                                <div className="al-card no-pad">
                                    <div className="sub-tab-nav inpage-nav">
                                        <ul>
                                            <li> <Link to={'/virtual-cards'}>Top Up</Link></li>
                                            <li> <Link to={'/virtual-cards/history'}> Transaction History</Link></li>
                                            <li> <Link to={'/virtual-cards/liquidate'}>Liquidate Card</Link></li>
                                            <li> <Link to={'/virtual-cards/delete'}>Delete Card</Link></li>
                                        </ul>
                                    </div>
                                    <div className="transfer-ctn">
                                        <form>
                                           history
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}


function mapStateToProps(state){
    return {
       
    };
}

export default connect(mapStateToProps)(TransactionHistory);
