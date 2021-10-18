import React from 'react';
import CardItem from './CardItem';
import MyButton from './UI/button/MyButton';
import Loader from './UI/Loader/Loader';
import { observer } from 'mobx-react-lite';
import bookStore from '../stores/bookStore';
import cardsStore from '../stores/cardsStore';
import startSettingStore from '../stores/startSettingStore';

const CardList = observer(({fetchBookById, loadMore, isLoading}) => {

    function delegateClickHandler(e) {
        let card = e.target.closest('.card');
        if(card) {
            bookStore.setBookId(card.id);
            bookStore.setShowBookInfo(true);
            fetchBookById();
        }
    }

    return (
        <div className="main"> 
            <p className='main_results'>Found {cardsStore.totalCards} results</p>
            {cardsStore.cards.length > 0 &&
                <div className="cards" onClick={delegateClickHandler}>
                    {cardsStore.cards.map((card, index) =>
                        <CardItem card={card} key={card.id + index}/>    
                    )}
                </div>
            }
            {isLoading
                ? <Loader/>
                : cardsStore.totalCards > cardsStore.startIndex + startSettingStore.pagStep
                    ? <MyButton onClick={loadMore} className="load-cards">Load more</MyButton>
                    : ''
            }
        </div>
    )
});

export default CardList;