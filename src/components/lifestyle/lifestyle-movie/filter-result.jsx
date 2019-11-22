import React, {Component} from 'react';
import {Link, NavLink} from "react-router-dom";
import clock from '../../../assets/img/clock-circular-outline.svg';

export default class FilterSearch extends React.Component {
    constructor(props){
        super(props)
        this.state={
            
        }

    }
    render() {
        return (
            <div key={this.props.index}>

                    {
                        this.props.film.genre.toLowerCase().toString().includes(this.props.genre) ? 
                        <div className="eventCards" key={this.props.index}>
                            <Link to={{
                                pathname:"/lifestyle/movie-details",
                                state:{
                                    details:this.props.film
                                }
                            }}>
                                <div className="picCard" style={{backgroundImage: 'url("'+this.props.film.artworkThumbnail+'")'}}>
                                    <p></p>
                                </div>
                            </Link>

                            <div className="boldHeader">{this.props.film.title.toString().length > 15 ? this.props.film.title.toString().substring(0, 15)+"...": this.props.film.title.toString()}</div>
                                <div id="disc">{ this.props.film.description.toString().length > 30 ? this.props.film.description.toString().substring(0, 30)+"...": this.props.film.description.toString() }</div>
                                <div className="details">
                                    <div className="left">
                                        <img src={clock} alt=""/>
                                    </div>
                                    <div className="right">
                                        <div className="movie-duration">{this.props.film.duration}</div>
                                    </div>
                                </div>
                        </div>: null
                    }
                        
                    </div>
        )
    }
}