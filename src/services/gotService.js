export default class gotServise {

    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok) {
            throw new Error(`Cold not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    }
    async getAllCharacters() {
        const res = await this.getResource('/characters/')
        return res.map(this._transformCharacter)
    }
    async getCharacter(id){
        const character = await this.getResource(`/characters/${id}`)
        return this._transformCharacter(character)
    }

    getAllHouses() {
        return this.getResource('/houses/')
    }
    getHouse(id){
        return this.getResource(`/houses/${id}`)
    }

    getAllBooks() {
        return this.getResource('/books/')
    }
    getBook(id){
        return this.getResource(`/books/${id}`)
    }

    _transformCharacter(char) {
        return {
            name: char.name,
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture

        }
    }

    _transformHouse(house) {
        return {
            name: house.name,
            region: house.region,
            worlds: house.worlds,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons

        }
    }

    _transformBook(book) {
        return {
            name: book.name,
            numerOfPages: book.numerOfPages

        }
    }

}

