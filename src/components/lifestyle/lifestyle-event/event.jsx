import React, {Component} from 'react'
import { connect } from "react-redux";
import styles from '../movie-preference-event.css'
import {Link, NavLink} from "react-router-dom";
import {Fragment} from "react";
import moment from 'moment';
import * as actions from '../../../redux/actions/lifestyle/movies-actions';
import {listStyleConstants} from '../../../redux/constants/lifestyle/lifestyle-constants';
import {getEvents,SubmitEventData} from "../../../redux/actions/lifestyle/movies-actions";
import clock from '../../../assets/img/clock-circular-outline.svg'





class Event extends Component {
    constructor(props){
        super(props);
        this.state={
            user: JSON.parse(localStorage.getItem("user")),
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
      
      };

    EventDetails=(event)=>{
        let events = event.target.id
        console.log('======',events)
        this.props.dispatch(SubmitEventData(event.target.id))

        

    }
   
    
    
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
                                    
                                }}>
                                    <div  id={JSON.stringify(event)} onClick={that.EventDetails}  className="picCard" style={{backgroundImage: 'url("'+event.thumbnailImage+'")'}}>
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
    


    renderEvent(){
        let user = this.state.user;
        let props = this.props;
        let getEvents = props.getEvents;
        let that =this
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

            if(this.state.searchItem == "") {
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
                                    <div id={JSON.stringify(event)} onClick={that.EventDetails} className="picCard" style={{backgroundImage: 'url("'+event.thumbnailImage+'")'}}>
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
                                {console.log("======", event.title)}
                               return(
                                <div className="eventCards" key={index}>
                                    <Link to={{
                                        pathname:"/lifestyle/event-details",
                                       
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
    
    // resultu = () => {
    //     if (this.state.event !== null && this.state.event !== "") {
    //         return this.renderEventSeach();
    //     }
    //     else {
    //         return this.renderEvent(); 
    //     }
        

    // }



    render(){
        let userEvent = this.props.getEvents;
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


        )

    }
}
function mapStateToProps(state){
    return {
        getEvents: state.LifestyleReducerPile.getEvents,
        SearchfetchEventList:state.LifestyleReducerPile.SearchfetchEventList,
        SubmitEventData:state.LifestyleReducerPile.SubmitEventData,
    };
}



export default connect(mapStateToProps)(Event);