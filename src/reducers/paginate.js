import union from 'lodash/union';

// define a page limit
const PAGE_LIMIT = 20;

// Creates a reducer managing pagination, given the action types to handle,
// and function telling how to extract the key from an action
const paginate = ({ types, mapActionToKey }) => {
    if(!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected types to be array of three elements.');
    }
    if(!types.every(t => typeof t === 'string')) {
        throw new Error('Expected types to be strings.');
    }
    if(typeof mapActionToKey !== 'function'){
        throw new Error('Expected mapActionToKey to be a function');
    }

    const [ requestType, successType, failureType ] = types;

    const updatePagination = (state = {
        isFetching: false,
        nextPageUrl: undefined,
        offset: 0,
        limit: PAGE_LIMIT,
        ids: []
    }, action) => {
        switch(action.type) {
            case requestType:
                return {
                    ...state,
                    isFetching: true
                };
            case successType:
                // Results is an array with the ids of the entities
                return {
                    ...state,
                    isFetching: false,
                    ids: union(state.ids, action.response.result),
                    nextPageUrl: action.response.nextPageUrl,
                    offset: state.offset + state.limit
                };
            case failureType:
                return {
                    ...state,
                    isFetching: false
                };
            default:
                return state;
        }
    };

    return (state={}, action) => {
        // Update pagination by key
        switch(action.type) {
            case requestType:
            case successType:
            case failureType:
                const key = mapActionToKey(action);
                if(typeof key !== 'string') {
                    throw new Error('Expected to be a string.');
                }
                return {
                    ...state,
                    [key]: updatePagination(state[key], action)
                };
            default:
                return state;
        }
    };
}

export default paginate;