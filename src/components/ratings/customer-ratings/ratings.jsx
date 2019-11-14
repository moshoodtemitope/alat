import React from 'react';
import connect from 'react-redux/es/connect/connect';
import {Link} from 'react-router-dom';
import "./../ratings.scss";
import ratingHeader from "../../../assets/img/alat-rating.svg";
//import mapStateToProps from 'react-redux/es/connect/mapStateToProps';

class AlatRatings extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="alat-rating-wrap">
                <div className="heading-icon">
                    <img src={ratingHeader} />
                </div>
                <div className="rating-wrap">
                    <h3 className="headingtext">Rate Us</h3>
                    <div className="help-text">Kindly take your time to answer the questions below</div>
                    <hr/>
                    <div className="each-rating-wrap">
                        <h4>1. Rate your experience transacting on ALAT</h4>
                        <div className="rating">
                            
                            <input type="radio" id="score-5" name="score" value="5"/>
                            <label title="5 stars" htmlFor="score-5">5 stars</label>
                            
                            <input type="radio" id="score-4" name="score" value="4"/>
                            <label title="4 stars" htmlFor="score-4">4 stars</label>
                            
                            <input type="radio" id="score-3" name="score" value="3"/>
                            <label title="3 stars" htmlFor="score-3">3 stars</label>
                            
                            <input type="radio" id="score-2" name="score" value="2"/>
                            <label title="2 stars" htmlFor="score-2">2 stars</label>
                            
                            <input type="radio" id="score-1" name="score" value="1"/>
                            <label title="1 stars" htmlFor="score-1">1 stars</label>
                        </div>
                    </div>
                    <div className="each-rating-wrap">
                        <h4>2. Would you refer us to a friend?</h4>
                        <div className="referal-options">
                            <div className="each-option">
                                <input type="radio" name="will-refer" id="yes-refer"/>
                                <label htmlFor="yes-refer">Yes, I would like to refer a friend.</label>
                            </div>
                            <div className="each-option">
                                <input type="radio" name="will-refer" id="no-refer"/>
                                <label htmlFor="no-refer">I feel indifferent.</label>
                            </div>
                            <div className="each-option">
                                <input type="radio" name="will-refer" id="indifferent"/>
                                <label htmlFor="indifferent">No, I wouldn’t like to refer a friend.</label>
                            </div>
                        </div>
                    </div>
                    <button type="submit" 
                            className="btn-alat m-t-10 m-b-20 text-center"> Submit</button>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {

    }
}

export default connect(mapStateToProps)(AlatRatings); 