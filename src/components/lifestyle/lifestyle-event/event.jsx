import React, {Component} from 'react'
import { connect } from "react-redux";
import '../movie-preference-event.css'
import {Link, NavLink} from "react-router-dom";
import {Fragment} from "react";
import moment from 'moment'

import {listStyleConstants} from '../../../redux/constants/lifestyle/lifestyle-constants';
import {getEvents} from "../../../redux/actions/lifestyle/movies-actions"




class Event extends Component {
    constructor(props){
        super(props);
        this.state={
            user: JSON.parse(localStorage.getItem("user")),
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

                                <div className="boldHeader">{event.title.toString().length > 20 ? event.title.toString().substring(0, 20)+"...": event.title.toString()}</div>
                                <div id="disc">{ event.location.toString().length > 30 ? event.location.toString().substring(0, 60)+"...": event.location.toString() }</div>
                                <div className="details">
                                    <div className="left">
                                        <i></i>
                                    </div>
                                    <div className="right">
                                        <div>Sunday, Oct 4 | {event.duration}</div>
                                    </div>
                                </div>
                            </div>

                        );
                    })}
                </div>
            );
        }
    }



    render(){
        let userEvent = this.props.getEvents;

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
        )

    }
}
function mapStateToProps(state){
    return {
        getEvents: state.getEvents
    };
}



export default connect(mapStateToProps)(Event);