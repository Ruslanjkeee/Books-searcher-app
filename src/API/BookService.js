import formStore from "../stores/formStore";
import bookStore from "../stores/bookStore";
import cardsStore from "../stores/cardsStore";

const _api = process.env.REACT_APP_API_KEY;

export default class BookService {
    static async getAll() {
        let response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${formStore.input}${
            formStore.selectedCategory === 'all'
                ? "" 
                : '+subject:' + formStore.selectedCategory
            }&orderBy=${formStore.selectedSort}&startIndex=${ cardsStore.startIndex }&maxResults=30&key=${_api}`);
        let result;
        if (response.status >= 200 && response.status <= 299) {
            result = await response.json();
        } else {
            throw Error(response.statusText);
        }
        return result;
    }

    static async getById() {
        let response = await fetch(`https://www.googleapis.com/books/v1/volumes/${bookStore.bookId}?key=${_api}`);
        let result;
        if (response.status >= 200 && response.status <= 299) {
            result = await response.json();
        } else {
            throw Error(response.statusText);
        }
        return result;
    }
}