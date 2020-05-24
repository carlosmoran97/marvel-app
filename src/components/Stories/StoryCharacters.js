import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadStoryCharacters } from '../../actions';
import { get } from 'lodash/object';

export default function StoryCharacters({id}) {
    const pagination = useSelector(state => state.pagination);
    const dispatch = useDispatch();
    const characterIds = get(pagination, `storyCharacters[${id}].ids`, []);
    const nextPageUrl = get(pagination, `storyComics[${id}].nextPageUrl`, null);
    const characters = useSelector(state => state.entities.characters);

    const handleLoadMore = () => {
        dispatch( loadStoryCharacters(id, nextPageUrl !== null) );
    };

    return (
        <div clasName="story__characters">
            <h2>Characters</h2>
            {characterIds.map(id => {
                const character = characters[id];
                return <div key={`character-${id}`}>
                    <Link to={`/characters/${id}`}>
                        {character.name}
                    </Link>
                </div>;
            })}
            { nextPageUrl !== null &&  <button onClick={handleLoadMore}>Load more</button>}
        </div>
    )
}
