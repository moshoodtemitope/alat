// reducer
import React, {Component} from 'react';
import flexiGoalCreation from '../../actions/savings/goal/flexiGoalCreation';

export default (state={}, action) => {
    switch(action.type){
       case 'flexiGoalCreation':
             return Object.assign({}, state, {
                    flexiGoalData: { goalName: action.payload.goalName,
                                     amountToSave: action.payload.amountToSave,
                                     frequency: action.payload.freq,
                                     startDate: action.payload.startDate,
                                     endDate: action.payload.endDate,
                                     averageAmount: action.payload.averageAmount
                    }
             });
       default:
             return state;
    }
}
