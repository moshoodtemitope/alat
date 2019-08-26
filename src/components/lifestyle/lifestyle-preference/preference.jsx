import React, {Component} from 'react';
import '../movie-preference-event.css'
import { connect } from "react-redux";
import * as actions from '../../../redux/actions/lifestyle/preferences-actions';

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
        // if(this.props.getAllEngagements.response == undefined)
        //     return(
        //         <div>
        //             <p>Checking for Engagements ...</p>
        //         </div>
        //     );
        // if(this.props.getAllEngagements.response != undefined && this.props.getCustomersEngagements.response != undefined) {
        //     if(this.props.allEngagements.response.length != 0){
        //         return(
        //             <div>{this.DisplayEngagements()}</div>
        //         );
        //     }
        // }
        return(
            <div>
                <p>the mind!</p>
            </div>
        )
        // return(
        //     <div>
        //           <div className="eventPreferences">
        //                 <button type="button" className="buttons">FootBall</button>
        //                 <button type="button" className="buttons1">Fashion</button>
        //                 <button type="button" className="buttons">Education</button>
        //                 <button type="button" className="buttons1">Food</button>
        //                 <button type="button" className="buttons">Technology</button>
        //                 <button type="button" className="buttons1">Education</button>
        //                 <button type="button" className="buttons">Food</button>
        //                 <button type="button" className="buttons1">Technology</button>
        //                 <button type="button" className="buttons">Education</button>
        //                 <button type="button" className="buttons1">Food</button>
        //                 <button type="button" className="buttons">Technology</button>
        //                 <button type="button" className="buttons1">Education</button>
        //                 <button type="button" className="buttons1">Food</button>
        //                 <button type="button" className="buttons">Technology</button>
        //            </div>
        //     </div>
        // );
    }
}

function mapStateToProps(state){
   return {
      getAllEngagements: state.getAllEngagements.data,
      getCustomersEngagements: state.getCustomersEngagements.data
   }
}

export default connect(mapStateToProps)(Preference);