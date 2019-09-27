import React, {Component} from 'react';
import '../movie-preference-event.css'
import { connect } from "react-redux";
import * as actions from '../../../redux/actions/lifestyle/preferences-actions';
import {NavLink} from 'react-router-dom'

class Preference extends Component{
    constructor(props){
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user"))
        }
    }

    // standard componentDidMount
    componentDidMount = () => {
        this.FetchAllEngageMents();
    }
    
    //called from constructor
    FetchAllEngageMents = () => {
        this.props.dispatch(actions.getAllEngagements(this.state.user.token));
    }

    FetchCustomersEngagement = () => {
        this.props.dispatch(actions.getCustomersEngagements(this.state.user.token));
    }

    // SubScribeToEngageMent = () => {
    //     this.props.dispatch(actions.subScribeToEngageMent());
    // }
    
    //Called from render method
    DisplayEngagements = () => {
        let unSubscribe = [];
        // this.props.getCustomersEngagements.response.map()
    }

    render(){
        return(
            <div>
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
                
                </div>
                  <div className="eventPreferences">
                        <button type="button" className="buttons">FootBall</button>
                        <button type="button" className="buttons1">Fashion</button>
                        <button type="button" className="buttons">Education</button>
                        <button type="button" className="buttons1">Food</button>
                        <button type="button" className="buttons">Technology</button>
                        <button type="button" className="buttons1">Education</button>
                        <button type="button" className="buttons">Food</button>
                        <button type="button" className="buttons1">Technology</button>
                        <button type="button" className="buttons">Education</button>
                        <button type="button" className="buttons1">Food</button>
                        <button type="button" className="buttons">Technology</button>
                        <button type="button" className="buttons1">Education</button>
                        <button type="button" className="buttons1">Food</button>
                        <button type="button" className="buttons">Technology</button>
                   </div>
            </div>
        );
    }
}

function mapStateToProps(state){
   return {
      getAllEngagements: state.LifestyleReducerPile.getAllEngagements.data,
      getCustomersEngagements: state.LifestyleReducerPile.getCustomersEngagements.data
   }
}

export default connect(mapStateToProps)(Preference);