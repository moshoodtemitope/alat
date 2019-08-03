import React from 'react';

export default (props) => {
    switch(props.userType){
        case 'admin':
           return   <div className="row listedItems" id={props.id}>
                        <div className='left'>
                            <p>{props.name}</p>
                            <p>{props.position}</p>
                        </div>
                            
                        <div className='right'>
                            <p>{props.amount}</p>
                            <p>{props.intent}</p>
                        </div>
                    </div>
        case 'members':
           return   <div className="row listedItemMembers">
                        <div className='left'>
                            <p>{props.fullname}</p>
                        </div>
                            
                        <div className='right'>
                            <p>{props.amount}</p>
                            <p>{props.intent}</p>
                        </div>
                    </div>
    }
}








