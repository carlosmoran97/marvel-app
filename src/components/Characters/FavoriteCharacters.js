import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCharacter } from '../../actions';
import { Link } from 'react-router-dom';

export default function FavoriteCharacters() {
    const ids = useSelector(state => state.favorites.characters);
    const characters = useSelector(state => state.entities.characters);
    const dispatch = useDispatch();
    const toggleFavorite = (id) => {
        dispatch( toggleCharacter(id) );
    };

    return (
        <div>
            {ids.map(id => {
                const character = characters[id];
                return (
                    <div key={`character-${id}`}>
                        <Link to={`/characters/${id}`}>{character.name}</Link>
                        <button onClick={()=>{toggleFavorite(id)}}>Remove</button>
                    </div>
                );
            })}
        </div>
    );
}
