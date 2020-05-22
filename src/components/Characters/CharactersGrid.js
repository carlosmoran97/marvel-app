import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { get } from 'lodash/object';
import queryString from 'query-string';
import { loadCharacters } from './../../actions';

export default function CharactersGrid({ params }) {

    const pagination = useSelector(state => state.pagination);
    const dispatch = useDispatch();
    let paramsString = queryString.stringify(params, {
        arrayFormat: 'comma'
    });
    const charactersIds = get(pagination, `charactersSearch[${paramsString}].ids`, []);
    const nextPageUrl = get(pagination, `charactersSearch[${paramsString}].nextPageUrl`, null);
    const characters =  useSelector(state => state.entities.characters);
    
    const handleLoadMore = () => {
        dispatch( loadCharacters(params.nameStartsWith, params.comics, params.stories, nextPageUrl !== null ) );
    };
    
    return (
        <div>
            {charactersIds.map(id => {
                const character = characters[id];
                return (
                    <div key={id}>
                        <p>{character.name}</p>
                        <img
                            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                            alt={`${character.name} image`}
                            height={300}
                        />
                    </div>
                );
            })}
            { nextPageUrl !== null &&  <button onClick={handleLoadMore}>Load more</button>}
        </div>
    )
}
