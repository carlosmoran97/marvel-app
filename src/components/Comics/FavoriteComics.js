import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleComic } from '../../actions';
import { Link } from 'react-router-dom';

export default function FavoriteComics() {
    const ids = useSelector(state => state.favorites.comics);
    const comics = useSelector(state => state.entities.comics);
    const dispatch = useDispatch();
    const toggleFavorite = (id) => {
        dispatch( toggleComic(id) );
    };

    return (
        <div>
            {ids.map(id => {
                const comic = comics[id];
                return (
                    <div key={`comic-${id}`}>
                        <Link to={`/comics/${id}`}>{comic.title}</Link>
                        <button onClick={()=>{toggleFavorite(id)}}>Remove</button>
                    </div>
                );
            })}
        </div>
    );
}
