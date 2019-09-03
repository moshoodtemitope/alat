import React from 'react';

export default (props) => {
   function genComponent(props){
         const generatedValue = '';
         props.summary.map(element => {
            const fragment = <div className="coverForSummary">
                                 <div className="left">
                                   <p className='GoalText'>{element.firstTitle}</p>
                                   <p className='boldedText'>{element.firstTitleVlue}</p>
                                 </div>
                                 <div className="right">
                                   <p className='GoalText'>{element.secondTitle}</p>
                                   <p className='boldedText'>{element.secondTitleValue}</p>
                                 </div>
                             </div>

                   generatedValue = generatedValue + fragment;
         });

         return generatedValue;
   }

   return(<div>{genComponent(props)}</div>)
}
