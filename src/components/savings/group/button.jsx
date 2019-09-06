// buttons
import React, {Component} from 'react';

export default (props) => {
    switch(props.buttonType){
        case 'bigButton': 
            return <div className='col-xs-12 bigButton'>
                    <button onClick={props.buttonClicked} id={props.id}>{props.buttonName}</button>
                </div>
        case 'smallButton': 
            return <div className='col-xs-12 smallButton'>
                    <button>{props.buttonName}</button>
                </div>
    }
}



















