import React, { Fragment } from "react";
import { connect } from "react-redux";
import {listStyleConstants} from "../../../redux/constants/lifestyle/lifestyle-constants";
import {Redirect} from 'react-router-dom'
import * as actions from '../../../redux/actions/lifestyle/movies-actions';
import {getCinemaList,} from '../../../redux/actions/lifestyle/movies-actions';
import clock from '../../../assets/img/date.svg'
import location from '../../../assets/img/Facebook.svg'
import unescape from 'lodash/unescape';
import moment from 'moment'


class EventDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ShowTimeId:"",
            TicketAmount:"",
            movieLocation:"",
            StudentId:"",
            ChildrenId:"",
            AdultId:"",
            movieDay:"",
            childNumber:0,
            childAmount:0,
            initialChildAmount:0,
            ticketClassses:[],
            user: JSON.parse(localStorage.getItem("user")),
            dataContainer: null,
            eventId:"",
            ticketClass: null,
            TicketClassValidity:false,
            thumbnailImage:"",
            location:'',
            title:"",
            date:"",
            description:"",
            originalImage:"",
            source:"",
            ticketId:"",
            id:"",
            QuantityInValidity: false,

        };
        this.fetchCinemaList();
        // console.log('',this.state.eventId)
    }
    
    componentDidMount = () => {
        this.init();

        // console.log(this.props.location.pathname)
       
    };

    init = () => {
        if (this.props.SubmitEventData.message !== listStyleConstants.SUBMIT_EVENT_DATA_SUCCESS)
            this.props.history.push("/lifestyle/event");
        else {
            
            const data = JSON.parse(this.props.SubmitEventData.data.data);

            this.setState({
                description:data.description,
                thumbnailImage:data.thumbnailImage,
                title:data.title,
                location:data.location,
                id:data.id,
                date:data.date,
                source:data.source,
                originalImage:data.originalImage,
                ticketClassses:data.ticketClassses,
                eventId:data.eventId
                
            });
        }
    };
    checkQuantity = () => {
        if (this.state.childNumber === 0) {
            this.setState({ QuantityInValidity: true });
            return true
        } else {
            this.setState({ QuantityInValidity: false })
            return false
        }
    }

    fetchCinemaList(){
        const { dispatch } = this.props;
        dispatch(getCinemaList(this.state.user.token));
        // console.log(this.props.getCinemaList)

    };
    
    checkTicketClassValidity = () => {
        if(this.state.ticketClass == null || this.state.ticketClass == ""){
            this.setState({TicketClassValidity: true});
        }else{
            this.setState({TicketClassValidity: false});
        }
    }
    checkValidity = () => {
        let result = 'valid';
        for(let x in this.state){
             switch(x){
                 
                 case 'ticketClass':
                         if(this.state[x] == null || this.state[x] == ""){
                            //  console.log(x)
                             result = null;
                             break;
                         }
                 case 'childNumber':
                     if (this.state[x] == null || this.state[x] == "") {
                         //  console.log(x)
                         result = null;
                         break;
                     }

 
                 
             }
         }
 
        // console.log(result);
        return result;
    }
 
    handleSelectLocation = item => {
        this.setState({
            movieLocation: item.value
        });
    };

    handleSelectMovieDay = movieDay => {
        this.setState({
            movieDay
        });
    };

    increaseChild = () => {
        this.setState({ childNumber: this.state.childNumber + 1 }, () =>
            this.setState({
                childAmount: this.state.initialChildAmount * this.state.childNumber
            })
        );
    };

    decreaseChild = () => {
        let { childNumber } = this.state;
        if (childNumber !== 0)
            this.setState({ childNumber: this.state.childNumber - 1 }, () =>
                this.setState({
                    childAmount: this.state.initialChildAmount * this.state.childNumber
                })
            );
    }
    
    InitiateNetworkCall=()=>{
        const data = {
            ShowTimeId:this.state.itemId,
            TicketAmount:this.state.childAmount,
            title:this.state.title,
            quantity:this.state.childNumber,
            adultquatity:this.state.adultNumber,
            studentQuantity:this.state.studentNumber,
            eventId:this.state.eventId,
            source:this.state.source,
            ticketId:this.state.ticketId,
            id:this.state.id
        }
        //  console.log("=========",data)
        this.props.dispatch(actions.SubmitEventTicketData(data));
    }

    ShowBuyTicketData = (event) => {
        event.preventDefault();


        this.checkTicketClassValidity();
        this.checkQuantity();
        
        switch(this.checkValidity()){
            case null:
            //   console.log('Empty value was found');
              break;
            case 'valid': 
            //   console.log("No Empty Value Found");
              this.InitiateNetworkCall();
              break;
        }
        // return;
    }
    formatAmountNoDecimal = (amount) => {
        return amount.toLocaleString(navigator.language, { minimumFractionDigits: 0 });
    };
    
    

    UseSelectedItem = (event) => {
        let gottenValue = event.target.value.split("000r");
        let name = event.target.name;
        let childAmount = gottenValue[1]
        // console.log("*************",childAmount)


       
        
        let data = {
            item: gottenValue[0],
            childAmount: gottenValue[1],
            // eventId:gottenValue[2],
            ticketId:gottenValue[0]

        }
        this.setState({ initialChildAmount: childAmount,childAmount }, () => {
            if (this.state.childAmount !== 0) {
                // this.setState({ childNumber: this.state.childNumber + 1 })
            }
        });

        this.setState({[name] : event.target.value});
        this.setState({ticketId:gottenValue[0]});
        this.setState({childAmount:gottenValue[1]})

        // console.log("********",data);
        this.props.dispatch(actions.ShowTime(this.state.user.token, data))
    }


    

    render() {
       let {
            childNumber,
            TicketClassValidity,
            ticketClassses,
            QuantityInValidity
        } = this.state;
         const{ getCinemaList,getEvents,ShowTime,buyMovieTicket,SubmitEventData }=this.props
         

            return (
                <div className="container">
                <div>
                    <div className="row"  id="image">
                    <img alt="" src={this.state.originalImage} className="img-responsive"/>
                </div>
           
                <div className="max-750">
                    <div className="al-card fund-al-card no-pad">
                        <div className="buy-movies">
                            Buy Event Ticket
                        </div>
                        <div className="event-border" />
                        <div
                            className="row" id="eventticket">
                            {/* {this.gotobuyEventTicket()} */}
                            <div className="col-sm-3">
                                <i className="toshow">
                                    <img alt="" className="img"
                                        src={this.state.thumbnailImage}
                                        
                                    />
                                </i>
                            </div>
                            <div
                                className="col-sm-9" id="title">
                                <div className="margin-bottom">
                                    {this.state.title}
                                </div>
                                <div className="title">
                                    Synopsis:
                                </div>
                                <div className="description"
                                >
                                    {unescape(this.state.description.toString().length > 15 ? this.state.description.toString().substring(0, 80)+"...": this.state.description.toString())}
                                </div>
                                <div>
                                    <i className="toshow">
                                        <img alt="" className="clockImage"
                                            src={location}
                                            
                                        />
                                    </i>
                                    
                                    <span className="locationText">
                                        {this.state.location}
                    </span>
                                </div>
                            </div>
                        </div>
    
                        <div
                                className="row" id="showTicket">
                        
                                <form onSubmit={this.ShowBuyTicketData} className="ShowBuyTicketData">
                               <div  className={TicketClassValidity ? "form-group form-error col-md-12" : "form-group col-md-12"} style={{paddingLeft: 0}}>
                                        <label>Select Ticket Class</label>
    
                                            <select onChange={this.UseSelectedItem} name="ticketClass">
                                            <option>Select Ticket Type</option>
    
                                                {
                                                    this.props.SubmitEventData.message === listStyleConstants.SUBMIT_EVENT_DATA_SUCCESS && 
                                                 
                                                    ticketClassses.map(event => {
                                                        return <option key={event.title} value={event.ticketId + " " + "000r" + " " + event.price + " " + "000r" + " " + event.title + " " + "000r" + " " + event.eventId + " " + "000r" + " " + event.ticketId}>{unescape(event.title)}</option>
                                                    })
                                                }
                                            
                                            </select>
                                            {TicketClassValidity &&
                                                            <div className="text-danger">please enter ticket type</div>}
                                            </div>
                                            <div className="row">
                                                <div className="form-group col-md-6">
                                                    <label id="select-day">Select Day</label>
                                                    <select onChange={this.UseSelectedTime}>
                                                        <option key={this.state.date}>{moment(this.state.date).format("LLLL")}</option>
                                                      
                                                    </select>
                                                </div>
                                                <div
                                    className="col-md-6" id="col">
                                    
                                   <div id="selectionCover">
                                        <div className="child-text">Quantity</div>
                                        <div className={QuantityInValidity ? "row count-border form-error" : "row count-border"}>
                                            <div className="decreaseChild"
                                                onClick={this.decreaseChild}>
                                                -
                                            </div>
                                            <div className="childNumber"
                                                
                                            >
                                                {childNumber}
                                            </div>
                                            <div className="increaseChild"
                                                onClick={this.increaseChild}
                                                
                                            >
                                                +
                                            </div>
                                                        
                                        </div>
                                        <div className="studentAmount"
                                        
                                        >
                                        {
                                            (this.state.childAmount).toString().includes("-") ? "0" : `₦${this.formatAmountNoDecimal(this.state.childAmount)}`
                                        }
                                            
                                        </div> 
                                    </div>
                                </div>
                                </div>
                                <center>
                                    {
                                        QuantityInValidity &&
                                        <div style={{ width: "50%" }} className="info-label error">Select number of ticket</div>
                                    }
                                </center>
                                            
                                    
    
                                
                                <div
                                    className="row btn-corner">
                                    <button className="next-btn">
                                        Next
                                    </button>
                                </div>
                            </form>
                        </div>
    
                    </div>
                    <center>
                            <a style={{ cursor: "pointer" }} onClick={() => { this.props.dispatch(actions.ClearAction(listStyleConstants.MOVIE_REDUCER_CLEAR));
                                    this.props.history.push('/lifestyle/event') }} className="add-bene m-t-50">
                                    Go back
                            </a>
                     </center>
                </div>
                </div>
                </div>
            );
         }
        

        
    
}

function mapStateToProps(state) {
    return {
        getCinemaList:state.LifestyleReducerPile.getCinemaList,
        ShowTime:state.LifestyleReducerPile.ShowTime,
        SubmitEventTicketData:state.LifestyleReducerPile.SubmitEventTicketData,
        getEvents:state.LifestyleReducerPile.getEvents,
        SubmitEventData:state.LifestyleReducerPile.SubmitEventData,

    };
}

export default connect(mapStateToProps)(EventDetails);
