import React from 'react';
import {NavLink, Route, Redirect} from "react-router-dom";
import { prop } from 'cramda';

export default (props) => {
    switch(props.type){
        case 3: 
            return(
                
                     <div className='subNav row'>
                            <div className='col-sm-4 left' id={props.left}>
                                <p onClick={props.groupsummarywasclicked}>{props.rightname}</p>
                            </div>
                           
                            <div className='col-sm-4 middle' id={props.middle}>
                                <p onClick={props.memberClicked}>{props.middlename}</p>
                            </div>
                        
                            <div className='col-sm-4 right' id={props.right}>
                                <p onClick={props.automatedwasclicked}>{props.leftName}</p>
                            </div>
                           
                     </div>
                
            );
        case 2:
            return(
                
                      <div className='innerNav row'>
                            <div className='col-sm-6 left'>
                                <p onClick={props.groupSummaryWasClicked}>{props.rightname}</p>
                            </div>
                            <div className='col-sm-6 right'>
                                <p onClick={props.memberClicked}>{props.leftName}</p>
                            </div>
                      </div>
               
            );
    }
   
}

// /savings/group/group-analytics2
// /savings/group/automate-contributions