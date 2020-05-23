import * as ActionTypes from '../actions';
import merge from 'lodash/merge';
import paginate from './paginate';
import { combineReducers } from 'redux';

// Updates an entity cache in response to any action with response.entities
const entities = (state = { characters: {}, comics: {}, stories: {} }, action) => {
    if(action.response && action.response.entities) {
        return merge({}, state, action.response.entities);
    }

    return state;
};

// Updates error message to notify abbout the failed fetches
const errorMessage = (state = null, action) => {
    const { type, error } = action;
    if(type === ActionTypes.RESET_ERROR_MESSAGE) {
        return null;
    } else if(error) {
        return error;
    }

    return state;
};

const pagination = combineReducers({
    charactersSearch: paginate({
        mapActionToKey: action => action.query,
        types: [
            ActionTypes.CHARACTERS_REQUEST,
            ActionTypes.CHARACTERS_SUCCESS,
            ActionTypes.CHARACTERS_FAILURE
        ],
    }),
    comicsSearch: paginate({
        mapActionToKey: action => action.query,
        types: [
            ActionTypes.COMICS_REQUEST,
            ActionTypes.COMICS_SUCCESS,
            ActionTypes.COMICS_FAILURE
        ],
    }),
    characterComics: paginate({
        mapActionToKey: action => action.query,
        types: [
            ActionTypes.CHARACTER_COMICS_REQUEST,
            ActionTypes.CHARACTER_COMICS_SUCCESS,
            ActionTypes.CHARACTER_COMICS_FAILURE
        ],
    }),
});

const rootReducer = combineReducers({
    entities,
    pagination,
    errorMessage,
});

export default rootReducer;