import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { get } from 'lodash/object';
import queryString from 'query-string';
import { loadComics } from '../../actions'

export default function ComicsGrid({params}) {
    const pagination = useSelector(state=>state.pagination);
    const dispatch = useDispatch();
    let paramsString = queryString.stringify(params, {
        arrayFormat: 'comma',
        skipEmptyString: true
    });
    const comicsIds = get(pagination, `comicsSearch[${paramsString}].ids`, []);
    const nextPageUrl = get(pagination, `comicsSearch[${paramsString}].nextPageUrl`, null);
    const comics = useSelector(state => state.entities.comics);
    const handleLoadMore = () => {
        dispatch( loadComics(params.titleStartsWith, params.format, params.issueNumber, nextPageUrl !== null ) );
    };
    console.log(comicsIds);
    return (
        <div>
            {comicsIds.map(id => {
                const comic = comics[id];
                return (
                    <div key={id}>
                        <p>{comic.title}</p>
                        <img
                            src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                            alt={`${comic.name} image`}
                            height={300}
                        />
                    </div>
                );
            })}
            { nextPageUrl !== null &&  <button onClick={handleLoadMore}>Load more</button>}
        </div>
    )
}
