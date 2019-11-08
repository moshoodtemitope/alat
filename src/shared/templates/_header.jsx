import * as React from 'react';
import { NavLink, withRouter} from 'react-router-dom';
import {history} from "../../_helpers/history";
import { connect } from 'react-redux';
import $ from 'jquery';
import {Fragment} from "react";
import {userActions} from "../../redux/actions/onboarding/user.actions";
import whitelogo from "../../assets/img/white-logo.svg";
import selfCareImage from '../../assets/img/contact-centers.svg'
import DpHolder from '../../assets/img/user.svg'
import Modal from 'react-responsive-modal';
import profileImage from "../../assets/img/10.jpg";
import {
    GET_NDPRSTATUS_SUCCESS,
    GET_NDPRSTATUS_PENDING,
    GET_NDPRSTATUS_FAILURE,
    ACCEPT_NDRP_SUCCESS,
    ACCEPT_NDRP_PENDING,
    ACCEPT_NDRP_FAILURE,
    GET_CMDMPRIORITY_SUCCESS,
    GET_CMDMPRIORITY_PENDING,
    GET_CMDMPRIORITY_FAILURE,
    UPDATE_CMDMPRIORITY_SUCCESS,
    UPDATE_CMDMPRIORITY_PENDING,
    UPDATE_CMDMPRIORITY_FAILURE,
} from "../../redux/constants/onboarding/user.constants";

