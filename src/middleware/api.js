import { normalize, schema } from 'normalizr';
import axios from 'axios';
import queryString from 'query-string';

// Extracts the next page URL from Marvel API response
const getNextPageUrl = response => {
    const { count, limit, offset, total } = response.data.data;
    if( offset + count < total ) {
        const config = {
            arrayFormat: 'comma'
        };
        const { url } = response.config;
        let { url: baseUrl, query } = queryString.parseUrl(url, config);
        query.offset = offset + limit;
        const queryStr = queryString.stringify(query, config);
        return `${baseUrl}?${queryStr}`;
    }
    
    return null;
};

const API_ROOT = process.env.MARVEL_API_URL;

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape.
export const callApi = (endpoint, schema) => {
    const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;
    return axios.get(fullUrl).then(response => {
        const nextPageUrl = getNextPageUrl(response);
        return Object.assign({},
            normalize(response.data.data.results, schema),
            { nextPageUrl }
        );
    });
};

const characterSchema = new schema.Entity('characters', {}, {
    idAttribute: character => character.id
});

const comicSchema = new schema.Entity('comics', {}, {
    idAttribute: comic => comic.id
});

const storySchema = new schema.Entity('stories', {}, {
    idAttribute: story => story.id
});

// Schemas for Marvel API responses.
export const Schemas = {
    CHARACTER: characterSchema,
    CHARACTER_ARRAY: [characterSchema],
    COMIC: comicSchema,
    COMIC_ARRAY: [comicSchema],
    STORY: storySchema,
    STORY_SCHEMA: [storySchema],
};

// Action key that carries API call info interpreted by this Redux middleware
export const CALL_API = 'Call API';

// A Redux middleware that interpretets actions with CALL_API info specified
// Performs the call and promises when such actions are dispatched.
export default store => next => action =>{
    const callAPI = action[CALL_API];
    if(typeof callAPI === 'undefined') {
        return next(action);
    }

    let { endpoint } = callAPI;
    const { schema, types } = callAPI;

    if(typeof endpoint === 'function') {
        endpoint = endpoint(store.getState());
    }

    if(typeof endpoint !== 'string') {
        throw new Error('Specify a string endpoint URL.');
    }

    if(!schema) {
        throw new Error('Specify one of the exported Schemas.');
    }
    if(!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected an array of three action types.');
    }
    if (!types.every(type => typeof type === 'string')) {
        throw new Error('Expected action types to be strings.')
    }

    const actionWith = data => {
        const finalAction = Object.assign({}, action, data);
        delete finalAction[CALL_API];
        return finalAction;
    };

    const [ requestType, successType, failureType ] = types;
    next(actionWith({type: requestType}));

    return callApi(endpoint, schema).then(
        response => {
            return next(actionWith({
                response,
                type: successType
            }));
        },
        error => next(actionWith({
            type: failureType,
            error: error.message || 'Something bad happened'
        }))
    );
};
