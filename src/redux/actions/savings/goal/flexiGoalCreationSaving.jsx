//flexiGoal flexigoalCreation
import React, {Component} from 'react';
import axios from 'axios';

export default (param) => {
  switch(param.type){
    case 'flexiGoalCreationSaving':
        console.log('flexiGoalCreationSaving  ==== from action call')
        return {
           type: 'flexiGoalCreationSaving',
           payload: param.payload
        }
  }
}
