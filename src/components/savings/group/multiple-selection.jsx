import React, {Component} from 'react';
import Select from 'react-select';

export default (props) => {
    const computeElements = () => {
        const count = 0;
        const container = prop.members.map((element, index) => {
                    return  <div className='col-sm-12'>
                                <label>Slot {count}</label>
                                <Select type="text" 
                                     key={index}
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






