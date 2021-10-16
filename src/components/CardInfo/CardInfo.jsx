import { observer } from 'mobx-react-lite';
import React from 'react';
import classes from './CardInfo.module.css';
import bookStore from '../../stores/bookStore';

const CardInfo = observer((props) => {
    let bookInfo = bookStore.bookInfo;

    function clickHandler(e) {
        bookStore.setShowBookInfo(false);
    }

    let description = bookInfo?.volumeInfo?.description || 'There is no description';
    let title = bookInfo?.volumeInfo?.title || '';
    let authors = bookInfo?.volumeInfo?.authors?.join(', ') || '';
    let categories = bookInfo?.volumeInfo?.categories?.join(', ') || '';

    return (
        <div className={classes.card}>
            <div className={classes.card_img}>
                <img src={bookInfo?.volumeInfo?.imageLinks?.thumbnail} alt="" className={classes.img}/>
            </div>
            <div className={classes.card_info}>
                <p className={classes.info_category}>{categories}</p>
                <p className={classes.info_title}>{title}</p>
                <p className={classes.info_author}>{authors}</p>
                <p className={classes.info_description}>{description}</p>
            </div>
            <button className={classes.card_btn} onClick={clickHandler}>X</button>
        </div>   
    )
});

export default CardInfo;