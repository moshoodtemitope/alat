import React, { Fragment} from 'react';
import Modal from 'react-responsive-modal';
import successIcon from '../../assets/img/success_action.svg';
import failIcon from '../../assets/img/failed_action.svg';

class ExtendModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    

     render(){
             const  { props } = this.state;
         return(<Modal open={this.props.openModal} onClose={this.props.onCloseModal} showCloseIcon={this.props.showCloseIcon}  center>
            <div className="div-modal">
               {this.props.IsSuccess && <img src={successIcon}/>}
               {!this.props.IsSuccess && <img src={failIcon}/>}
                <h3><br/><strong><span>{this.props.message}</span></strong>.<br/> </h3>

            {/* <div className="btn-opt"> */}
                {/* <button onClick={this.onCloseModal} className="border-btn">Back</button> */}
                <button 
                onClick={this.props.SubmitAction} disabled={this.props.isProcessing} 
                 className="btn-alat">{ this.props.isProcessing ? "Processing..." : "Proceed"}</button>
            {/* </div> */}
            </div>
        </Modal>);
     }
}

export default ExtendModal;

