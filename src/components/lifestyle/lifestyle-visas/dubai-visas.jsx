import React  from 'react';
import { Link,Redirect } from 'react-router-dom';
import * as actions  from '../../../redux/actions/lifestyle/movies-actions';
import { listStyleConstants } from '../../../redux/constants/lifestyle/lifestyle-constants';
import { GetVisaOption, GetVisaPackage} from '../../../redux/actions/lifestyle/movies-actions';
import { connect } from 'react-redux';



class Dubai extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            Amount: "",
            Package: "",
            ApplicationType:"",
            formsubmitted: false,
            AmountInvalid: false,
            VisaOptionInvalid:false,
            ApplicationInvalid:false,
            user: JSON.parse(localStorage.getItem("user")),


        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleAmount = this.handleAmount.bind(this);
    }
    componentDidMount() {
        this.fetchVisaOptions();
        this.fetchVisaPackage();
    }
    fetchVisaOptions() {
        const { dispatch } = this.props;
        dispatch(GetVisaOption(this.state.user.token));

    };
    fetchVisaPackage() {
        const { dispatch } = this.props;
        dispatch(GetVisaPackage(this.state.user.token));
    }

    
    checkAmount = () => {
        if (this.state.Amount == "") {
            this.setState({ AmountInvalid: true });
            return true;
        }
    }

    checkVisaApplication = () => {
        if (this.state.ApplicationType == "") {
            this.setState({ ApplicationInvalid: true });
            return true;
        }
    }
    checkVisaPackage = ()=>{
        if (this.state.Package == "") {
            this.setState({ VisaOptionInvalid: true });
            return true;
        }

    }

    handleAmount = (e) => {
        // console.log(this.intValue);
        this.setState({ "Amount": e.target.value });
        console.log(e.target.value)
        if (this.state.formsubmitted) {
            if (e != "")
                this.setState({ AmountInvalid: false });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ formsubmitted: true });

        if (this.checkVisaApplication() || this.checkVisaPackage() || this.checkAmount()){

        } else {
            this.props.dispatch(actions.PostVisa({
                ApplicationType: this.state.ApplicationType,
                Package: this.state.Package,
                Amount: this.state.Amount,
            }));
            console.log(this.state.ApplicationType, this.state.Package, this.state.Amount)
        }
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

    handleSelectChange = (event) => {
        this.setState({ ApplicationType: event.target.value });
        console.log(event.target.value)

        if (this.state.formsubmitted && event.target.value != "")
            this.setState({ ApplicationInvalid: false })
    }
    handleSelectVisaPackageChange = (event) => {
        let Amount = event.target.value.split("8888")[1];
        let Package = event.target.value.split("8888")[0];

        console.log('amount',Amount)

        this.setState({ Package: Package });
        console.log("visaPackage", Package)
        this.setState({ Amount: Amount})
        

        if (this.state.formsubmitted && event.target.value != "")
            this.setState({ ApplicationInvalid: false })
    }
    gotoStep2 = () => {
        if (this.props.post_visa)
            if (this.props.post_visa.message === listStyleConstants.POST_VISA_SUCCESS) {
                return <Redirect to="/lifestyle/travels/personal-detail"/>
            }
    };
    renderSelect = () => {
        if (this.props.get_visa_package.message === listStyleConstants.GET_VISA_PACKAGE_PENDING) {
            return <select> <option> Loading Visa Application Type... </option> </select>
                  
                    
            
        } else if (this.props.get_visa_package.message === listStyleConstants.GET_VISA_PACKAGE_SUCCESS){
            let visaApplicationType = this.props.get_visa_package.data.response.data.data.applicationTypeModel
            return (
                <select onChange={this.handleSelectChange}>
                    <option>Select Application type</option>
                    {
                        visaApplicationType.map(visa => {
                            return (<option key={visa.applicationTypeId} value={visa.applicationTypeName}>{visa.applicationTypeName}</option>)
                        })
                    }

                </select>
            )
            
        }

    }

    renderVisaSelect = () => {
        if (this.props.get_visa_package.message === listStyleConstants.GET_VISA_PACKAGE_PENDING) {
            return <select> <option> Loading Visa Package... </option> </select>




        }else if (this.props.get_visa_package.message === listStyleConstants.GET_VISA_PACKAGE_SUCCESS) {
            let visaPackage = this.props.get_visa_package.data.response.data.data.applicationTypeModel
            return (
                <select onChange={this.handleSelectVisaPackageChange}>
                    <option>Select Visa Package</option>
                    {
                        visaPackage.map(visa => {
                            return visa.visaPackageModel.map(visaPackage => {
                                return (<option key={visaPackage.visaPackageID} value={visaPackage.visaPackageName + "8888" + visaPackage.amount }>{visaPackage.visaPackageName}</option>)

                            })
                        })
                    }

                </select>
            )
        }

     }



    render(){
        let { ApplicationInvalid, VisaOptionInvalid, AmountInvalid, } = this.state;
        
        return(
            <div className="col-sm-12">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="max-600">
                            {this.gotoStep2()}
                            <div className="al-card no-pad">
                                <h4 className="m-b-10 center-text hd-underline">Dubai Visa</h4>
                                <div className="transfer-ctn">
                                    <form onSubmit={this.handleSubmit}>
                                        <div className={ApplicationInvalid ? "input-ctn form-error" : "input-ctn"}>
                                            <label>Aplication Type</label>
                                            
                                            {this.renderSelect()}
                                        
                                            {ApplicationInvalid &&
                                                <div className="text-danger">Select an Aplication Type</div>}
                                            
                                        </div>
                                        <div className={VisaOptionInvalid ? "input-ctn form-error" : "input-ctn"}>
                                            <label>Visa Package</label>
                                            
                                            {
                                                this.renderVisaSelect()
                                            }

                                            {VisaOptionInvalid &&
                                                <div className="text-danger">Select a Visa Package</div>
                                            }
                                        </div>

                                        <div className={AmountInvalid ? "input-ctn form-error" : "input-ctn"}>
                                            <label>Amount</label>
                                            <select onChange={this.handleAmount}>
                                                 
                                                 <option  value={this.state.Amount}>{this.state.Amount}</option>)
                                            }

                                            </select>
                    
                                            {AmountInvalid &&
                                                <div className="text-danger">Select a Visa Package</div>
                                            }
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
                                <Link to={'/lifestyle/travels/visas'} className="add-bene m-t-50">Go Back</Link>
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
        post_visa: state.LifestyleReducerPile.PostVisa,
        get_visa_options: state.LifestyleReducerPile.GetVisaOptions,
        get_visa_package: state.LifestyleReducerPile.GetVisaPackage,
    };
}

export default connect(mapStateToProps)(Dubai)