import React from 'react';

const CardItem = ({card}) => {
    let srcImg, category, title, authors;

    if(card?.volumeInfo) {
        srcImg = card.volumeInfo.imageLinks?.smallThumbnail;
        category = card.volumeInfo.categories?.[0];
        title = card.volumeInfo.title;
        authors = card.volumeInfo.authors?.join(', ');
    }
    
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

export default React.memo(CardItem);