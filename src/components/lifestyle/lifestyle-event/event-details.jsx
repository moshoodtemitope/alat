import React, { Fragment } from "react";
import { connect } from "react-redux";
import {listStyleConstants} from "../../../redux/constants/lifestyle/lifestyle-constants";
import {Redirect} from 'react-router-dom'
import * as actions from '../../../redux/actions/lifestyle/movies-actions';
import {getCinemaList,} from '../../../redux/actions/lifestyle/movies-actions';
import clock from '../../../assets/img/clock-circular-outline.svg'




class EventDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ShowTimeId:"",
            TicketAmount:"",
            movieLocation: "",
            StudentId:"",
            ChildrenId:"",
            AdultId:"",
            movieDay: "",
            childNumber: 0,
            childAmount: 0,
            initialChildAmount: 0,
            ticketClassses:null,
            user: JSON.parse(localStorage.getItem("user")),
            dataContainer: null,
            eventId:""
        };
    }
    // fetchEventList(){
    //     const { dispatch } = this.props;
    //     dispatch(getEvents(this.state.user.token));
    // };
    fetchCinemaList(){
        const { dispatch } = this.props;
        dispatch(getCinemaList(this.state.user.token));
        // console.log(this.props.getCinemaList)

    };
    // fetchShowTime(){
    //     const { dispatch } = this.props;
    //     dispatch(buyMovieTicket(this.state.user.token));
    //     // console.log(this.props.getCinemaList)

    // };
    componentDidMount(){
        this.fetchCinemaList();
        const details = this.props.location.state.name;
        this.setState({
            SubmitTicketData: details

        })


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
        if (childNumber !== 1)
            this.setState({ childNumber: childNumber - 1 }, () =>
                this.setState({
                    childAmount: this.state.initialChildAmount * this.state.childNumber
                })
            );
    };
    ShowBuyTicketData = () => {
        const data = {
            ShowTimeId:this.state.itemId,
            TicketAmount:parseFloat(this.state.childAmount),
            title:this.props.location.state.details.title,
            quantity:this.state.childNumber,
            ticketClassses:this.state.ticketClassses,
            eventId:this.state.eventId,
            source:this.props.location.state.details.source
        }
        console.log(data)
        // return;
        this.props.dispatch(actions.SubmitEventTicketData(data));
    }
    formatAmountNoDecimal = (amount) => {
        return amount.toLocaleString(navigator.language, { minimumFractionDigits: 0 });
    };
    
    

    UseSelectedItem = (event) => {
        let gottenValue = event.target.value.split("000");

       
        console.log(gottenValue);
        
        let data = {
            item: gottenValue[0],
            id: gottenValue[1],
            ticketClassses:gottenValue[2],
            eventId:gottenValue[3],

        }
  
        this.setState({initialChildAmount:gottenValue[0]});
        this.setState({childAmount:gottenValue[0]});
        this.setState({ticketClassses:gottenValue[2]});
        this.setState({eventId:gottenValue[3]});
        console.log(data);
        this.props.dispatch(actions.ShowTime(this.state.user.token, data))
    }

    gotobuyEventTicket=()=>{
        if(this.props.SubmitEventTicketData)
        if(this.props.SubmitEventTicketData.message == listStyleConstants.SUBMIT_EVENT_TICKET_SUCCESS){
            return<Redirect to="/lifestyle/buy-event-ticket"/>
        }
        
    }


    LopEventList = () => {
        // console.log('First -----------------------')
        let container = [];
        let title = []; //contains all titles
        let loopContainer = (eachArrayClass) => {
            eachArrayClass.map(element => {
                title.push(element.title);
                // return <option value={element}>{element}</option>
            })
        }

        this.props.getEvents.data.response.eventList.map(event => {
            console.log(typeof event);
            if(typeof event == 'object')
              loopContainer(event.ticketClassses); 
        });

        return title.map(element => {
            return <option value={element}>{element}</option>
        });
    }

    render() {
       let {
            movieLocation,
            movieDay,
            adultNumber,
            studentNumber,
            childNumber
        } = this.state;
         const {getCinemaList,getEvents,ShowTime,buyMovieTicket}=this.props
         const details = this.props.location.state.details;
         console.log(details)

        return (
            <div>
            <div className="row" style={{justifyContent: "center", marginBottom:"15px"}}>
            <img src={details.originalImage} class="img-responsive"/>
            </div>
       
            <div className="max-750">
                <div className="al-card fund-al-card no-pad">
                    <div
                        style={{
                            marginTop: 18,
                            textAlign: "center",
                            fontSize: 18,
                            marginBottom: 16,
                            fontFamily: "proxima_novasemibold",
                            color: "#4D4D4D"
                        }}
                    >
                        Buy Event Ticket
                    </div>
                    <div style={{ border: "1px solid rgba(205, 205, 205, 0.32)" }} />
                    <div
                        className="row"
                        style={{
                            marginLeft: 50,
                            marginTop: 20,
                            marginRight: 50
                        }}>
                        {this.gotobuyEventTicket()}
                        <div className="col-sm-3">
                            <i className="toshow">
                                <img
                                    src={details.thumbnailImage}
                                    style={{
                                        width: 168,
                                        height: 226,
                                        boxShadow:" 0px 4px 4px rgba(0, 0, 0, 0.15)",
                                        borderRadius:"3px"


                                       

                                    }}
                                />
                            </i>
                        </div>
                        <div
                            className="col-sm-9"
                            style={{ fontSize: 26, color: "#444444", paddingLeft: 55 }}
                        >
                            <div style={{ fontFamily: "proxima_novasemibold", marginBottom: 21 }}>
                                {details.title}
                            </div>
                            <div
                                style={{
                                    fontFamily: "proxima_novaregular",
                                    fontSize: 12,
                                    color: "#9C9C9C",
                                    marginTop: 21
                                }}
                            >
                                Synopsis:
                            </div>
                            <div
                                style={{
                                    fontFamily: "proxima_novaregular",
                                    fontSize: 12,
                                    color: "#9C9C9C",
                                    marginTop: 8,
                                    // fontFamily: "Proxima Nova"
                                }}
                            >
                                {details.description.toString().length > 30 ? details.description.toString().substring(0, 60)+"...": details.description.toString()}
                            </div>
                            <div>
                                <i className="toshow">
                                    <img
                                        src={clock}
                                        style={{
                                            width: 20,
                                            height: 20,
                                            marginTop: 5,
                                            borderRadius: 50,
                                            paddingRight: 9
                                        }}
                                    />
                                </i>
                                <span
                                    style={{
                                        fontFamily: "proxima_novaregular",
                                        fontSize: 12,
                                        color: "#9C9C9C"
                                    }}
                                >
                                    {details.location}
                </span>
                            </div>
                        </div>
                    </div>

                    <div
                        className="row"
                        style={{
                            marginRight: 69,
                            marginLeft: 69,
                            // marginTop: 20,
                            marginTop: 37
                        }}>
                      <form onSubmit={this.ShowBuyTicketData  } style={{ width: "100%" }}>
                            <label>Select Ticket Class</label>
                           
                            <select onChange={this.UseSelectedItem}>
                             <option>Select Ticket Type</option>

                                {
                                    // getEvents.message == listStyleConstants.GET_EVENTS_SUCCESS && 
                                    //  this.LopEventList()
                                    details.ticketClassses.map(event=> {
                                        return <option key={event.title} value={event.ticketId + " " + "000" + event.price + " " + event.title + " " + event.eventId}>{event.title}</option>
                                    })
                                }
                            </select>

                            <label style={{ marginTop: 16 }}>Select Day</label>
                            <select onChange={this.UseSelectedTime}>
                                <option key={details.date}>{details.date}</option>
                                {/* {                                      
                                    ShowTime.message == listStyleConstants.GET_MOVIE_SHOWTIME_SUCCESS && 
                                    ShowTime.data.response.map(event=> {
                                        return <option key={event.date} value={event.date + "8888" + event.student + " " + event.adult + " " + event.children}>{event.date}</option>
                                    })
                                }  */}
                            </select>

                            <div
                                className="row"
                                style={{
                                    marginTop: 23,
                                    marginLeft: 0,
                                    justifyContent: "space-between"
                                }}
                            >
                                
                               <div className="col-sm-4" style={{ paddingRight: 30 }}>
                                    <div style={{ marginLeft: -13 }}>Quantity</div>
                                    <div
                                        className="row"
                                        style={{
                                            border: "1px solid #CCCCCC",
                                            borderRadius: 3,
                                            flexDirection: "row",
                                            justifyContent: "space-between"
                                        }}
                                    >
                                        <div
                                            onClick={this.decreaseChild}
                                            style={{
                                                width: 60,
                                                height: 46,
                                                cursor: "pointer",
                                                backgroundColor: "#F5F5F5",
                                                color: "#AB2656",
                                                fontWeight: "bold",
                                                textAlign: "center",
                                                fontSize: 30
                                            }}
                                        >
                                            -
                                        </div>
                                        <div
                                            style={{
                                                // width: 60,
                                                // height: 46,
                                                backgroundColor: "white",
                                                color: "#AB2656",
                                                fontWeight: "bold",
                                                textAlign: "center",
                                                paddingTop: 14
                                            }}
                                        >
                                            {childNumber}
                                        </div>
                                        <div
                                            onClick={this.increaseChild}
                                            style = {{
                                                width: 60,
                                                height: 46,
                                                cursor: "pointer",
                                                backgroundColor: "#F5F5F5",
                                                color: "#AB2656",
                                                fontWeight: "bold",
                                                textAlign: "center",
                                                paddingTop: 8,
                                                fontSize: 20
                                            }}
                                        >
                                            +
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            textAlign: "center",
                                            marginTop: 10,
                                            color: "#000000",
                                            fontFamily: "proxima_novaregular",
                                            fontWeight: "bold",
                                            fontSize: 14
                                        }}
                                    >
                                        N{this.formatAmountNoDecimal(this.state.childAmount)}
                                    </div> 
                                </div>
                            </div>
                            <div
                                className="row"
                                style={{
                                    justifyContent: "center",
                                    marginTop: 23,
                                    marginBottom: 39
                                }}
                            >
                                <button disabled={this.props.SubmitEventTicketData.message == listStyleConstants.SUBMIT_EVENT_TICKET_PENDING}
                                    style={{
                                        border: "0px solid #AB2656",
                                        height: 45,
                                        width: 200,
                                        backgroundColor: "#AB2656",
                                        color: "white",
                                        borderRadius: 3,
                                        cursor: "pointer"
                                    }}
                                >
                                
                                    {this.props.SubmitEventTicketData.message ==listStyleConstants.SUBMIT_EVENT_TICKET_PENDING ? "Processing..." :"Buy Ticket"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        getCinemaList: state.getCinemaList,
        ShowTime:state.ShowTime,
        SubmitEventTicketData:state.SubmitEventTicketData,
        getEvents: state.getEvents
    };
}

export default connect(mapStateToProps)(EventDetails);
