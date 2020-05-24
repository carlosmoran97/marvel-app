import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadCharacterComics } from '../../actions';
import { get } from 'lodash/object';

export default function CharacterComics({id}) {
    const pagination = useSelector(state => state.pagination);
    const dispatch = useDispatch();
    const comicsIds = get(pagination, `characterComics[${id}].ids`, []);
    const nextPageUrl = get(pagination, `characterComics[${id}].nextPageUrl`, null);
    const comics = useSelector(state => state.entities.comics);

    const handleLoadMore = () => {
        dispatch( loadCharacterComics(id, nextPageUrl !== null ) );
    };

    return (
        <div className="character__comics">
            <h2>Comics</h2>
            {comicsIds.map(id => {
                const comic = comics[id];
                return <div key={`comic-${id}`}><Link to={`/comics/${id}`}>{comic.title}</Link></div>
            })}
            { nextPageUrl !== null &&  <button onClick={handleLoadMore}>Load more</button>}
        </div>
    );
}
