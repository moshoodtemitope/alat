import React, {Component} from 'react';
import successLogo from '../../../assets/img/success.svg';
import * as actions from '../../../redux/actions/lifestyle/movies-actions';
import { listStyleConstants } from "../../../redux/constants/lifestyle/lifestyle-constants";
import { connect } from "react-redux";





 class MovieSuccess extends Component{
     constructor(props){
         super(props)
         this.state={

         }
     }
    render(){
        return(
            <div className="col-sm-12">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="max-600">
                            <div className="al-card no-pad">
                                
                                <form>
                                    <div className="form-group">
                                        <center>
                                            <img className="successIcon"    alt="" src={successLogo}/>
                                        </center>
                                        <center>                                            
                                            <label style={{fontSize:"24px",color:"#AB2656"}}>Transaction successful</label>
                                        </center>
                                        <center>
                                            
                                            <p style={{color:"#444444", fontSize:"16px"}}>You just bought movie ticket(s) your ticket has been sent to your registered email address</p>
                                        </center>

                                        <center>
                                            <button onClick={() => {
                                                this.props.dispatch(actions.ClearAction(listStyleConstants.MOVIE_REDUCER_CLEAR));
                                                this.props.history.push('/lifestyle/movie')
                                            }} 
                                            className="btn-alat m-t-10 m-b-20 text-center">Got it
                                            </button>
                                        </center>

                                    </div>
                                    <div className="form-row">

                                    </div>
                                    
                                </form>  
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        
        )

    }

    
}
function mapStateToProps(state) {
    return {
        getCinemaList: state.LifestyleReducerPile.getCinemaList,
        ShowTime: state.LifestyleReducerPile.ShowTime,
        SubmitTicketData: state.LifestyleReducerPile.SubmitTicketData,
        SubmitMovieData: state.LifestyleReducerPile.SubmitMovieData
    };
}
export default connect(mapStateToProps)(MovieSuccess)