import { makeAutoObservable } from 'mobx';

function BookStore () {
    return makeAutoObservable({
        bookInfo: {},
        bookId: '',
        showBookInfo: false,
        setBookInfo(info) {
            this.bookInfo = info;
        },
        setBookId(id) {
            this.bookId = id;
        },
        setShowBookInfo(boolean) {
            this.showBookInfo = boolean;
        }
    })
}

const bookStore = new BookStore();
export default bookStore;