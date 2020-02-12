import React, { Fragment} from 'react';
import { connect } from 'react-redux';
import Modal from 'react-responsive-modal';
import { Redirect } from 'react-router-dom';
import {history} from "../../_helpers/history";
import successIcon from '../../assets/img/success_action.svg';
import failIcon from '../../assets/img/failed_action.svg';
import * as actions from '../../redux/actions/onboarding/loan.actions';

class ExtendModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    goToUploadStatement = ()=>{
        // this.props.dispatch(actions.goToUploadStatement());
        history.push("/loan/statement-upload");
    }
    

     render(){
             const  { props } = this.state;
         return(<Modal open={this.props.openModal} onClose={this.props.onCloseModal} showCloseIcon={this.props.showCloseIcon}  center>
            <div className="div-modal">
               {this.props.IsSuccess && <img src={successIcon}/>}
               {!this.props.IsSuccess && <img src={failIcon}/>}
                <h3><br/><strong><span>{this.props.message}</span></strong>.<br/> </h3>

                {(this.props.message!==undefined && (this.props.message.indexOf("do not qualify for this loan category at the moment because you have less than 6 month(s) salary entries")>-1 ||
                 this.props.message.indexOf("You have no recent salary payment entry")>-1)) &&
                   <div className="text-center text-center m-b-20"> 
                        Would you rather upload your 6months bank statement in pdf format showing salary entries?
                   </div>
                }
                {/* <div className="btn-opt"> */}

                        {( this.props.message!==undefined && (this.props.message.indexOf("do not qualify for this loan category at the moment because you have less than 6 month(s) salary entries") ===-1 &&
                        this.props.message.indexOf("You have no recent salary payment entry")===-1)) &&
                            <button 
                            onClick={this.props.SubmitAction} disabled={this.props.isProcessing} 
                            className="btn-alat">{ this.props.isProcessing ? "Processing..." : "Proceed"}</button>
                        }
                    
                   
                {/* </div> */}

                {( this.props.message!==undefined && (this.props.message.indexOf("do not qualify for this loan category at the moment because you have less than 6 month(s) salary entries")>-1 ||
                        this.props.message.indexOf("You have no recent salary payment entry")>-1)) &&
                        <div className="btn-opt">

                       
                            <button onClick={this.props.SubmitAction} disabled={this.props.isProcessing} className="border-btn">Decline</button>
                        
                    
                        <button 
                            onClick={this.goToUploadStatement} disabled={this.props.isProcessing} 
                            className="btn-alat">Proceed</button>
                    </div>
                }
            </div>
        </Modal>);
     }
}

function mapStateToProps(state){
    return {

    }
}
export default connect(mapStateToProps)(ExtendModal);

