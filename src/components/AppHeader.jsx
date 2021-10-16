import React from 'react';
import CardsForm from './CardsForm';

const AppHeader = ({ fetchBooks }) => {
    return (
        <header className='header'>
            <h1 className='header_title'>Search for books</h1>
            <CardsForm 
                fetchBooks={fetchBooks} 
            />
        </header>
    )
};

export default AppHeader;