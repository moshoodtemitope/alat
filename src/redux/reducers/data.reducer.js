import * as actionTypes from "../constants/dataConstants/data.constant";

import {updateObject} from '../actions/dataActions/data.actions';

const mock = [
    {
        Amount: 499,
        BeneficiaryId: 382264,
        BillerAlias: "Not data",
        BillerName: "OtherBills",
        BillerPaymentCode: "0427757",
        CustomerId: 0,
        DataNetwork: "Airtel Data Plan",
        IsAirtime: true,
        NetworkCode: 3,
        PaymentItem: "Data ERC - N500(750MB valid for 14 days)",
        PhoneNumber: "08163152616",
    },
    {
        Amount: 1000,
        BeneficiaryId: 382264,
        BillerAlias: "Na data data",
        BillerName: "OtherBills",
        BillerPaymentCode: "0427757",
        CustomerId: 0,
        DataNetwork: "Airtel Data Plan",
        IsAirtime: false,
        NetworkCode: 2,
        PaymentItem: "Data ERC - N500(750MB valid for 14 days)",
        PhoneNumber: "08163152000",
    },
    {
        Amount: 800,
        BeneficiaryId: 382264,
        BillerAlias: "Na 2nd data data",
        BillerName: "OtherBills",
        BillerPaymentCode: "0427757",
        CustomerId: 0,
        DataNetwork: "Airtel Data Plan",
        IsAirtime: false,
        NetworkCode: 3,
        PaymentItem: "Data ERC - N500(750MB valid for 14 days)",
        PhoneNumber: "08163152616",
    },
    {
        Amount: 8000,
        BeneficiaryId: 382264,
        BillerAlias: "Na 8thnd data data",
        BillerName: "OtherBills",
        BillerPaymentCode: "0427757",
        CustomerId: 0,
        DataNetwork: "Airtel Data Plan",
        IsAirtime: false,
        NetworkCode: 3,
        PaymentItem: "Data ERC - N500(750MB valid for 14 days)",
        PhoneNumber: "08163152616",
    },
    {
        Amount: 5000,
        BeneficiaryId: 382264,
        BillerAlias: "Nobi data",
        BillerName: "OtherBills",
        BillerPaymentCode: "0427757",
        CustomerId: 0,
        DataNetwork: "Airtel Data Plan",
        IsAirtime: true,
        NetworkCode: 3,
        PaymentItem: "Data ERC - N500(750MB valid for 14 days)",
        PhoneNumber: "08163152616",
    }
];

const initialState = {
    beneficiaries : [],
    dataPlans : [],
    isFetching: false,

}; 

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SWITCH_CURRENT_COMPONENT:
            return updateObject(state, {currentComponent: action.name});
        case actionTypes.FETCH_DATA_BENEFICIARIES_SUCCESS:
            // return updateObject(state, {beneficiaries: action.data, isFetching : false});
            return updateObject(state, {beneficiaries: mock, isFetching : false});
        case actionTypes.IS_FETCHING_TRUE:
           return updateObject(state, {isFetching: true});
        case actionTypes.IS_FETCHING_FALSE:
            return updateObject(state, {isFetching: false});
        case actionTypes.FETCH_DATA_PLAN_SUCCESS:
            return updateObject(state, {
                dataPlans : action.data,
            });
        default: return state;
    }
}

export default reducer;