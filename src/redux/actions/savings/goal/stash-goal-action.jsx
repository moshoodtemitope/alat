import {routes} from "../../../../services/urls";
import {ApiService} from "../../../../services/apiService";
import {SystemConstant} from "../../../../shared/constants";

const axios = require('axios');

export function stashCash(param) {
    console.log(param.payload)
    switch(param.type){
        case 'saveStash':
            const req = ApiService.request(routes.ADDSTACHGOAL, 'POST', param.payload, SystemConstant.HEADER, false)
            return {
                type: 'saveStash',
                payload: req
            } 
        case 'stash':
            return {
                type: 'stash',
                payload: param.payload
            }
    }
}




