import React,{Component} from 'react'
import { connect } from "react-redux";
import styles from '../movie-preference-event.css'
import * as utils from "../../../shared/utils";
import {Link, NavLink} from "react-router-dom";
import {Fragment} from "react";
import * as actions from '../../../redux/actions/lifestyle/movies-actions';
import clock from '../../../assets/img/clock-circular-outline.svg';
import {listStyleConstants} from '../../../redux/constants/lifestyle/lifestyle-constants';
import {FetchMovie,getCinemaList,fetchMovieGenre,SubmitMoviesData} from "../../../redux/actions/lifestyle/movies-actions";
import unescape from 'lodash/unescape';
import FilterSearch from './filter-result';


class Movie extends React.Component {
    constructor(props){
        super(props);
        this.state={
            user: JSON.parse(localStorage.getItem("user")),
            value:"",
            genre:null,
            movies:null,
            values:"",
            pageSize:2,
            genreType: "",
            doFilter: false,
            display: "block",

        };
        this.showMovies = true;
        this.moviesDetails =this.moviesDetails.bind(this);


       
    }

    componentDidMount(){
        this.fetchMovieList(1);
        this.fetchCinemaList();
        this.fetchGenre();
    }
    

    
    fetchMovieList(pageNumber){
        const { dispatch } = this.props;
        dispatch(FetchMovie(this.state.user.token, pageNumber));
    };
    fetchCinemaList(){
        const { dispatch } = this.props;
        dispatch(getCinemaList(this.state.user.token));

    };
    fetchGenre(){
        const{dispatch} =this.props;
        dispatch(fetchMovieGenre(this.state.user.token))
    }
    search = async data => {
        this.props.dispatch(actions.SearchFetchMovie(this.state.user.token, data))
        const movies = await this.props.SearchfetchMovieList.data.response;
    
        this.setState({ movies });
    };

    filterGenre = () => {
        const genre = this.props.getMovieList.data.response;
        this.setState({ genre });
    };
    filterGenreOnchangeHandler(e){
        let {value} = e.target
        if(value!=="ShowResultBy") {
            this.setState({doFilter: true, genreType: value }, () => { 
                this.renderFilter(this.state.genreType);
                this.setState({display: "none"})
            })
        }
    }
    
    handleLoadMore() {
        this.setState(prevState => ({
            pageSize: prevState.pageSize + 1
        }));
        const { dispatch } = this.props;
        dispatch(FetchMovie(this.state.user.token, this.state.pageSize));
    }
    

    onChangeHandler = async e => {
        this.search(e.target.value);
        this.setState({ value: e.target.value });
        this.setState({display: "none"})

    };

    moviesDetails=(event)=>{
        let movies = event.target.id
        // console.log('======',movies)
        this.props.dispatch(SubmitMoviesData(event.target.id))

        

    }
   
