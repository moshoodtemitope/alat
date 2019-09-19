import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';


 class TalkToUs extends Component{

    constructor(){
        super()
        this.state={
            fullName:"",
            email:"",
            message:"",
            fullNameInvalid:false,
            EmailAddressInvalid:false,
            MessageInvalid:false,

        }
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange = (e) => {
        let name = e.target.name;
        this.setState({ [name]: e.target.value })
    };

    checkFullName = () => {
        if (this.state.fullName == "") {
            this.setState({ fullNameInvalid: true });
            return true;
        }
    };
    checkEmailAddress = () => {
        if (this.state.email == "") {
            this.setState({ EmailAddressInvalid: true });
            return true;
        }
    };

    checkMessage =()=>{
        if (this.state.message == "") {
            this.setState({ MessageInvalid: true });
            return true;
        }

    }
   
    onSubmit(event){
        event.preventDefault();

        if (this.checkFullName() || this.checkEmailAddress() || this.checkMessage()) {

        } else {
            // this.setState({isSubmitted : true });
            // this.props.dispatch(actions.fetchFixedGoalStep1({
            //     "goalName":this.state.goalName,
            //     "startDate":this.state.startDate,
            //     "endDate":this.state.endDate,
            //     "targetAmount":this.state.targetAmount,
            //     "goalFrequency":this.state.goalFrequency,
            //     "showInterests":this.state.showInterests
            // }));
            // console.log('tag', '')
        }
        
       
    }

    render(){
        const {fullNameInvalid, EmailAddressInvalid, MessageInvalid} = this.state
        return(
            <div className="row">
                <div className="col-sm-12">
                    <p className="page-title">Talk to Us</p>
                </div>
                <div className="col-sm-12">
                    <div className="tab-overflow">
                        <div className="sub-tab-nav">
                            <ul>
                                <li className="active"><NavLink to="/talk-to-us"> Talk To Us</NavLink></li>
                                <li><NavLink to="/talk-to-us/atm-locator">ATM Locator</NavLink></li>
                                <li><NavLink to="/talk-to-us/report-error">Report An Error</NavLink></li>
                            
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="max-600">
                                <div className="al-card no-pad">
                        
                                    <h4 className="m-b-10 center-text hd-underline">Talk to Us</h4>
                                    <p className="header-info">There's always an ALAT Assitance eager to help u</p>

                                    <form onSubmit={this.onSubmit}>

                                    <div className="form-row">
                                        <div className= {!fullNameInvalid ? "form-group col-md-6 " : "form-group col-md-6 form-error"}>
                                                <label className="label-text">Full Name </label>
                                                <input 
                                                        type="text" 
                                                        autoComplete="off" 
                                                        className="form-control" 
                                                         placeholder="Iduma Chika"
                                                         name="fullName"
                                                         value={this.state.fullName}
                                                         onChange={this.handleChange}/>
                                                        

                                                            {fullNameInvalid &&
                                                                <div className="text-danger">Enter your full Name</div>
                                                            }
                                        
                                                    </div>
                                                    <div className={!EmailAddressInvalid ? "form-group col-md-6" : "form-group col-md-6 form-error"}>
                                                        <label className="label-text">Email</label>
                                                        <input 
                                                        type="text" 
                                                        autoComplete="off" 
                                                        className="form-control" 
                                                         placeholder="Idumachika@gmail.com"
                                                         name="email"
                                                         value={this.state.email}
                                                         onChange={this.handleChange}/>
                                                      

                                                        {EmailAddressInvalid &&
                                                            <div className="text-danger">Enter your Email Address</div>
                                                        }
                                                    </div>
                                                </div>
                                                <div className={MessageInvalid ? "form-group form-error" : "form-group"}>
                                                    <label className="label-text">message</label>
                                                    <textarea 
                                                        type="text" 
                                                        autoComplete="off" 
                                                        className="form-control" 
                                                         placeholder="Dubai Goal"
                                                         name="message"
                                                         value={this.state.message}
                                                         onChange={this.handleChange}
                                                    />
                                                    {MessageInvalid &&
                                                        <div className="text-danger">please enter a message</div>}
                                                    
                                                    </div>
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <center>
                                                        <button type="submit" className="btn-alat m-t-10 m-b-20 text-center">
                                                            Send Message

                                                        </button>
                                                    </center>
                                                </div>
                                        
                                            </div>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           




        )
    }
}

export default TalkToUs