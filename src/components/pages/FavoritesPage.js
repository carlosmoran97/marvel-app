import React from 'react';
import FavoriteCharacters from '../Characters/FavoriteCharacters';
import FavoriteComics from '../Comics/FavoriteComics';
import FavoriteStories from '../Stories/FavoriteStories';

export default function FavoritesPage() {
    
    return (
        <div>
            <h1>Favorite characters</h1>
            <FavoriteCharacters />
            <h1>Favorite comics</h1>
            <FavoriteComics />
            <h1>Favorite stories</h1>
            <FavoriteStories />
        </div>
    );
}
