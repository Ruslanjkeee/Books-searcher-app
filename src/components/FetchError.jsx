import React from 'react';

const FetchError = (props) => {
    
    if(props.fetchError || props.fetchMoreError || props.fetchBookError) {
        return (
            <h2 className="error">
                Ooops, an error occured: {props.fetchError || props.fetchMoreError || props.fetchBookError}
            </h2>
        )
    } else {
        return null;
    }
    
};
export default FetchError;