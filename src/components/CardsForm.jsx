import React from 'react';
import MyButton from './UI/button/MyButton';
import MyInput from './UI/input/MyInput';
import MySelect from './UI/select/MySelect';
import formStore from '../stores/formStore';
import startSettingStore from '../stores/startSettingStore';
import { observer } from 'mobx-react-lite';

const CardsForm = observer(({fetchBooks}) => {
    
    function clickHandler(e) {
        if(e) e.preventDefault();
        if(formStore.input) {
            fetchBooks();
            
        }
        if(startSettingStore.isStartApp) {
            startSettingStore.setIsStartApp(false);
        }
    }

    function keyDownHandler(e) {
        if(e.key === 'Enter') {
            clickHandler();
        }
    }

    return (
        <form>
            <div className="header_search">
                <MyInput 
                    type="text" 
                    value={formStore.input} 
                    onChange={ev => formStore.setInput(ev.target.value)} 
                    placeholder="type the book name"
                    onKeyDown={keyDownHandler}
                />
                <MyButton onClick={clickHandler}>Search the book</MyButton>
            </div>
            <div className='header_filters'>
                <div className="filters_category">
                    <label htmlFor='categories' className='filters_name'>Categories</label>
                    <MySelect
                        value={formStore.selectedCategory}
                        onChange={category => formStore.setSelectedCategory(category)}
                        defaultValue="all"
                        options={['art', 'biography', 'computers', 'history', 'medical', 'poetry']}
                    />
                </div>
                <div className="filters_sort">
                    <label htmlFor='sorting' className='filters_name'>Sorting by</label>
                    <MySelect
                        value={formStore.selectedSort}
                        onChange={sort => formStore.setSelectedSort(sort)}
                        defaultValue="relevance"
                        options={['newest']}
                    />
                </div>
            </div>
        </form>
    )
});

export default CardsForm;