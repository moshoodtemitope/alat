import React, { Component, Fragment } from 'React';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import atmLogo from '../../../assets/img/cardless-atm.svg';
import * as actions from '../../../redux/actions/cardless-withdrawal/export';
import Modal from 'react-responsive-modal';
import { formatAmountNoDecimal } from '../../../shared/utils';


class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
        };
    }

    componentDidMount() {
        this.props.fetchUnexpiredPaycodes(this.state.user.token);
    }

    convertSeconds = (remainingseconds) => {
        let remaining;
        let hours = Math.floor(remainingseconds / 3600000);
        remaining = remainingseconds - (hours * 3600000);
        let minutes = Math.floor(remaining / 60000);
        remaining = remaining -(minutes * 60000);
        let sec = Math.floor(remaining / 1000);
        var value = (hours > 0 ? hours + (hours > 1 ? "hrs " : "hr ") : "") + minutes + (minutes > 1 ? "mins" : "min") ;
        return value;
    }

    render() {
        let index = (
            <div className="col-sm-12">
                <div className="max-600 m-t-40">
                    <center>
                        <img src={atmLogo} className="m-b-30" alt="Atm Logo" />
                        <p className="grey-text no-paylink">{this.props.isFetching ? "Loading active paycodes..." : (this.props.alert.message ? <p><span style={{ color: "red" }}>{this.props.alert.message}</span><span onClick={() => { this.props.fetchUnexpiredPaycodes(this.state.user.token); }} style={{ textDecoration: "underline", cursor: "pointer" }}> Click here to try again</span></p> : "No active paycode")}<span>Withdraw and spend cash without your card</span></p>
                        <Link to={'/cardless-withdrawal/create'} className="btn-alat">Create Paycode</Link>
                    </center>
                </div>
            </div>);
            var today = new Date(Date.now());
        if (this.props.paycodes.length > 0) {
            index = (
                <Fragment>
                    <div className="col-sm-12 mb-3">
                        <div className="row">
                            <div className="col-sm-12">
                                <Link to={'/cardless-withdrawal/create'} className="btn-alat">Create Paycode</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div className="row">
                            {
                                this.props.paycodes.map((paycode, counter) => {
                                    var expiryDate = new Date(paycode.ExpiryDate)
                                    var toExpire = expiryDate - today;
                                    var value = this.convertSeconds(toExpire)
                                    return (
                                        <div className="col-sm-12 col-md-4" key={counter + 1}>
                                            <div className="al-card no-pad paylink-card">
                                                <div className="name-amount clearfix">
                                                    <p className="pl-name-email">{paycode.PayCode}<span>ATM</span></p>
                                                    <p className="pl-amount">{paycode.Amount}</p>
                                                </div>
                                                <div className="pl-status clearfix">
                                                    <p className="pl-act-status"><span className="atm-pending">Pending</span></p>
                                                    <p className="pl-expire">Expires in {value}</p>
                                                </div>
                                            </div>
                                        </div>)
                                })
                            }
                        </div>
                    </div>
                </Fragment>
            );
        }
        return (
            <Fragment>
                {index}
            </Fragment>
        )
    }
}



const mapStateToProps = state => {
    return {
        paycodes: state.cardless_reducer.paycodes,
        fetching: state.data_reducer.isFetching,
        alert: state.alert,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUnexpiredPaycodes: (token) => dispatch(actions.fetchAllUnexpiredPaycodes(token))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
