import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { get } from 'lodash/object';
import queryString from 'query-string';
import { loadCharacters } from './../../actions';
import CharacterGridItem from './CharacterGridItem';

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
                    <CharacterGridItem key={id} character={character}/>
                );
            })}
            { nextPageUrl !== null &&  <button onClick={handleLoadMore}>Load more</button>}
        </div>
    )
}
