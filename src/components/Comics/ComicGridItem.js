import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleComic } from '../../actions';

export default function ComicGridItem({ comic }) {
    const isFavorite = useSelector(state => state.favorites.comics.includes(comic.id));
    const dispatch = useDispatch();
    const toggleFavorite = () => {
        dispatch(toggleComic(comic.id));
    };
    return (
        <div >
            <p>{comic.title}</p>
            <button onClick={toggleFavorite}>{isFavorite ? "Remove" : "Add"}</button>
            <Link to={`/comics/${comic.id}`}>
                <img
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                    alt={`${comic.name} image`}
                    height={300}
                />
            </Link>
        </div>
    )
}
