import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import emailCenter from '../../assets/img/email-contact.svg';
import phoneContact from '../../assets/img/phone-contact.svg';
import * as actions from "../../redux/actions/talk-to-us/talk-to-us-action";
import {connect} from 'react-redux';
import {talktoUsConstant} from '../../redux/constants/talk-to-us/talk-to-us.constant'


 class TalkToUs extends Component{

    constructor(props){
        super(props)
        this.state={
            user: JSON.parse(localStorage.getItem("user")),
            fullName:"",
            email:"",
            message:"",
            Body:null,
            RecipientEmail:"ayomichaels17@gmail.com",
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
        if (this.state.Body == "") {
            this.setState({ MessageInvalid: true });
            return true;
        }

    }
   
    onSubmit(event){
        event.preventDefault();
        this.props.dispatch(actions.TalkUsMessage( {
            "Email": "help@alat.ng",
            "RecipientEmail":this.state.RecipientEmail,
            "SenderName":this.state.user.fullName,
            "Subject": "New Message from AYOMIDE on ALAT Web",
            "Body":this.state.Body
            

        }
    ));

               
       
    }

    render(){
        const { MessageInvalid} = this.state
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
                {this.props.alert && this.props.alert.message &&
                                                <div className={`info-label ${this.props.alert.type}`}>{this.props.alert.message}</div>
                    }
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="max-600">
                                <div className="al-card no-pad">
                        
                                    <h4 className="m-b-10 center-text hd-underline">Talk to Us</h4>
                                    <center>
                                    <p className="header-info">There's always an ALAT Assitance eager to help u</p>
                                    <div style={{display:"flex", justifyContent:'center', alignItems:"center", borderBottom:"1px solid #f5f5f5", marginBottom:20 }}> 
                                        <div style={{marginRight:20, margin:5}}>
                                        <img src={emailCenter}/><span style={{marginLeft:5}} >help@alat.ng</span>
                                        </div>
                                        <div style={{marginLeft:20, }}>
                                        <img src={phoneContact}/><span style={{marginLeft:5}}>070022552528</span>
                                        </div>
                                        </div>

                                    </center>



                                    <form onSubmit={this.onSubmit}>

                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                                <label className="label-text">Full Name </label>
                                                <input 
                                                        type="text" 
                                                        autoComplete="off" 
                                                        className="form-control" 
                                                         placeholder="Iduma Chika"
                                                         name="fullName"
                                                         value={this.state.user.fullName}
                                                         onChange={this.handleChange}/>
                                                        

                                                          
                                        
                                                    </div>
                                                    <div className= "form-group col-md-6">
                                                        <label className="label-text">Email</label>
                                                        <input 
                                                        type="text" 
                                                        autoComplete="off" 
                                                        className="form-control" 
                                                         placeholder="Idumachika@gmail.com"
                                                         name="email"
                                                         value={this.state.RecipientEmail}
                                                         onChange={this.handleChange}/>
                                                      

                                                       
                                                    </div>
                                                </div>
                                                <div className={MessageInvalid ? "form-group form-error" : "form-group"}>
                                                    <label className="label-text">message</label>
                                                    <textarea 
                                                        type="text" 
                                                        autoComplete="off" 
                                                        className="form-control" 
                                                        placeholder="Comment Here..."
                                                        name="Body"
                                                         value={this.state.Body}
                                                         onChange={this.handleChange}
                                                    />
                                                    {MessageInvalid &&
                                                        <div className="text-danger">please enter a message</div>}
                                                    
                                                    </div>
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <center>
                                                        <button disabled={this.props.talk_to_us.message=== talktoUsConstant.TALK_TO_US_PENDING} type="submit" className="btn-alat m-t-10 m-b-20 text-center">
                                                            {this.props.talk_to_us.message ===talktoUsConstant.TALK_TO_US_PENDING ? "Processing...": "Send Message" }

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
const mapStateToProps = state => ({
    alert:state.alert,
    talk_to_us:state.talk_to_us,
    reportError:state.reportError,
    get_bank_branch:state.get_bank_branch,
    get_page_data:state.get_page_data,

});


export default connect(mapStateToProps)(TalkToUs)