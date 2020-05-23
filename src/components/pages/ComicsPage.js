import React, { useState, useEffect } from 'react';
import ComicsGrid from '../Comics/ComicsGrid';
import ComicsSearchForm from '../Comics/ComicsSearchForm';
import { useDispatch } from 'react-redux';
import { loadComics } from '../../actions';

export default function ComicsPage() {
    const dispatch = useDispatch();
    const initialState = {
        titleStartsWith: undefined,
        format: undefined,
        issueNumber: undefined,
    };
    let [params, setParams] = useState(initialState);

    useEffect(()=>{
        dispatch(loadComics(params.titleStartsWith, params.format, params.issueNumber));
    });

    const handleSubmit = (values) => {
        setParams(values);
    };

    const handleClear = () => {
        setParams(initialState);
    };

    return (
        <div>
            <ComicsSearchForm handleSubmit={handleSubmit} handleClear={handleClear}/>
            <ComicsGrid params={params}/>
        </div>
    );
}
