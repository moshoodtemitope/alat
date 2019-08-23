import React, {Component} from 'react'
import {FetchMovieList} from "../../../redux/actions/lifestyle/movies-actions";
import { connect } from "react-redux";
import '../movie-preference-event.css'
import * as utils from "../../../shared/utils";
import {NavLink} from "react-router-dom";
import {listStyleConstants} from '../../../redux/constants/lifestyle/lifestyle-constants';
import {FetchMovie} from "../../../redux/actions/lifestyle/movies-actions"




class Movie extends Component {
    constructor(props){
        super(props);
        this.state={
            user: JSON.parse(localStorage.getItem("user"))

        };
        this.fetchMovieList()
    }
    fetchMovieList(){
        const { dispatch } = this.props;
        dispatch(FetchMovie(this.state.user.token));
    };
    renderMovies(){
        let user = this.state.user;
        let props = this.props;
        let getMovieList = props.getMovieList;
        if(getMovieList.message === listStyleConstants.GET_MOVIE_LIST_PENDING){
            return  <h4 className="text-center" style={{ marginTop: '65px'}}>Loading accounts...</h4>;
        }
        else if(getMovieList.message === listStyleConstants.GET_MOVIE_LIST_FAILURE){
            return(
                <h4 className="text-center" style={{ marginTop: '65px'}}>No Movie Found</h4>
            );
        }
        else if (getMovieList.message === listStyleConstants.GET_MOVIE_LIST_SUCCESS){
            let userMovies = getMovieList.data.response;
            return(
                <div>
                    {userMovies.map(function(film, key){
                        return(
                                <div className="eventTrays"key={key} >
                                    <div className="eventCards">
                                        <div className="picCard">
                                            <img src={film.artworkThumbnail} alt=""/>
                                        </div>
                                        <p className="boldHeader">{film.title}</p>
                                        <p id="disc">{film.description}</p>
                                        <div className="details">
                                            <div className="left">
                                                <i></i>
                                            </div>
                                            <div className="right">
                                                <p>Sunday, Oct 4 | 03:00 AM</p>
                                            </div>
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
            <div>
                {this.renderMovies(userMovies)}
            </div>


        )

    }
}
function mapStateToProps(state){
    return {
        getMovieList: state.getMovieList
    };
}



export default connect(mapStateToProps)(Movie);