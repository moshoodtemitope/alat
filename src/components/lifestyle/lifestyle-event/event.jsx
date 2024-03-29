import React, {Component} from 'react'
import { connect } from "react-redux";
import styles from '../movie-preference-event.css'
import {Link, NavLink} from "react-router-dom";
import {Fragment} from "react";
import moment from 'moment';
import * as actions from '../../../redux/actions/lifestyle/movies-actions';
import {listStyleConstants} from '../../../redux/constants/lifestyle/lifestyle-constants';
import { getEvents, SubmitEventData, SearchFetchEvent} from "../../../redux/actions/lifestyle/movies-actions";
import clock from '../../../assets/img/date.svg'
import location from '../../../assets/img/Facebook.svg'
import dummyImage from '../../../assets/img/dummyImage.svg'



class Event extends Component {
    constructor(props){
        super(props);
        this.state={
            user: JSON.parse(localStorage.getItem("user")),
            event: null,
            pageSize: 2,
            searchItem: "",
            value: "",
            events:"",
            
        };
    }
    componentDidMount(){
        this.fetchEventList(1)


    }
    
    fetchEventList(pageNumber){
        const { dispatch } = this.props;
        dispatch(getEvents(this.state.user.token, pageNumber ));
    };

    // search = data => {
    //     this.setState({searchItem: data}, () => this.renderEvent());
      
    // };
    search = async data => {
        this.props.dispatch(actions.SearchFetchEvent(this.state.user.token, data))
        let events = await this.props.SearchfetchEventList.data.response.eventList;
        this.setState({ events });
    };

    EventDetails=(event)=>{
        this.props.dispatch(SubmitEventData(event.target.id))
    }
    
   
    
    
    onChangeHandler =  e => {
        if (e.target.value.length >= 2) {
            this.search(e.target.value);
        }
        this.setState({ value: e.target.value });
        //console.log(e.target.value)
        // this.setState({ display: "none" })
    }
   
