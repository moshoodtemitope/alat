//flexiGoal flexigoalCreation
import React, {Component} from 'react';
import axios from 'axios';

export default (param) => {
  console.log(param.payload);
  switch(param.type){
    case 'flexiGoalCreation':
        console.log('flexiGoalCreation  ==== from action call')
        return {
           type: 'flexiGoalCreation',
           payload: param.payload
        }
  }
}