class HeaderContainer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            miniNavToggle: false,
            displayNdpr: true,
            openModal: true,
        };
        const { dispatch } = this.props;
        
        $('#nav-icon1').click(function(){
            //console.error("clicked");
            $(this).toggleClass('open');
            $('.hr-nav-header').fadeToggle();
        });

        $('.user-name-circle').click(function(){
            //console.log("Image clicked");
            $('.mini-nav').fadeToggle(300);
        });
        this.toggleMiniNav   = this.toggleMiniNav.bind(this);
        this.getNDPRStatus   = this.getNDPRStatus.bind(this);
        this.getCMDMPriority = this.getCMDMPriority.bind(this);
        this.acceptNDRP      = this.acceptNDRP.bind(this); 
        this.openMobileMenu  = this.openMobileMenu.bind(this); 
       
    }


    logout(){
        const { dispatch } = this.props;
        dispatch(userActions.logout());
        localStorage.removeItem("user");
        history.push('/');
    }

    toggleMiniNav(){
        this.setState({ miniNavToggle: !this.state.miniNavToggle })
    }
    openMobileMenu(){
        this.setState({showMenu:true})
    }

    renderMiniNav(){
        if(this.state.miniNavToggle){
            return(
                <div className="mini-nav" style={{display: 'block'}}>
                    <ul>
                        
                        {/* <li><NavLink to="/receive-money">Western Union</NavLink></li> */}
                        <li><NavLink to="/profile">Profile</NavLink></li>
                        {/* <li><NavLink to="/settings">Settings</NavLink></li> */}
                        <li><NavLink to="/settings/change-password">Settings</NavLink></li>
                        {/* <li><NavLink to="/talk-to-us">Talk to us</NavLink></li>
                        <li><NavLink to="/talk-to-us/report-error">Report an error</NavLink></li>
                        <li><NavLink to="/talk-to-us/atm-locator">Locate ATM</NavLink> </li> */}
                        <li>
                            {/*<NavLink to="/logout">Logout</NavLink>*/}
                            <a onClick={this.logout.bind(this)}>Logout</a>
                        </li>
                    </ul>
                </div>
            )
        }

        else{
            return(
                <div className="mini-nav">
                    <ul>
                        <li><a href="#">Profile</a></li>
                        <li><NavLink to="/account">Accounts</NavLink></li>
                        <li><NavLink to="/settings">Settings</NavLink></li>
                        <li>
                            <NavLink to="/logout">Logout</NavLink>
                            {/*<a onClick={this.logout.bind(this)}>Logout</a>*/}
                        </li>
                    </ul>
                </div>
            )
        }

    }

    onOpenModal = () => {
        this.setState({ openModal: true });
    };

    onCloseModal = () => {
        this.setState({ submitted: false });
        this.setState({ openModal: false });
    };

    

    //   acceptNdpr(isAccepted){
    //     if(isAccepted){
    //       this.acceptingNDPR =true;
    //       this.apiService.request(routes.ACCEPTNDRP+true, 'POST', {}, SystemConstant.HEADER)
    //           .subscribe(data => {
    //             // this.preparePage();
    //           this.isNDPRCompliant = true;
    //           this.acceptingNDPR =false;
    //           }, err => {
    //             this.isNDPRCompliant = false;
    //             this.acceptingNDPR =false;
    //           });
    //     }else{
    //       this.isNDPRCompliant = true;
    //     }
    //   }

    componentDidMount() {

        // console.log(this.props);
        // this.props.dispatch(userActions.getAll());
        this.getProfileImage();
        this.getNDPRStatus();
        this.getCMDMPriority();
        // console.log('name is dssd');
    }

    getProfileImage(){
        
        
        // this.setState({currentroute})
        const user = JSON.parse(localStorage.getItem("user"));

        const { dispatch } = this.props;
        dispatch(userActions.getCustomerProfileImage(user.token, user.profilePicPath));
        
    }

    getNDPRStatus(){
        const user = JSON.parse(localStorage.getItem("user"));

        const { dispatch } = this.props;
        if(history.location.pathname!=='/home'){
            dispatch(userActions.checkNDPRStatus(user.token));
        }
        
    }

    acceptNDRP(){
        const user = JSON.parse(localStorage.getItem("user"));

        const { dispatch } = this.props;
        dispatch(userActions.acceptNDPR(user.token));
    }

    getCMDMPriority(){
        const user = JSON.parse(localStorage.getItem("user"));

        const { dispatch } = this.props;
        dispatch(userActions.fetchCMDMPriority(user.token));
    }

    showCMDMPriorityMessage(){
        
        const user = JSON.parse(localStorage.getItem("user"));
        const { openModal } = this.state;
        let cmdmRequest = this.props.loadCMDMPriorityRequest;
        
        switch (cmdmRequest.fetch_status){
            case GET_CMDMPRIORITY_SUCCESS:
                    let cmdmData = cmdmRequest.cmdm_priority.response.data;
                    console.log('cmdm data is', cmdmData);
                return(
                    <Modal open={openModal} onClose={this.onCloseModal}>
                        <div className="div-modal">
                            

                            <div className="cmdm-message">{cmdmData.Message}</div>

                        <div className="btn-opt">
                            {/* <button onClick={this.onCloseModal} className="border-btn">Back</button>
                            <button onClick={this.submitData} disabled={submitted}
                            className="btn-alat">{ submitted ? "Processing..." : "Proceed"}</button> */}
                        </div>
                        </div>
                    </Modal>
                )
                
        }
    }

    showNDRPMessage(){
        const user = JSON.parse(localStorage.getItem("user"));
        let ndprRequest = this.props.loadNDRPstatus;

        switch (ndprRequest.fetch_status){
            case GET_NDPRSTATUS_PENDING:
                    return(
                        <div className="ndPrWrap">
                            <div className="ndprMsg al-card text-center">
                               Please wait ...
                            </div>
                        </div>
                    )
            case GET_NDPRSTATUS_SUCCESS:
                let ndprData = ndprRequest.ndpr_status.response.data;
                
                let acceptndprRequest = this.props.acceptndrprequest;
                    if(ndprData.priority===50 && this.state.displayNdpr===true){
                    // if(ndprData.priority===0 && this.state.displayNdpr===true){
                        return(
                            <div className="ndPrWrap">
                                <div className="ndprMsg al-card">
                                <span className="close-btn" onClick={()=>this.setState({displayNdpr:false})}>X</span>
                                    <h3 className="username-heading">Dear {user.fullName},</h3>
                                    <p>
                                    Our Privacy Policy has been updated to give you more clarity on how we collect the information you share with us and how we use it.
                                    </p>
                                    
                                    <p>
                                    We made this change in compliance with the Nigeria Data Protection Regulation (NDPR) issued recently to increase the security of personal data.
                                    </p>
                                    <p>
                                    Please, know that we have the utmost respect for your privacy and we will always make sure the information you share with us is secure.
                                    </p>
                                    
                                    <p>
                                        We use your data to send you account updates and offers. It will never be sold and will not be shared with a third party without your consent, except where the law compels.
                                    </p>
                                    To continue sharing your data with us for better service, please accept below.
                
                                    <center>
                                        <button type="button" 
                                                disabled={acceptndprRequest.is_processing}
                                                className="btn-alat m-t-20 text-center"
                                                onClick={(e)=>{e.preventDefault(); 
                                                            this.acceptNDRP();
                                                            
                                                            
                                                        }}>{acceptndprRequest.is_processing?'Processing ...':'I accept'}</button>
                                    </center>
                                </div>
                            </div>
                        )
                    }else{
                        return('');
                    }
            
            case GET_NDPRSTATUS_FAILURE:
                let error = ndprRequest.ndpr_status.error;
                return(
                    <div className="ndPrWrap">
                        <div className="ndprMsg al-card text-center">
                           An error occured. Please try again 
                           <a className="cta-link tobottom" onClick={this.getNDPRStatus}>Try again</a>
                        </div>
                    </div>
                )
        }

        

    }

    render() {
        const user = JSON.parse(localStorage.getItem("user"));
        
        
        return (
            <Fragment>
                {this.showNDRPMessage()}
                {this.showCMDMPriorityMessage()}
                <div className="db2-fixed-header">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-4 col-sm-4">
                                {history.location.pathname!=='/home' &&
                                    // <div id="nav-icon1" className="" onClick={ this.openMobileMenu }>
                                    <div id="nav-icon1" className="" onClick={()=> history.push("/home") }>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                }
                                <NavLink to="/home" className={history.location.pathname==='/home'?"menulogo-wrap":"menulogo-wrap logo-middle"}>
                                    <img src={whitelogo} />
                                </NavLink>
                                {/* <a href="/dasboard" className="menulogo-wrap">
                                    <img src={whitelogo} />
                                </a> */}
                            </div>
                            <div className="col-xs-8 col-sm-8">
                                <div className="user-name-circle clearfix" onClick={ this.toggleMiniNav }>
                                    <div className="circle-image">
                                        {/* <img src="../../assets/img/10.jpg" /> */}
                                        <img src={DpHolder} alt=""/>
                                    </div>
                                    <p className="name">{user.fullName}</p>
                                </div>
                                { this.renderMiniNav() }
                                <div className="user-name-circle clearfix">
                                   <NavLink to="/talk-to-us">
                                   <p className="name">Talk to Us</p>
                                   <img  style={{ margin:'5px',marginTop:'5px'}}src={selfCareImage} />

                                   </NavLink>
                                </div>
                                {/* <span className="notification-top"><i className="demo-icon icon-alert-active"></i></span> */}
                              
                            </div>


                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}


function mapStateToProps(state) {
    //console.log(state);
    const { user } = state;
    return {
        user,
        loadNDRPstatus : state.ndpr_status_request,
        acceptndrprequest : state.acceptndrp_request,
        loadCMDMPriorityRequest : state.cmdmpriority_request
    };
}

export default connect(mapStateToProps)(HeaderContainer);