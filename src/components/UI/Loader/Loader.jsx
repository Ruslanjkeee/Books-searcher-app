import React from 'react';
import classes from './Loader.module.css';

const Loader = () => {
    return (
        <div className={classes.wrapper}>
            <p>Loading...</p>
            <div className={classes.loader}></div>
        </div>
    )
};

export default Loader;