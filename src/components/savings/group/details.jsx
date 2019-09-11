import React, {Component} from 'react';

export default (props) => {
    return(
        <div className='row moreDetails'>
            <div className='left col-xs-6'>
                <p>{props.lefthead}</p>
                <p>{props.leftBottom}</p>
            </div>
            <div className='middle col-xs-6'>
                <p>{props.middleTop}</p>
                <p>{props.middleBottom}</p>
            </div>
            <div className='right col-xs-6'>
                <p>{props.rightContent}</p>
                <p>{props.rightContentBottom}</p>
            </div>
        </div>
    )
}

