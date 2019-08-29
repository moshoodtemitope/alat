import React, {Component} from 'react'
import { connect } from "react-redux";
import '../movie-preference-event.css'
import * as utils from "../../../shared/utils";
import {Link, NavLink} from "react-router-dom";
import {Fragment} from "react";
import InnerContainer from '../../../shared/templates/inner-container';

// import clock from '../../../assets/img/clockIcon'
import {listStyleConstants} from '../../../redux/constants/lifestyle/lifestyle-constants';
import { FetchMovie,getCinemaList,buyMovieTicket } from "../../../redux/actions/lifestyle/movies-actions";





class Movie extends Component {
    constructor(props){
        super(props);
        this.state={
            user: JSON.parse(localStorage.getItem("user")),
            filtered: []

        };
        console.log("state",this.state);
        this.handleChange = this.handleChange.bind(this);
        this.fetchMovieList();
        this.fetchCinemaList();
    }
    fetchMovieList(){
        const { dispatch } = this.props;
        dispatch(FetchMovie(this.state.user.token));
    };
    fetchCinemaList(){
        const { dispatch } = this.props;
        dispatch(getCinemaList(this.state.user.token));
        // console.log(this.props.getCinemaList)

    };

    handleChange(e) {
        let name = e.target.name;

        this.setState({ [name]: e.target.value });


        // Variable to hold the original version of the list
        let currentList = [];
        // Variable to hold the filtered list before putting into state
        let newList = [];

        // If the search bar isn't empty
        if (e.target.value !== "") {
            console.log(e.target.value);
            // Assign the original list to currentList
            currentList = this.props.getMovieList.data.response.title;
            console.log("list",currentList);

            // Use .filter() to determine which items should be displayed
            // based on the search terms
            newList = currentList.filter(item => {
                // change current item to lowercase
                const lc = item.toString().toLowerCase();
                // change search term to lowercase
                const filter = e.target.value.toString().toLowerCase();
                // check to see if the current list item includes the search term
                // If it does, it will be added to newList. Using lowercase eliminates
                // issues with capitalization in search terms and search content
                return lc.includes(filter);
            });
        } else {
            // If the search bar is empty, set newList to original task list
            newList = this.props.getMovieList.data.response;
        }
        // Set the filtered state based on what our rules added to newList
        this.setState({
            filtered: newList


        });

    }

    renderMovies(){
        let user = this.state.user;
        let props = this.props;
        let getMovieList = props.getMovieList;
        if(getMovieList.message === listStyleConstants.GET_MOVIE_LIST_PENDING){
            return  <h4 className="text-center">Loading Movies...</h4>;
        }
        else if(getMovieList.message === listStyleConstants.GET_MOVIE_LIST_FAILURE){
            return(
                <h4 className="text-center" style={{ marginTop: '65px'}}>No Movie Found</h4>
            );
        }
        else if (getMovieList.message === listStyleConstants.GET_MOVIE_LIST_SUCCESS){
            let userMovies = getMovieList.data.response;
            // let userMovies = this.state.filtered;

            return(
                <div className="eventTrays">
                    {userMovies.map(function(film, index){
                        return(
                                <div className="eventCards" key={index}>
                                    <Link to={{
                                        pathname:"/lifestyle/movie-details",
                                        state:{
                                            details:film
                                        }
                                    }}>
                                        <div className="picCard" style={{backgroundImage: 'url("'+film.artworkThumbnail+'")'}}>
                                        </div>
                                    </Link>

                                    <div className="boldHeader">{film.title.toString().length > 15 ? film.title.toString().substring(0, 15)+"...": film.title.toString()}</div>
                                        <div id="disc">{ film.description.toString().length > 30 ? film.description.toString().substring(0, 30)+"...": film.description.toString() }</div>
                                        <div className="details">
                                            <div className="left">
                                                {/* <img src={clock} alt=""/> */}
                                            </div>
                                            <div className="right">
                                                <div className="movie-duration">{film.duration}</div>
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
        let userMovies = this.props.getMovieList;

        return(
            <Fragment>
                <InnerContainer>

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
                                    <li style={{float:"right"}}><input style={{width:"100%",height:"30px", marginTop:14, float:'right'}} type="text" placeholder="search ..." value={this.state.filtered} onChange={this.handleChange}/></li>

                                </ul>
                            </div>
                        </div>
                    </div>
                    {
                        this.state.filtered.length > 0 ? (
                            <div className="eventTrays">
                                {this.state.filtered.map(function(film, index){
                                    return(
                                        <div className="eventCards" key={index}>
                                            <Link to={{
                                                pathname:"/lifestyle/movie-details",
                                                state:{
                                                    details:film
                                                }
                                            }}>
                                                <div className="picCard" style={{backgroundImage: 'url("'+film.artworkThumbnail+'")'}}>
                                                </div>
                                            </Link>

                                            <div className="boldHeader">{film.title.toString().length > 20 ? film.title.toString().substring(0, 20)+"...": film.title.toString()}</div>
                                            <div id="disc">{ film.description.toString().length > 30 ? film.description.toString().substring(0, 30)+"...": film.description.toString() }</div>
                                            <div className="details">
                                                <div className="left">
                                                    <i></i>
                                                </div>
                                                <div className="right">
                                                    <div>{film.duration}</div>
                                                </div>
                                            </div>
                                        </div>

                                    );
                                })}
                            </div>
                        ) : this.renderMovies()
                    }

                </div>
                </InnerContainer>
            </Fragment>


        )

    }
}
    function mapStateToProps(state){
    return {
        getMovieList: state.getMovieList,
        getCinemaList: state.getCinemaList.data,
        

    };
}



export default connect(mapStateToProps)(Movie);