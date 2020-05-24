import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StoryCharacters from '../Stories/StoryCharacters';
import StoryComics from '../Stories/StoryComics';
import { loadStory, loadStoryCharacters, loadStoryComics, toggleStory } from '../../actions';

export default function StoryDetailPage(props) {
    const id = props.match.params.id;
    let story = useSelector(state => state.entities.stories[id]);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch( loadStory(id) );
        dispatch( loadStoryCharacters(id) );
        dispatch( loadStoryComics(id) );
    },[id]);
    const isFavorite = useSelector(state => state.favorites.stories.includes(parseInt(id)));
    const toggleFavorite = () => {
        dispatch(toggleStory(parseInt(id)));
    };
    return (
        <div>
            {story && <div>
                <h1>{story.title}</h1>
                <button onClick={toggleFavorite}>{isFavorite ? "Remove" : "Add"}</button>
                {story.thumbnail && <img
                    src={`${story.thumbnail.path}.${story.thumbnail.extension}`}
                    alt={`${story.title} image.`}
                    height={300}
                />}
                <p>{story.description}</p>
                <div className="story__relatedEntities">
                    <StoryCharacters id={id}/>
                    <StoryComics id={id}/>
                </div>
            </div>}
        </div>
    )
}
