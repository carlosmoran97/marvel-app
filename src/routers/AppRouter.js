import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from '../components/pages/HomePage';
import CharactersPage from '../components/pages/CharactersPage';
import NotFoundPage from '../components/pages/NotFoundPage';
import Header from '../components/Header';
import CharacterDetailPage from '../components/pages/CharacterDetailPage';

export default function AppRouter() {
    return (
        <BrowserRouter>
        <div>
            <Header/>
            <Switch>
                <Route path="/" component={HomePage} exact/>
                <Route path="/characters" component={CharactersPage} exact/>
                <Route path="/characters/:id" component={CharacterDetailPage}/>
                <Route component={NotFoundPage} />
            </Switch>
            </div>
        </BrowserRouter>
        
    )
}
