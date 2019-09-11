import React, {Component} from 'react'
import { connect } from "react-redux";
<<<<<<< HEAD
import '../movie-preference-event.css'
import {Link, NavLink} from "react-router-dom";
import {Fragment} from "react";
import moment from 'moment'

import {listStyleConstants} from '../../../redux/constants/lifestyle/lifestyle-constants';
import {getEvents} from "../../../redux/actions/lifestyle/movies-actions"
=======
import styles from '../movie-preference-event.css'
import {Link, NavLink} from "react-router-dom";
import {Fragment} from "react";
import moment from 'moment';
import * as actions from '../../../redux/actions/lifestyle/movies-actions';
import {listStyleConstants} from '../../../redux/constants/lifestyle/lifestyle-constants';
import {getEvents} from "../../../redux/actions/lifestyle/movies-actions";
import clock from '../../../assets/img/clock-circular-outline.svg'

>>>>>>> test-merge




class Event extends Component {
    constructor(props){
        super(props);
        this.state={
            user: JSON.parse(localStorage.getItem("user")),
<<<<<<< HEAD
            filtered: []

        };
        console.log("state",this.state);
        // this.handleChange = this.handleChange.bind(this);
        this.fetchEventList()
    }
    fetchEventList(){
        const { dispatch } = this.props;
        dispatch(getEvents(this.state.user.token));
    };

    // handleChange(e) {
    //     // Variable to hold the original version of the list
    //     let currentList = [];
    //     // Variable to hold the filtered list before putting into state
    //     let newList = [];
    //
    //     // If the search bar isn't empty
    //     if (e.target.value !== "") {
    //         // Assign the original list to currentList
    //         currentList = this.props.getMovieList.data.response;
    //         console.log("list",currentList);
    //
    //         // Use .filter() to determine which items should be displayed
    //         // based on the search terms
    //         newList = currentList.filter(item => {
    //             // change current item to lowercase
    //             const lc = item.toString().toLowerCase();
    //             // change search term to lowercase
    //             const filter = e.target.value.toString().toLowerCase();
    //             // check to see if the current list item includes the search term
    //             // If it does, it will be added to newList. Using lowercase eliminates
    //             // issues with capitalization in search terms and search content
    //             return lc.includes(filter);
    //         });
    //     } else {
    //         // If the search bar is empty, set newList to original task list
    //         newList = this.props.getMovieList.data.response;
    //     }
    //     // Set the filtered state based on what our rules added to newList
    //     this.setState({
    //         filtered: newList
    //
    //
    //     });
    //
    // }
=======
            event:null,
            total:5,
            per_page: 4,
            current_page: 1,
            searchItem: ""

        };
        console.log("state",this.state);
    }
    componentDidMount(){
        this.fetchEventList(1)


    }
    fetchEventList(pageNumber){
        const { dispatch } = this.props;
        dispatch(getEvents(this.state.user.token, pageNumber));
    };

    search = data => {

        this.setState({searchItem: data}, () => this.renderEvent());
        // this.props.dispatch(actions.SearchFetchEvent(this.state.user.token, data))
        // const events = this.props.getEvents.data.response.eventList;
        // events.map((event) => {
        //     if ((event.title).toLowerCase().toString().includes(data)) {
        //        console.log("=====", event.title)
        //     }
        // })
    
        // this.setState({ event });
      };
    
    
    onChangeHandler = async e => {
        this.search(e.target.value);
        this.setState({ value: e.target.value });

        
    };
    renderEventSeach(){
        let user = this.state.user;
        let props = this.props;
        let SearchfetchEventList = props.SearchfetchEventList;
        if(SearchfetchEventList.message === listStyleConstants.SEARCH_FETCH_EVENT_PENDING){
            return  <h4  style={{marginTop:"60px"}} className="text-center">Loading Event...</h4>;
        }
        else if(SearchfetchEventList.message === listStyleConstants.SEARCH_FETCH_EVENT_FAILURE){
            return(
                <h4 className="text-center" style={{ marginTop: '65px'}}>No Event Found</h4>
            );
        }
        else if (SearchfetchEventList.message === listStyleConstants.SEARCH_FETCH_EVENT_SUCCESS){
            let userEvents = SearchfetchEventList.data.response.eventList;
            // let userMovies = this.state.filtered;

            return(

                <div className="eventTrays">
                    {userEvents.map(function(event, index){
                        return(
                            <div className="eventCards" key={index}>
                                <Link to={{
                                    pathname:"/lifestyle/event-details",
                                    state:{
                                        details:event
                                    }
                                }}>
                                    <div className="picCard" style={{backgroundImage: 'url("'+event.thumbnailImage+'")'}}>
                                    </div>
                                </Link>

                                <div className="boldHeader">{event.title.toString().length > 15 ? event.title.toString().substring(0, 15)+"...": event.title.toString()}</div>
                                <div id="disc">{ event.location.toString().length > 30 ? event.location.toString().substring(0, 30)+"...": event.location.toString() }</div>
                                <div className="details">
                                    <div className="left">
                                        <i></i>
                                    </div>
                                    <div className="right">
                                        <div style={{fontSize: 12}}> {moment(event.date).format('MMMM DD, h:mm:ss a')}</div>
                                    </div>
                                </div>
                            </div>

                        );
                    })}
                </div>

            );
        }

    }
    // handleSubmit = (e) => {
    //     e.preventDefault();

    //                let data={
    //             "ShowTimeId":this.state.ShowTimeId,	
    //             "CinemaId":this.state.cinemaId,
    //             "TicketId":this.state.ticketId,
    //             'AccountNo':this.state.accountToDebit,
    //             'Pin':this.state.Pin,
    //             'TicketAmount':this.state.TicketAmount,
    //             "Adult":this.state.adult,
    //             "Student":this.state.student,
    //             "Children":this.state.child,
    //             "fee":this.state.fee,

    //         };
    //         console.log(data)
        
    //         this.props.dispatch(actions.postMovieContent(this.state.user.token, data));


           
    //     };

