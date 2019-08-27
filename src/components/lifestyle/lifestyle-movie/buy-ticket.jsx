import React, {Component, } from 'react';
import {Fragment} from 'react';
import {NavLink, Redirect} from "react-router-dom";
import SelectDebitableAccounts from "../../../shared/components/selectDebitableAccounts";
import {listStyleConstants} from "../../../redux/constants/lifestyle/lifestyle-constants";
import {connect} from "react-redux";
import {history} from "../../../_helpers/history";

// import {Description} from '../group/component'

import * as actions from "../../../redux/actions/lifestyle/movies-actions";


class BuyTicket extends Component {
    constructor(props){
        super(props);
        this.state={
            user: JSON.parse(localStorage.getItem("user")),
            accountToDebitInValid: false,
            accountToDebit:null,
            reason:3,
            isSubmit: false,
            formattedValue: "",
            goal:JSON.parse(localStorage.getItem('goal')) || [],


        };
        this.handleDebit = this.handleDebit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleDebit = (account) => {
        //console.log(account);
        this.setState({ accountToDebit: account });
        if (this.state.isSubmit) {
            if (account != "")
                this.setState({ accountToDebitInValid: false });
        }
    };
    validateAccountNumber(account, state) {
        if (account.length != 10) {
            this.setState({ [state]: true });
            return true;
        }
    }
    componentDidMount = () => {
        this.init();
    };

    init = () => {
        if (this.props.SubmitTicketData.message !== listStyleConstants.SUBMIT_MOVIE_TICKET_SUCCESS)
            this.props.history.push("/lifestyle/movie-details");
        else {
            let data = {
                ...this.props.SubmitTicketData.data.data
            };
            console.log('tag', data);

            this.setState({
                initialAdultAmount:data.initialAdultAmount,
                startDate: data.startDate,
                goalName:data.goalName,
                payOutInterest:data.payOutInterest,
                debitAccount:data.debitAccount,
            });
        }
    };



    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({isSubmit: true});
        if (this.validateAccountNumber(this.state.accountToDebit, "accountToDebitInValid")) {
            //not valid
        }else {
            let data={
                'goalId': parseInt(this.state.goal.id),
                'accountNumber':this.state.accountToDebit,
                'reason':this.state.reason
            };
            this.props.dispatch(actions.purchaseEventTicket(this.state.user.token, data));

        }
    };

    NavigateBack = () => {
        history.push('');
    }

    render() {
        return (
            <Fragment>

                    <div className="col-sm-12">
                        <p className="page-title">LifeStyle</p>
                    </div>

                    <div className="col-sm-12">
                        <div>
                            <div className="sub-tab-nav" style={{marginBottom: 10}}>
                                <ul>
                                    <li><NavLink to={'/lifestyle/movie'}>Movies</NavLink></li>
                                    <li><NavLink to={'/lifestyle/event'}>Event</NavLink></li>
                                    <li><NavLink to={'/lifestyle/preference'}>Preference</NavLink></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                        {this.props.alert && this.props.alert.message &&
                        <div style={{width: "100%", marginRight:"120px",marginLeft:"120px"}} className={`info-label ${this.props.alert.type}`}>{this.props.alert.message}</div>
                        }
                        <div className="col-sm-12">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="max-600">

                                        <div className="al-card no-pad">
                                            <h4 className="m-b-10 center-text hd-underline">Review Transfer</h4>

                                            <form onSubmit={this.handleSubmit}>
                                    
                                                <div className="form-group">
                                                       <div className="puchaseSumTickets">
                                                           <div className="left">
                                                                <p>Astroy Boy</p>
                                                                <p>Movie Ticket</p>
                                                           </div>
                                                           <div className="right">
                                                               <p>N2000</p>
                                                           </div>
                                                       </div>
                                                </div>
                                                <div className="form-group movieStyleL">

                                                    <SelectDebitableAccounts
                                                        accountInvalid={this.state.accountToDebitInValid}
                                                        onChange={this.handleDebit}
                                                        labelText={"Select Account to debit"}
                                                    />
                                                </div>


                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <center>
                                                            <button disabled={this.props.SubmitTicketData.message === listStyleConstants.BUY_EVENT_TICKET_PENDING } type="submit" value="Fund Account" className="btn-alat m-t-10 m-b-20 text-center">
                                                                {this.props.SubmitTicketData.message === listStyleConstants.BUY_EVENT_TICKET_PENDING ? "Processing..." : "Next"}
                                                            </button>
                                                            
                                                        </center>
                                                        
                                                    </div>
                                                </div>
                                               
                                            </form>
                                            <center>
                                                        <button onClick={this.NavigateBack} type="submit" id="navButToMovieSelect">
                                                               Go Back
                                                        </button>      
                                                        </center>
                                        </div>
                                    </div>
                                </div>
                                </div>
                                </div>

                               

            </Fragment>




        );
    }
}
const mapStateToProps = state => ({
    alert:state.alert,
    SubmitTicketData:state.SubmitTicketData,

});


export default connect(mapStateToProps)(BuyTicket);