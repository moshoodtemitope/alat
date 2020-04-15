import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import emailCenter from '../../assets/img/email-contact.svg';
import phoneContact from '../../assets/img/phone-contact.svg';
import * as actions from "../../redux/actions/talk-to-us/talk-to-us-action";
import * as actions1 from "../../redux/actions/profile/profile-action";
import { connect } from 'react-redux';
import { talktoUsConstant } from '../../redux/constants/talk-to-us/talk-to-us.constant';
import { profile } from '../../redux/constants/profile/profile-constants';
import { Textbox } from "react-inputs-validation";




class TalkToUs extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            fullName: "",
            message: "",
            Body: null,
            RecipientEmail: null,
            fullNameInvalid: false,
            EmailAddressInvalid: false,
            MessageInvalid: false,
            success: false,
            error:"",
            error:false

        }
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.GetUserProfileMenu();
    }
    GetUserProfileMenu = () => {
        this.props.dispatch(actions1.profileMenu(this.state.user.token));
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
        if (this.state.RecipientEmail == null) {
            this.setState({ EmailAddressInvalid: true });
            return true

        } else {
            this.setState({ EmailAddressInvalid: false })
            return false
        }
    };

    validate = (e) => {
        // console.log(e.target.value);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(e.target.value) === false) {
            console.log("Email is Not Correct");
            this.setState({ RecipientEmail: e.target.value, error:"Enter a valid Email Address"})
            return false;
        } if (this.state.RecipientEmail == null) {
            return this.checkEmailAddress()
        }else{
            this.setState({ RecipientEmail: e.target.value, error:"" })
        }
    }

    checkMessage = () => {
        if (this.state.Body == null) {
            this.setState({ MessageInvalid: true });
            return true;
        } else {
            this.setState({ MessageInvalid: false })
            return false
        }


    }

    onSubmit(event) {
        event.preventDefault();
        if (this.checkEmailAddress() || this.checkMessage()) {
           

        } else {
            this.props.dispatch(actions.TalkUsMessage({
                "Email": "help@alat.ng",
                "RecipientEmail": this.state.RecipientEmail,
                "SenderName": this.state.user.fullName,
                "Subject": "New Message from AYOMIDE on ALAT Web",
                "Body": this.state.Body


            }));
           

            if (this.props.talk_to_us.message === talktoUsConstant.TALK_TO_US_SUCCESS) {
                this.setState({ success: true })
            } else {
                this.setState({ success: false })
            }

        }
    }

    render() {
        const { MessageInvalid, EmailAddressInvalid, success } = this.state
        const { profileMenu } = this.props
        // console.log(profileMenu)
        return (
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
                    {
                        this.props.talk_to_us.message === talktoUsConstant.TALK_TO_US_SUCCESS &&
                        <div className="row">
                                 <div className="col-sm-6" style={{margin:'auto'}}>
                                     <div className="alert alert-success">
                                        <h4 className="text-center">Message sent successfully</h4>
                                     </div>
                                </div>
                            </div>

                    }


                    <div className="row">
                        <div className="col-sm-12">
                            <div className="max-600">
                                <div className="al-card no-pad">

                                    <h4 className="m-b-10 center-text hd-underline">Talk to Us</h4>
                                    <center>
                                        <p className="info-text2">We are happy to assist</p>
                                        <div style={{ display: "flex", justifyContent: 'center', alignItems: "center", borderBottom: "1px solid #f5f5f5", marginBottom: 20 }}>
                                            <div style={{ marginRight: 20, margin: 5 }}>
                                                <img src={emailCenter} /><span style={{ marginLeft: 5 }}>help@alat.ng</span>
                                            </div>
                                            <div style={{ marginLeft: 20, }}>
                                                <img src={phoneContact} /><span style={{ marginLeft: 5 }}>070022552528</span>
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
                                                    onChange={this.handleChange} />




                                            </div>
                                            <div className={this.state.error && EmailAddressInvalid ? "form-group  form-error col-md-6" : 'form-group col-md-6'} >
                                                <label className="label-text">Email</label>
                                                <input
                                                    type="text"
                                                    autoComplete="off"
                                                    className="form-control"
                                                    name="RecipientEmail"
                                                    value={this.state.RecipientEmail}
                                                    onChange={(text) => this.validate(text)}/>
                                                {
                                                    this.state.error ?
                                                        <div>

                                                            {this.state.error &&
                                                                <div className="text-danger">{this.state.error}</div>}

                                                        </div>:
                                                        <div>
                                                            {EmailAddressInvalid &&
                                                                <div className="text-danger">Enter Email Address</div>}
                                                        </div>


                                                }
                                                
                                                

                                                

                                               

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
                                                    <button disabled={this.props.talk_to_us.message === talktoUsConstant.TALK_TO_US_PENDING} type="submit" className="btn-alat m-t-10 m-b-20 text-center">
                                                        {this.props.talk_to_us.message === talktoUsConstant.TALK_TO_US_PENDING ? "Processing..." : "Send Message"}

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
    alert: state.alert,
    talk_to_us: state.talk_to_us,
    reportError: state.reportError,
    get_bank_branch: state.get_bank_branch,
    get_page_data: state.get_page_data,
    profileMenu: state.profileMenu,

});


export default connect(mapStateToProps)(TalkToUs)