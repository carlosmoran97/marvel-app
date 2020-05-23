import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CharacterComics from '../Characters/CharacterComics';
import CharacterStories from '../Characters/CharacterStories';
import { loadCharacter, loadCharacterComics, loadCharacterStories } from '../../actions';

export default function CharacterDetailPage(props) {
    const id = props.match.params.id;
    let character = useSelector(state => state.entities.characters[id]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch( loadCharacter(id) );
        dispatch( loadCharacterComics(id) );
        dispatch( loadCharacterStories(id) );
    }, [id]);

    return (
        <div>
            {character && (<div>
                <h1>{character.name}</h1>
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
