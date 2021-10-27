import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect } from 'react';
import classes from './CardInfo.module.css';
import bookStore from '../../stores/bookStore';
import BookService from '../../API/BookService';
import { useFetching } from '../../hooks/useFetching';
import Loader from '../UI/Loader/Loader';
import FetchError from '../FetchError';

const CardInfo = observer((props) => {

    const [fetchBookById, isBookLoading, fetchBookError] = useFetching(async () => {
        let book = await BookService.getById();
        bookStore.setBookInfo(book);
    })
    
    useEffect(() => {
        fetchBookById();
    }, []);

    let bookInfo = bookStore.bookInfo;
    let volumeInfo = bookInfo?.volumeInfo;

    const clickHandler = useCallback((e) => {
        bookStore.setShowBookInfo(false);
    }, []);

    let srcImg = volumeInfo?.imageLinks?.thumbnail || '';
    let description = volumeInfo?.description || 'There is no description';
    let title = volumeInfo?.title || '';
    let authors = volumeInfo?.authors?.join(', ') || '';
    let categories = volumeInfo?.categories?.join(', ') || '';

    if(fetchBookError) {
        return (
            <FetchError
                fetchBookError={fetchBookError}
            />
        )
    }

    if(isBookLoading) {
        return <Loader/>
    }

    return (
        <div className={classes.card}>
            <div className={classes.card_img}>
                <img src={srcImg} alt="book" className={classes.img}/>
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