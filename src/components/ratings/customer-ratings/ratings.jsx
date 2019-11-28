import React from 'react';
import connect from 'react-redux/es/connect/connect';
import {Link} from 'react-router-dom';
import "./../ratings.scss";
import ratingHeader from "../../../assets/img/alat-rating.svg";
import {
    SEND_CUSTOMERRATING_SUCCESS,
    SEND_CUSTOMERRATING_PENDING,
    SEND_CUSTOMERRATING_FAILURE
} from "../../../redux/constants/onboarding/user.constants";
import {userActions} from "../../../redux/actions/onboarding/user.actions";
//import mapStateToProps from 'react-redux/es/connect/mapStateToProps';
import successIcon from "../../../assets/img/success-tick.svg";

class AlatRatings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rating:'',
            willrefer:''
        };

        this.setCustomerRating           =  this.setCustomerRating.bind(this);
        this.setWillCustomerReferALAT    =  this.setWillCustomerReferALAT.bind(this);
        this.sendRatingAndWillRefer      =  this.sendRatingAndWillRefer.bind(this);
    }

    setCustomerRating(rating){
        this.setState({rating})
    }

    setWillCustomerReferALAT(willrefer){
        this.setState({willrefer})
    }

    sendRatingAndWillRefer(e){
        e.preventDefault();
        if(this.state.rating!=='' && this.state.willrefer!=='')
        {
            const {dispatch} = this.props;

            
            dispatch(userActions.sendCustomerRating(this.state.rating, this.state.willrefer));
        }
    }

    render() {
        let {rating,
            willrefer
        } =this.state;
        
        let {ratingRequest} = this.props;
        return (
            <div className="alat-rating-wrap">
                <div className="heading-icon">
                    <img src={ratingHeader} />
                </div>
                {(ratingRequest.is_processing===undefined || ratingRequest.postrating_status !==SEND_CUSTOMERRATING_SUCCESS ) &&
                    <div className="rating-wrap">
                        <div className="ratings-container">
                            <h3 className="headingtext">Rate Us</h3>
                            <div className="help-text">Kindly take your time to answer the questions below</div>
                            <hr/>
                            <div className="each-rating-wrap">
                                <h4>1. Rate your experience transacting on ALAT</h4>
                                <div className="rating">
                                    
                                    <input type="radio" id="score-5" name="score" value="5" 
                                            onChange={(rating, e)=>{
                                                this.setCustomerRating(rating.target.value);
                                            }} />
                                    <label title="5 stars" htmlFor="score-5"></label>
                                    
                                    <input type="radio" id="score-4" name="score" value="4" 
                                            onChange={(rating, e)=>{
                                                this.setCustomerRating(rating.target.value);
                                            }}/>
                                    <label title="4 stars" htmlFor="score-4"></label>
                                    
                                    <input type="radio" id="score-3" name="score" value="3" 
                                            onChange={(rating, e)=>{
                                                this.setCustomerRating(rating.target.value);
                                            }}/>
                                    <label title="3 stars" htmlFor="score-3"></label>
                                    
                                    <input type="radio" id="score-2" name="score" value="2" 
                                            onChange={(rating, e)=>{
                                                this.setCustomerRating(rating.target.value);
                                            }}/>
                                    <label title="2 stars" htmlFor="score-2"></label>
                                    
                                    <input type="radio" id="score-1" name="score" value="1" 
                                            onChange={(rating, e)=>{
                                                this.setCustomerRating(rating.target.value);
                                            }}/>
                                    <label title="1 stars" htmlFor="score-1"></label>
                                </div>
                            </div>
                            <div className="each-rating-wrap">
                                <h4>2. Would you refer us to a friend?</h4>
                                <div className="referal-options">
                                    <div className="each-option">
                                        <input type="radio" name="will-refer" id="yes-refer" value="1"
                                                onChange={(willrefer, e)=>{
                                                    this.setWillCustomerReferALAT(willrefer.target.value);
                                                }}/>
                                        <label htmlFor="yes-refer">Yes, I would like to refer a friend.</label>
                                    </div>
                                    <div className="each-option">
                                        <input type="radio" name="will-refer" id="no-refer" value="2"
                                                onChange={(willrefer, e)=>{
                                                    this.setWillCustomerReferALAT(willrefer.target.value);
                                                }}/>
                                        <label htmlFor="no-refer">I feel indifferent.</label>
                                    </div>
                                    <div className="each-option">
                                        <input type="radio" name="will-refer" id="indifferent" value="3"
                                                onChange={(willrefer, e)=>{
                                                    this.setWillCustomerReferALAT(willrefer.target.value);
                                                }}/>
                                        <label htmlFor="indifferent">No, I wouldn’t like to refer a friend.</label>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" 
                                    className="btn-alat m-t-10 m-b-20 text-center btn-block"
                                    disabled={ratingRequest.is_processing}
                                    onClick={this.sendRatingAndWillRefer}
                                    >{ratingRequest.is_processing?'Please wait...':'Submit'}  </button>
                        </div>
                    </div>
                }
                {(ratingRequest.is_processing!==undefined && ratingRequest.is_processing===false && ratingRequest.postrating_status ===SEND_CUSTOMERRATING_SUCCESS ) &&
                    <div className="rating-wrap">
                        <center  className="m-t-30">
                            <img src={successIcon} />
                        </center>
                        <div className="m-t-10 width-300">
                            <h4 className="success-heading">Thank you for rating us</h4>
                        </div>  
                    </div>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        ratingRequest   : state.send_rating_request,
    }
}

export default connect(mapStateToProps)(AlatRatings); 