    renderMovies(){

        let user = this.state.user;
        let props = this.props;
        let getMovieList = props.getMovieList;
        let that =this
        const { length } = this.state;


        if(getMovieList.message === listStyleConstants.GET_MOVIE_LIST_PENDING){
            return <h4 style={{ marginTop: 100, textAlign:'center' }} className="text-center">Loading Movies...</h4>;
        }
        else if(getMovieList.message === listStyleConstants.GET_MOVIE_LIST_FAILURE){
            return(
                <h4 className="text-center">No Movie Found</h4>
            );
        }
        else if (getMovieList.message === listStyleConstants.GET_MOVIE_LIST_SUCCESS){
            let userMovies = getMovieList.data.response;

            return(
                <div className="eventTrays col-sm-12">

                    {Array.from(userMovies).map(function(film, index){
                        index *=3
                        return(
                                <div  className="eventCards" key={index}>
                                    <Link to={{
                                        pathname:"/lifestyle/movie-details",
                                    }}>
                                        <div id={JSON.stringify(film)} onClick={that.moviesDetails} className="picCard" style={{backgroundImage: 'url("'+film.artworkThumbnail+'")',}}>
                                          
                                        </div>
                                        
                                        
                                    </Link>
                                   


                                    <div className="boldHeader">{unescape(film.title.toString().length > 15 ? film.title.toString().substring(0, 15)+"...": film.title.toString())}</div>
                                        <div id="disc">{unescape(film.description.toString().length > 30 ? film.description.toString().substring(0, 30)+"...": film.description.toString()) }</div>
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
        let that =this


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
                <div className="eventTrays col-sm-12">

                    {userMovies.map(function(film, index){
                        return(
                                <div className="eventCards" key={index}>
                                    <Link to={{
                                        pathname:"/lifestyle/movie-details",
                                      
                                    }}>
                                        <div id={JSON.stringify(film)} onClick={that.moviesDetails} className="picCard" style={{backgroundImage: 'url("'+film.artworkThumbnail+'")'}}>
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

    renderFilter(data){
        let user = this.state.user;
        let props = this.props;
        let getMovieList = props.getMovieList; 
             
        if(data == "ACTION"){
            let userMovies = getMovieList.data.response;
            // console.log(data, "==================", userMovies)   
            return  (<div className="eventTrays">
                
            {userMovies.map(function(film, index){
                return <FilterSearch key={index} index={index} film={film} genre="action" />
               
            })}
            </div>);

        }
        else if(data === "DRAMA"){
            let userMovies = getMovieList.data.response;
            // console.log(data, "==================", userMovies)   
            
            return  (<div className="eventTrays">
                
            {userMovies.map(function(film, index){
                return <FilterSearch key={index} index={index} film={film} genre="drama" />
            })}
            </div>);

        }
        else if (data === "ADVENTURE"){
            let userMovies = getMovieList.data.response;
            // console.log(data, "==================", userMovies)   
            
            return  (<div className="eventTrays">
                
            {userMovies.map(function(film, index){
                return <FilterSearch key={index} index={index} film={film} genre="adventure" />
            })}
            </div>);
        }
        else if (data === "FANTASY"){
            let userMovies = getMovieList.data.response;
            // console.log(data, "==================", userMovies)   
            
            return  (<div className="eventTrays">
                
            {userMovies.map(function(film, index){
                return <FilterSearch key={index} index={index} film={film} genre="fantasy" />
            })}
            </div>);
        }
        else if (data === "ANIMATION"){

            let userMovies = getMovieList.data.response;
            // console.log(data, "==================", userMovies)   
            
            return  (<div className="eventTrays">
                
            {userMovies.map(function(film, index){
                return <FilterSearch key={index} index={index} film={film} genre="animation" />
            })}
            </div>);
        }
        else if (data === "CRIME"){
            let userMovies = getMovieList.data.response;
            // console.log(data, "==================", userMovies)   
            
            return  (<div className="eventTrays">
                
            {userMovies.map(function(film, index){
                return <FilterSearch key={index} index={index} film={film} genre="crime" />
            })}
            </div>);
        }
        else if (data === "COMEDY"){
            let userMovies = getMovieList.data.response;
            // console.log(data, "==================", userMovies)   
            
            return  (<div className="eventTrays">
                
            {userMovies.map(function(film, index){
                return <FilterSearch key={index} index={index} film={film} genre="comedy" />
            })}
            </div>);
        }
        else if (data === "NOLLYWOOD"){
            let userMovies = getMovieList.data.response;
            // console.log(data, "==================", userMovies)   
            
            return  (<div className="eventTrays">
                
            {userMovies.map(function(film, index){
                return <FilterSearch key={index} index={index} film={film} genre="nollywood" />
            })}
            </div>);
        }
        else if (data === "FAMILY"){
            let userMovies = getMovieList.data.response;
            // console.log(data, "==================", userMovies)   
            
            return  (<div className="eventTrays">
                
            {userMovies.map(function(film, index){
                return <FilterSearch key={index} index={index} film={film} genre="family" />
            })}
            </div>);
        }
        else if (data === "ROMANCE"){
            let userMovies = getMovieList.data.response;
            // console.log(data, "==================", userMovies)   
            
            return  (<div className="eventTrays">
                
            {userMovies.map(function(film, index){
                return <FilterSearch key={index} index={index} film={film} genre="romance" />
            })}
            </div>);
        }
        else if (data === "HORROR"){
            let userMovies = getMovieList.data.response;
            // console.log(data, "==================", userMovies)   
            
            return  (<div className="eventTrays">
                
            {userMovies.map(function(film, index){
                return <FilterSearch key={index} index={index} film={film} genre="horror" />
            })}
            </div>);
        }
        else if (data === "SCI-FI"){
            let userMovies = getMovieList.data.response;
            // console.log(data, "==================", userMovies)   
            
            return  (<div className="eventTrays">
                
            {userMovies.map(function(film, index){
                return <FilterSearch key={index} index={index} film={film} genre="sci-fi" />
            })}
            </div>);
        }
        else if (data === "SLIDER"){
            let userMovies = getMovieList.data.response;
            // console.log(data, "==================", userMovies)   
            
            return  (<div className="eventTrays">
                
            {userMovies.map(function(film, index){
                return <FilterSearch key={index} index={index} film={film} genre="slider" />
            })}
            </div>);
        }



    }
    
    resultu = () => {
        if(this.state.movies !== null && this.state.movies !== "") {
            return this.renderMoviesSeach();
        }
        else{
            return this.renderMovies(); 
        }
    
        

    }
    loadMore=()=>{
        if (this.props.getMovieList.message === listStyleConstants.GET_MOVIE_LIST_SUCCESS){
            return <span className="loadMore" onClick={() => this.handleLoadMore()}>Load More</span>
        } else if (this.props.getMovieList.message === listStyleConstants.GET_MOVIE_LIST_SUCCESS && this.props.getMovieList.data.response.length > 1){
            return <h2>No Movie Found</h2>

        }
    }


    render(){
        let  renderPageNumbers;
        const {getMovieList} = this.props;
    
        let userMovies = this.props.getMovieList;

        
        
        return(
            <Fragment>
                <div className="eventWrapper">
                    <div className="">
                        <ul>
                            <li className="inputList"><label className="inputLabel">Search by keyword</label>
                                <input className="SearchInput" type="text" placeholder="search ..." value={this.state.value} onChange={e => this.onChangeHandler(e)} />
                            </li>
                            <li className="listInput">
                                <label className="inputLabel">Filter</label>
                                <select className="ResultInput" onChange={e => this.filterGenreOnchangeHandler(e)}>
                                    <option key="ShowResultBy" value="ShowResultBy">Show Result By</option>
                                    {
                                        this.props.FetchMovieGenre.message === listStyleConstants.FETCH_MOVIE_GENRE_SUCCESS &&
                                        this.props.FetchMovieGenre.data.response.map(genre => {
                                            return <option key={genre} value={genre}>{genre}</option>
                                        })
                                    }
                                </select>
                            </li>

                        </ul>
                    </div>
                </div>

                <div className="container" style={{justifyContent: "center", alignItems:'center'}}>
                    {
                       !this.state.doFilter ? this.resultu() : this.renderFilter(this.state.genreType)
                   }
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
        getMovieList: state.LifestyleReducerPile.getMovieList,
        getCinemaList: state.LifestyleReducerPile.getCinemaList.data,
        SearchfetchMovieList:state.LifestyleReducerPile.SearchfetchMovieList,
        FetchMovieGenre:state.LifestyleReducerPile.FetchMovieGenre
        

    };
}



export default connect(mapStateToProps)(Movie);