    handleLoadMore() {
        this.setState(prevState => ({
            pageSize: prevState.pageSize + 1
        }));
        const { dispatch } = this.props;
        dispatch(getEvents(this.state.user.token, this.state.pageSize));
    }
   
    
    renderEvent = () => {
        let user = this.state.user;
        let props = this.props;
        let getEvents = props.getEvents;
        let that = this;
        
        if(getEvents.message === listStyleConstants.GET_EVENTS_PENDING){
            return  <h4 style={{marginTop:'10%'}} className="text-center">Loading Event...</h4>;
        }

        else if(getEvents.message === listStyleConstants.GET_EVENTS_ERROR){
            return(
                <h4 className="text-center" style={{ marginTop: '65px'}}>No Event Found</h4>
            );
        }

        else if (getEvents.message === listStyleConstants.GET_EVENTS_SUCCESS){
            let userEvents =this.props.getEvents.data.response.eventList
            
            if(this.state.searchItem == "") {
            let result
            for(var x of userEvents){
                x.date = new Date(x.date).getTime()
              }
              result = userEvents.sort(function(a, b) {
                  return a.date - b.date;



              });
            return(
                <div className="eventTrays col-sm-12">
                    {result.map(function(event, index){
                        return(
                            <div className="eventCards" key={index}>
                                <Link to={{
                                    pathname:"/lifestyle/event-details",
                                    state:{
                                        details:event
                                    }

                                  
                                }}>
                                
                                    {
                                        event.thumbnailImage === null ? <img alt="" className="picCard" src={dummyImage}/>:
                                        <div 
                                        id={JSON.stringify(event)} onClick={that.EventDetails} className="picCard" style={{backgroundImage: 'url("'+event.thumbnailImage+'")'}}>
                                            
                                       </div>

                                    }
                                        
                                
                                   
                                </Link>

                                <div className="boldHeader">{event.title.toString().length > 15 ? event.title.toString().substring(0, 15) + "..." : event.title.toString()}</div>
                                <div className="details">
                                    <div className="left">
                                        <img src={clock} alt=""/> 
                                    </div>
                                    <div className="right">
                                        <div style={{fontSize: 12, marginTop:3}}> {moment(event.date).format('llll')}</div>
                                    </div>
                                </div>
                                <div className="details">
                                    <div className="left">
                                        <img src={location} alt=""/> 
                                    </div>
                                    <div className="right">
                                        <div style={{fontSize:12, marginTop:3}} id="disc">{ event.location }</div>
                                    </div>

                                </div>
                                
                            </div>
                        );
                    })}
                </div>

            );
            }
            else {
                let {searchItem} = this.state;
                return(

                    <div className="eventTrays">
                        {userEvents.map(function(event, index){
                            if ((event.title).toLowerCase().toString().includes(searchItem)) {
                                // {console.log("======", event.title)}
                               return(
                                <div className="eventCards" key={index}>
                                    <Link to={{
                                        pathname:"/lifestyle/event-details",
                                        state:{
                                            details:event
                                        }
                                    }}>
                                        <div  id={JSON.stringify(event)} onClick={that.EventDetails}  className="picCard" style={{backgroundImage: 'url("'+event.thumbnailImage+'")'}}>
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
    renderEventSeach = () => {
        
        let props = this.props;
        let SearchfetchEventList = props.SearchfetchEventList;
        let that = this

        if (SearchfetchEventList.message === listStyleConstants.SEARCH_FETCH_EVENT_PENDING) {
            return <h4 className="container" style={{ marginTop: "60px", textAlign:"center" }}>Please wait...</h4>;
        }
        else if (SearchfetchEventList.message === listStyleConstants.SEARCH_FETCH_EVENT_SUCCESS && this.props.SearchfetchEventList.data.response.eventList.length < 1) {

            return (
                <h4 className="text-center" style={{ marginTop: '65px' }}>No Event Found</h4>
            );
        }
        else if (SearchfetchEventList.message === listStyleConstants.SEARCH_FETCH_EVENT_SUCCESS && this.props.SearchfetchEventList.data.response.eventList.length >= 1) {
            let userEvents = SearchfetchEventList.data.response.eventList;
            return (
                <div className="eventTrays col-sm-12">
                    {userEvents.map(function (event, index) {
                        return (
                            <div className="eventCards" key={index}>
                                <Link to={{
                                    pathname: "/lifestyle/event-details"}}>
                                    <div id={JSON.stringify(event)} onClick={that.EventDetails} className="picCard" style={{ backgroundImage: 'url("' + event.thumbnailImage + '")' }}>
                                    </div>
                                </Link>

                                <div className="boldHeader">{event.title.toString().length > 15 ? event.title.toString().substring(0, 15) + "..." : event.title.toString()}</div>
                                <div id="disc">{event.location}</div>
                                <div className="details">
                                    <div className="left">
                                        <i></i>
                                    </div>
                                    <div className="right">
                                        <div style={{ fontSize: 12 }}> {moment(event.date).format('MMMM DD, h:mm:ss a')}</div>

                                    </div>
                                </div>
                            </div>
                        )
                        
                    })}
                </div>

            );
        }

    }
    loadMore=()=>{
        if (this.props.getEvents.message === listStyleConstants.GET_EVENTS_SUCCESS && this.props.SearchfetchEventList.message !== listStyleConstants.SEARCH_FETCH_EVENT_PENDING){
            return <span className="loadMore" onClick={() => this.handleLoadMore()}>Load More</span>

        }
    }

    resultu = () => {
        if (this.state.events !== "") {
            return this.renderEventSeach();
        }
        else {
            return this.renderEvent();
        }



    }
    render = () => {
                return(
                    <Fragment>
        
                        <div className="eventWrapper">
                            <div className="">
                                <ul>
                                    <li className="inputList"><label className="inputLabel">Search by keyword</label><input className='SearchInput' type="text" placeholder="search ..." value={this.state.value} onChange={e => this.onChangeHandler(e)}/></li>
                                </ul>
                                       
                            </div>
                              
                           
                        </div>
                        <div className="container">
                            {this.resultu()}
                            {
                                this.loadMore()

                            }
                        </div>
        
                    </Fragment>
                )
        }
    }

function mapStateToProps(state){
    return {
        getEvents:state.LifestyleReducerPile.getEvents,
        SearchfetchEventList:state.LifestyleReducerPile.SearchfetchEventList,
        SubmitEventData:state.LifestyleReducerPile.SubmitEventData,
    };
}

export default connect(mapStateToProps)(Event);