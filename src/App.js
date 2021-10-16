import React from 'react';
import BookService from './API/BookService';
import CardList from './components/CardList';
import AppHeader from './components/AppHeader';
import { useFetching } from './hooks/useFetching';
import Loader from './components/UI/Loader/Loader';
import './styles/App.css';
import CardInfo from './components/CardInfo/CardInfo';
import bookStore from './stores/bookStore';
import formStore from './stores/formStore';
import cardsStore from './stores/cardsStore';
import startSettingStore from './stores/startSettingStore';
import { Observer } from 'mobx-react-lite';

function App() {
    const [fetchBooks, isBooksLoading, fetchError] = useFetching(async () => {
        cardsStore.setStartIndex(0);
        bookStore.setShowBookInfo(false);
        let books = await BookService.getAll();
        cardsStore.setTotalCards(books.totalItems);
        if(books.totalItems) {
            cardsStore.updateCards(books.items);
        } else {
            cardsStore.updateCards([]);
        }
    })
    
    const [loadMore, isMoreBooksLoading, fetchMoreError] = useFetching(async () => {
        cardsStore.setStartIndex(cardsStore.startIndex + formStore.pagStep);
        let books = await BookService.getAll();
        if(books.totalItems) {
            cardsStore.updateCards([...cardsStore.cards, ...books.items])
        }
    })
    
    const [fetchBookById, isBookLoading, fetchBookError] = useFetching(async () => {
        let book = await BookService.getById();
        bookStore.setBookInfo(book);
    })
    
    return (
        <div className="App">
            <AppHeader fetchBooks={fetchBooks}/>

            {(fetchError || fetchMoreError || fetchBookError) &&
                <h2 className="error">Ooops, an error occured: {fetchError || fetchMoreError || fetchBookError}</h2>
            }
            <Observer>{() => (
                bookStore.showBookInfo 
                    ? isBookLoading
                        ? <Loader/>
                        : <CardInfo/>
                    : ''
            )}</Observer>
            <Observer>{() => ( isBooksLoading && <Loader/> )}</Observer>
            <Observer>{() => (
                !bookStore.showBookInfo && !isBooksLoading && !startSettingStore.isStartApp
                    && <CardList fetchBookById={fetchBookById} loadMore={loadMore} isLoading={isMoreBooksLoading}/>        
            )}</Observer>            
        </div>
    );
}

export default App;