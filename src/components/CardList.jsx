import React, {useCallback} from 'react';
import CardItem from './CardItem';
import MyButton from './UI/button/MyButton';
import Loader from './UI/Loader/Loader';
import { observer } from 'mobx-react-lite';
import bookStore from '../stores/bookStore';
import cardsStore from '../stores/cardsStore';
import startSettingStore from '../stores/startSettingStore';
import BookService from '../API/BookService';
import { useFetching } from '../hooks/useFetching';
import FetchError from './FetchError';

const CardList = observer(({fetchError}) => {

    const [loadMore, isMoreBooksLoading, fetchMoreError] = useFetching(async () => {
        cardsStore.setStartIndex(cardsStore.startIndex + startSettingStore.pagStep);
        let books = await BookService.getAll();
       
        if(books.totalItems && books.items) {
            cardsStore.setTotalCards(books.totalItems);
            cardsStore.updateCards([...cardsStore.cards, ...books.items]);
        }
    })

    const handleClick = useCallback(
        (e) => {
            let card = e.target.closest('.card');
            if(card) {
                bookStore.setBookId(card.id);
                bookStore.setShowBookInfo(true);
            }
    }, []);

    if(fetchMoreError || fetchError) {
        return (
            <FetchError
                fetchMoreError={fetchMoreError}
                fetchError={fetchError} 
            />
        )
    }
   
    return (
        <div className="main"> 
            <p className='main_results'>Found {cardsStore.totalCards} results</p>
            {cardsStore.cards.length > 0 &&
                <div className="cards" onClick={handleClick}>
                    {cardsStore.cards.map((card, index) =>
                        <CardItem card={card} key={card.id + index}/>    
                    )}
                </div>
            }
            {isMoreBooksLoading
                ? <Loader/>
                : cardsStore.totalCards > cardsStore.startIndex + startSettingStore.pagStep
                    ? <MyButton onClick={loadMore} className="load-cards">Load more</MyButton>
                    : null
            }
        </div>
    )
});

export default CardList;