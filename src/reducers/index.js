import * as ActionTypes from '../actions';
import merge from 'lodash/merge';
import paginate from './paginate';
import { combineReducers } from 'redux';

// Updates an entity cache in response to any action with response.entities
const entities = (state = { characters: {}, comics: {}, stories: {} }, action) => {
    if (action.response && action.response.entities) {
        return merge({}, state, action.response.entities);
    }

    return state;
};

// Toggle items from favorites list

const favorites = (state = { characters: [], comics: [], stories: [] }, action) => {
    switch (action.type) {
        case 'TOGGLE_CHARACTER':
            if (state.characters.includes(action.character)) {
                return {
                    ...state,
                    characters: state.characters.filter(character => character != action.character)
                };
            } else {
                return {
                    ...state,
                    characters: [...state.characters, action.character]
                };
            }
        case 'TOGGLE_COMIC':
            if (state.comics.includes(action.comic)) {
                return {
                    ...state,
                    comics: state.comics.filter(comic => comic != action.comic)
                };
            } else {
                return {
                    ...state,
                    comics: [...state.comics, action.comic]
                };
            }
        case 'TOGGLE_STORY':
            if (state.stories.includes(action.story)) {
                return {
                    ...state,
                    stories: state.stories.filter(story => story != action.story)
                };
            } else {
                return {
                    ...state,
                    stories: [...state.stories, action.story]
                };
            }
        default:
            return state;
    }
};

// Updates error message to notify abbout the failed fetches
const errorMessage = (state = null, action) => {
    const { type, error } = action;
    if (type === ActionTypes.RESET_ERROR_MESSAGE) {
        return null;
    } else if (error) {
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
    characterStories: paginate({
        mapActionToKey: action => action.query,
        types: [
            ActionTypes.CHARACTER_STORIES_REQUEST,
            ActionTypes.CHARACTER_STORIES_SUCCESS,
            ActionTypes.CHARACTER_STORIES_FAILURE
        ],
    }),
    comicCharacters: paginate({
        mapActionToKey: action => action.query,
        types: [
            ActionTypes.COMIC_CHARACTERS_REQUEST,
            ActionTypes.COMIC_CHARACTERS_SUCCESS,
            ActionTypes.COMIC_CHARACTERS_FAILURE,
        ],
    }),
    comicStories: paginate({
        mapActionToKey: action => action.query,
        types: [
            ActionTypes.COMIC_STORIES_REQUEST,
            ActionTypes.COMIC_STORIES_SUCCESS,
            ActionTypes.COMIC_STORIES_FAILURE
        ]
    }),
    storyCharacters: paginate({
        mapActionToKey: action => action.query,
        types: [
            ActionTypes.STORY_CHARACTERS_REQUEST,
            ActionTypes.STORY_CHARACTER_SUCCESS,
            ActionTypes.STORY_CHARACTER_FAILURE
        ],
    }),
    storyComics: paginate({
        mapActionToKey: action => action.query,
        types: [
            ActionTypes.STORY_COMICS_REQUEST,
            ActionTypes.STORY_COMICS_SUCCESS,
            ActionTypes.STORY_COMICS_FAILURE
        ],
    }),
});

const rootReducer = combineReducers({
    entities,
    pagination,
    favorites,
    errorMessage,
});

export default rootReducer;