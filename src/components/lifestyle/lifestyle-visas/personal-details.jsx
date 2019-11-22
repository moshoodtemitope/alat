import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { Link, Redirect } from 'react-router-dom';
import Select from 'react-select';
import * as actions from '../../../redux/actions/lifestyle/movies-actions';
import { listStyleConstants } from '../../../redux/constants/lifestyle/lifestyle-constants';
import { Textbox } from "react-inputs-validation";

var selectedNations = [
    { value: "2", label: "Nigeria" },
    { value: "3", label: "kenya" },
    { value: "1", label: "Ghana" },
    { value: "4", label: "Germany" }
]

class PersonalDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            PhoneNumber: "",
            formsubmitted: false,
            fullName:"",
            email:"",
            occupation:"",
            phoneIvalid: false,
            fullNameInvalid: false,
            occupationInvalid:false,
            nationalityInvalid:false,
            selectedNationality:"",
            ApplicationType:"",
            Package:"",
            Amount:"",
            Nationality:"",
            user:JSON.parse(localStorage.getItem("user")),

            
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }
    componentDidMount = () => {
        this.init();
    };
    init = () => {
        if (this.props.post_visa.message !== listStyleConstants.POST_VISA_SUCCESS)
            this.props.history.push("/lifestyle/travels/dubai-visa");
        else {
            var data = {
                ...this.props.post_visa.data.data
            };
            console.log('tag', data);

            this.setState({
                ApplicationType:data.ApplicationType,
                Package: data.Package,
                Amount: data.Amount

            });
        }
    };
   

    checkFullName = () => {
        if (this.state.fullName == "") {
            this.setState({ fullNameInvalid: true });
            return true;
        }
    }

    checkPhone = () => {
        if (this.state.PhoneNumber.length != 11) {
            this.setState({ phoneIvalid: true });
            return true;
        }
    }
    checkOccupation = () => {
        if (this.state.occupation == "") {
            this.setState({ occupationInvalid: true });
            return true;
        }
    }
    handleOnChange =(e)=>{
        let name = e.target.name;
        this.setState({ [name]: e.target.value })

    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ formsubmitted: true });

        if (this.checkFullName() || this.checkPhone() || this.checkOccupation()) {

        } else {

            this.props.dispatch(actions.PostPersonalDetails({
                FirstName: this.state.fullName,
                Email: this.state.email,
                PhoneNumber: this.state.PhoneNumber,
                Occupation: this.state.occupation,
                Nationality: this.state.Nationality,
                Package: this.state.Package,
                ApplicationType: this.state.ApplicationType,
                Amount: this.state.Amount

            }));
            
        }
    }

    getNetworkName(obj, value) {
        return Object.keys(obj).filter(e => obj[e] === value)[0] || null;
    }


    handleChange = (e) => {
        const name = e.target.name;
        if (/^[0-9]+$/.test(e.target.value)) {
            this.setState({ [name]: e.target.value });
            if (this.state.formsubmitted && e.target.value.length == 11)
                this.setState({ phoneIvalid: false });
        }
        else if (e.target.value == "") {
            this.setState({ [name]: e.target.value });
        }

    }

    handleAmount = (e) => {
        // console.log(this.intValue);
        this.setState({ "Amount": e });
        if (this.state.formsubmitted) {
            if (e != "")
                this.setState({ AmountInvalid: false });
        }
    }

    handleSelectChange = (selectedNationality) => {
        console.log(selectedNationality)
        this.setState({
            "Nationality": selectedNationality.value,
            "Nationality": selectedNationality.label
        });
        if (this.state.formsubmitted && selectedNationality.value != "")
            this.setState({ nationalityInvalid: false })
    }
    gotoStep2 = () => {
        if (this.props.post_personal_detail)
            if (this.props.post_personal_detail.message === listStyleConstants.POST_PERSONAL_DETAILS_SUCCESS) {
                return <Redirect to="/lifestyle/travels/visa-detail" />
            }
    };

    render() {
        let { phoneIvalid, email, Nationality, nationalityInvalid, occupationInvalid, fullNameInvalid, fullName, PhoneNumber, occupation } = this.state;
        let props = this.props;
        return (
            <div className="col-sm-12">
                <div className="row">
                    <div className="col-sm-12">
                        {this.gotoStep2()}
                        <div className="max-600">
                            <div className="al-card no-pad">
                                <h4 className="m-b-10 center-text hd-underline">Personal Details</h4>
                                <div className="transfer-ctn">
                                    <form onSubmit={this.handleSubmit}>
                                        <div className={fullNameInvalid ? "input-ctn form-error" : "input-ctn"}>
                                            <label>Full Name</label>
                                            <input type="text" onChange={this.handleOnChange} name="fullName" value={fullName}
                                            />
                                            {fullNameInvalid &&
                                                <div className="text-danger">Enter Full Name</div>}
                                        </div>
                                        <div className="input-ctn">
                                            <label>Email Address</label>
                                            <Textbox
                                                tabIndex="1"
                                                id={'email'}
                                                name="email"
                                                type="text"
                                                value={email}
                                                onChange={(email, e) => {
                                                    this.setState({ email });
                                                }}
                                                onBlur={(e) => { }}
                                                validationOption={{
                                                    name: 'Email/username',
                                                    check: true,
                                                    required: true
                                                }}
                                            />
                                        </div>
                                        <div className={phoneIvalid ? "input-ctn form-error" : "input-ctn"}>
                                            <label>Mobile Number</label>
                                            <input type="text" onChange={this.handleChange} maxLength="11" name="PhoneNumber" value={PhoneNumber} placeholder="08033798761" />
                                            {phoneIvalid &&
                                                <div className="text-danger">A valid phone number is required</div>
                                            }
                                        </div>
                                        <div className={occupationInvalid ? "input-ctn form-error" : "input-ctn"}>
                                            <label>Occupation</label>
                                            <input type="text" onChange={this.handleOnChange} name="occupation" value={occupation}
                                            />
                                            {occupationInvalid &&
                                                <div className="text-danger">Enter Full Name</div>}
                                        </div>
                                        
                                        <div className={nationalityInvalid ? "input-ctn form-error" : "input-ctn"}>
                                            <label>Nationality</label>
                                            <Select tabindex="-1"
                                                name="Nationality"
                                                options={selectedNations}
                                                onChange={this.handleSelectChange}
                                                value={Nationality.label}
                                            />
                                            {nationalityInvalid &&
                                                <div className="text-danger">Select your Nationality</div>}
                                           
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
                            </div>

                            <center>
                                <Link to={'/lifestyle/travels/dubai-visa'} className="add-bene m-t-50">Go Back</Link>
                            </center>
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


export default connect(mapStateToProps)(PersonalDetail);