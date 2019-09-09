import React, {Component, } from 'react';
import {Fragment} from 'react';
import {NavLink, Redirect} from "react-router-dom";
import SelectDebitableAccounts from "../../../shared/components/selectDebitableAccounts";
import {listStyleConstants} from "../../../redux/constants/lifestyle/lifestyle-constants";
import {connect} from "react-redux";
import AlatPinInput from '../../../shared/components/alatPinInput';
import {history} from "../../../_helpers/history";
import * as actions from "../../../redux/actions/lifestyle/movies-actions";


class BuyTicket extends Component {
    constructor(props){
        super(props);
        this.state={
            user: JSON.parse(localStorage.getItem("user")),
            accountToDebitInValid: false,
            accountToDebit:null,
            isSubmit: false,
            formattedValue:"",
            TicketAmount:"",
            ShowTimeId:"",
            cinemaId:"",
            title:"",
            Pin:"",
            adult:"",
            child:"",
            student:"",
            isPinInvalid: false,
            goal: JSON.parse(localStorage.getItem("goal")),



        };
        this.handleDebit = this.handleDebit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAlatPinChange = this.handleAlatPinChange.bind(this);

    };
    handleAlatPinChange(pin) {
        this.setState({ Pin: pin })
        if (this.state.isSubmitted) {
            if (pin.length != 4)
           this.setState({isPinInvalid : false})
        }
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
                TicketAmount:data.initialAdultAmount,
                title:data.title,
                cinemaId:data.cinemaId,
                ShowTimeId:data.ShowTimeId,
                adult:data.adultQuantity,
                child:data.childQuantity,
                student:data.studentQuantity,
                ticketId:data.ticketId,
                fee:data.fee,
                ticketType:data.ticketType
                
            });
        }
    };



    handleSubmit = (e) => {
        let str = num.toString()
        e.preventDefault();
        this.setState({isSubmit: true});
        if (this.validateAccountNumber( this.state.accountToDebit, "accountToDebitInValid")) {
            //not valid
        }else {
            let data={
                "ShowTimeId":this.state.ShowTimeId,	
                "CinemaId":this.state.cinemaId,
                "TicketId":this.state.ticketId,
                'AccountNo':this.state.accountToDebit,
                'Pin':this.state.Pin,
                'TicketAmount':this.state.TicketAmount,
                "Adult":this.state.adult,
                "Student":this.state.student,
                "Children":this.state.child,
                "fee":this.state.fee,

            };
            console.log(data)
        
            this.props.dispatch(actions.buyMovieTicket(this.state.user.token, data));


        }
    };
    formatAmountNoDecimal = (amount) => {
        return amount.toLocaleString(navigator.language, { minimumFractionDigits: 0 });
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
                        <div style={{width: "50%", marginRight:"120px",marginLeft:"25%"}} className={`info-label ${this.props.alert.type}`}>{this.props.alert.message}</div>
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
                                                                <p style={{fontSize:12,fontFamily:"proxima_novasemibold"}}>{this.state.goal.title}</p>
                                                                <p style={{fontSize:12, fontFamily:'proxima_novaregular'}}>{this.state.ticketType}</p>
                                                           </div>
                                                           <div className="right">
                                                               <p>N{this.formatAmountNoDecimal(this.state.TicketAmount)}</p>

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
                                                <div className="inputctn-wrap centered-input form-group movieStyleL">
                                                                <AlatPinInput
                                                                    value={this.state.Pin}
                                                                    onChange={this.handleAlatPinChange}
                                                                    PinInvalid={this.state.isPinInvalid}
                                                                    maxLength={4} />
                                                </div>



                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <center>
                                                            <button disabled={this.props.buyMovieTicket.message === listStyleConstants.BUY_MOVIE_TICKET_PENDING } type="submit"  className="btn-alat m-t-10 m-b-20 text-center">
                                                                {this.props.buyMovieTicket.message === listStyleConstants.BUY_MOVIE_TICKET_PENDING ? "Processing..." : "Next"}
                                                            </button>
                                                            
                                                        </center>
                                                        
                                                    </div>
                                                </div>
                                               
                                            </form>
                                           
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
    buyMovieTicket:state.buyMovieTicket

});


export default connect(mapStateToProps)(BuyTicket);