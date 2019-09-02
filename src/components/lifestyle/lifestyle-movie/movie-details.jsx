import React, { Fragment } from "react";
import { connect } from "react-redux";
import {listStyleConstants} from "../../../redux/constants/lifestyle/lifestyle-constants";
import {Redirect} from 'react-router-dom'
import * as actions from '../../../redux/actions/lifestyle/movies-actions';
import {getCinemaList, getSingleMovie} from '../../../redux/actions/lifestyle/movies-actions';
import clock from '../../../assets/img/clock-circular-outline'



class Moviedetails extends React.Component {
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
            childrenAmount:0,
            initialAdultAmount: 0,
            initialStudentAmount: 0,
            initialChildAmount: 0,
            user: JSON.parse(localStorage.getItem("user")),
            dataContainer: null,
            itemId: null,
            title:"",
            ticketId:"",
            cinemaId:"",
            selectedLocationInvalid:false,
            formsubmitted:"",
            isSubmitted:false,
            fee:"",
            error: false,
            ticketType:""

        };
        this.UseSelectedItem = this.UseSelectedItem.bind(this)
    }
    
    fetchCinemaList(){
        const { dispatch } = this.props;
        dispatch(getCinemaList(this.state.user.token));
        // console.log(this.props.getCinemaList)

    };
    
    componentDidMount(){
        this.fetchCinemaList();
        
        


    }
    fetchSingleTicket( data){
        const { dispatch } = this.props;
        dispatch(getSingleMovie(this.state.user.token, ));
        // console.log(this.props.getCinemaList)

    };


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
    checkSelectedLocation = (event) => {
        if (this.state.itemId == "") {
            this.setState({ selectedLocationInvalid: true });
            return true;
        }
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
        this.setState({ isSubmitted: true });
        if (this.checkSelectedLocation()) {

        } else {

            const data = {
                ShowTimeId:this.state.showTimeId,
                TicketAmount:parseFloat(this.state.TicketAmount),
                initialAdultAmount:this.state.initialAdultAmount,
                initialStudentAmount:this.state.initialStudentAmount,
                initialChildAmount:this.state.initialChildAmount, 
                title:this.props.location.state.details.title,  
                cinemaId:this.state.cinemaId,
                ticketId:this.state.ticketId,
                fee:this.state.fee,
                ticketType:this.state.ticketType
            }
            console.log(data)
        // return;
        this.props.dispatch(actions.SubmitTicketData(data));
    }
    }
    
    // value={event.date + "8888" + event.student + " " + event.adult + " " + event.children}>{event.date}</option>
    UseSelectedTime = (event) => {
        let amounts = event.target.value.split("8888")[1];
        let adultAmount = amounts.split(" ")[1];
        let childrenAmount = amounts.split(" ")[2];
        let studentAmount = amounts.split(" ")[0];
        let showTimeId = amounts.split(" ")[3];
        let ticketId = amounts.split(" ")[4];
        let fee = amounts.split(" ")[5];
        let ticketType = amounts.split(" ")[6]
       
        console.log(adultAmount);
        console.log(childrenAmount);
        console.log(studentAmount);
        console.log(showTimeId);
        console.log(ticketId);
        console.log(fee);
        console.log(ticketType)
        console.log('oooooooooooooooooooooooooooooooooooo');
        this.setState({initialStudentAmount: studentAmount, studentAmount});
        this.setState({initialAdultAmount: adultAmount,adultAmount});
        this.setState({initialChildAmount: childrenAmount,childrenAmount});
        this.setState({ showTimeId:showTimeId });
        this.setState({ticketId:ticketId});
        this.setState({fee:fee});
        this.setState({ticketType:ticketType})
    }
   
    UseSelectedItem = (event) => {
        let gottenValue = event.target.value.split("000");
        let selectedItem = event.target.value;
        console.log(selectedItem);
        if(gottenValue ===null){
            this.setState({
              error: true
          })
        
        }else{
        this.setState({
              error: false
          })
        
        }
        
        let data = {
            item: gottenValue[0],
            id: gottenValue[1]
        }

        this.setState({itemId: gottenValue[1]});
        this.setState({cinemaId:gottenValue[0]})
        console.log(data);
        this.props.dispatch(actions.ShowTime(this.state.user.token, data))
    }

    gotobuyTicket=()=>{
        if(this.props.SubmitTicketData)
        if(this.props.SubmitTicketData.message == listStyleConstants.SUBMIT_MOVIE_TICKET_SUCCESS){
            return<Redirect to="/lifestyle/buy-ticket-details"/>
        }
    }
     formatAmountNoDecimal = (amount) => {
        return amount.toLocaleString(navigator.language, { minimumFractionDigits: 0 });
    };

    

    render() {
       const {
            movieLocation,
            movieDay,
            adultNumber,
            studentNumber,
            childNumber,
            error
        } = this.state;
         const {getCinemaList,ShowTime,buyMovieTicket}=this.props
         const details = this.props.location.state.details;

        console.log("====================",details)
       

        return (
            <div>
                    {/* <div className="row" style={{justifyContent: "center", margin:5}}>
                        <img src={details.bannerImage} class="img-responsive"/>
                    </div> */}
                <div
                    className="video"
                    style={{
                        position: "relative",
                        paddingBottom: "30.25%",
                        paddingTop: 25,
                        height: 0,
                        marginLeft:"22%"

                    }}
                    >
                <iframe
                    style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 640,
                    height: 360
                    }}
                    src={`https://www.youtube.com/embed/${details.youtubeId}`}
                    frameBorder='0'

                />
                </div>

                    
            <div className="max-750">
                <div className="al-card fund-al-card no-pad" style={{marginTop: 10}}>
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
                        Buy Movie Ticket
                    </div>
                    <div style={{ border: "1px solid rgba(205, 205, 205, 0.32)" }} />
                    <div
                        className="row"
                        style={{
                            marginLeft: 50,
                            marginTop: 20,
                            // justifyContent: "center",
                            marginRight: 50
                        }}>
                        {this.gotobuyTicket()}
                        <div className="col-sm-3">
                            <i className="toshow">
                                <img
                                    src={details.artworkThumbnail}
                                    style={{
                                        width: 168,
                                        height: 226,
                                        borderRadius:"3px"

                                    }}
                                />
                            </i>
                        </div>
                        <div
                            className="col-sm-9"
                            style={{ fontSize: 26, color: "#444444", paddingLeft: 55 }}
                        >
                            <div style={{ fontFamily:"proxima_novasemibold", marginBottom: 21 }}>
                                {details.title}
                            </div>
                            <div
                                style={{
                                    fontFamily:"proxima_novaregular",
                                    fontSize:"12px",
                                    color: "#9C9C9C",
                                    marginTop: "21px"
                                }}
                            >
                                Synopsis:
                            </div>
                            <div
                                style={{
                                    fontFamily: "proxima_novaregular",
                                    fontSize:"12px",
                                    color: "#9C9C9C",
                                    marginTop:"8px",
                                    // fontFamily: "Proxima Nova"
                                }}
                            >
                                {details.description}
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
                                    {details.duration}
                </span>
                            </div>
                        </div>
                    </div>

                    <div
                        className="row"
                        style={{
                            marginRight: 69,
                            marginLeft: 69,
                            marginTop: 37
                        }}>
                        <form onSubmit={this.ShowBuyTicketData  } style={{ width: "100%" }}>
                            <label>Select Location</label>

                                <select onChange={this.UseSelectedItem}     required>
                                    <option>Select Cinema Location</option>
                                
                                    {
                                        getCinemaList.message == listStyleConstants.GET_CINEMA_LIST_SUCCESS && 
                                        getCinemaList.data.response.map(event => {
                                            return (<option key={event.cinemaUid} value={event.cinemaUid + " " + "000" + details.id }>{event.name}</option>)
                                        })
                                    }
                                </select>
                                {error && <p>Please select location </p>}



                            <label style={{ marginTop: 16 }}>Select Day</label>
                            <select onChange={this.UseSelectedTime} >
                                <option>Select ShowTime</option>
                                {                                      
                                    ShowTime.message == listStyleConstants.GET_MOVIE_SHOWTIME_SUCCESS && 
                                    ShowTime.data.response.map(event=> {
                                        return <option key={event.date} value={event.date + "8888" + event.student + " " + event.adult + " " + event.children  + " " + event.id + " " + event.ticketId + " " + event.fee + " " + event.ticketTypes[0].ticketName}>
                                        {event.date}</option>
                                    })
                                } 
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
                                        {this.formatAmountNoDecimal(this.state.adultAmount)}
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
                                        {this.formatAmountNoDecimal(this.state.studentAmount)}
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
                                        {this.formatAmountNoDecimal(this.state.childrenAmount)}
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
                                <button disabled={this.props.SubmitTicketData.message == listStyleConstants.SUBMIT_MOVIE_TICKET_PENDING}
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
                                
                                    {this.props.SubmitTicketData.message ==listStyleConstants.SUBMIT_MOVIE_TICKET_PENDING ? "Processing..." :"Buy Ticket"}
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
        SubmitTicketData:state.SubmitTicketData,
    };
}

export default connect(mapStateToProps)(Moviedetails);
