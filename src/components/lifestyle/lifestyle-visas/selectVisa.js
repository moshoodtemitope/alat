import React from 'react'
import Airline2 from '../../../assets/img/airline.svg'
import Modal from 'react-responsive-modal';



class SelectVisa extends React.Component{
    constructor(props){
        super(props)
        this.state={
            showModal: false,

        }
    }
    onShowModal = (event) => {
        // console.log("dot here")
        event.preventDefault();
        // this.props.clearError();
        this.setState({
            showModal: true
        });
    }

    onCloseModal = () => {
        this.setState({
            showModal: false
        })
        // this.props.clearError();
    }





    render(){
        return(
           <div className="col-sm-12">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="max-600">
                            {/* <div className="al-card no-pad"> */}
                                <div className="transfer-ctn">
                        <Modal open={this.state.showModal} onClose={this.onCloseModal} center>
                            <div className="disclaimer text-center">
                                <h4 className="hd-underline" style={{ width: "100%", color: "#AB2656" }}>Disclaimer</h4>
                                <ul className="disclaimer-list">
                                    <li> The visa applicant consents that the UAE Government reserves the right to ask
                                    for further information to assess an application and take decisions in their own discretion on the basis of such information furnished by the applicant. 
                                    </li>
                                    <li> The visa applicant consents that the grant, duration, condition / s, refusal or the time taken to process an application
                                    for a UAE Visa are at the sole discretion of the UAE Government and their decision in this regard shall be final.In
                                    case ofdelay in the process or outright rejection of visa application, no correspondence will be entertained from the visa applicant as visa fees and other service fees are non - refundable.Neither the B.ank nor Crenov8 shall be liable to a visa applicant in any manner / cases.In the event that the applicant absconds in the UAE after being granted a Dubai tourist Visa
                                    </li>
                                    <li>the applicant hereby consents that the sum of $1500 or its Naira Equivalent using the prevailing market rate will be deducted from the applicant’ s Wema Bank account being“ abscondment fee </li>
                                </ul>
                                <div className="btn-">
                                    <button onClick = {() => this.props.history.push('/lifestyle/travels/dubai-visa')}style = {{width: "80%"}}
                                    className = "btn-alat"> <b>I Agree</b></button><br/><br/>
                                    <button  onClick={this.onCloseModal} className="disclaimer-btn"><b>I Disagree</b></button>
                                </div>
                            </div>
                        </Modal>
                {/* < div className = "max-750" >
                    <div className="max-600 m-t-40">
                        <center>
                            <img src={Airline2} className="m-b-30" style={{ marginTop: 60 }} alt="loans Logo" />
                            <button onClick={this.onShowModal} className="btn-alat">Apply for Dubia Visa</button>
                        </center>
                    </div>
                </div> */}
                <div className="max-750">
                    < div className = "max-600 m-t-40"> 
                    <div className="loan-header-text loan">
                        
                    </div>
                    <div className="al-card fund-al-card no-pad">
                        <div className="fund-option-ctn loan">
                            <div className="fund-option loan" onClick={this.onShowModal}>
                                <i className="toshow"><img src={Airline2} alt=""/></i>
                                <i className="hoveraction"><img src={Airline2} alt="" /></i>
                                <p>Dubai Visa</p>
                                <p>You don’t need to stress over getting your visas. Get a visas here now.</p>
                            </div>

                            {/* <div className="fund-option loan" onClick={() => { this.props.history.push("/loans/salary/dashboard") }}>
                                <i className="toshow"><img src={Airline2} alt=""/></i>
                                <i className="hoveraction"><img src={Airline2} alt="" /></i>
                                <p>Flight Ticket</p>
                                <p>You don’t need to stress over getting your flight ticket. Get a flight ticket here now.</p>
                            </div> */}
                        </div>
                    </div>
                    </div>


                </div>
                

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            // </div>





                                
        )
    }

}

export default SelectVisa