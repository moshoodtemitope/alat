// reducer
import React, {Component} from 'react';
import flexiGoalCreationSaving from '../../actions/savings/goal/flexiGoalCreationSaving';

export default (state={}, action) => {
    switch(action.type){
       case 'flexiGoalCreationSaving':
             return Object.assign({}, state, {
                    flexiGoalCreationSaving: {
                        monthlySavings: null,
                        accountToUse: action.payload.selectedAccount,
                        frequency: action.payload.frequency
                    }
             });
       default:
             return state;
    }
}
