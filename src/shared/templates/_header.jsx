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
import {Textbox} from "react-inputs-validation";
import Select from 'react-select';
import {occupationsList, 
        idTypes, 
        religionDataSet,
        genderDataSet,
        maritalStatusDataSet} from './cmdmDataSet'
import "./heading.scss";
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
            openCYDMModal: false,
            showCYDMForm:false,
            accountNumberInfo: '',
            addressTextInfo:'',
            bvnNumInfo:'',
            dobInfo:'',
            emailInfo:'',
            employmentStatusInfo:'',
            firstNameInfo:'',
            genderInfo:'',
            lastNameInfo:'',
            maritalStatusInfo:'',
            identificationModeInfo:'',
            middleNameInfo:'',
            phoneNumberInfo:'',
            religionInfo:'',
            updatedFields:'',
            tinnumber:'',
            selectedOccupation:null,
            selectedGender:null,
            selectedStatus:null,
            selectedMeansOfId:null,
            selectedReligion:null,
            showEmptyFieldError: false
        };
        this.fieldsProvided ={

        }
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
        this.setState({ openModal: false });
    };

    openCYDMModal = () => {
        this.setState({ openCYDMModal: true });
    };

    closeCYDMModal = () => {
        this.setState({ openCYDMModal: false });
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
        if(history.location.pathname==='/home'){
            dispatch(userActions.fetchCMDMPriority(user.token));
        }
        
    }

    showCMDMPriorityMessage(){
        
        const user = JSON.parse(localStorage.getItem("user"));
        const { openModal } = this.state;
        let cmdmRequest = this.props.loadCMDMPriorityRequest;
        
        switch (cmdmRequest.fetch_status){
            case GET_CMDMPRIORITY_SUCCESS:
                    let cmdmData = cmdmRequest.cmdm_priority.response.data;
                if(cmdmData.Message!==null){   
                    return(
                        <Modal open={openModal} onClose={this.onCloseModal}>
                            <div className="div-modal">
                                

                                <div className="cmdm-message">{cmdmData.Message}</div>

                            <div className="btn-opt text-center">
                                {/* <button onClick={this.onCloseModal} className="border-btn">Back</button> */}
                                <button onClick={(e)=>{
                                    e.preventDefault();
                                    this.setState({openModal:false, openCYDMModal: true})
                                
                                }}
                                className="btn-alat">Proceed</button>
                            </div>
                            </div>
                        </Modal>
                    )
                }else{
                    return null;
                }
                
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
                                    <h3 className="username-heading">Dear {user && user.fullName},</h3>
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

    handleCYDMDataSubmit = (e)=>{
        e.preventDefault();
        if(Object.keys(this.fieldsProvided).length>=1){
            const user = JSON.parse(localStorage.getItem("user"));

            const { dispatch } = this.props;
            dispatch(userActions.updateCMDM(this.fieldsProvided,user.token));

        }else{
            this.setState({showEmptyFieldError:true})
        }
    }

    

    collectPriorityInformaton =()=>{
        let cmdmRequest         = this.props.loadCMDMPriorityRequest,
            cydmDataList        = cmdmRequest.cmdm_priority.response.data.Field,
            occupationsData     =  occupationsList,
            allIDs              = idTypes,
            religionList        = religionDataSet,
            genderList          = genderDataSet,
            maritalStatusList   = maritalStatusDataSet,
            occupationsDropdownData  = [],
            allIDssDropdownData      = [],
            genderDropdownData      = [],
            maritalStatusDropdownData      = [],
            religionListDropdownData = [];

            let updateCMDMPriority = this.props.updateCMDMPriorityRequest;

            occupationsData.map(eachJob=>{
                occupationsDropdownData.push({
                    value:eachJob.REF_CODE,
                    label: eachJob.REF_DESC
                })
            })

            allIDs.map(eachId=>{
                allIDssDropdownData.push({
                    value:eachId.VALUE,
                    label: eachId.LOCALETEXT
                })
            })

            religionList.map(religion=>{
                religionListDropdownData.push({
                    value:religion.VALUE,
                    label: religion.LOCALETEXT
                })
            })

            genderList.map(gender=>{
                genderDropdownData.push({
                    value:gender.value,
                    label: gender.label
                })
            })

            maritalStatusList.map(gender=>{
                maritalStatusDropdownData.push({
                    value:gender.value,
                    label: gender.label
                })
            })
            

        

        return(
            <Modal open={this.state.openCYDMModal} onClose={this.closeCYDMModal}>
                <div className="div-modal">
                    

                   <div className="cydm-form">
                    {updateCMDMPriority.fetch_status !==UPDATE_CMDMPRIORITY_SUCCESS &&
                    <form onSubmit={this.handleCYDMDataSubmit}>
                        <h4>Please provide the following information</h4>
                        {/* {cydmDataList.ACCOUNTNUMBER!==null &&
                            <div className="input-ctn inputWrap">
                                <label>Account number</label>
                                <Textbox
                                    tabIndex="2"
                                    id={'accountNumberInfo'}
                                    name="accountNumberInfo"
                                    type="text"
                                    autoComplete ="off"
                                    value={this.state.accountNumberInfo}
                                    maxLength="11"
                                    placeholder= "Enter your account number"
                                    onBlur={(e) => {}}
                                    onChange= {(accountNumberInfo, e)=>{
                                        
                                        fieldsProvided.MOBILE_NO = accountNumberInfo;

                                        this.setState({updatedFields: fieldsProvided });
                                        
                                    }}
                                />
                                

                            </div>
                        } */}
                        {cydmDataList.FIRST_NAME_PRIORITY!==null &&
                            <div className="input-ctn inputWrap">
                                <label>Enter your first name </label>
                                <Textbox
                                    tabIndex="2"
                                    id={'firstNameInfo'}
                                    name="firstNameInfo"
                                    type="text"
                                    autoComplete ="off"
                                    value={this.state.firstNameInfo}
                                    maxLength="11"
                                    placeholder= "Enter your first name"
                                    onBlur={(e) => {}}
                                    onChange= {(firstNameInfo, e)=>{
                                        this.fieldsProvided.FIRST_NAME = firstNameInfo;
                                        this.setState({firstNameInfo});
                                        
                                    }}
                                />
                                

                            </div>
                        }

                        {cydmDataList.LAST_NAME_PRIORITY!==null &&
                            <div className="input-ctn inputWrap">
                                <label>Enter last name </label>
                                <Textbox
                                    tabIndex="2"
                                    id={'lastNameInfo'}
                                    name="lastNameInfo"
                                    type="text"
                                    autoComplete ="off"
                                    value={this.state.lastNameInfo}
                                    maxLength="11"
                                    placeholder= "Enter your last name"
                                    onBlur={(e) => {}}
                                    onChange= {(lastNameInfo, e)=>{
                                        this.fieldsProvided.LAST_NAME = lastNameInfo;
                                        this.setState({lastNameInfo});
                                        
                                    }}
                                />
                                

                            </div>
                        }

                        {cydmDataList.MIDDLE_NAME_PRIORITY!==null &&
                            <div className="input-ctn inputWrap">
                                <label>Your middle name </label>
                                <Textbox
                                    tabIndex="2"
                                    id={'middleNameInfo'}
                                    name="middleNameInfo"
                                    type="text"
                                    autoComplete ="off"
                                    value={this.state.middleNameInfo}
                                    maxLength="11"
                                    placeholder= "Enter your middle name"
                                    onBlur={(e) => {}}
                                    onChange= {(middleNameInfo, e)=>{
                                        this.fieldsProvided.MIDDLE_NAME = middleNameInfo;
                                        this.setState({middleNameInfo});
                                        
                                    }}
                                />
                                

                            </div>
                        }

                        {cydmDataList.EMAIL_PRIORITY!==null &&
                            <div className="input-ctn inputWrap">
                                <label>Enter your email </label>
                                <Textbox
                                    tabIndex="2"
                                    id={'emailInfo'}
                                    name="emailInfo"
                                    type="text"
                                    autoComplete ="off"
                                    value={this.state.emailInfo}
                                    maxLength="11"
                                    placeholder= "Enter your email"
                                    onBlur={(e) => {}}
                                    onChange= {(emailInfo, e)=>{
                                        this.fieldsProvided.EMAIL = emailInfo;
                                        this.setState({emailInfo});
                                        
                                    }}
                                />
                                

                            </div>
                        }
                                      

                        {cydmDataList.PhoneNumber_PRIORITY!==null &&
                            <div className="input-ctn inputWrap">
                                <label>Your phone number</label>
                                <Textbox
                                    tabIndex="2"
                                    id={'phoneNumberInfo'}
                                    name="phoneNumberInfo"
                                    type="text"
                                    autoComplete ="off"
                                    value={this.state.phoneNumberInfo}
                                    maxLength="11"
                                    placeholder= "Enter your phone number"
                                    onBlur={(e) => {}}
                                    onChange= {(phoneNumberInfo, e)=>{
                                        this.fieldsProvided.MOBILE_NO = phoneNumberInfo;
                                        this.setState({phoneNumberInfo});
                                        
                                    }}
                                />
                                

                            </div>
                        }


                        {cydmDataList.ADDRESS_PRIORITY!==null &&
                            <div className="input-ctn inputWrap">
                                <label>Enter your address</label>
                                <Textbox
                                    tabIndex="2"
                                    id={'addressTextInfo'}
                                    name="addressTextInfo"
                                    type="text"
                                    autoComplete ="off"
                                    value={this.state.addressTextInfo}
                                    maxLength="11"
                                    placeholder= "Enter your home address"
                                    onBlur={(e) => {}}
                                    onChange= {(addressTextInfo, e)=>{
                                        this.fieldsProvided.ADDRESS_PRIORITY = addressTextInfo;
                                        this.setState({addressTextInfo});
                                        
                                    }}
                                />
                                

                            </div>
                        }


                        {cydmDataList.TIN_PRIORITY!==null &&
                            <div className="input-ctn inputWrap">
                                <label>Enter your TIN</label>
                                <Textbox
                                    tabIndex="2"
                                    id={'tin'}
                                    name="tin"
                                    type="text"
                                    autoComplete ="off"
                                    value={this.state.tinnumber}
                                    maxLength="11"
                                    placeholder= "Enter your TIN"
                                    onBlur={(e) => {}}
                                    onChange= {(TIN_NUM, e)=>{
                                        this.fieldsProvided.TIN = TIN_NUM;
                                        this.setState({tinnumber: TIN_NUM});
                                        
                                    }}
                                />
                                

                            </div>
                        }

                        {cydmDataList.DOB_PRIORITY!==null &&
                            <div className="input-ctn inputWrap">
                                <label>Your date of birth</label>
                                <Textbox
                                    tabIndex="2"
                                    id={'dobInfo'}
                                    name="dobInfo"
                                    type="text"
                                    autoComplete ="off"
                                    value={this.state.dobInfo}
                                    maxLength="11"
                                    placeholder= "Enter your date of birth"
                                    onBlur={(e) => {}}
                                    onChange= {(dobInfo, e)=>{
                                        this.fieldsProvided.DATE_OF_BIRTH = dobInfo;
                                        // this.setState({dobInfo});
                                        
                                    }}
                                />
                                

                            </div>
                        }

                        

                        {cydmDataList.EMPLOYMENT_STATUS_PRIORITY!==null &&
                            <div className="input-ctn inputWrap">
                                <label>Employment Status </label>
                                <Select
                                    options={occupationsDropdownData}
                                    onChange={(selectedOccupation)=>{
                                        this.fieldsProvided.EMPLOYMENT_STATUS = selectedOccupation.value;
                                        this.setState({selectedOccupation});
                                        // console.log('occupation', selectedOccupation)
                                    }}
                                />
                                

                            </div>
                        }

                        {cydmDataList.OCCUPATION_PRIORITY!==null &&
                            <div className="input-ctn inputWrap">
                                <label>Your occupation</label>
                                <Select
                                    options={occupationsDropdownData}
                                    onChange={(selectedOccupation)=>{
                                        this.fieldsProvided.EMPLOYMENT_STATUS = selectedOccupation.value;
                                        this.setState({selectedOccupation});
                                        // console.log('occupation', selectedOccupation)
                                    }}
                                />
                                

                            </div>
                        }


                        {cydmDataList.GENDER_PRIORITY!==null &&
                            <div className="input-ctn inputWrap">
                                <label>Gender </label>
                                <Select
                                    options={genderDropdownData}
                                    onChange={(selectedGender)=>{
                                        this.fieldsProvided.GENDER = selectedGender.value;
                                        this.setState({selectedGender});
                                        // console.log('occupation', selectedOccupation)
                                    }}
                                />
                            </div>
                        }

                       

                        {cydmDataList.MARITAL_STATUS_PRIORITY!==null &&
                            <div className="input-ctn inputWrap">
                                <label>Marital status </label>
                                <Select
                                    options={maritalStatusDropdownData}
                                    onChange={(selectedStatus)=>{
                                        this.fieldsProvided.MARITAL_STATUS = selectedStatus.value;
                                        this.setState({selectedStatus});
                                        // console.log('occupation', selectedOccupation)
                                    }}
                                />
                                

                            </div>
                        }

                        {cydmDataList.MEANS_OF_IDENTIFICATION_PRIORITY!==null &&
                            <div className="input-ctn inputWrap">
                                <label>Means of Identification </label>
                                <Select
                                    options={allIDssDropdownData}
                                    onChange={(selectedMeansOfId)=>{
                                        this.fieldsProvided.MEANS_OF_IDENTIFICATION = selectedMeansOfId.value;
                                        this.setState({selectedMeansOfId})
                                    }}
                                />
                                

                            </div>
                        }

          

                        {cydmDataList.RELIGION_PRIORITY!==null &&
                            <div className="input-ctn inputWrap">
                                <label>Choose your religion</label>
                                <Select
                                    options={religionListDropdownData}
                                    onChange={(selectedReligion)=>{
                                        this.fieldsProvided.RELIGION = selectedReligion.value;
                                        this.setState({selectedReligion});
                                        // console.log('fields are', this.fieldsProvided);
                                       
                                    }}
                                />
                                

                            </div>
                        }
                        <div className="row">
                            <div className="col-sm-12">
                                <center>
                                    {updateCMDMPriority.fetch_status ===UPDATE_CMDMPRIORITY_FAILURE && 
                                        <span className="error-msg">{updateCMDMPriority.cmdm_priority.error}</span>
                                    }

                                    <button type="submit"  
                                        disabled ={updateCMDMPriority.is_processing}
                                        className="btn-alat m-t-10 m-b-20 text-center">{updateCMDMPriority.is_processing?'Updating...':'Submit'}</button>
                                    {this.state.showEmptyFieldError &&
                                   
                                        <div className="info-label error">Please provide the required details </div>
                                    }
                                    </center>
                            </div>
                        </div>
                    </form>
                    }
                    {updateCMDMPriority.fetch_status ===UPDATE_CMDMPRIORITY_SUCCESS &&
                        <div className="success-wrap">
                            <center>
                                <div className="m-b-30 m-t-20">
                                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M26.418 38.3379L20 32L16 36L26.4268 46L48 22L43.9629 18L26.418 38.3379Z" fill="#169A62"/>
                                    <path d="M32 0C14.3261 0 0 14.3261 0 32C0 49.6739 14.3261 64 32 64C49.6739 64 64 49.6739 64 32C64 14.3261 49.6739 0 32 0ZM32 59C17.0879 59 5 46.9121 5 32C5 17.0879 17.0879 5 32 5C46.9121 5 59 17.0879 59 32C59 46.9121 46.9121 59 32 59Z" fill="#169A62"/>
                                    </svg>
                                </div>
                            </center>
                            <h4 className="center-text red-text">Information update was Successful</h4>
                        </div>
                    }
                   </div>

                
                </div>
            </Modal>
        )
    }

    render() {
        const user = JSON.parse(localStorage.getItem("user"));
        
        
        return (
            <Fragment>
                {this.showNDRPMessage()}
                {/* {history.location.pathname==='/home' && this.showCMDMPriorityMessage()}
                 {this.state.openCYDMModal && this.collectPriorityInformaton()}  */}
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
                                    <p className="name">{user && user.fullName}</p>
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
        loadCMDMPriorityRequest : state.cmdmpriority_request,
        updateCMDMPriorityRequest : state.update_cmdmpriority_request
    };
}

export default connect(mapStateToProps)(HeaderContainer);