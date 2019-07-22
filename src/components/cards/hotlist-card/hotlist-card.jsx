import * as React from "react";
import {Router} from "react-router";
// import * as utils from "../../shared/utils";

import {Fragment} from "react";
import {connect} from "react-redux";
import Select from 'react-select';
import Modal from 'react-responsive-modal';
import {Textbox} from "react-inputs-validation";
const options = [
];

class HotlistCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
        };
        
    }

    componentDidMount() {
    }

    
    render() {
        

        return (
            <Fragment>
                hotlist card
            </Fragment>
        );
    }
}


function mapStateToProps(state){
    console.error(state);
    // return {
       
    // };
}

export default connect(mapStateToProps)(HotlistCard);
