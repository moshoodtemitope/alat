import React, {Component} from 'react'
import '../movie-preference-event.css';

class Event extends Component{

    render(){
        return(
            <div>
                <div className="eventTrays">
                            <div className="eventCards">
                                <div className="picCard">

                                </div>
                                <p className="boldHeader">GidiFest 2018</p>
                                <div className="details">
                                    <div className="left">
                                        <i></i>
                                    </div>
                                    <div className="right">
                                        <p>Sunday, Oct 4 | 03:00 AM</p>
                                    </div>
                                </div>
                                <div className="details bot">
                                    <div className="left">
                                        <i></i>
                                    </div>
                                    <div className="right">
                                        <p>Landmark Breach Front, Oniru Lagos</p>
                                    </div>
                                </div>
                            </div>
                    </div>
            </div>
        )

    }
}

export default Event