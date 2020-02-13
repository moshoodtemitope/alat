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
            user: JSON.parse(localStorage.getItem("user")),
        }
    }

    goToUploadStatement = ()=>{
        this.props.dispatch(actions.enableStatementUpload(this.state.user.token));
        
    }
    

     render(){
             const  { props } = this.state;
             let enableStatementUpload = this.props.enableStatementUpload;
         return(<Modal open={this.props.openModal} onClose={this.props.onCloseModal} showCloseIcon={this.props.showCloseIcon}  center>
            <div className="div-modal">
               {this.props.IsSuccess && <img src={successIcon}/>}
               {!this.props.IsSuccess && <img src={failIcon}/>}
                <h3><br/><strong><span>{this.props.message}</span></strong>.<br/> </h3>

                {/* <div className="btn-opt"> */}

                        {( this.props.message!==undefined && this.props.message.indexOf("upload") ===-1) &&
                            <button 
                            onClick={this.props.SubmitAction} disabled={this.props.isProcessing} 
                            className="btn-alat">{ this.props.isProcessing ? "Processing..." : "Proceed"}</button>
                        }
                    
                   
                {/* </div> */}

                {( this.props.message!==undefined && this.props.message.indexOf("upload")>-1) &&
                        <div className="btn-opt">

                       
                            <button onClick={this.props.SubmitAction} disabled={this.props.enableStatementUpload.is_processing} className="border-btn">Decline</button>
                        
                    
                        <button 
                            onClick={this.goToUploadStatement} disabled={this.props.enableStatementUpload.is_processing} 
                    className="btn-alat">{this.props.enableStatementUpload.is_processing?"Please wait...":"Proceed"}</button>
                    </div>
                }
            </div>
        </Modal>);
     }
}

function mapStateToProps(state){
    return {
        enableStatementUpload: state.loanReducerPile.enableStatementUpload,
    }
}
export default connect(mapStateToProps)(ExtendModal);

