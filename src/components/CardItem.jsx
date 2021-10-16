import React from 'react';

const CardItem = ({card}) => {
    let srcImg = card.volumeInfo.imageLinks?.smallThumbnail;
    let category = card.volumeInfo?.categories?.[0];
    let title = card.volumeInfo?.title;
    let authors = card.volumeInfo?.authors?.join(', ');
    
    if (!srcImg) srcImg = '';
    if (!authors) authors = '';
    if (!title) title = '';
    if (!category) category = '';

    return (
        <div className="card" id={card.id}>
            <div className="card_img-container">
                <img src={srcImg} alt="book cover" className="card_img"/>
            </div>
            <p className="card_category">{category}</p>
            <p className="card_title">{title}</p>
            <p className="card_autor">{authors}</p>
        </div>
    )
};

export default CardItem;