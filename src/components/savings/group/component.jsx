import React from 'react';

export function description(props){
    return(<div>
               <div className="col-xs-6">
                   <p>{this.props.leftHeader}</p>
                   <p>{props.leftDescription}</p>
               </div>
               <div className="col-xs-6">
                   <p>{this.props.rightHeader}</p>
                   <p>{this.props.rightDiscription}</p>
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
                            <p>{props.leftName}</p>
                        </div>
                        <div className="col-xs-4 navMiddle">
                            <p>{props.middleName}</p>
                        </div>
                        <div className="col-xs-4 navRight">
                            <p>{props.rightName}</p>
                        </div>
                </div>);
    }
}
