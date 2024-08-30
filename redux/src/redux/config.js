import { configureStore } from '@reduxjs/toolkit'

const counterLogic = (state=0,action)=>{
        switch(action.type){
            case "add":
                return state+1;
            case "sub":
                return state-1;
            default:
                return state; 
        }
}

const storeMyDetailsReducer=(state = {},action)=>{
    switch(action.type){
        case "saveDetails":
            console.log(state.data);
            return action.data;
        break;
    }
    return state;
}

export const myStore = configureStore({
    reducer:{
        "counter": counterLogic,
        "myDetails":storeMyDetailsReducer
    }
})

