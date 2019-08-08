import React, {Component} from 'react';
import Select from 'react-select';

export default (props) => {
    const computeElements = () => {
        const count = 0;
        const container = prop.members.map(() => {
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

        return container;
    }
    
    console.log('code got to this point')
    return {computeElements};
}






