import React from 'react';
import CardsForm from '../CardsForm';
import classes from './AppHeader.module.css'

const AppHeader = ({ fetchBooks }) => {
    
    return (
        <header className={classes.header}>
            <h1 className={classes.header_title}>Search for books</h1>
            <CardsForm 
                fetchBooks={fetchBooks} 
            />
        </header>
    )
};

export default React.memo(AppHeader);