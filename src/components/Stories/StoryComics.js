import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadStoryComics } from '../../actions';
import { get } from 'lodash/object';

export default function StoryComics({ id }) {
    const pagination = useSelector(state => state.pagination);
    const dispatch = useDispatch();
    const comicIds = get(pagination, `storyComics[${id}].ids`, []);
    const nextPageUrl = get(pagination, `storyComics[${id}].nextPageUrl`, null);
    const comics = useSelector(state => state.entities.comics);

    const handleLoadMore = () => {
        dispatch(loadStoryComics(id, nextPageUrl !== null));
    };

    return (
        <div className="story__comics">
            <h2>Comics</h2>
            {comicIds.map(id => {
                const comic = comics[id];
                return <div key={`comic-${id}`}><Link to={`/comics/${id}`}>{comic.title}</Link></div>
            })}
            {nextPageUrl !== null && <button onClick={handleLoadMore}>Load more</button>}
        </div>
    )
}
