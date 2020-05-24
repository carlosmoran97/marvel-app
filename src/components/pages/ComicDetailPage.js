import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ComicCharacters from '../Comics/ComicCharacters';
import ComicStories from '../Comics/ComicStories';
import { loadComic, loadComicCharacters, loadComicStories, toggleComic } from '../../actions';

export default function ComicDetailPage(props) {
    const id = props.match.params.id;
    const comic = useSelector(state => state.entities.comics[id]);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch( loadComic(id) );
        dispatch( loadComicCharacters( id ) );
        dispatch( loadComicStories( id ) );
    },[id]);

    const isFavorite = useSelector(state => state.favorites.comics.includes(parseInt(id)));
    const toggleFavorite = () => {
        dispatch(toggleComic(parseInt(id)));
    };

    return (
        <div>
            {comic && (<div>
                <h1>{comic.title}</h1>
                <button onClick={toggleFavorite}>{isFavorite ? "Remove" : "Add"}</button>
                <img
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                    alt={`${comic.name} image.`}
                    height={300}
                />
                <p>{comic.description}</p>
                <div className="comic__relatedEntities">
                    <ComicCharacters id={comic.id}/>
                    <ComicStories id={comic.id} />
                </div>
            </div>)}
        </div>
    )
}
