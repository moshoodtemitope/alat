import React from 'react';
import {Progress} from 'reactstrap';

// How to Use this Component!

/* for props thats thats not applicable to
 what you are doing, just pass an empty string to it
 from where you need this component
*/

export default (props) => {
           return(<div className='forProgressBar'>
                     <div className='topDiscription row'>
                         <div className='left col-xs-6'>
                             <p><span>{props.discTopSpan}</span></p>
                         </div>
                         <div className='right col-xs-6'>
                             <p>{props.discTopRight}</p>
                         </div>
                     </div>
                     <Progress color="success" value={props.percentage}></Progress>
                     <div className='bottomDiscription topDiscription row'>
                         <div className='left'>
                             <p class="perc">{props.discBottom}<span className="shiftLeft">{props.discSpan}</span></p>
                             <p className="butProgBar">{props.discBottomSib}</p>
                         </div>
                         <div className='right'>
                             <p><span>{props.discBottomRight}</span></p>
                             <p>{props.discBottomSibRight}</p>
                         </div>
                     </div>
                 </div>);
}