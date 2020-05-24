import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CharacterComics from '../Characters/CharacterComics';
import CharacterStories from '../Characters/CharacterStories';
import { loadCharacter, loadCharacterComics, loadCharacterStories, toggleCharacter } from '../../actions';

export default function CharacterDetailPage(props) {
    const id = props.match.params.id;
    let character = useSelector(state => state.entities.characters[id]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch( loadCharacter(id) );
        dispatch( loadCharacterComics(id) );
        dispatch( loadCharacterStories(id) );
    }, [id]);

    const isFavorite = useSelector(state => state.favorites.characters.includes(parseInt(id)));
    const toggleFavorite = () => {
        dispatch(toggleCharacter(parseInt(id)));
    };

    return (
        <div>
            {character && (<div>
                <h1>{character.name}</h1>
                <button onClick={toggleFavorite}>{isFavorite ? "Remove" : "Add"}</button>
                <img
                    src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                    alt={`${character.name} image.`}
                    height={300}
                />
                <p>{character.description}</p>
                <div className="character__relatedEntities">
                    <CharacterComics id={character.id} />
                    <CharacterStories id={character.id} />
                </div>
            </div>)}
        </div>
    )
}
