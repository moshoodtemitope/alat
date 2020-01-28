import React  from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import newUser from '../../../assets/img/new-user.svg';
import pass from '../../../assets/img/pass.svg';
import * as actions from '../../../redux/actions/lifestyle/movies-actions';
import { listStyleConstants } from '../../../redux/constants/lifestyle/lifestyle-constants';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import Modal from 'react-responsive-modal';
import { DebitableAccount } from '../../../redux/actions/lifestyle/movies-actions';









class VisaDetails extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            passport:"",
            FirstName:"",
            Email:"",
            LastName:"",
            phoneNumber:"",
            Occupation:"",
            Nationality:"",
            Package:"",
            ApplicationType:"",
            Amount:"",
            passportInvalid:false,
            depatureDate:"",
            returnDate:"",
            returnDateInvalid:false,
            departureDateInvalid:false,
            PassportPhoto:null,
            PassportNumber:"",
            PassportPage:null,
            PackageName:"",
            showModal: false,
            showMessage:false,
            invalidInterval:false,
            PassportPhotoInvalid:false,
            PassPortPageInvalid:false,
            accountToDebitInValid: false,
            AccountNo:"",
            AvailableBalance:null,
            AccountType:null,

            user:JSON.parse(localStorage.getItem("user")),


        };
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleDepatureDatePicker = this.handleDepatureDatePicker.bind(this);
        this.handleReturnDatePicker = this.handleReturnDatePicker.bind(this);
        this.PassPortPhotoFileUpLoad = this.PassPortPhotoFileUpLoad.bind(this);
        this.PassportPageFileUpload = this.PassportPageFileUpload.bind(this);
        // this.handleDebit = this.handleDebit.bind(this);
        this.fetchDebitableAccount()



    }
    componentDidMount = () => {
        this.init();
    };
    init = () => {
        if (this.props.post_personal_detail.message !== listStyleConstants.POST_PERSONAL_DETAILS_SUCCESS)
            this.props.history.push("/lifestyle/travels/personal-detail");
        else {
            var data = {
                ...this.props.post_personal_detail.data.data
            };
            console.log('tag', data);

            this.setState({
                ApplicationType: data.ApplicationType,
                Package: data.Package,
                Amount: data.Amount,
                FirstName: data.FirstName,
                LastName:data.LastName,
                Email: data.Email,
                Occupation: data.Occupation,
                Nationality: data.Nationality,
                PhoneNumber: data.PhoneNumber,
                PackageName: data.PackageName
            });
        }
    };
    fetchDebitableAccount() {
        const { dispatch } = this.props;
        dispatch(DebitableAccount(this.state.user.token));

    };
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

    checkPassPortNumber = () => {
        if (this.state.PassportNumber === "" || this.state.PassportNumber === null)  {
            this.setState({ PassportNumberInvalid: true });
            return true;
        }else{
            this.setState({ PassportNumberInvalid: false });
            return false;
            
        }
    }
    checkPassPortPhoto=()=>{
        if (this.state.PassportPhoto == "" || this.state.PassportPhoto == null) {
            this.setState({ PassportPhotoInvalid: true });
            return true;
        }else{
            this.setState({ PassportPhotoInvalid:false});
            return false
        }

    }
    
    checkPassPortPage =()=>{
        if (this.state.PassportPage == "" || this.state.PassportPage == null) {
            this.setState({ PassPortPageInvalid: true });
            return true;
        }else{
            this.setState({ PassPortPageInvalid:false});
            return false
        }

    }
    PassPortPhotoFileUpLoad =(event)=> {
        let file = event.target.files[0];
        
        let reader = new FileReader();
        reader.onloadend =()=>{
            this.setState({ PassportPhoto:reader.result })
        }
        reader.readAsDataURL(file);
    }
    PassportPageFileUpload =(event)=>{
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.onloadend = ()=> {
            this.setState({ PassportPage:reader.result})
        }
        reader.readAsDataURL(file);
    }
    handleDebitableAccount = (event) => {
        let AccountNo = event.target.value.split("8888")[2];
        let AccountName = event.target.value.split("8888")[1];
        let AccountType = event.target.value.split("8888")[0];
        let AvailableBalance = event.target.value.split("8888")[3];
        this.setState({ AccountNo:AccountNo});
        this.setState({ AccountName: AccountName});
        this.setState({ AccountType: AccountType});
        this.setState({ AvailableBalance: AvailableBalance});
        if (this.state.formsubmitted && event.target.value != "")
            this.setState({ accountToDebitInValid: false })
    
        
    };
    validateAccountNumber() {
        if (this.state.AccountNo === "" || this.state.AccountNo === null) {
            this.setState({ accountToDebitInValid: true });
            return true;
        } else {
            this.setState({ accountToDebitInValid: false })
            return false;
        }
    }

    valDepatureDate = () => {
        if (this.state.depatureDate == "" || this.state.depatureDate == null) {
            this.setState({ departureDateInvalid: true });
            return true;
        }else{
            this.setState({ departureDateInvalid: false });
            return false;

        }
    };
    valReturnDate = () => {
        if (this.state.returnDate == "" || this.state.returnDate == null) {
            this.setState({ returnDateInvalid: true });
            return true;
        }else{
            this.setState({ returnDateInvalid: false });
            return false;
            
        }
    };
    dateComparison=()=>{
        if (this.state.depatureDate != this.state.returnDate) {
            if (this.state.depatureDate && this.state.returnDate) {
                if (Date.parse(this.state.returnDate) <= Date.parse(this.state.depatureDate)) {
                    this.setState({ invalidInterval: true });
                    return true;
                }
            }
    }
   
}
    handleDepatureDatePicker = (depatureDate) => {
        depatureDate.setHours(depatureDate.getHours() + 1);
        this.setState({ depatureDate: depatureDate });
    };
    
    handleReturnDatePicker = (returnDate) => {
        returnDate.setHours(returnDate.getHours() + 1);
        this.setState({ returnDate: returnDate });
    }; 
    
    handleOnChange = (e) => {
        let name = e.target.name;
        this.setState({ [name]: e.target.value })

    }
    handleChange = (e) => {
       let name = e.target.name;
        this.setState({ PassportNumber: e.target.value })

    }
    showInfo=()=>{
        this.setState({showMessage:true})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ formsubmitted: true });

        if (this.checkPassPortNumber() || this.valDepatureDate() || this.valReturnDate() || this.dateComparison()
         || this.checkPassPortPhoto() || this.checkPassPortPage() || this.validateAccountNumber()) {

        } else {
            const data ={
            PassportNumber:this.state.PassportNumber,
            FirstName:this.state.FirstName,
            LastName:this.state.LastName,
            Email: this.state.Email,
            PhoneNumber:this.state.PhoneNumber,
            Occupation:this.state.Occupation,
            Nationality:this.state.Nationality,
            ApplicationType:this.state.ApplicationType,
            TransactionAmount:this.state.Amount,
            ReturningDate:this.state.returnDate,
            DepartingDate:this.state.depatureDate,
            VisaCountry: "Dubia",
            VisaOptionID: "1",
            VisaPackageID: this.state.Package,
            PackageSpecialIdentifier: this.state.Package,
            ChannelType: "Website",
            PassportPhoto: this.state.PassportPhoto,
            PassportPage: this.state.PassportPage,
            CurrencyType: "NGN",
            PackageName: this.state.PackageName,
            AccountNo: this.state.AccountNo,
            AccountType: this.state.AccountType,
            AvailableBalance: this.state.AvailableBalance


        }
        console.log(data)
        // return
        this.props.dispatch(actions.PostVisaDetail(this.state.user.token, data));

        }
    }
    renderSelectableDebitabe=()=>{
        if (this.props.debitable_account.message === listStyleConstants.DEBITABLE_ACCOUNT_PENDING){
           return <select><option>loading... debitable Account</option></select>
        } else if (this.props.debitable_account.message === listStyleConstants.DEBITABLE_ACCOUNT_FAILURE){
            return <select><option>No debitable Account</option></select>


        } else if (this.props.debitable_account.message === listStyleConstants.DEBITABLE_ACCOUNT_SUCCESS){
            let account = this.props.debitable_account.data.response
            return(
                <select onChange={this.handleDebitableAccount}>
                    <option>Select Account to debit</option>
                    {
                        account.map(select_debitable => {
                            return (<option key={select_debitable.BranchCode} value={select_debitable.AccountType + "8888" + " " +select_debitable.AccountName+ " " + "8888" + " " + select_debitable.AccountNumber + "8888" + " " + select_debitable.AvailableBalance}>
                                {select_debitable.AccountType + '' + "("+select_debitable.AccountNumber + ")" + '-' + select_debitable.Currency+''+select_debitable.AvailableBalance}</option>)
                        })
                    }

                </select>
            )

        }

    }

    render(){
        const { PassportNumberInvalid, invalidInterval, PassportNumber, departureDateInvalid, returnDateInvalid, PassPortPageInvalid, PassportPhotoInvalid,accountToDebitInValid} = this.state
        const { debitable_account } = this.props
        return(
            
            <div className="col-sm-12">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="max-600">
                            {this.props.alert && this.props.alert.message &&
                                <div style={{ width: "100%" ,marginLeft: "1px" }} className={`info-label ${this.props.alert.type}`}>{this.props.alert.message}</div>
                            }
                            <div className="al-card no-pad">
                                <Modal open={this.state.showModal} onClose={this.onCloseModal} center>
                                    <div className="disclaimer text-center">
                                        <h4 className="hd-underline" style={{ width: "100%", color: "#AB2656" }}>Instructions</h4>
                                        <ul className="disclaimer-list">
                                            <li>Taken within the last 6 months to reflect your current appearance</li>
                                            <li>Taken in front of a plain white or off-white background</li>
                                            <li>Taken in full-face view directly facing the camera</li>
                                            <li>With a neutral facial expression and both eyes open</li>
                                            <li>With a neutral facial expression and both eyes open</li>
                                        </ul>
                                        <div className="btn-">
                                            <button style={{ width: "80%" }} onClick={this.onCloseModal}
                                                className="btn-alat"> <b>Okay, I Agree</b>

                                                
                                            </button><br /><br />
                                            <button onClick={this.onCloseModal} className="disclaimer-btn"><b>Okay, I Disagree</b></button>

                                        </div>
                                    </div>
                                </Modal>
                                
                                <h4 className="m-b-10 center-text hd-underline">Visa Details</h4>
                                {/* <div className="transfer-ctn">  */}
                                
                               
                                        <form onSubmit={this.handleSubmit}>
                                            <div className={PassportNumberInvalid ? "form-group form-error" : "form-group"}>
                                                <label>Passport Number</label>
                                                <input type="text" onChange={this.handleChange} name="PassportNumber" value={PassportNumber} placeholder="Passport Number"/>
                                                {PassportNumberInvalid &&
                                                    <div className="text-danger">Enter Passport Number</div>
                                                }
                                            </div>
                                            <div className="form-row">
                                            <div className={!departureDateInvalid   ? "form-group col-md-6 " : "form-group col-md-6 form-error"}>
                                                    <label className="label-text">Depature Date</label>
                                                    <DatePicker
                                                        className="form-control"
                                                        selected={this.state.depatureDate}
                                                        autoComplete="off"
                                                        placeholderText="12/09/2019"
                                                        dateFormat=" MMMM d, yyyy"
                                                        name="depatureDate"
                                                        peekNextMonth
                                                        showMonthDropdown
                                                        showYearDropdown
                                                        dropdownMode="select"
                                                        useShortMonthInDropdown
                                                        dropdownMode="select"
                                                        minDate={new Date()}
                                                        showWeekNumbers
                                                        onChange={this.handleDepatureDatePicker}
                                                        value={this.state.depatureDate}

                                                    />
                                                    <i className="mdi mdi-calendar-range"></i>

                                                {departureDateInvalid &&
                                                        <div className="text-danger">select a valid date</div>
                                                    }

                                                </div>
                                                <div className={!returnDateInvalid || invalidInterval ? "form-group col-md-6" : "form-group col-md-6 form-error"}>
                                                    <label className="label-text">Return date</label>
                                                    <DatePicker
                                                        selected={this.state.returnDate}
                                                        className="form-control"
                                                        autoComplete="off"
                                                        placeholderText="12/10/2020"
                                                        dateFormat="MMMM d,yyyy"
                                                        name="returnDate"
                                                        peekNextMonth
                                                        dropdownMode="select"
                                                        showMonthDropdown
                                                        showYearDropdown
                                                        useShortMonthInDropdown
                                                        dropdownMode="select"
                                                        minDate={new Date()}
                                                        showWeekNumbers
                                                        onChange={this.handleReturnDatePicker}
                                                        value={this.state.returnDate}

                                                    />
                                                    <i className="mdi mdi-calendar-range"></i>

                                                {returnDateInvalid && 
                                                        <div className="text-danger">select a valid date</div>
                                                    }
                                            

                                                </div>
                                            </div>
                                             <div className="form-row">
                                                <div className="travel-card" >
                                        
                                                    <label htmlFor="PassportPhoto" className="travel-image">
                                                        {
                                                    this.state.PassportPhoto
                                                        ? <img style={{ width: "50px", height: "100px"}} src={this.state.PassportPhoto} alt=""/> : <img src={newUser} alt="" />
                                                    }
                                                     </label>
                                                    <input type="file" name="PassportPhoto" accept="image/*" id="PassportPhoto" onChange={this.PassPortPhotoFileUpLoad}/>
                                                    {PassportPhotoInvalid &&
                                                        <div className="text-danger" style={{marginTop:"15px"}}>Upload a PassportPhoto</div>
                                                    }

                                                    </div>
                                                     <div className="travel-card">
                                                        <label htmlFor="PassportPage" className="travel-image">
                                                            {
                                                                this.state.PassportPage
                                                                ? <img style={{width:"50px", height:"100px"}} src={this.state.PassportPage} alt=""/>:<img src={pass} alt=""/>
                                                            }
                                                            <input type="file" name="PassportPage" accept="image/*" id="PassportPage" onChange={this.PassportPageFileUpload} />
                                                        </label>
                                                        {PassPortPageInvalid &&
                                                            <div className="text-danger" style={{marginTop:'15px'}}>Upload a PassportPage</div>
                                                        }
                                                    </div>
                                                    <div className="travel-label">
                                                        <p className="travel-description">Upload a picture of your face</p>
                                                        <p className="travel-description">Upload International Passport Page</p>
                                                       
                                                    </div> 
                                                    {invalidInterval &&
                                                        <div className="text-danger">Departure date can not be greater than the returning date
                                                                    </div>
                                                    }
                                                    

                                            </div>
                                            <div className={accountToDebitInValid ? "form-group form-error":"form-group"}>
                                                {this.renderSelectableDebitabe()}
                                                {
                                                    accountToDebitInValid && <div className="text-danger">Select account number</div>
                                                }
                                                   
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <center>
                                                <button type="submit" value="Next"
                                                    disabled={this.props.PostVisaDetail.message === listStyleConstants.POST_VISA_DETAIL_PENDING}
                                                         className="btn-alat m-t-10 m-b-20 text-center">

                                                    { this.props.PostVisaDetail.message === listStyleConstants.POST_VISA_DETAIL_PENDING ? "Processing..." : "Next" 
                                                    
                                                    } 
                                                </button>
                                                             
                                                    <div style={{cursor:"pointer", marginBottom:'15px'}}>
                                                    <h2 onClick={this.onShowModal} className="text-purple">Click here to see <span  className="text-purple">Picture Guidelines</span></h2>
                                                    </div>
                                                    </center>
                                                    
                                                </div>
                                            </div>
                                        </form>
                                     </div>


                                <center>
                                    <a href='kkkkkkk' style={{ cursor: "pointer" }} onClick={() => {
                                        this.props.dispatch(actions.ClearAction(listStyleConstants.MOVIE_REDUCER_CLEAR));
                                    this.props.history.push('/lifestyle/travels/personal-detail')
                                    }} className="add-bene m-t-50">
                                        Go back
                                    </a>
                                </center>

                            {/* </div> */}
                        </div>
                    </div>
                    
                </div>
            </div>





        )
    }

}
function mapStateToProps(state) {
    return {
        post_personal_detail:state.LifestyleReducerPile.PostPersonalDetail,
        post_visa:state.LifestyleReducerPile.PostVisa,
        PostVisaDetail:state.LifestyleReducerPile.PostVisaDetail,
        alert: state.alert,
        debitable_account:state.LifestyleReducerPile.DebitableAccount



    };

}

export default connect(mapStateToProps)(VisaDetails)