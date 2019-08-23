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
import whitelogo from "../../../assets/img/white-logo.svg"; 
import  {routes} from '../../../services/urls';
import successIcon from "../../../assets/img/success-tick.svg";
import noPolicy from "../../../assets/img/empty-policy.svg";




// const options = [
// ];

const BASEURL = routes.BASEURL;

class ManageInsurance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
        };
        
       
        
        
    }

    componentDidMount() {
        
    }

    renderExistingPolicy(){
        return(
            <div className="col-sm-12">
                <div className="row">
                        <div className="col-sm-12">
                            <div className="max-600">
                                <div className="al-card no-pad">
                                    <div className="transfer-ctn text-center">
                                        <div>
                                            <center>
                                                <img src={noPolicy} />
                                            </center>
                                            <div className="m-t-30 width-300">
                                                <div className="success-mg">
                                                You don’t have any insurance policy at the moment. 
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
               {this.renderExistingPolicy()}
            </Fragment>
        );
    }
}


function mapStateToProps(state){
    console.error(state);
    return {
    };
}

export default connect(mapStateToProps)(ManageInsurance);
