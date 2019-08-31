import React, {Component} from 'react'
import { connect } from "react-redux";
import '../movie-preference-event.css'
import * as utils from "../../../shared/utils";
import {Link, NavLink} from "react-router-dom";
import {Fragment} from "react";
import * as actions from '../../../redux/actions/lifestyle/movies-actions';
import clock from '../../../assets/img/clock-circular-outline'
import {listStyleConstants} from '../../../redux/constants/lifestyle/lifestyle-constants';
import { FetchMovie,getCinemaList } from "../../../redux/actions/lifestyle/movies-actions";





class Movie extends Component {
    constructor(props){
        super(props);
        this.state={
            user: JSON.parse(localStorage.getItem("user")),
            value:"",
            movies:null,
            pagesize: 4,
            currentpage:1
    

        };
        console.log("state",this.state);
        this.fetchMovieList();
        this.fetchCinemaList();
    }

    // componentDidMount(){
    //     this.fetchMovieList();
    //     this.fetchCinemaList();
    // }
    handlePageChange = page => {
        this.setState({currentpage:page});
    };

    
    fetchMovieList(){
        const { dispatch } = this.props;
        dispatch(FetchMovie(this.state.user.token));
    };
    fetchCinemaList(){
        const { dispatch } = this.props;
        dispatch(getCinemaList(this.state.user.token));
        // console.log(this.props.getCinemaList)

    };
    search = async data => {
        this.props.dispatch(actions.SearchFetchMovie(this.state.user.token, data))
        const movies = await this.props.SearchfetchMovieList.data.response;
    
        this.setState({ movies });
      };
    
    
    onChangeHandler = async e => {
        this.search(e.target.value);
        this.setState({ value: e.target.value });

        
    };
    paginate(items, pageNumber, pageSize) {
        const startIndex = (pageNumber - 1) * pageSize;
        return (items).slice(startIndex).take(pageSize).value();
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
                                                <img
                                                                                                
                                                src={clock} alt=""/> 
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
   

   
    renderMoviesSeach(){
        let user = this.state.user;
        let props = this.props;
        let SearchfetchMovieList = props.SearchfetchMovieList;

        if(SearchfetchMovieList.message === listStyleConstants.SEARCH_FETCH_MOVIE_PENDING){
            return  <h4 style={{marginTop:"60px"}} className="text-center">Loading Movies...</h4>;

        }
        else if(SearchfetchMovieList.message === listStyleConstants.SEARCH_FETCH_MOVIE_FAILURE){
            return(
                <h4 className="text-center" style={{ marginTop: '65px'}}>No Movie Found</h4>
            );
        }
        else if (SearchfetchMovieList.message === listStyleConstants.SEARCH_FETCH_MOVIE_SUCCESS){
            let userMovies = SearchfetchMovieList.data.response;

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
                                                <img src={clock} alt=""/>
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
    
    resultu = () => {
        if (this.state.movies !== null && this.state.movies !== "") {
            return this.renderMoviesSeach();
        }
        else {
            return this.renderMovies(); 
        }
        

    }

    



    render(){
        let userMovies = this.props.getMovieList;
        
        
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
                                    <li style={{float:"right"}}><input style={{width:"100%",height:"30px", marginTop:14, float:'right'}} type="text" placeholder="search ..." value={this.state.value} onChange={ e => this.onChangeHandler(e)}/></li>

                                </ul>
                            </div>
                        </div>
                    </div>
                   {this.resultu()}
                   {/* <Pagination
                    // itemsCount={this.state.movies.length}
                    pageSize={this.state.pagesize}
                    onPageChange={this.handlePageChange}>
                    </Pagination> */}

                   
        
                  

                </div>
            </Fragment>


        )

    }
}
    function mapStateToProps(state){
    return {
        getMovieList: state.getMovieList,
        getCinemaList: state.getCinemaList.data,
        SearchfetchMovieList:state.SearchfetchMovieList
        

    };
}



export default connect(mapStateToProps)(Movie);


