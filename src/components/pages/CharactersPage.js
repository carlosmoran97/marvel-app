import React, { useEffect, useState } from 'react'
import CharactersGrid from '../Characters/CharactersGrid';
import { useDispatch } from 'react-redux';
import { loadCharacters } from './../../actions';
import CharactersSearchForm from '../Characters/CharactersSearchForm';

export default function CharactersPage() {

    const dispatch = useDispatch();
    const initialState ={
        nameStartsWith: undefined,
        stories: [],
        comics: []
    };
    let [params, setParams] = useState(initialState);

    useEffect(() => {
        dispatch(loadCharacters(params.nameStartsWith, params.comics, params.stories));
    });

    const handleSubmit = (values) => {
        setParams(values);
    };

    const handleClear = () => {
        setParams(initialState);
    };


    return (
        <div>
            <CharactersSearchForm handleSubmit={handleSubmit} handleClear={handleClear}/>
            <CharactersGrid params={params}/>
        </div>
    )
}
