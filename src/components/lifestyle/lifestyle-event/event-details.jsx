import React, { Fragment } from "react";
import { connect } from "react-redux";
import {listStyleConstants} from "../../../redux/constants/lifestyle/lifestyle-constants";
import {Redirect} from 'react-router-dom'
import * as actions from '../../../redux/actions/lifestyle/movies-actions';
import {getCinemaList,} from '../../../redux/actions/lifestyle/movies-actions';
import clock from '../../../assets/img/clock-circular-outline.svg'
import unescape from 'lodash/unescape';


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
            ticketClassses:"",
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
            ticketId:""
        };
        this.fetchCinemaList();
    }
    componentDidMount = () => {
        this.init();
        setTimeout(() => {
            this.setState({ticketClassses: JSON.parse(this.props.SubmitEventData.data.data.ticketClassses)})
        }, 1000)
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
                
            }, () => {
                console.log(this.state.ticketClassses);
                console.log('0000000000000000000000000000000000000000000000000000000')
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
    };
    InitiateNetworkCall=()=>{
        const data = {
            ShowTimeId:this.state.itemId,
            TicketAmount:this.state.childAmount,
            title:this.state.title,
            quantity:this.state.childNumber,
            adultquatity:this.state.adultNumber,
            studentQuantity:this.state.studentNumber,
            ticketClassses:this.state.ticketClassses,
            eventId:this.state.eventId,
            source:this.state.source,
            ticketId:this.state.ticketId
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
            id: gottenValue[1],
            ticketClassses:gottenValue[2],
            eventId:gottenValue[3],
            ticketId:gottenValue[4]

        }
  
        this.setState({initialChildAmount:gottenValue[0]}, () => {
            this.setState({childNumber: 1})
        });
        this.setState({childAmount:gottenValue[0]});
        this.setState({ticketClassses:gottenValue[2]});
         this.setState({eventId:gottenValue[3]});
        this.setState({[name] : event.target.value});
        this.setState({ticketId:gottenValue[4]})

        console.log(data);
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
         if(this.state.ticketClassses == ""){
             return(<div> <p>something</p></div>)
         }

         if(this.state.ticketClassses != ""){
            return (
                <div>
                <div className="row" style={{justifyContent: "center", marginBottom:"15px"}}>
                <img src={this.state.originalImage} class="img-responsive"/>
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
                                        src={this.state.thumbnailImage}
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
                                    {this.state.title}
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
                                    {unescape(this.state.description.toString().length > 30 ? this.state.description.toString().substring(0, 60)+"...": this.state.description.toString())}
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
                                            fontSize: 12,
                                            color: "#9C9C9C"
                                        }}
                                    >
                                        {this.state.location}
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
                               <div  className={TicketClassValidity ? "form-group form-error col-md-12" : "form-group col-md-12"} style={{paddingLeft: 0}}>
                                        <label>Select Ticket Class</label>
    
                                            <select onChange={this.UseSelectedItem } name="ticketClass">
                                            <option>Select Ticket Type</option>
    
                                                {
                                                    this.props.SubmitEventData.message == listStyleConstants.SUBMIT_EVENT_DATA_SUCCESS && 
                                                    // SubmitEventTicketData.message === listStyleConstants.G &&
                                                   /// console.log(this.state.ticketClassses)
                                                    this.state.ticketClassses.map(event => {
                                                        return <option key={event.title} value={event.ticketId + " " + "000" + event.price + " " + event.title + " " + event.eventId}>{unescape(event.title)}</option>
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
                                                        <option key={this.state.date}>{this.state.date}</option>
                                                        {/* {                                      
                                                            ShowTime.message == listStyleConstants.GET_MOVIE_SHOWTIME_SUCCESS && 
                                                            ShowTime.data.response.map(event=> {
                                                                return <option key={event.date} value={event.date + "8888" + event.student + " " + event.adult + " " + event.children}>{event.date}</option>
                                                            })
                                                        }  */}
                                                    </select>
                                                </div>
                                                <div
                                    className="col-md-6"
                                    style={{
                                        marginTop: 23,
                                        // marginLeft: 0,
                                        // justifyContent: "space-between"
                                    }}
                                >
                                    
                                   <div style={{ paddingRight: 30 }}>
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
                                                // fontFamily: "proxima_novaregular",
                                                fontWeight: "bold",
                                                fontSize: 14
                                            }}
                                        >
                                        {
                                            (this.state.childAmount).toString().includes("-") ? "0" : `₦${this.formatAmountNoDecimal(this.state.childAmount)}`
                                        }
                                            
                                        </div> 
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
                                    <button
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
        

        return(
            <div>
                <p>Loading ...</p>
            </div>
        )
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
