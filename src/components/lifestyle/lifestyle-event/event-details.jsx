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
        };
        this.fetchCinemaList();
        console.log('',this.state.eventId)
    }
    
    componentDidMount = () => {
        this.init();
       
    };

    init = () => {
        if (this.props.SubmitEventData.message !== listStyleConstants.SUBMIT_EVENT_DATA_SUCCESS)
            this.props.history.push("/lifestyle/event");
        else {
            
            let data = JSON.parse(this.props.SubmitEventData.data.data);
            console.log('======',data)

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
         console.log("=========",data)
        this.props.dispatch(actions.SubmitEventTicketData(data));
    }

    ShowBuyTicketData = (event) => {
        event.preventDefault();


        this.checkTicketClassValidity();
        
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
        let gottenValue = event.target.value.split("000");
        let name = event.target.name;


       
        
        let data = {
            item: gottenValue[0],
            // id: gottenValue[1],
            // eventId:gottenValue[2],
            ticketId:gottenValue[0]

        }
  
        // this.setState({initialChildAmount:gottenValue[0]}, () => {
        //     this.setState({childNumber: 1})
        // });
        // this.setState({childAmount:gottenValue[0]});
        //  this.setState({eventId:gottenValue[2]});
        this.setState({[name] : event.target.value});
        this.setState({ticketId:gottenValue[0]})

        console.log("=========",data);
        this.props.dispatch(actions.ShowTime(this.state.user.token, data))
    }

    gotobuyEventTicket=()=>{
        if(this.props.SubmitEventTicketData)
        if(this.props.SubmitEventTicketData.message == listStyleConstants.SUBMIT_EVENT_TICKET_SUCCESS){
            return<Redirect to="/lifestyle/buy-event-ticket"/>
        }
        
    }


    

    render() {
       let {
            childNumber,
            TicketClassValidity,
            ticketClassses
        } = this.state;
        console.log("00000000000000000",this.state.ticketClassses)
         const{ getCinemaList,getEvents,ShowTime,buyMovieTicket,SubmitEventData }=this.props
         

            return (
                <div>
                <div className="row" style={{justifyContent: "center", marginBottom:"15px"}}>
                <img src={this.state.originalImage} class="img-responsive"/>
                </div>
           
                <div className="max-750">
                    <div className="al-card fund-al-card no-pad">
                        <div className="buy-movies">
                            Buy Event Ticket
                        </div>
                        <div style={{ border: "1px solid rgba(205, 205, 205, 0.32)" }} />
                        <div
                            className="row"
                            style={{marginLeft: 50,marginTop: 20,marginRight: 50}}>
                            {this.gotobuyEventTicket()}
                            <div className="col-sm-3">
                                <i className="toshow">
                                    <img className="img"
                                        src={this.state.thumbnailImage}
                                        
                                    />
                                </i>
                            </div>
                            <div
                                className="col-sm-9"
                                style={{ fontSize: 26, color: "#444444", paddingLeft: 55 }}
                            >
                                <div style={{ marginBottom: 21 }}>
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
                                        <img className="clockImage"
                                            src={location}
                                            
                                        />
                                    </i>
                                    
                                    <span
                                        style={{fontSize: 12,color: "#9C9C9C"}}>
                                        {this.state.location}
                    </span>
                                </div>
                            </div>
                        </div>
    
                        <div
                            className="row"
                            style={{marginRight: 69,marginLeft: 69,// marginTop: 20,
                                marginTop: 37
                            }}>
                        
                          <form onSubmit={this.ShowBuyTicketData  } style={{ width: "100%" }}>
                               <div  className={TicketClassValidity ? "form-group form-error col-md-12" : "form-group col-md-12"} style={{paddingLeft: 0}}>
                                        <label>Select Ticket Class</label>
    
                                            <select onChange={this.UseSelectedItem } name="ticketClass">
                                            <option>Select Ticket Type</option>
    
                                                {
                                                    this.props.SubmitEventData.message == listStyleConstants.SUBMIT_EVENT_DATA_SUCCESS && 
                                                 
                                                    ticketClassses.map(event => {
                                                        return <option key={event.title} value={event.ticketId + " " + "000" + event.price + " " + event.title + " " + event.eventId + " " + event.ticketId}>{unescape(event.title)}</option>
                                                    })
                                                }
                                            
                                            </select>
                                            {TicketClassValidity &&
                                                            <div className="text-danger">please enter ticket type</div>}
                                            </div>
                                            <div className="row">
                                                <div className="form-group col-md-6">
                                                    <label style={{ marginTop: 16 }}>Select Day</label>
                                                    <select onChange={this.UseSelectedTime}>
                                                        <option key={this.state.date}>{moment(this.state.date).format("LLLL")}</option>
                                                      
                                                    </select>
                                                </div>
                                                <div
                                    className="col-md-6"
                                    style={{
                                        marginTop: 23,
                                        
                                    }}
                                >
                                    
                                   <div id="selectionCover">
                                        <div style={{ marginLeft: -13 }}>Quantity</div>
                                        <div
                                            className="row adultDiscription">
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
                                    
    
                                
                                <div
                                    className="row adultDiscription">
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