>>>>>>> test-merge

    renderEvent(){
        let user = this.state.user;
        let props = this.props;
        let getEvents = props.getEvents;
        if(getEvents.message === listStyleConstants.GET_EVENTS_PENDING){
            return  <h4 className="text-center">Loading Event...</h4>;
        }
        else if(getEvents.message === listStyleConstants.GET_EVENTS_ERROR){
            return(
                <h4 className="text-center" style={{ marginTop: '65px'}}>No Event Found</h4>
            );
        }
        else if (getEvents.message === listStyleConstants.GET_EVENTS_SUCCESS){
            let userEvents = getEvents.data.response.eventList;
<<<<<<< HEAD
            // let userMovies = this.state.filtered;

            return(
=======

            if(this.state.searchItem == "") {
            return(

>>>>>>> test-merge
                <div className="eventTrays">
                    {userEvents.map(function(event, index){
                        return(
                            <div className="eventCards" key={index}>
                                <Link to={{
                                    pathname:"/lifestyle/event-details",
                                    state:{
                                        details:event
                                    }
                                }}>
                                    <div className="picCard" style={{backgroundImage: 'url("'+event.thumbnailImage+'")'}}>
                                    </div>
                                </Link>

<<<<<<< HEAD
                                <div className="boldHeader">{event.title.toString().length > 20 ? event.title.toString().substring(0, 20)+"...": event.title.toString()}</div>
                                <div id="disc">{ event.location.toString().length > 30 ? event.location.toString().substring(0, 60)+"...": event.location.toString() }</div>
                                <div className="details">
                                    <div className="left">
                                        <i></i>
                                    </div>
                                    <div className="right">
                                        <div>Sunday, Oct 4 | {event.duration}</div>
=======
                                <div className="boldHeader">{event.title.toString().length > 15 ? event.title.toString().substring(0, 15)+"...": event.title.toString()}</div>
                                <div id="disc">{ event.location.toString().length > 30 ? event.location.toString().substring(0, 30)+"...": event.location.toString() }</div>
                                <div className="details">
                                    <div className="left">
                                    <img src={clock} alt=""/> 
                                                
                                    </div>
                                    <div className="right">
                                        <div style={{fontSize: 12, marginTop:3}}> {moment(event.date).format('MMMM DD, h:mm:ss a')}</div>
>>>>>>> test-merge
                                    </div>
                                </div>
                            </div>

                        );
                    })}
                </div>
<<<<<<< HEAD
            );
        }
    }
=======

            );
            }
            else {
                let {searchItem} = this.state;
                return(

                    <div className="eventTrays">
                        {userEvents.map(function(event, index){
                            if ((event.title).toLowerCase().toString().includes(searchItem)) {
                                {console.log("======", event.title)}
                               return(
                                <div className="eventCards" key={index}>
                                    <Link to={{
                                        pathname:"/lifestyle/event-details",
                                        state:{
                                            details:event
                                        }
                                    }}>
                                        <div className="picCard" style={{backgroundImage: 'url("'+event.thumbnailImage+'")'}}>
                                        </div>
                                    </Link>
    
                                    <div className="boldHeader">{event.title.toString().length > 15 ? event.title.toString().substring(0, 15)+"...": event.title.toString()}</div>
                                    <div id="disc">{ event.location.toString().length > 30 ? event.location.toString().substring(0, 30)+"...": event.location.toString() }</div>
                                    <div className="details">
                                        <div className="left">
                                        <img src={clock} alt=""/> 
                                                    
                                        </div>
                                        <div className="right">
                                            <div style={{fontSize: 12, marginTop:3}}> {moment(event.date).format('MMMM DD, h:mm:ss a')}</div>
                                        </div>
                                    </div>
                                </div>
    
                            ); 
                            }
                            
                        })}
                    </div>
    
                );
            }
        }
    }
    
    // resultu = () => {
    //     if (this.state.event !== null && this.state.event !== "") {
    //         return this.renderEventSeach();
    //     }
    //     else {
    //         return this.renderEvent(); 
    //     }
        

    // }
