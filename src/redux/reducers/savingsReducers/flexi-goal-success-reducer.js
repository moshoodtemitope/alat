// reducer
import React, {Component} from 'react';
import flexiGoalSuccessAction from '../../actions/savings/goal/flexi-goal-success';

export default (state={}, action) => {
    switch(action.type){
       case 'flexiGoalSuccess':
             return Object.assign({}, state, {
                    flexiGoalSuccess: {
                        flexiSuccess: null
                    }
             });
       default:
             return state;
    }
}
