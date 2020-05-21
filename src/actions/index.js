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

// Fetchas a page of characters given a particular search parameters
// Baiks out if page is cached and user didn't specifically request next page.
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

    console.log(nextPageUrl);

    return dispatch(fetchCharacters(query, nextPageUrl));
};

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

// Resets the currently visible error message.
export const resetErrorMessage = () => ({
    type: RESET_ERROR_MESSAGE
})
