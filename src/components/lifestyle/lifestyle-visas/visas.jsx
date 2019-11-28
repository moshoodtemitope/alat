import React, {Component}  from 'react';
import { Fragment } from "react";
import Airline from '../../../assets/img/airline.svg';
import Airline2 from '../../../assets/img/airline.svg'








class Visas extends React.Component{
    render(){
        return(
            <Fragment>
                <div className="max-750">
                    <div className="loan-header-text loan">
                        
                    </div>
                    <div className="al-card fund-al-card no-pad">
                        <div className="fund-option-ctn loan">
                            <div className="fund-option loan" onClick={() => { this.props.history.push("/lifestyle/travels/dubai-visa") }}>
                                <i className="toshow"><img src={Airline} alt=""/></i>
                                <i className="hoveraction"><img src={Airline2} alt="" /></i>
                                <p>Visas</p>
                                <p>You don’t need to stress over getting your visas. Get a visas here now.</p>
                            </div>

                            <div className="fund-option loan" onClick={() => { this.props.history.push("/loans/salary/dashboard") }}>
                                <i className="toshow"><img src={Airline} alt=""/></i>
                                <i className="hoveraction"><img src={Airline2} alt="" /></i>
                                <p>Flight Ticket</p>
                                <p>You don’t need to stress over getting your flight ticket. Get a flight ticket here now.</p>
                            </div>
                        </div>
                    </div>


                </div>



            </Fragment>
        )
    }
}

export default  Visas
