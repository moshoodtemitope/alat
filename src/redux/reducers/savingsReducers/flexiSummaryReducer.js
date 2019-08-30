// reducer
import React, {Component} from 'react';
import flexiSummaryAction from '../../actions/savings/goal/flexi-summary-action';

export default (state={}, action) => {
    switch(action.type){
       case 'flexiSummaryReducer':
             return Object.assign({}, state, {
                    flexiSummaryReducer: {
                        summary: null
                    }
             });
       default:
             return state;
    }
}
