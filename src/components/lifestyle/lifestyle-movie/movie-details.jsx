import React, { Fragment } from "react";
import { connect } from "react-redux";
import {listStyleConstants} from "../../../redux/constants/lifestyle/lifestyle-constants";
import {Redirect} from 'react-router-dom'
import * as actions from '../../../redux/actions/lifestyle/movies-actions';
import {getCinemaList, getSingleMovie} from '../../../redux/actions/lifestyle/movies-actions';
import clock from '../../../assets/img/clock-circular-outline.svg';
import moment from 'moment';
import unescape from 'lodash/unescape';
import '../movie-preference-event.css';




class Moviedetails extends React.Component {
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
            adultNumber:0,
            studentNumber:0,
            childNumber:0,
            adultAmount:0,
            studentAmount:0,
            childAmount:0,
            childrenAmount:0,
            initialAdultAmount:0,
            initialStudentAmount:0,
            initialChildAmount:0,
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
            ticketType:"",
            CinemaLocationValidity:false,
            CinemaLocation:null,
            showTime:null,
            // showTimeValidity:false,
            description:"",
            artworkThumbnail:'',
            youtubeId:'',
            id:'',
            duration:'',
            cinemaList:[],
            selected:"",
            QuantityInValidity:null,

            

        };
        this.UseSelectedItem = this.UseSelectedItem.bind(this);
        this.fetchCinemaList();




    }

    componentDidMount = () => {
        this.init();
        // console.log(this.props.location.pathname)

    };



    init = () => {
        if (this.props.SubmitMovieData.message !== listStyleConstants.SUBMIT_MOVIE_DATA_SUCCESS)
            this.props.history.push("/lifestyle/movie");
        else {
            
            let data = JSON.parse(this.props.SubmitMovieData.data.data);
            this.setState({
                description:data.description,
                artworkThumbnail:data.artworkThumbnail,
                title:data.title,
                youtubeId:data.youtubeId,
                id:data.id,
                duration:data.duration,
                cinemaList:data.cinemaList
                
            });
        }
    };

    
    fetchCinemaList(){
        const { dispatch } = this.props;
        dispatch(getCinemaList(this.state.user.token));
        //console.log(this.props.getCinemaList)

    };

    fetchSingleTicket(data){
        const { dispatch } = this.props;
        dispatch(getSingleMovie(this.state.user.token));
        //console.log(this.props.getCinemaList)

    };


    handleSelectLocation = item => {
        this.setState({
            movieLocation: item.value
        });
    };

    checkCinemaLocationValidity = () => {
        // console.log("this is cinemalocation")
        if (this.state.CinemaLocation === null || this.state.CinemaLocation === "" || this.state.CinemaLocation ==="Select Cinema Location"){
            this.setState({CinemaLocationValidity:true});
            return false;
        }else{
            this.setState({CinemaLocationValidity:false});
            return true;
        }
    }
    checkShowTimeValidity =(event)=>{
        // console.log("this is showtimevalidation", this.state.showTime)

        if(this.state.showTime === null || this.state.showTime === "" ){
            this.setState({showTimeValidity:true});
            return false;

        }else{
            this.setState({showTimeValidity:false})
            return true;
        }
    }
    checkQuantity =()=>{
        // console.log("this is out the statement")
        if (this.state.adultNumber  >= 1|| this.state.studentNumber >= 1  || this.state.childNumber >= 1 ){
            this.setState({ QuantityInValidity:true})
            // console.log('this is if statement')
            return true
        }else{
            this.setState({ QuantityInValidity:true})
            // console.log("this thr else statement")
         return true
        }
    }
 


    handleSelectMovieDay = movieDay => {
        this.setState({
            movieDay
        });
    };

    increaseAdult = () => {
        let { adultNumber } = this.state;
        this.setState({ adultNumber: adultNumber + 1},() =>
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
        this.setState({ childNumber: this.state.childNumber + 1}, () =>
            this.setState({
                childrenAmount: this.state.initialChildAmount * this.state.childNumber
            })
        );
    };

    decreaseAdult = () => {
        let { adultNumber } = this.state;
        if ( adultNumber !== 0)
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
        if (studentNumber !== 0)
            this.setState({ studentNumber: this.state.studentNumber - 1 }, () =>
                this.setState({
                    studentAmount:
                        this.state.initialStudentAmount * this.state.studentNumber
                })
            );
    };

    decreaseChild = () => {
        let { childNumber } = this.state;
        if ( childNumber !== 0 )
            this.setState({ childNumber: childNumber - 1 }, () =>
                this.setState({
                    childrenAmount: this.state.initialChildAmount * this.state.childNumber
                })
            );
    };
    
    ShowBuyTicketData = (event) => {
        event.preventDefault();
        if (this.checkCinemaLocationValidity() && this.checkShowTimeValidity() && this.checkQuantity()){
            this.props.dispatch(actions.SubmitTicketData({
                "ShowTimeId": this.state.showTimeId,
                "TicketAmount": this.state.TicketAmount,
                "adultAmount": this.state.adultAmount,
                "studentAmount": this.state.studentAmount,
                "childrenAmount": this.state.childrenAmount,
                "adultQuantity": this.state.adultNumber,
                "childQuantity": this.state.childNumber,
                "studentQuantity": this.state.studentNumber,
                "cinemaId": this.state.cinemaId,
                "ticketId": this.state.ticketId,
                "fee": this.state.fee,
                "ticketType": this.state.ticketType,
                "title": this.state.title
            }));

        }
    
    }
    
    UseSelectedTime = (event) => {
        let amounts = event.target.value.split("8888")[1];
        let adultAmount = amounts.split(" ")[1];
        let childrenAmount = amounts.split(" ")[2];
        let studentAmount = amounts.split(" ")[0];
        let showTimeId = amounts.split(" ")[3];
        // console.log("=======",showTimeId)
        let ticketId = amounts.split(" ")[4];
        let fee = amounts.split(" ")[5];
        let ticketType = amounts.split(" ")[6];
        let name = event.target.name;
        // console.log("*******", childrenAmount, studentAmount, adultAmount, fee)

       
        
        this.setState({initialStudentAmount: studentAmount, studentAmount}, () => {
            if (this.state.studentAmount !== 0) {
                // this.setState({studentNumber: this.state.studentNumber + 1})
            }
        });
        this.setState({initialAdultAmount: adultAmount,adultAmount}, () => {
            if (this.state.AdultAmount !== 0) {
                // this.setState({adultNumber: this.state.adultNumber + 1})
            } 
        });
        this.setState({initialChildAmount: childrenAmount,childrenAmount}, () => {
            if (this.state.childrenAmount !== 0) {
                // this.setState({childNumber: this.state.childNumber + 1})
            }
        });

        this.setState({ showTimeId:showTimeId });
        this.setState({ticketId:ticketId});
        this.setState({fee:fee});
        this.setState({ticketType:ticketType})
        this.setState({[name] : event.target.value});

    }
   
    UseSelectedItem = (event) => {
        let gottenValue = event.target.value.split("000");
        // console.log("=========",gottenValue)
        let selectedItem = event.target.value;
        let name = event.target.name;        
        
        let data = {
            item: gottenValue[0],
            id: gottenValue[1]
        }

        this.setState({itemId: gottenValue[1]});
        this.setState({cinemaId:gottenValue[0]})
        this.setState({[name] : event.target.value});

        // console.log(data);
        this.props.dispatch(actions.ShowTime(this.state.user.token, data))
    }

    formatAmountNoDecimal = (amount) => {
        return amount.toLocaleString(navigator.language,{minimumFractionDigits:0});
    };

    rendershowTime=() => {
        if (this.props.ShowTime.message === listStyleConstants.GET_MOVIE_SHOWTIME_PENDING) {

            return <select name="showTime">
                        <option>Loading Movie Showtime...</option>;
                    </select>
        
        }else if (this.props.ShowTime.message === listStyleConstants.GET_MOVIE_SHOWTIME_SUCCESS && this.props.ShowTime.data.response.length > 0){
            return <div>
                <label style={{ marginTop:16 }}>Select Day</label>
                <select onChange={this.UseSelectedTime}  name="showTime">
                    <option>Select ShowTime</option>
                    {                            
                                
                        this.props.ShowTime.message === listStyleConstants.GET_MOVIE_SHOWTIME_SUCCESS && 
                        this.props.ShowTime.data.response.map(event=> {
                            return <option key={event.date} value={event.date + "8888" + event.student + " " + event.adult + " " + event.children  + " " + event.id + " " + event.ticketId + " " + event.fee + " " + event.ticketTypes[0].ticketName}>
                            {moment(event.date).format('LLLL')}</option>
                        })
                    } 
                    </select>
            
        </div>
            
            

    }

    else{
        return <select name="showTime">
                <option>No show time available</option>
        </select>
    }
   
}

    

    render() {
        //  const details = this.props.location.state.details;

       const {
            adultNumber,
            studentNumber,
            childNumber,
            CinemaLocationValidity,
            showTimeValidity,
            cinemaList,
           QuantityInValidity,
        } = this.state;
         const {getCinemaList,ShowTime,buyMovieTicket}=this.props

        // console.log("====================",details)
    

        return (
            <div className="container">
                 <div className="video">
                <iframe title="youtube Video" className="iframe" src={`https://www.youtube.com/embed/${this.state.youtubeId}`}
                    frameBorder='0'/>
                </div>

                    
                <div className="max-750">
                <div className="al-card fund-al-card no-pad" id="pad">
                    <div className="buy-movies">
                        Buy Movie Ticket
                    </div>
                        <div className="event-border" />
                    <div
                            className="row" id="eventticket">
                        {/* {this.gotobuyTicket()} */}
                        <div className="col-sm-3">
                            <i className="toshow">
                                <img alt=""
                                className="img"
                                    src={this.state.artworkThumbnail}/>
                            </i>
                        </div>
                        <div
                            className="col-sm-9" id="tickettext">
                            <div className="ticket-title">
                                {this.state.title}
                            </div>
                            <div className="title">
                                Synopsis:
                            </div>
                            <div className="description"
                              
                            >
                                {unescape(this.state.description)}
                            </div>
                            <div>
                                <i className="toshow">
                                    <img alt="" className="clockImage"
                                         src={clock}
                                        
                                    />
                                </i>
                                <span className="duration">
                                    {this.state.duration}
                </span>
                            </div>
                        </div>
                    </div>

                    <div
                        className="row" id="showTicket"
                        >
                            <form onSubmit={this.ShowBuyTicketData} className="ShowBuyTicketData">
                            <div  className={CinemaLocationValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                            <label>Select Location</label>

                                <select onChange={this.UseSelectedItem} name="CinemaLocation">
                                    <option>Select Cinema Location</option>
                                
                                    { 
                                            this.props.SubmitMovieData.message === listStyleConstants.SUBMIT_MOVIE_DATA_SUCCESS &&

                                        cinemaList.map(event =>{
                                            return (<option key={event.cinemaUid} value={event.cinemaUid + " " + "000" + this.state.id}>{event.name}</option>)
                                        })
                                    }
                                </select>
                                {CinemaLocationValidity && <div className='text-danger'>Select cinema location </div>}

                                </div>


                              
                            <div  className={showTimeValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                            

                                    {
                                        this.rendershowTime()
                                    }
                            
                            
                            {showTimeValidity && <div className='text-danger'>Select cinema show time </div>}
                            </div>
        
                                <div className="row selectionCover">
                                    <div className="col-sm-4 form-error" id="padding-left">
                                        <div className="child-text">Adult</div>
                                    <div
                                        className="row count-border">
                                        <div
                                            onClick={this.decreaseAdult}
                                            className="decreaseAdult">
                                            -
                                        </div>
                                        <div className="adultNumber">
                                            {adultNumber}
                                        </div>
                                        <div className="increaseAdult"
                                            onClick={this.increaseAdult}>
                                            +    
                                        </div>
                                    </div>
                                        <div className={QuantityInValidity ? "studentAmount form-error" : "studentAmount"}>
                                        {
                                                this.formatAmountNoDecimal(this.state.adultAmount)
                                        
                                        }
                                    </div>
                                </div>
                                {/* student */}
                                    <div className="col-sm-4" id="padding-left" >
                                        <div className="child-text">Student</div>
                                    <div
                                        className="row count-border">
                                        <div className="decreaseStudent"
                                            onClick={this.decreaseStudent}>
                                            -
                                        </div>
                                        <div className="studentNumber">
                                            {studentNumber}
                                        </div>
                                        <div className="increaseStudent"
                                            onClick={this.increaseStudent}>
                                            +
                                        </div>
                                    </div>
                                        <div className="studentAmount">
                                        {this.formatAmountNoDecimal(this.state.studentAmount)}

                                    </div>
                                </div>
                                    <div className="col-sm-4" id="padding-left">
                                    <div className="child-text">Child</div>
                                    <div
                                        className="row count-border">
                                        <div className="decreaseChild"
                                            onClick={this.decreaseChild}>
                                            -
                                        </div>
                                        <div className="childNumber">
                                            {childNumber}
                                        </div>
                                        <div className="increaseChild"
                                            onClick={this.increaseChild}>
                                            +
                                        </div>
                                    </div>
                                    <div className="studentAmount">
                                        {

                                         this.formatAmountNoDecimal(this.state.childrenAmount)
                                        }
                                    </div>
                                </div>
                            </div>
                        

                            <center>
                                {
                                    QuantityInValidity==false &&
                                        <div 
                                        style={{ width: "50%" }} className="info-label error">Select number of ticket</div>
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
                        <a  style={{ cursor: "pointer" }} onClick={() => { this.props.dispatch(actions.ClearAction(listStyleConstants.MOVIE_REDUCER_CLEAR));
                            this.props.history.push('/lifestyle/movie') }} className="add-bene m-t-50">
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
        SubmitTicketData:state.LifestyleReducerPile.SubmitTicketData,
        SubmitMovieData:state.LifestyleReducerPile.SubmitMovieData,
        alert: state.alert,

        
    };
}

export default connect(mapStateToProps)(Moviedetails);
