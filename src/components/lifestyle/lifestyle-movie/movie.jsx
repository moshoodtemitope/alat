import React, {Component} from 'react'
import {FetchMovieList} from "../../../redux/actions/lifestyle/movies-actions";
import { connect } from "react-redux";
import '../movie-preference-event.css'
import * as utils from "../../../shared/utils";
import {Link} from "react-router-dom";
import {Fragment} from "react";

import {listStyleConstants} from '../../../redux/constants/lifestyle/lifestyle-constants';
import {FetchMovie} from "../../../redux/actions/lifestyle/movies-actions"




class Movie extends Component {
    constructor(props){
        super(props);
        this.state={
            user: JSON.parse(localStorage.getItem("user")),
            filtered: []

        };
        console.log("state",this.state);
        this.handleChange = this.handleChange.bind(this);
        this.fetchMovieList()
    }
    fetchMovieList(){
        const { dispatch } = this.props;
        dispatch(FetchMovie(this.state.user.token));
    };

    handleChange(e) {
        // Variable to hold the original version of the list
        let currentList = [];
        // Variable to hold the filtered list before putting into state
        let newList = [];

        // If the search bar isn't empty
        if (e.target.value !== "") {
            // Assign the original list to currentList
            currentList = this.props.getMovieList.data.response;
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
                                        <div className="picCard" style={{backgroundImage: 'url("'+film.artworkThumbnail+'")'}}>
                                        </div>
                                        <div className="boldHeader">{film.title.toString().length > 20 ? film.title.toString().substring(0, 20)+"...": film.title.toString()}</div>
                                        <div id="disc">{ film.description.toString().length > 30 ? film.description.toString().substring(0, 60)+"...": film.description.toString() }</div>
                                        <div className="details">
                                            <div className="left">
                                                <i></i>
                                            </div>
                                            <div className="right">
                                                <div>Sunday, Oct 4 | {film.duration}</div>
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

                <div>
                    <input style={{width:'30%',float:"right", margin:10}} placeholder="search..." type="text" onChange={this.handleChange}/>
                {this.renderMovies(userMovies)}
                </div>
            </Fragment>


        )

    }
}
    function mapStateToProps(state){
    return {
        getMovieList: state.getMovieList
    };
}



export default connect(mapStateToProps)(Movie);