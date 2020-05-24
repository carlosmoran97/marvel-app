import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadComicCharacters } from '../../actions';
import { get } from 'lodash/object';

export default function ComicCharacters({id}) {
    const pagination = useSelector(state => state.pagination);
    const dispatch = useDispatch();
    const characterIds = get(pagination, `comicCharacters[${id}].ids`, []);
    const nextPageUrl = get(pagination, `comicCharacters[${id}].nextPageUrl`, null);
    const characters = useSelector(state => state.entities.characters);

    const handleLoadMore = () => {
        dispatch( loadComicCharacters(id, nextPageUrl !== null) );
    };

    return (
        <div className="comic__characters">
            <h2>Characters</h2>
            {characterIds.map(id => {
                const character = characters[id];
                return <div key={`character-${id}`}><Link to={`/characters/${id}`}>{character.name}</Link></div>
            })}
            { nextPageUrl !== null &&  <button onClick={handleLoadMore}>Load more</button>}
        </div>
    );
}
