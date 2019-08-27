import { SIGN_IN , SIGN_OUT } from '../actions/types';

const AUTH_INITIAL_STATE = {
    isSignedIn : false,
    userId     : null
}

const authReducer = (state = AUTH_INITIAL_STATE, action) => {
    switch(action.type){
        case SIGN_IN:
            return { ...state ,  "isSignedIn" : true , "userId" : action.payload };
        case SIGN_OUT:
            return { ...state , "isSignedIn" : false , "userId" : null };
        default:
            return state;
    }
}

export default authReducer;
