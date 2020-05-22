import React, { useEffect, useState } from 'react'
import CharactersGrid from '../Characters/CharactersGrid';
import { useDispatch } from 'react-redux';
import { loadCharacters } from './../../actions';

export default function CharactersPage() {

    const dispatch = useDispatch();
    let [params, setParams] = useState({
        nameStartsWith: undefined,
        stories: [],
        comics: []
    });

    useEffect(() => {
        dispatch(loadCharacters(params.nameStartsWith, params.comics, params.stories));
    });


    return (
        <div>
            <CharactersGrid params={params}/>
        </div>
    )
}
