//flexiGoal flexigoalCreation
import React, {Component} from 'react';
import axios from 'axios';

export default (param) => {
  switch(param.type){
    case 'flexiGoalSuccess':
        console.log('flexiGoalSuccess  ==== flexiGoalSuccess')
        return {
           type: 'flexiGoalSuccess',
           payload: "flexiGoalSuccess"
        }
  }
}
