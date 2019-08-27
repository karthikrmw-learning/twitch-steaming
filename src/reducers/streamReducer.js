import {
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM
} from '../actions/types';

import _ from 'lodash';

const streamReducer = (streams = {}, action) => {
     switch(action.type){
        case FETCH_STREAM:
        case CREATE_STREAM:
        case EDIT_STREAM:
            return { ...streams , [action.payload.id] : action.payload }
        case DELETE_STREAM:
            return _.omit(streams, action.payload);
        case FETCH_STREAMS:
            return {...streams , ..._.mapKeys(action.payload, 'id') };
        default:
            return streams;
     }
}

export default streamReducer;
