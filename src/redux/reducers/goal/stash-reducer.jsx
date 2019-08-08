import React from 'react';

export default (state = {}, action) => {
    switch(action.type){
        case 'stash':
           console.log(action.payload);
           return Object.assign({}, state, {
               stashData: {
                  amount: action.payload.amount
               }
           });  
        case 'saveStash':
           return Object.assign({}, state, {
               stash: {
                   responseData: action.payload.then(response => {
                       console.log(response)
                   })
               }
           });
        default: 
           return state;
    }
}
















