import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadComicStories } from '../../actions';
import { get } from 'lodash/object';

export default function ComicStories({id}) {
    const pagination = useSelector(state => state.pagination);
    const dispatch = useDispatch();
    const storyIds = get(pagination, `comicStories[${id}].ids`, []);
    const nextPageUrl = get(pagination, `comicStories[${id}].nextPageUrl`, null);
    const stories = useSelector(state=>state.entities.stories);
    const handleLoadMore = () => {
        dispatch( loadComicStories(id, nextPageUrl !== null) );
    };

    return (
        <div className="comic__stories">
            <h2>Stories</h2>
            {storyIds.map(id => {
                const story = stories[id];
                return <div key={`story-${id}`}><Link to={`/stories/${id}`}>{story.title}</Link></div>
            })}
            { nextPageUrl !== null &&  <button onClick={handleLoadMore}>Load more</button>}
        </div>
    )
}
