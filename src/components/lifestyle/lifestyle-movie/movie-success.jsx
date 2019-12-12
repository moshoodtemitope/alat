import React, {Component} from 'react';
import successLogo from '../../../assets/img/success.svg';

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
                                            
                                            <p style={{color:"#444444", fontSize:"16px"}}>you just bought movie ticket(s) your ticket has been sent to your registered email address</p>
                                        </center>

                                        <center>
                                            <button className="btn-alat m-t-10 m-b-20 text-center">Got it</button>
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

export default MovieSuccess