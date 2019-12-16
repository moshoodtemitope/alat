import React from 'react';

export function Description(props){
    return(<div className='sumComponent'>
               <div className="left">
                   <p>{props.leftHeader}</p>
                   <p>{props.leftDescription}</p>
               </div>
               <div className="right">
                   <p>{props.rightHeader}</p>
                   <p>{props.rightDiscription}</p>
               </div>
           </div>)
}

export function NavButtons(props){
    switch(props.navType){
        case 1: 
           return(
               <p className='singleNav'>{props.value}</p>
           )
        case 2: 
           return(<div className='row butNav'>
                        <div className="col-xs-6 navLeft">
                            <p>{props.leftName}</p>
                        </div>
                        <div className="col-xs-6 navRight">
                            <p>{props.rightName}</p>
                        </div>
                   </div>);
        case 3:
            return(<div className='row butNav'>
                        <div className="col-xs-4 navLeft">
                            <p id={props.edit} onClick={props.EditGroup}>{props.leftName}</p>
                        </div>
                        <div className="col-xs-4 navMiddle">
                            <p id={props.pause} onClick={props.PauseGroup}>{props.middleName}</p>
                        </div>
                        <div className="col-xs-4 navRight">
                            <p id={props.delete} onClick={props.DeleteGroup}>{props.rightName}</p>
                        </div>
                </div>);
        default:

        
    }
}







