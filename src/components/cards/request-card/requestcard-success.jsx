import * as React from "react";
import {Router, NavLink} from "react-router";
// import * as utils from "../../shared/utils";


import {
        clearCardsStore
} from "../../../redux/actions/cards/cards.actions";

import {Fragment} from "react";
import {connect} from "react-redux";
import successIcon from "../../../assets/img/success-tick.svg";

import { 
    POSTINGDATA_FOR_CARDREQUEST_SUCCESS} from "../../../redux/constants/cards/cards.constants";

class RequestCardSuccess extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
        };

        
    }


    componentDidMount() {
        this.verifyTransferStage();
    }

    verifyTransferStage(){
        let props = this.props,
        postCardData      = this.props.postCardRequest;

            if(postCardData.fetch_status!==POSTINGDATA_FOR_CARDREQUEST_SUCCESS){
                this.props.history.push("/cards");
            }
    }

    


    renderSuccess(){
        

        return(
            <div className="col-sm-12">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="max-600 m-b-40">
                            <div className="al-card no-pad otpform m-b-30">
                                <div className="transfer-ctn">
                                    <center>
                                        <img src={successIcon} />
                                    </center>
                                    <div className="m-t-30 width-300">
                                        <h4 className="success-heading">Card request successful</h4>
                                        <div className="success-mg">
                                           You card request was successful 
                                        </div>
                                        
                                        
                                    </div>  
                                </div>         
                            </div>
                            <div className="return-text"><a onClick={(e)=>{e.preventDefault();
                                                                        this.props.dispatch(clearCardsStore()); 
                                                                        this.props.history.push("/dashboard");
                                                                }}> Return to dashboard</a></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    

    render(){
        let props = this.props;
        
        return(
            <Fragment>
                 {this.renderSuccess()}
            </Fragment>
        )
    }
}


function mapStateToProps(state){
    return {
        postCardRequest   : state.alatCardReducersPile.postATMCardRequest,
    };
}

export default connect(mapStateToProps)(RequestCardSuccess);