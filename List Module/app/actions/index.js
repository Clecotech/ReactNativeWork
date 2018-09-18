
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_REQUEST = 'FETCH_REQUEST';
export const FETCH_ERROR = 'FETCH_ERROR';

export const FETCH_SUCCESS_DESCRIPTION = 'FETCH_SUCCESS_DESCRIPTION';
export const FETCH_REQUEST_DESCRIPTION = 'FETCH_REQUEST_DESCRIPTION';
export const FETCH_ERROR_DESCRIPTION = 'FETCH_ERROR_DESCRIPTION';

import { AsyncStorage } from "react-native";
const FETCH_LIST_URL = "http://192.168.0.14:3000/posts.json";
const FETCH_DESCRIPTION_URL = "http://192.168.0.14:3000/posts/";

export function ImageLoading_Error() {
    this.setState({ imageLoading: false });
    // Write Your Code Here Which You Want To Execute If Image Not Found On Server.
}
/* Get posts list */
export function fetchPostsWithRedux() {
    return (dispatch) => {
        //debugger
        dispatch(fetchPostsRequest());
        return fetchPosts().then(([response, json]) => {
            if (response.status === 200) {
                //debugger
                dispatch(fetchPostsSuccess(json))
            }
            else {
                //debugger
                dispatch(fetchPostsError())
            }
        })
    }
}

function fetchPosts() {
    //debugger
    const URL = FETCH_LIST_URL;
    return fetch(URL, { method: 'GET' })
        .then(response => Promise.all([response, response.json()]));
}
function fetchPostsRequest() {
    return {
        type: FETCH_REQUEST
    }
}

function fetchPostsSuccess(payload) {
    return {
        type: FETCH_SUCCESS,
        payload
    }
}

function fetchPostsError() {
    return {
        type: FETCH_ERROR
    }
}

export function fetchPostsDescriptionWithRedux(id) {
    return (dispatch) => {
        debugger
        dispatch(fetchPostsDescriptionRequest(id));
        return fetchPostsDescription(id).then(([response, json]) => {
            if (response.status === 200) {
                debugger
                dispatch(fetchPostsDescriptionSuccess(json))
            }
            else {
                debugger
                dispatch(fetchPostsDescriptionError())
            }
        })
    }
}

function fetchPostsDescription(id) {
    debugger
    const URL = FETCH_DESCRIPTION_URL+id+".json";
    return fetch(URL, { method: 'GET' })
        .then(response => Promise.all([response, response.json()]));
}
function fetchPostsDescriptionRequest() {
    debugger
    return {
        type: FETCH_REQUEST_DESCRIPTION
    }
}

function fetchPostsDescriptionSuccess(payload) {
    debugger
    return {
        type: FETCH_SUCCESS_DESCRIPTION,
        payload
    }
}

function fetchPostsDescriptionError() {
    debugger
    return {
        type: FETCH_ERROR_DESCRIPTION
    }
}
