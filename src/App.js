import React from 'react';
import BookService from './API/BookService';
import CardList from './components/CardList';
import AppHeader from './components/AppHeader/AppHeader';
import { useFetching } from './hooks/useFetching';
import Loader from './components/UI/Loader/Loader';
import './styles/App.css';
import CardInfo from './components/CardInfo/CardInfo';
import bookStore from './stores/bookStore';
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

    return (
        <div className="App">
            <AppHeader fetchBooks={fetchBooks}/>

            <Observer>
                {() => (
                    bookStore.showBookInfo 
                        ? <CardInfo/>
                        : null
                )}
            </Observer>
            <Observer>{() => ( isBooksLoading && <Loader/> )}</Observer>
            <Observer>
                {() => (
                    !bookStore.showBookInfo && !isBooksLoading && !startSettingStore.isStartApp
                        && <CardList fetchError={fetchError}/>        
                )}
            </Observer>            
        </div>
    );
}

export default App;