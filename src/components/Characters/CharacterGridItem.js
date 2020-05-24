import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleCharacter } from '../../actions';

export default function CharacterGridItem({ character }) {
    const isFavorite = useSelector(state => state.favorites.characters.includes(character.id));
    const dispatch = useDispatch();
    const toggleFavorite = () => {
        dispatch(toggleCharacter(character.id));
    };
    return (
        <div>
            <p>{character.name}</p>
            <button onClick={toggleFavorite}>{isFavorite ? "Remove" : "Add"}</button>
            <Link to={`/characters/${character.id}`}>
                <img
                    src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                    alt={`${character.name} image`}
                    height={300}
                />
            </Link>
        </div>
    );
}
