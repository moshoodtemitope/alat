import React  from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import newUser from '../../../assets/img/new-user.svg';
import pass from '../../../assets/img/pass.svg';
import * as actions from '../../../redux/actions/lifestyle/movies-actions';
import { listStyleConstants } from '../../../redux/constants/lifestyle/lifestyle-constants';
import { connect } from "react-redux";





class VisaDetails extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            passport:"",
            FirstName:"",
            Email:"",
            phoneNumber:"",
            Occupation:"",
            Nationality:"",
            Package:"",
            ApplicationType:"",
            Amount:"",
            passportInvalid:false,
            depatureDate:'',
            returnDate:'',
            returnDateInvalid:false,
            departureDateInvalid:false,
            PassportPhoto:null,
            PassportNumber:"",
            PassportPage:null,

        };
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleDepatureDatePicker = this.handleDepatureDatePicker.bind(this);
        this.handleReturnDatePicker = this.handleReturnDatePicker.bind(this);
        this.PassPortPhotoFileUpLoad = this.PassPortPhotoFileUpLoad.bind(this);
        this.PassportPageFileUpload = this.PassportPageFileUpload.bind(this)

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
                Email: data.Email,
                Occupation: data.Occupation,
                Nationality: data.Nationality,
                PhoneNumber: data.PhoneNumber,
            });
        }
    };
    checkPassPortNumber = () => {
        if (this.state.PassportNumber.length != 11) {
            this.setState({ PassportNumberInvalid: true });
            return true;
        }
    }
    PassPortPhotoFileUpLoad = (event) => {
        let name = event.target.name;
        console.log(name);
       
        this.setState({ PassportPhoto: event.target.files[0] });
    }
    PassportPageFileUpload =(event)=>{
        let name = event.target.name;
        console.log(name)
        this.setState({ PassportPage:event.target.files[0]})
    }

    valDepatureDate = () => {
        if (this.state.depatureDate == null) {
            this.setState({ departureDateInvalid: true });
            return true;
        } else {
            this.setState({ departureDateInvalid: false });
            return false;
        }
    };
    valReturnDate = () => {
        if (this.state.returnDate == null) {
            this.setState({ returnDateInvalid: true });
            return true;
        } else {
            this.setState({ returnDateInvalid: false });
            return false;
        }
    };
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
        const name = e.target.name;
        if (/^[0-9]+$/.test(e.target.value)) {
            this.setState({ [name]: e.target.value });
            if (this.state.formsubmitted && e.target.value.length == 11)
                this.setState({ passportInvalid: false });
        }
        else if (e.target.value === "") {
            this.setState({ [name]: e.target.value });
        }

    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ formsubmitted: true });

        if (this.checkPassPortNumber() || this.valDepatureDate() || this.valReturnDate()) {

        } else {

            this.props.dispatch(actions.PostVisaDetail({
                FirstName: this.state.fullName,
                Email: this.state.email,
                PhoneNumber: this.state.PhoneNumber,
                Occupation: this.state.occupation,
                Nationality: this.state.nationality,
                Package: this.state.Package,
                ApplicationType: this.state.ApplicationType,
                TransactionAmount: this.state.Amount,
                PassportPhoto: this.state.PassportPhoto,
                ReturningDate: this.state.returnDate,
                DepartingDate: this.state.depatureDate,
                PassportNumber: this.state.PassportNumber,
                PassportPage: this.state.PassportPage

            }));

        }
    }

    render(){
        const { PassportNumberInvalid, PassportNumber, departureDateInvalid, returnDateInvalid } = this.state
        return(
            <div className="col-sm-12">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="max-600">
                            <div className="al-card no-pad">
                                <h4 className="m-b-10 center-text hd-underline">Visa Details</h4>
                                {/* <div className="transfer-ctn">  */}
                               
                                        <form onSubmit={this.handleSubmit}>
                                            <div className={PassportNumberInvalid ? "form-group form-error" : "form-group"}>
                                                <label>Passport Number</label>
                                        <input type="text" onChange={this.handleChange} name="PassportNumber" value={PassportNumber} placeholder="Passport Number"/>
                                            {PassportNumberInvalid &&
                                                    <div className="text-danger">Enter Full Name</div>}
                                            </div>
                                            <div className="form-row">
                                                <div className={!departureDateInvalid ? "form-group col-md-6 " : "form-group col-md-6 form-error"}>
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
                                                <div className={!returnDateInvalid ? "form-group col-md-6" : "form-group col-md-6 form-error"}>
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
                                                    <i class="mdi mdi-calendar-range"></i>

                                                    {returnDateInvalid &&
                                                        <div className="text-danger">select a valid date</div>
                                                    }
                                                </div>
                                            </div>
                                             <div className="form-row">
                                                    <div className="">
                                                        {/* <div className='travel-image'>
                                                            <img src={newUser} alt=""/>

                                                        </div> */}
                                                        <input type="file" name="PassportPhoto" accept="image/*" id="PassportPhoto"  onChange={this.PassPortPhotoFileUpLoad} />

                                                    

                                                    </div>
                                                    <div className="travel-card">
                                                        {/* <div className="travel-image"> */}
                                                            {/* <img src={pass} alt=""/> */}

                                                        {/* </div> */}
                                                        <label></label>
                                                    <input type="file" name="PassportPage" accept="image/*" id="PassportPage"  onChange={this.PassportPageFileUpload}/>

                                                             
                                                    </div>
                                                    <div className="travel-label">
                                                        <p className="travel-description">Upload a picture of your face</p>
                                                        <p className="travel-description">Upload International Passport Page</p>
                                                    </div>
                                                    

                                            </div>
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <center>
                                                        <input className="btn-alat m-t-10 m-b-20 text-center" type="submit" value="Next" />
                                                    </center>
                                                </div>
                                            </div>
                                        </form>
                                     </div>




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
        post_personal_detail: state.LifestyleReducerPile.PostPersonalDetail,
        post_visa: state.LifestyleReducerPile.PostVisa,


    };

}

export default connect(mapStateToProps)(VisaDetails)