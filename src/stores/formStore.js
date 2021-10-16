import { makeAutoObservable } from 'mobx';

function FormStore () {
    return makeAutoObservable({
        input: '',
        selectedCategory: 'all',
        selectedSort: 'relevance',
        setInput(str) {
            this.input = str;
        },
        setSelectedCategory(str) {
            this.selectedCategory = str;
        },
        setSelectedSort(str) {
            this.selectedSort = str;
        },
    })
}

const formStore = new FormStore();
export default formStore;
