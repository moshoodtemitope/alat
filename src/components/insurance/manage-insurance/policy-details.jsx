import * as React from "react";
import {Router} from "react-router";
// import * as utils from "../../shared/utils";

import {Fragment} from "react";
import {connect} from "react-redux";
import {Checkbox} from "react-inputs-validation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import * as utils from '../../../shared/utils';
import {Textbox} from "react-inputs-validation";
import whitelogo from "../../../assets/img/white-logo.svg"; 
import  {routes} from '../../../services/urls';
import successIcon from "../../../assets/img/success-tick.svg";
import noPolicy from "../../../assets/img/empty-policy.svg";

import {
    FETCH_CARMAKES_INYEAR_SUCCESS,
    FETCH_CARMAKES_INYEAR_PENDING,
    FETCH_CARMAKES_INYEAR_FAILURE,
    FETCH_CARMAKES_MODELS_SUCCESS,
    FETCH_CARMAKES_MODELS_PENDING,
    FETCH_CARMAKES_MODELS_FAILURE,
    POST_MOTORSCHEDULEDATA_SUCCESS,
    POST_MOTORSCHEDULEDATA_PENDING,
    POST_MOTORSCHEDULEDATA_FAILURE,
    GET_VEHICLEDETAILS_SUCCESS,
    GET_VEHICLEDETAILS_PENDING,
    GET_VEHICLEDETAILS_FAILURE,
 }from "../../../redux/constants/insurance/insurance.constants";


 import {
    saveCustomerDetails,
    saveCustomerPolicyData,
    getCarMakesInYear,
    getCarModels,
    postMotorSchedule,
    getCarDetails
    // clearCardsStore
} from "../../../redux/actions/insurance/insurance.actions";
import { compose } from "redux";

// const options = [
// ];

const BASEURL = routes.BASEURL;
let  autoColorsList   = [];

class PolicyDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            autoRegNo:'',
            autoEngineNo:'',
            autoChasisNo:'',
            policyEndDate:'',
            policyStartDate:'',
            cubicCap:'',
            driverLicenceNo:'',
            selectedAutoMakeYear:'',
            selectedAutoMake:'',
            selectedAutoModel:'',
            selectedAutoColor:'',
            selectedAutoBody:'',
            yrsOfDriving:'',
            licenceIssueDate:'',
            autoEstimatedvalue:'',
            allCarMakes:[],
            allAutoModel:[]
        };


        this.handleCustomerPolicyDetails = this.handleCustomerPolicyDetails.bind(this);
        this.handleSelectedAutoMakeYear = this.handleSelectedAutoMakeYear.bind(this);
        this.handleSelectedAutoColor = this.handleSelectedAutoColor.bind(this);
        this.handleSelectedAutoBody = this.handleSelectedAutoBody.bind(this);
        this.handleDriverLicenceDate = this.handleDriverLicenceDate.bind(this);
        this.handlePolicyStartDate = this.handlePolicyStartDate.bind(this);
        this.handlePolicyEndDate = this.handlePolicyEndDate.bind(this);
        this.handleSelectedAutoMake = this.handleSelectedAutoMake.bind(this);
        this.handleSelectedAutoModel = this.handleSelectedAutoModel.bind(this);
        this.handleSelectedAutoBody = this.handleSelectedAutoBody.bind(this);
        this.getCarData = this.getCarData.bind(this);
        this.updateCarInfo = this.updateCarInfo.bind(this);
        this.validateCustomerPolicyData = this.validateCustomerPolicyData.bind(this);
        this.validateDateRange = this.validateDateRange.bind(this);
        
    }

    componentDidMount() {
        this.verifyStage();
    }

    verifyStage(){
        if(Object.keys(this.props.savedCustomerInfo).length===0){
            this.props.history.push("/insurance")
        }
    }

    handleCustomerPolicyDetails(e){
        e.preventDefault()

        let customerData = this.props.savedCustomerInfo.customer_data.data;
        console.log('state data is', this.state);
        if(this.validateCustomerPolicyData()){
            let payload ={
                RegNo: this.state.autoRegNo,
                Make: this.state.selectedAutoMake,
                Model:this.state.selectedAutoModel,
                CubicCap: this.state.cubicCap,
                YrManft: this.state.selectedAutoMakeYear,
                BodyType: this.state.selectedAutoBody,
                // EngineNo: this.state.autoEngineNo,
                // ChasisNo:this.state.autoChasisNo,
                Color: this.state.selectedAutoColor,
                VehicleAmount:parseFloat(this.state.autoEstimatedvalue),
                FirstName: customerData.FirstName,
                LastName: customerData.LastName,
                DateOfBirth: customerData.DateOfBirth,
                EmailAddress: customerData.EmailAddress,
                DlNo:this.state.driverLicenceNo,
                DlIssueDate: this.state.licenceIssueDateConverted,
                YearsOfDrvExperience: parseInt(this.state.yrsOfDriving),
                PhysicalAddrs: customerData.PhysicalAddrs,
                SmsTel: customerData.SmsTel,
                ProductId: this.props.getProductCovers.policycover_data.productId,
                TitleId: customerData.TitleId,
                TownId:customerData.TownId,
                GenderId: customerData.GenderId,
                SubclassSectCovtypeId:this.props.saveProductCoverId.policycover_data.data.productCoverId,
                WefDt:this.state.policyStartDateConverted,
                WetDt:this.state.policyEndDateConverted
            }
            if((this.state.autoEngineNo!=='' && this.state.autoEngineNoFetched ==undefined)){
                payload.EngineNo = this.state.autoEngineNo;
            }

            if((this.state.autoEngineNo==='' && this.state.autoEngineNoFetched !==undefined)){
                payload.EngineNo = this.state.autoEngineNoFetched;
            }

            if((this.state.autoChasisNo!=='' && this.state.autoChasisNoFetched ==undefined)){
                payload.ChasisNo = this.state.autoChasisNo;
            }

            if((this.state.autoChasisNo==='' && this.state.autoChasisNoFetched !==undefined)){
                payload.ChasisNo = this.state.autoChasisNoFetched;
            }

            // console.log('schedule payload', payload);
            this.setState({isCompleted: true})

            this.postAutoSchedule(payload);
        }else{
            this.setState({isCompleted: false})
        }
    }


    validateCustomerPolicyData(){
        if(this.state.autoRegNo!=='' &&

            ((this.state.autoEngineNo!=='' && this.state.autoEngineNoFetched ==undefined) 
            ||(this.state.autoEngineNo==='' && this.state.autoEngineNoFetched !==undefined)) &&

            ((this.state.autoChasisNo!=='' && this.state.autoChasisNoFetched ==undefined)
            ||(this.state.autoChasisNo==='' && this.state.autoChasisNoFetched !==undefined))

            && this.validateDateRange(this.state.policyStartDate, this.state.policyEndDate, 'policyDate')
           
            && this.state.autoEstimatedvalue!=='' &&
            this.state.selectedAutoMakeYear!==''&& this.state.selectedAutoMake!=='' &&
            this.state.selectedAutoModel!==''&& this.state.selectedAutoColor!=='' &&
            this.state.selectedAutoBody!==''&& this.state.cubicCap!=='' &&
            this.state.driverLicenceNo!==''&& this.state.yrsOfDriving!=='' &&
            this.state.licenceIssueDate!==''&& this.state.policyStartDate!=='' && this.state.policyEndDate!==''
        ){
            return true;
        }else{
            return false;
        }
    }

    getCarMakes(year){
        const { dispatch } = this.props;
        dispatch(getCarMakesInYear(year, this.state.user.token));
    }

    getCarModels(payload){
        const { dispatch } = this.props;
        
        dispatch(getCarModels(payload, this.state.user.token));
    }

    getCarData(e){
        e.preventDefault();
        const { dispatch } = this.props;

        let carFullInfo = this.props.getCarFullDetails;

        let payload = {
            VehicleNumberPlate:this.state.autoRegNo
        }
        dispatch(getCarDetails(payload, this.state.user.token));

    }

    updateCarInfo(info, value){
        if(info==='chasis'){
            Object.defineProperty(this.state, 'autoChasisNo',{
                value: value,
                writable: false,
            })
                
            
        }
    }

    renderCarDetail(detail){
        let carFullInfo = this.props.getCarFullDetails,
            carsInYear    = this.props.getCarsInYear;

        if(detail==='chasis'){
            if(Object.keys(carFullInfo).length===0){
                return(
                    <Textbox
                        id={'autoChasisNo'}
                        name="autoChasisNo"
                        type="text"
                        autoComplete ="off"
                        value={this.state.autoChasisNo}
                        placeholder= "Enter car chasis number"
                        onChange= {(autoChasisNo, e)=>{
                            this.setState({autoChasisNo},()=>{

                                let stateTemp = Object.assign({}, this.state);
                                stateTemp.autoChasisNoFetched = null;
                                this.setState({stateTemp})
                            });
                            
                        }}
                    />
                )
            }

            if(Object.keys(carFullInfo).length>=1 && carFullInfo.fetch_status===GET_VEHICLEDETAILS_PENDING){
                return(
                    <Textbox
                        id={'autoChasisNo'}
                        name="autoChasisNo"
                        disabled={true}
                        type="text"
                        autoComplete ="off"
                        value="Fetching Chasis"
                        placeholder= "Enter car chasis number"
                        onChange= {(autoChasisNo, e)=>{
                            this.setState({autoChasisNo},()=>{
                                
                                let stateTemp = Object.assign({}, this.state);
                                stateTemp.autoChasisNoFetched = null;
                                this.setState({stateTemp})
                            });
                        }}
                    />
                )
            }

            if(Object.keys(carFullInfo).length>=1 && carFullInfo.fetch_status===GET_VEHICLEDETAILS_FAILURE){
                return(
                    <Textbox
                        id={'autoChasisNo'}
                        name="autoChasisNo"
                        type="text"
                        autoComplete ="off"
                        value={this.state.autoChasisNo}
                        placeholder= "Enter car chasis number"
                        onChange= {(autoChasisNo, e)=>{
                            this.setState({autoChasisNo},()=>{
                                
                                let stateTemp = Object.assign({}, this.state);
                                stateTemp.autoChasisNoFetched = null;
                                this.setState({stateTemp})
                            });
                        }}
                    />
                )
            }

            if(Object.keys(carFullInfo).length>=1 && carFullInfo.fetch_status===GET_VEHICLEDETAILS_SUCCESS){
                
                let cardDetails = carFullInfo.vehicledetails_data.response.data.VehicleDetails;
                
                this.state= Object.assign({}, {
                    autoChasisNoFetched:cardDetails.ChasisNo
                    }, this.state);
                return(
                    <Textbox
                        id={'autoChasisNoFetched'}
                        name="autoChasisNoFetched"
                        type="text"
                        autoComplete ="off"
                        value={this.state.autoChasisNoFetched}
                        placeholder= "Enter car chasis number"
                        onChange= {(autoChasisNoFetched, e)=>{
                            this.setState({autoChasisNoFetched});
                        }}
                    />
                )
            }
        }

        if(detail==='engineno'){
            if(Object.keys(carFullInfo).length===0){
                return(
                    <Textbox
                        id={'autoEngineNo'}
                        name="autoEngineNo"
                        type="text"
                        autoComplete ="off"
                        value={this.state.autoEngineNo}
                        placeholder= "Enter car engine number"
                        onChange= {(autoEngineNo, e)=>{
                            // this.setState({autoEngineNo});
                            this.setState({autoEngineNo},()=>{
                                
                                let stateTemp = Object.assign({}, this.state);
                                stateTemp.autoEngineNoFetched = null;
                                this.setState({stateTemp})
                            });
                        }}
                    />
                )
            }

            if(Object.keys(carFullInfo).length>=1 && carFullInfo.fetch_status===GET_VEHICLEDETAILS_PENDING){
                return(
                    <Textbox
                        id={'autoEngineNo'}
                        name="autoEngineNo"
                        disabled={true}
                        type="text"
                        autoComplete ="off"
                        value="Fetching engine number"
                        placeholder= "Enter car engine number"
                        onChange= {(autoEngineNo, e)=>{
                            // this.setState({autoEngineNo});
                            this.setState({autoEngineNo},()=>{
                                
                                let stateTemp = Object.assign({}, this.state);
                                stateTemp.autoEngineNoFetched = null;
                                this.setState({stateTemp})
                            });
                        }}
                    />
                )
            }

            if(Object.keys(carFullInfo).length>=1 && carFullInfo.fetch_status===GET_VEHICLEDETAILS_FAILURE){
                return(
                    <Textbox
                        id={'autoEngineNo'}
                        name="autoEngineNo"
                        type="text"
                        autoComplete ="off"
                        value={this.state.autoEngineNo}
                        placeholder= "Enter car engine number"
                        onChange= {(autoEngineNo, e)=>{
                            // this.setState({autoEngineNo});
                            this.setState({autoEngineNo},()=>{
                                
                                let stateTemp = Object.assign({}, this.state);
                                stateTemp.autoEngineNoFetched = null;
                                this.setState({stateTemp})
                            });
                        }}
                    />
                )
            }

            if(Object.keys(carFullInfo).length>=1 && carFullInfo.fetch_status===GET_VEHICLEDETAILS_SUCCESS){
                
                let cardDetails = carFullInfo.vehicledetails_data.response.data.VehicleDetails;

                this.state= Object.assign({}, {
                    autoEngineNoFetched:cardDetails.EngineNo
                    }, this.state);
                return(
                    <Textbox
                        id={'autoEngineNo'}
                        name="autoEngineNo"
                        // disabled={true}
                        type="text"
                        autoComplete ="off"
                        value={this.state.autoEngineNoFetched}
                        placeholder= "Enter car chasis number"
                        onChange= {(autoEngineNoFetched, e)=>{
                            this.setState({autoEngineNoFetched});
                        }}
                    />
                )
            }
        }

        if(detail==='color'){
            if(Object.keys(carFullInfo).length===0){
                return(
                    <Select
                        options={autoColorsList}
                        placeholder="Choose car color"
                        onChange={this.handleSelectedAutoColor}
                    />
                )
            }

            if(Object.keys(carFullInfo).length>=1 && carFullInfo.fetch_status===GET_VEHICLEDETAILS_PENDING){
                return(
                    <Select
                        options={autoColorsList}
                        placeholder="Choose car color"
                        onChange={this.handleSelectedAutoColor}
                    />
                )
            }

            if(Object.keys(carFullInfo).length>=1 && carFullInfo.fetch_status===GET_VEHICLEDETAILS_SUCCESS){
                let cardDetails = carFullInfo.vehicledetails_data.response.data.VehicleDetails;
                // this.state= Object.assign({}, {
                //     autoColorFetched:cardDetails.Color
                //     }, this.state);
                
                return(
                    <Select
                        options={autoColorsList}
                        defaultValue={{label: cardDetails.Color, value: cardDetails.Color}}
                        placeholder="Choose car color"
                        onChange={this.handleSelectedAutoColor}
                    />
                )
            }

            if(Object.keys(carFullInfo).length>=1 && carFullInfo.fetch_status===GET_VEHICLEDETAILS_FAILURE){
               
                return(
                    <Select
                        options={autoColorsList}
                        placeholder="Choose car color"
                        onChange={this.handleSelectedAutoColor}
                    />
                )
            }

        }

        if(detail==='make'){
            if(Object.keys(carFullInfo).length===0){
                return(
                    this.renderCarMake()
                )
                
            }

            if(Object.keys(carFullInfo).length>=1 && carFullInfo.fetch_status===GET_VEHICLEDETAILS_PENDING){
                return(
                    this.renderCarMake()
                )
            }

            if(Object.keys(carFullInfo).length>=1 && carFullInfo.fetch_status===GET_VEHICLEDETAILS_SUCCESS){
                let cardDetails = carFullInfo.vehicledetails_data.response.data.VehicleDetails;
                return(
                    this.renderCarMake(true,cardDetails.VehicleMakeName)
                )
            }

            if(Object.keys(carFullInfo).length>=1 && carFullInfo.fetch_status===GET_VEHICLEDETAILS_FAILURE){
                
                return(
                    this.renderCarMake()
                )
            }
            
        }

        if(detail==='model'){
            if(Object.keys(carFullInfo).length===0){
                return(
                    <Select
                        options={this.state.allAutoModel}
                        placeholder="Choose car model"
                        onChange={this.handleSelectedAutoModel}
                    />
                )
                
            }
            if(Object.keys(carFullInfo).length>=1 && carFullInfo.fetch_status===GET_VEHICLEDETAILS_PENDING){
                
                return(
                    <Select
                        options={this.state.allAutoModel}
                        placeholder="Choose car model"
                        onChange={this.handleSelectedAutoModel}
                    />
                )
            }

            if(Object.keys(carFullInfo).length>=1 && carFullInfo.fetch_status===GET_VEHICLEDETAILS_FAILURE){
                
                return(
                    <Select
                        options={this.state.allAutoModel}
                        placeholder="Choose car model"
                        onChange={this.handleSelectedAutoModel}
                    />
                )
            }

            if(Object.keys(carFullInfo).length>=1 && carFullInfo.fetch_status===GET_VEHICLEDETAILS_SUCCESS){
                let cardDetails = carFullInfo.vehicledetails_data.response.data.VehicleDetails;
                return(
                    this.renderCarModel()
                )
            }
            
        }
    }

    postAutoSchedule(payload){
        const { dispatch } = this.props;
        dispatch(postMotorSchedule(payload, this.state.user.token));
    }

    handleSelectedAutoMakeYear(selectedAutoMakeYear){
        this.setState({selectedAutoMakeYear: selectedAutoMakeYear.value}, this.getCarMakes(selectedAutoMakeYear.value));
    }

    handleSelectedAutoColor(selectedAutoColor){
        this.setState({selectedAutoColor: selectedAutoColor.value});
    }

    handleSelectedAutoBody(selectedAutoBody){
        this.setState({selectedAutoBody: selectedAutoBody.value});
    }

    handleSelectedAutoMake(selectedAutoMake){
        let payload = {
            VehicleMake:selectedAutoMake.value,
            VehicleYear: this.state.selectedAutoMakeYear
        }
        this.setState({selectedAutoMake: selectedAutoMake.value}, this.getCarModels(payload));
    }

    handleSelectedAutoModel(selectedAutoModel){
        this.setState({selectedAutoModel: selectedAutoModel.value});
    }

    handleDriverLicenceDate(licenceIssueDate){
        // this.setState({ licenceIssueDate });
        if(typeof licenceIssueDate ==='object'){
            licenceIssueDate.setHours(licenceIssueDate.getHours() + 1);

            let month = new Date(licenceIssueDate).getUTCMonth()+1, 
                day   = new Date(licenceIssueDate).getUTCDate();

                if(month.toString().length===1){
                    month = '0'+month;
                }

                if(day.toString().length===1){
                    day = '0'+day;
                }

            let licenceIssueDateConverted = new Date(licenceIssueDate).getUTCFullYear()+'-'+month+'-'+day+'T00:00:00';
            
            this.setState({ licenceIssueDate, licenceIssueDateConverted });
        }else{
            
            this.setState({ licenceIssueDate:'', licenceIssueDateConverted:'' });
        }

        
    }

    handlePolicyStartDate(policyStartDate){
        // this.setState({ policyStartDate });
        if(typeof policyStartDate ==='object'){
            policyStartDate.setHours(policyStartDate.getHours() + 1);

            let month = new Date(policyStartDate).getUTCMonth()+1, 
                day   = new Date(policyStartDate).getUTCDate();

                if(month.toString().length===1){
                    month = '0'+month;
                }

                if(day.toString().length===1){
                    day = '0'+day;
                }

            let policyStartDateConverted = new Date(policyStartDate).getUTCFullYear()+'-'+month+'-'+day+'T00:00:00';
            
            this.setState({ policyStartDate, policyStartDateConverted},()=>{
                if(this.state.policyEndDate!==''){
                    this.validateDateRange(this.state.policyStartDate, this.state.policyEndDate, 'policyDate');
                }
            });
        }else{
            
            this.setState({ policyStartDate:'', policyStartDateConverted:'' });
        }

        
    }

    validateDateRange(startDate, endDate, whichDate){
        if((Date.parse(startDate) > Date.parse(endDate)) ||(Date.parse(startDate) == Date.parse(endDate))){
            if(whichDate==='policyDate'){
                this.setState({invalidPolicyDateRange: true})
            }
            return false;
        }else{
            if(whichDate==='policyDate'){
                this.setState({invalidPolicyDateRange: false})
            }
            return true;
        }
    }

    handlePolicyEndDate(policyEndDate){
        // this.setState({ policyEndDate });
        if(typeof policyEndDate ==='object'){
            policyEndDate.setHours(policyEndDate.getHours() + 1);


            let month = new Date(policyEndDate).getUTCMonth()+1, 
                day   = new Date(policyEndDate).getUTCDate();

                if(month.toString().length===1){
                    month = '0'+month;
                }

                if(day.toString().length===1){
                    day = '0'+day;
                }

            let policyEndDateConverted = new Date(policyEndDate).getUTCFullYear()+'-'+month+'-'+day+'T00:00:00';
            
            this.setState({ policyEndDate, policyEndDateConverted},()=>{
                if(this.state.policyStartDate!==''){
                    this.validateDateRange(this.state.policyStartDate, this.state.policyEndDate, 'policyDate');
                }
            });
        }else{
            
            this.setState({ policyEndDate:'', policyEndDateConverted:'' });
        }

        
    }

    renderCarMake(isFetched, fetchValue){
        let carsInYear    = this.props.getCarsInYear,
            carFullInfo = this.props.getCarFullDetails;
        

        if(Object.keys(carsInYear).length===0 && !isFetched){
            return(
                <Select
                    options={this.state.allCarMakes}
                    placeholder="Choose car make"
                    onChange={this.handleSelectedAutoMake}
                />
            )
        }

        if(Object.keys(carsInYear).length > 0 && carsInYear.fetch_status===FETCH_CARMAKES_INYEAR_PENDING){
            return (
                <select disabled>
                    <option>Fetching cars in {this.state.selectedAutoMakeYear} ...</option>
                </select>
            );
        }

        if(Object.keys(carsInYear).length > 0 && carsInYear.fetch_status===FETCH_CARMAKES_INYEAR_FAILURE){
            return(
                <Select
                    options={this.state.allCarMakes}
                    placeholder="Choose car make"
                    onChange={this.handleSelectedAutoMake}
                />
            )
        }

        if(Object.keys(carsInYear).length > 0 && carsInYear.fetch_status===FETCH_CARMAKES_INYEAR_SUCCESS){
           
            let carMakes = carsInYear.carsinyear_data.response.data,
                carsList =[];
                carMakes.map(car=>{
                    carsList.push({value:car, label:car})
                })


            return(
                <Select
                    options={carsList}
                    placeholder="Choose car make"
                    onChange={this.handleSelectedAutoMake}
                />
            )
        }

        if(isFetched===true){
            const { dispatch } = this.props;

            // dispatch(getCarMakesInYear('u', this.state.user.token));

            this.state= Object.assign({}, {
                autoMakeFetched:fetchValue
                }, this.state);

            return(
                <Textbox
                    id={'autoMakeFetched'}
                    name="autoMakeFetched"
                    disabled={true}
                    type="text"
                    autoComplete ="off"
                    value={this.state.autoMakeFetched}
                    onChange= {(autoMakeFetched, e)=>{
                        this.setState({autoMakeFetched:{value:autoMakeFetched}});
                    }}
                />
            )
        }

        
    }

    renderCarModel(){
        let carsModels    = this.props.getCarModelRequest;
        

        if(Object.keys(carsModels).length===0){
            return(
                <Select
                    options={this.state.allAutoModel}
                    placeholder="Choose car model"
                    onChange={this.handleSelectedAutoModel}
                />
            )
        }

        if(Object.keys(carsModels).length > 0 && carsModels.fetch_status===FETCH_CARMAKES_MODELS_PENDING){
            return (
                <select disabled>
                    <option>Fetching {this.state.selectedAutoMake} models ...</option>
                </select>
            );
        }

        if(Object.keys(carsModels).length > 0 && carsModels.fetch_status===FETCH_CARMAKES_MODELS_SUCCESS){
           
            let carModels = carsModels.carmodels_data.response.data,
                carModelsList =[];
                carModels.map(model=>{
                    carModelsList.push({value:model, label:model})
                })
            
            let  placeholdertext = `Choose ${this.state.selectedAutoMake} model`
            return(
                <Select
                    options={carModelsList}
                    placeholder={placeholdertext}
                    onChange={this.handleSelectedAutoModel}
                />
            )
        }
        
    }

    renderGetCustomerAutoPolicyDetails(){
        let{autoRegNo,
            autoEngineNo,
            autoChasisNo,
            policyEndDate,
            policyStartDate,
            driverLicenceNo,
            yrsOfDriving,
            cubicCap,
            licenceIssueDate,
            allAutoModel,
            allCarMakes,
            autoEstimatedvalue} = this.state;

        let newPolicyData    = this.props.newPolicyDataChunk.newpolicy_data.response,
            listOfColors     = newPolicyData.Colorlist,
            listOfBodyTypes  = newPolicyData.BodyTypes,
            listOfYears      = newPolicyData.Manufactureyears,
            autoBodyTypes    = [],
            autoYears        = [];
        
        let productCoverInfo = this.props.saveProductCoverId.policycover_data.data,
            postSchedule     =  this.props.postMotorScheduleRequest;
            // console.log('data info', productCoverInfo);

            listOfColors.map(color=>{
                autoColorsList.push({value:color, label:color})
            })

            listOfBodyTypes.map(body=>{
                autoBodyTypes.push({value:body, label:body})
            })

            listOfYears.map(year=>{
                autoYears.push({value:year, label:year})
            })

        return(
            <div>
                 <h4 className="m-b-10 center-text hd-underline brand-title">{productCoverInfo.productCoverName}</h4>
                <div className="transfer-ctn">
                    <form className="detailsform" onSubmit={this.handleCustomerPolicyDetails}>
                        <div className="twosided-inputs">
                            <div className="input-ctn textwrap">
                                    <label>Registration Number</label>
                                    <Textbox
                                    id={'autoRegNo'}
                                    name="autoRegNo"
                                    type="text"
                                    autoComplete ="off"
                                    value={autoRegNo}
                                    placeholder= ""
                                    onChange= {(autoRegNo, e)=>{
                                        this.setState({autoRegNo});
                                    }}
                                />
                            </div>
                            <div className="input-ctn">
                                <button type="button"
                                        onClick={this.getCarData}
                                        className="btn-alat btn-inverse getinfo m-t-25 text-center">Get Details    
                                </button>
                            </div>
                        </div>
                        <div className="input-ctn textwrap">
                            <label>Engine Number</label>
                            {this.renderCarDetail('engineno')}
                            {/* <Textbox
                                id={'autoEngineNo'}
                                name="autoEngineNo"
                                type="text"
                                autoComplete ="off"
                                value={autoEngineNo}
                                placeholder= "Enter car engine number"
                                onChange= {(autoEngineNo, e)=>{
                                    this.setState({autoEngineNo});
                                }}
                            /> */}
                        </div>
                        <div className="input-ctn textwrap">
                            <label>Chasis Number</label>
                            {this.renderCarDetail('chasis')}
                            {/* <Textbox
                                id={'autoChasisNo'}
                                name="autoChasisNo"
                                type="text"
                                autoComplete ="off"
                                value={autoChasisNo}
                                placeholder= "Enter car chasis number"
                                onChange= {(autoChasisNo, e)=>{
                                    this.setState({autoChasisNo});
                                }}
                            /> */}
                        </div>
                        <div className="input-ctn textwrap">
                            <label>Estimated Value</label>
                            <Textbox
                                id={'autoEstimatedvalue'}
                                name="autoEstimatedvalue"
                                type="number"
                                autoComplete ="off"
                                value={autoEstimatedvalue}
                                placeholder= "Enter car estimated value"
                                onChange= {(autoEstimatedvalue, e)=>{
                                    this.setState({autoEstimatedvalue});
                                }}
                            />
                        </div>
                        <div className="twosided-inputs">
                            <div className="input-ctn">
                                <label>Year of Make</label>
                                <Select
                                    options={autoYears}
                                    placeholder="Choose year"
                                    onChange={this.handleSelectedAutoMakeYear}
                                />
                            </div>
                            <div className="input-ctn textwrap">
                                <label>Car Make</label>
                                {/* {this.renderCarMake()} */}
                                {this.renderCarDetail('make')}
                                {/* <Select
                                    options={allCarMakes}
                                    placeholder="Choose car make"
                                    onChange={this.handleSelectedAutoMake}
                                /> */}
                            </div>
                        </div>
                        <div className="twosided-inputs">
                            <div className="input-ctn">
                                <label>Car Model</label>
                                {/* {this.renderCarModel()} */}
                                {this.renderCarDetail('model')}
                                {/* <Select
                                    options={allAutoModel}
                                    placeholder="Choose car model"
                                    onChange={this.handleSelectedAutoModel}
                                /> */}
                            </div>
                            <div className="input-ctn textwrap">
                                <label>Body Type</label>
                                <Select
                                    options={autoBodyTypes}
                                    placeholder="Choose body type"
                                    onChange={this.handleSelectedAutoBody}
                                />
                            </div>
                        </div>
                        <div className="twosided-inputs">
                            <div className="input-ctn">
                                <label>Car Color</label>
                                {/* <Select
                                    options={autoColorsList}
                                    placeholder="Choose car color"
                                    onChange={this.handleSelectedAutoColor}
                                /> */}
                                {this.renderCarDetail('color')}
                            </div>
                            <div className="input-ctn textwrap">
                                <label>Cubic Cap</label>
                                <Textbox
                                    id={'cubicCap'}
                                    name="cubicCap"
                                    type="text"
                                    autoComplete ="off"
                                    value={cubicCap}
                                    placeholder= "Enter cubic cap"
                                    onChange= {(cubicCap, e)=>{
                                        this.setState({cubicCap});
                                    }}
                                />
                            </div>
                        </div>
                        <div className="twosided-inputs">
                            <div className="input-ctn textwrap">
                                <label>Driver Licence number</label>
                                <Textbox
                                    id={'driverLicenceNo'}
                                    name="driverLicenceNo"
                                    type="text"
                                    autoComplete ="off"
                                    value={driverLicenceNo}
                                    placeholder= "Enter driver licence number"
                                    onChange= {(driverLicenceNo, e)=>{
                                        this.setState({driverLicenceNo});
                                    }}
                                />
                            </div>
                            <div className="input-ctn textwrap">
                                <label>Years of Driving Experience</label>
                                <Textbox
                                    id={'yrsOfDriving'}
                                    name="yrsOfDriving"
                                    type="number"
                                    autoComplete ="off"
                                    value={yrsOfDriving}
                                    onChange= {(yrsOfDriving, e)=>{
                                        this.setState({yrsOfDriving});
                                    }}
                                />
                            </div>
                        </div>
                        <div className="twosided-inputs">
                            <div className="input-ctn">
                                <label>Driver License Issue Date</label>
                                <DatePicker placeholderText="" 
                                    onChange={this.handleDriverLicenceDate}
                                    selected={licenceIssueDate}
                                    //onChangeRaw={(e) => this.handleChange(e)}
                                    dateFormat="d MMMM, yyyy"
                                    peekNextMonth
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    maxDate={new Date()}
                                />
                            </div>
                            <div className="input-ctn">
                                <label>Policy Start Date</label>
                                <DatePicker placeholderText="" 
                                    onChange={this.handlePolicyStartDate}
                                    selected={policyStartDate}
                                    //onChangeRaw={(e) => this.handleChange(e)}
                                    dateFormat="d MMMM, yyyy"
                                    peekNextMonth
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    maxDate={new Date()}
                                />
                            </div>
                        </div>
                        <div className="input-ctn">
                            <label> Policy End Date</label>
                            <DatePicker placeholderText="" 
                                onChange={this.handlePolicyEndDate}
                                selected={policyEndDate}
                                //onChangeRaw={(e) => this.handleChange(e)}
                                dateFormat="d MMMM, yyyy"
                                peekNextMonth
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                maxDate={new Date()}
                            />
                        </div>
                        <center>
                            <button type="submit"  
                            disabled={postSchedule.is_processing}
                                    className="btn-alat m-t-10 m-b-20 text-center"
                                    > {postSchedule.is_processing==true?'Submitting':'Submit'}</button>
                        </center>
                        {this.state.invalidPolicyDateRange && <div className="error-msg text-center">Policy ending date must be later that starting date</div>}
                        {this.state.isCompleted===false && <div className="error-msg text-center">Please provide all details</div>}
                    </form>
                </div>
            </div>
        )
    }
    


    renderDetailsContainer(){
        let {showCustomerForm} = this.state;
        // console.log('customer data', this.props.savedCustomerInfo);
        return(
            <div className="col-sm-12">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="max-600">
                            <div className="al-card no-pad">
                                {this.renderGetCustomerAutoPolicyDetails()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    

    

   
   

    
    render() {
        return (
            <Fragment>
                {this.renderDetailsContainer()}
            </Fragment>
        );
    }
}


function mapStateToProps(state){
    return {
        newPolicyDataChunk   : state.insurancePile.getNewPolicyDataChunk,
        getProductCovers   : state.insurancePile.getCoversInPoductRequest,
        saveProductCoverId   : state.insurancePile.saveProductCoverId,
        getCarsInYear   : state.insurancePile.getCarInYearRequest,
        getCarFullDetails   : state.insurancePile.getCarDetailsRequest,
        getCarModelRequest   : state.insurancePile.getCarModelRequest, 
        postMotorScheduleRequest   : state.insurancePile.postMotorScheduleRequest,
        savedCustomerInfo   : state.insurancePile.saveCustomerInfo 
    };
}

export default connect(mapStateToProps)(PolicyDetails);
