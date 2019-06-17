
import React from "react";
import Modal from 'react-responsive-modal';

class ConfirmModal extends React.Component{
constructor(props){
    super(props);
    this.state = {

    };
}

    render(){
        //const { openModal, onCloseModal, onClose={props.onCloseModal} submitData, submitted, confirmationText } = this.state;
        let props = this.props;
        return(
            <Modal open={props.openModal}  center>
                    <div className="div-modal">
                        <img src={props.phoneimage}/>

                        <h3>You Want to Delete<br/><strong><span></span></strong>.<br/> Will You like want to proceed?</h3>

                    <div className="btn-opt">
                        {/* <button onClick={props.onCloseModal} className="border-btn">Back</button>
                        <button onClick={props.submitData} disabled={submitted}
                         className="btn-alat">{ props.submitted ? "Processing..." : "Proceed"}</button> */}
                    </div>
                    </div>
                </Modal>
        );
    }

} 

export default ConfirmModal