>>>>>>> test-merge



    render(){
        let userEvent = this.props.getEvents;
<<<<<<< HEAD

        return(
            <Fragment>
                <div>
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
                    {this.renderEvent(userEvent)}
                </div>
            </Fragment>
=======
        let  renderPageNumbers;


        const pageNumbers = [];
        if (this.state.total !== null) {
        for (let i = 2; i <= Math.ceil(this.state.total / this.state.per_page); i++){
        pageNumbers.push(i);
      }
    }
    renderPageNumbers = pageNumbers.map(number => {
        let classes = this.state.current_page === number ? styles.pagination : '';

        return (
          <span  key={number} className={classes} onClick={() => this.fetchEventList(number)}>{this.props.getEvents.message ===listStyleConstants.GET_EVENTS_SUCCESS ? <p style={{color:"#43063C", fontSize:16, fontFamily:'proxima_novaregular', position:"relative", cursor:"pointer"}}>Load More</p>:null }</span>
        );
      });

        return(
            <Fragment>

                    <div className="row" style={{justifyContent: "center"}}>
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
                                        
                                        <li style={{float:"right"}}>
                                             {/* <label>Search by keyword</label> */}
                                            <input style={{width:"100%",height:"30px", marginTop:8, float:'right'}} type="text" placeholder="search ..." value={this.state.value} onChange={ e => this.onChangeHandler(e)}/></li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                        {this.renderEvent()}
                        <span onClick={() => this.fetchEventList(1)}></span> 
                            {renderPageNumbers}
                        <span onClick={() => this.fetchEventList(1)}></span> 
                   

                    </div>

            </Fragment>


>>>>>>> test-merge
        )

    }
}
function mapStateToProps(state){
    return {
<<<<<<< HEAD
        getEvents: state.getEvents
=======
        getEvents: state.getEvents,
        SearchfetchEventList:state.SearchfetchEventList
>>>>>>> test-merge
    };
}



export default connect(mapStateToProps)(Event);