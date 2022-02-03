class GotServise {

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
    getAllCharacters() {
        return this.getResource('/characters?page=5&pageSize=10')
    }
    getCharacter(id){
        return this.getResource(`/characters/${id}`)
    }
}

const got = new GotServise();

got.getAllCharacters()
    .then(res => { 
        res.forEach(item => console.log(item.name))
    });

got.getCharacter(130)
    .then(res => console.log(res));  
