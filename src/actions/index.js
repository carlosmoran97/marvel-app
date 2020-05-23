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
        nextPageUrl = `characters?apikey=${process.env.MARVEL_PUBLIC_KEY}${query !== '' ? `&${query}` : ''}`,
        offset = 0
    } = getState().pagination.charactersSearch[query] || {};
    if(offset > 0 && !nextPage) {
        return null;
    }

    return dispatch(fetchCharacters(query, nextPageUrl));
};

export const CHARACTER_DETAIL_REQUEST = 'CHARACTER_DETAIL_REQUEST';
export const CHARACTER_DETAIL_SUCCESS = 'CHARACTER_DETAIL_SUCCESS';
export const CHARACTER_DETAIL_FAILURE = 'CHARACTER_DETAIL_FAILURE';
// Fetches a single character from Marvel API
// Relies on the custom API middleware defined in ../middleware/api.js
const fetchCharacter = id => ({
    [CALL_API]: {
        types: [ CHARACTER_DETAIL_REQUEST, CHARACTER_DETAIL_SUCCESS, CHARACTER_DETAIL_FAILURE ],
        endpoint: `characters/${id}?apikey=${process.env.MARVEL_PUBLIC_KEY}`,
        schema: Schemas.CHARACTER_ARRAY // An array of one character
    }
});

// Fetches a single character from Marvel API unless it is cached.
// Relies on Redux Thunk middleware.
export const loadCharacter = id => (dispatch, getState) => {
    const character = getState().entities.characters[id];
    if(character) {
        return null;
    }

    return dispatch(fetchCharacter(id));
};

export const CHARACTER_COMICS_REQUEST = 'CHARACTER_COMICS_REQUEST';
export const CHARACTER_COMICS_SUCCESS = 'CHARACTER_COMICS_SUCCESS';
export const CHARACTER_COMICS_FAILURE = 'CHARACTER_COMICS_FAILURE';

// Fetches a page of character's comics
// Relies on the custom API middleware defined in ../midleware/api.js
const fetchCharacterComics = (query, nextPageUrl) => ({
    query,
    [CALL_API]: {
        types: [ CHARACTER_COMICS_REQUEST, CHARACTER_COMICS_SUCCESS, CHARACTER_DETAIL_FAILURE ],
        endpoint: nextPageUrl,
        schema: Schemas.COMIC_ARRAY,
    }
});

export const loadCharacterComics = (id, nextPage) => (dispatch, getState) => {
    const {
        nextPageUrl = `characters/${id}/comics?apikey=${process.env.MARVEL_PUBLIC_KEY}&orderBy=issueNumber`,
        offset = 0
    } = getState().pagination.characterComics[id.toString()] || {};

    if(offset > 0 && !nextPage) {
        return null;
    }

    return dispatch(fetchCharacterComics(id.toString(), nextPageUrl));
};
export const CHARACTER_STORIES_REQUEST = 'CHARACTER_STORIES_REQUEST';
export const CHARACTER_STORIES_SUCCESS = 'CHARACTER_STORIES_SUCCESS';
export const CHARACTER_STORIES_FAILURE = 'CHARACTER_STORIES_FAILURE';

// Fetches a page of character's stories
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
        nextPageUrl = `comics?apikey=${process.env.MARVEL_PUBLIC_KEY}&orderBy=issueNumber${query !== '' ? `&${query}` : ''}`,
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
