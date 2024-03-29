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
            adultAmount:"",
            studentAmount:"",
            childrenAmount:"",
          

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
            // console.log('tag', data);

            this.setState({
                adultAmount:data.adultAmount,
                studentAmount:data.studentAmount,
                childrenAmount:data.childrenAmount,
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

    computeTicketPrice = () => {
        let total = 0;
        if(this.state.adult !== 0)
            total = total +  this.state.adultAmount;
        if(this.state.child !== 0)
            total = total + this.state.childrenAmount;
        if(this.state.student !== 0)
            total = total + this.state.studentAmount;
        return total;
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({isSubmit: true});
        if (this.validateAccountNumber( this.state.accountToDebit, "accountToDebitInValid")) {
            //not valid
        }else {
            let data={
                "ShowTimeId":this.state.ShowTimeId,	
                "CinemaId":this.state.cinemaId.trim(),
                "TicketId":this.state.ticketId,
                'AccountNo':this.state.accountToDebit,
                'Pin':this.state.Pin,
                'TicketAmount': this.computeTicketPrice(),
                "Adult":this.state.adult,
                "Student":this.state.student,
                "Children":this.state.child,
                "fee":this.state.fee,
                "title":this.state.title

            };
        
            this.props.dispatch(actions.buyMovieTicket(this.state.user.token, data));


        }
    };
    formatAmountNoDecimal = (amount) => {
        return amount.toLocaleString(navigator.language, { minimumFractionDigits: 0 });
    };
    formatAmount(amount) {
        return amount.toLocaleString(navigator.language, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
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
                            <div className="sub-tab-nav" id="movie-tab">
                                <ul>
                                    <li><NavLink className="active" to={'/lifestyle/movie'}>Movies</NavLink></li>
                                    <li><NavLink to={'/lifestyle/event'}>Event</NavLink></li>
                                    {/* <li><NavLink to={'/lifestyle/preference'}>Preference</NavLink></li> */}
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
                                                                <p className="ticket-title">{this.state.title }</p>
                                                                <p className="ticket-title">{this.state.ticketType}</p>
                                                           </div>
                                                           <div className="right">
                                                    <p>N{this.formatAmountNoDecimal(this.computeTicketPrice())}</p>

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
                                        <center>
                                            <a style={{ cursor: "pointer" }} onClick={() => { 
                                                this.props.history.push('/lifestyle/movie-details') }} className="add-bene m-t-50">
                                                Go back
                                            </a>

                                        </center>
                                        

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
    SubmitTicketData:state.LifestyleReducerPile.SubmitTicketData,
    buyMovieTicket:state.LifestyleReducerPile.buyMovieTicket

});


export default connect(mapStateToProps)(BuyTicket);