
import React, { Component } from 'react'
import phoneimg from "../../../assets/img/phone-airtime.svg"
import {connect} from "react-redux";
import { getAirtimeBeneficiaries } from "../../../redux/actions/airtime-bill/airtime.action";

class Airtime extends Component {

    componentDidMount(){
        this.fetchAirtimeBeneficiaries();
    }

    fetchAirtimeBeneficiaries(){
        const { dispatch } = this.props;
        // console.log(this.props);
        dispatch(getAirtimeBeneficiaries(this.props.user.token));
    }

    render() {
        return (
            <div className="col-sm-12">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="max-600 m-t-40">
                            <center>
                                <img src={phoneimg} className="m-b-30"/>
                                <p className="grey-text no-paylink">No saved airtime recharge</p>

                                <a href="send-contact3.html"><button class="btn-alat">Buy Airtime</button></a>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log(state);
    const { authentication } = state;
    const { user } = authentication;
    return {
        user,
        //accounts: state.dashboard_accounts,
    };
}

export default connect(mapStateToProps)(Airtime);
//export default Airtime;