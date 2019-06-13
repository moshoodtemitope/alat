import React, {Component} from 'react';
import {connect} from 'react-redux';
import Index from '.';
import * as actions from '../../../redux/actions/dataActions/export';
// import { from } from 'rxjs';
// import { dispatch } from 'rxjs/internal/observable/pairs';

// var currentSubComponent = "Index";
// var nextComponent;

class Data extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user"))
        };
    }

    componentDidMount() {
        this.props.fetchBeneficiaries(this.state.user.token);
    }
   render() {

    // switch(currentSubComponent){
    //     case ("Index") :
    //     nextComponent = <Index />;
    //     break;
    //     case ("changed") :
    //     nextComponent = <h1>changed</h1>;
    //     break; 
    //     default :
    //     nextComponent = <Index />;
    // }
       return(
           <Index hasBeneficiaries={this.props.beneficiaries.length > 0}/>
       );
   }
}

const mapStateToProps = state => {
    return{
        beneficiaries : state.data_reducer.beneficiaries
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchBeneficiaries : (token) => dispatch(actions.fetchDataBeneficiaries(token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Data);