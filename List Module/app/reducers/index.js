import { combineReducers } from 'redux';

import { QUOTES_AVAILABLE, ADD_QUOTE, UPDATE_QUOTE, DELETE_QUOTE, FETCH_REQUEST, FETCH_SUCCESS, FETCH_REQUEST_DESCRIPTION,FETCH_SUCCESS_DESCRIPTION } from "../actions/" //Import the actions types constant we defined in our actions

let dataState = { posts: [], loading: true, post:'',loading1:true };

const dataReducer = (state = dataState, action) => {
    switch (action.type) {
       
        case FETCH_REQUEST:
            //debugger
            return state;
        case FETCH_SUCCESS:
            //debugger
            return { ...state, posts: action.payload.posts,loading: false };
        case FETCH_REQUEST_DESCRIPTION:
            debugger
            return state;
        case FETCH_SUCCESS_DESCRIPTION:
            debugger
            return { ...state, post: action.payload.post, loading1: false  };
        default:
            //debugger
            return state;
        }
    };

// Combine all the reducers
const rootReducer = combineReducers({
    dataReducer
})

export default rootReducer;
