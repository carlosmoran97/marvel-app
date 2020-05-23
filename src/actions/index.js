import { CALL_API, Schemas } from '../middleware/api';
import queryString from 'query-string';

export const CHARACTERS_REQUEST = 'CHARACTERS_REQUEST';
export const CHARACTERS_SUCCESS = 'CHARACTERS_SUCCESS';
export const CHARACTERS_FAILURE = 'CHARACTERS_FAILURE';
// Fetches a page of characters
// Relies on the custom API middleware defined in ../middleware/api.js
const fetchCharacters = (query, nextPageUrl) => ({
    query,
    [CALL_API]: {
        types: [CHARACTERS_REQUEST, CHARACTERS_SUCCESS, CHARACTERS_FAILURE],
        endpoint: nextPageUrl,
        schema: Schemas.CHARACTER_ARRAY,
    }
});

// Fetches a page of characters given a particular search parameters
// Bails out if page is cached and user didn't specifically request next page.
// Relies on Redux Thunk middleware
export const loadCharacters = (name, comics, stories, nextPage) => (dispatch, getState) => {

    const query = queryString.stringify({
        nameStartsWith: name,
        comics,
        stories
    }, {
        arrayFormat: 'comma'
    });

    const {
        nextPageUrl = `characters?apikey=${process.env.MARVEL_PUBLIC_KEY}&${query}`,
        offset = 0
    } = getState().pagination.charactersSearch[query] || {};
    if(offset > 0 && !nextPage) {
        return null;
    }

    return dispatch(fetchCharacters(query, nextPageUrl));
};

export const CHARACTER_DETAIL_REQUEST = 'CHARACTER_DETAIL_REQUEST';

// Comics search
export const COMICS_REQUEST = 'COMICS_REQUEST';
export const COMICS_SUCCESS = 'COMICS_SUCCESS';
export const COMICS_FAILURE = 'COMICS_FAILURE';
// Fetches a page of comics
// Relies on the custom API middleware defined in ../middleware/api.js
const fetchComics = (query, nextPageUrl) => ({
    query,
    [CALL_API]: {
        types: [COMICS_REQUEST, COMICS_SUCCESS, COMICS_FAILURE],
        endpoint: nextPageUrl,
        schema: Schemas.COMIC_ARRAY
    }
});

// Fetches a page of comics given a particular search parameters
// Bails out if page is cached and user didin't specifically request next page.
// Relies on Redux Thunk middleware
export const loadComics = (titleStartsWith, format, issueNumber, nextPage) => (dispatch, getState) =>{
    const query = queryString.stringify({
        titleStartsWith,
        format,
        issueNumber
    }, {
        arrayFormat: 'comma',
        skipEmptyString: true
    });

    const {
        nextPageUrl = `comics?apikey=${process.env.MARVEL_PUBLIC_KEY}&${query}`,
        offset=0
    } = getState().pagination.comicsSearch[query] || {};

    if(offset > 0 && !nextPage) {
        return null;
    }

    return dispatch(fetchComics(query, nextPageUrl));
};

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

// Resets the currently visible error message.
export const resetErrorMessage = () => ({
    type: RESET_ERROR_MESSAGE
})
