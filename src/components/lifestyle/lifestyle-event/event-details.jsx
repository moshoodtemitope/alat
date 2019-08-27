import React, { Fragment } from "react";
import { connect } from "react-redux";
import {listStyleConstants} from "../../../redux/constants/lifestyle/lifestyle-constants";
import {Redirect} from 'react-router-dom'
import * as actions from '../../../redux/actions/lifestyle/movies-actions';

import {getCinemaList,} from '../../../redux/actions/lifestyle/movies-actions'


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
            adultNumber: 0,
            studentNumber: 0,
            childNumber: 0,
            adultAmount: 0,
            studentAmount: 0,
            childAmount: 0,
            initialAdultAmount: 0,
            initialStudentAmount: 0,
            initialChildAmount: 0,
            user: JSON.parse(localStorage.getItem("user")),
            dataContainer: null,
            itemId: null
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
    fetchShowTime(){
        const { dispatch } = this.props;
        dispatch(buyMovieTicket(this.state.user.token));
        // console.log(this.props.getCinemaList)

    };
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

    increaseAdult = () => {
        let { adultNumber } = this.state;
        this.setState(
            {
                adultNumber: adultNumber + 1
            },
            () =>
                this.setState({
                    adultAmount: this.state.initialAdultAmount * this.state.adultNumber
                })
        );
    };

    increaseStudent = () => {
        this.setState({ studentNumber: this.state.studentNumber + 1 }, () =>
            this.setState({
                studentAmount:
                    this.state.initialStudentAmount * this.state.studentNumber
            })
        );
    };

    increaseChild = () => {
        this.setState({ childNumber: this.state.childNumber + 1 }, () =>
            this.setState({
                childAmount: this.state.initialChildAmount * this.state.childNumber
            })
        );
    };

    decreaseAdult = () => {
        let { adultNumber } = this.state;
        if (adultNumber !== 1)
            this.setState({ adultNumber: adultNumber - 1 }, () =>
                this.setState({
                    adultAmount: this.state.initialAdultAmount * this.state.adultNumber
                })
            );
    };

    decreaseStudent = () => {
        let { studentNumber } = this.state;
        if (studentNumber !== 1)
            this.setState({ studentNumber: studentNumber - 1 }, () =>
                this.setState({
                    studentAmount:
                        this.state.initialStudentAmount * this.state.studentNumber
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
            TicketAmount: parseFloat(this.state.TicketAmount),
            initialAdultAmount:this.state.initialAdultAmount,
            initialStudentAmount:this.state.initialStudentAmount,
            initialChildAmount:this.state.initialChildAmount,        
        }
        console.log(data)
        // return;
        this.props.dispatch(actions.SubmitTicketData(data));
    }
    
    // value={event.date + "8888" + event.student + " " + event.adult + " " + event.children}>{event.date}</option>
    UseSelectedTime = (event) => {
        let amounts = event.target.value.split("8888")[1];
        let adultAmount = amounts.split(" ")[1];
        let childrenAmount = amounts.split(" ")[2];
        let studentAmount = amounts.split(" ")[0];
       
        console.log(adultAmount);
        console.log(childrenAmount);
        console.log(studentAmount);
        console.log('oooooooooooooooooooooooooooooooooooo');
        this.setState({initialStudentAmount: studentAmount});
        this.setState({initialAdultAmount: adultAmount});
        this.setState({initialChildAmount: childrenAmount});
    }

    UseSelectedItem = (event) => {
        let gottenValue = event.target.value.split("000");
       
        console.log(gottenValue);
        
        let data = {
            item: gottenValue[0],
            id: gottenValue[1]
        }
  
        this.setState({itemId: gottenValue[1]});
        console.log(data);
        this.props.dispatch(actions.ShowTime(this.state.user.token, data))
    }

    gotobuyEventTicket=()=>{
        if(this.props.SubmitTicketData)
        if(this.props.SubmitTicketData.message == listStyleConstants.SUBMIT_MOVIE_TICKET_SUCCESS){
            return<Redirect to="/lifestyle/buy-ticket-details"/>
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

        console.log("====================",getCinemaList)
        // if (getCinemaList.length > 0) {
        //     alert("yes")
        // }

        return (
            <div>
            <div className="row" style={{justifyContent: "center"}}>
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
                                        // src={salaryLoan}
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
                              
                                {
                                    // getEvents.message == listStyleConstants.GET_EVENTS_SUCCESS && 
                                    //  this.LopEventList()
                                    details.ticketClassses.map(event=> {
                                        return <option key={event.title} value={event.ticketId + "8888" + event.ticketId + " " + event.ticketId + " " + event.ticketId}>{event.title}</option>
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
                                    <div style={{ marginLeft: -13 }}>Adult</div>
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
                                            onClick={this.decreaseAdult}
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
                                                width: 60,
                                                height: 46,
                                                backgroundColor: "white",
                                                color: "#AB2656",
                                                fontWeight: "bold",
                                                textAlign: "center",
                                                paddingTop: 14
                                            }}
                                        >
                                            {adultNumber}
                                        </div>
                                        <div
                                            onClick={this.increaseAdult}
                                            style={{
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
                                        {this.state.adultAmount}
                                    </div>
                                </div>
                                {/* student */}
                                <div className="col-sm-4" style={{ paddingRight: 30 }}>
                                    <div style={{ marginLeft: -13 }}>Student</div>
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
                                            onClick={this.decreaseStudent}
                                            style={{
                                                cursor: "pointer",
                                                width: 60,
                                                height: 46,
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
                                                width: 60,
                                                height: 46,
                                                backgroundColor: "white",
                                                color: "#AB2656",
                                                fontWeight: "bold",
                                                textAlign: "center",
                                                paddingTop: 14
                                            }}
                                        >
                                            {studentNumber}
                                        </div>
                                        <div
                                            onClick={this.increaseStudent}
                                            style={{
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
                                        {this.state.studentAmount}
                                    </div>
                                </div>
                                {/* child */}
                                <div className="col-sm-4" style={{ paddingRight: 30 }}>
                                    <div style={{ marginLeft: -13 }}>Child</div>
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
                                                width: 60,
                                                height: 46,
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
                                        {this.state.childAmount}
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
                                <button disabled={this.props.buyMovieTicket.message == listStyleConstants.BUY_EVENT_TICKET_PENDING}
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
                                
                                    {this.props.buyMovieTicket.message ==listStyleConstants.BUY_EVENT_TICKET_PENDING ? "Processing..." :"Buy Ticket"}
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
        buyMovieTicket:state.buyMovieTicket,
        SubmitTicketData:state.SubmitTicketData,
        getEvents: state.getEvents
    };
}

export default connect(mapStateToProps)(EventDetails);
