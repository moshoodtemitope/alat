//flexiGoal flexigoalCreation
import React, {Component} from 'react';
import axios from 'axios';

export default (param) => {
  switch(param.type){
    case 'flexiSummaryReducer':
        console.log('flexiSummaryReducer  ==== from action call')
        return {
           type: 'flexiSummaryReducer',
           payload: "from flexiSummaryReducer"
        }
  }
}
