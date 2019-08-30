import React, {Component} from 'react';
import Select from 'react-select';

export default (props) => {
    
    const computeElements = () => {
        const elem = '';
        const anArray = [];
        for(var i=0; i < props.numberOfPersonsInGroup.length; i++){
            anArray.push(0);
        }
        
        const count = 0;
        return anArray.map(() => {
             count++;
                    return  <div className='col-sm-12'>
                                <label>Slot {count}</label>
                                <Select type="text" 
                                     options={props.groupMembers}
                                     name={props.name}
                                     onChange={props.handleSelectChange}
                                     value={props.value}
                                />
                            </div>
                              
        });
    }

    return({computeElements})
}






