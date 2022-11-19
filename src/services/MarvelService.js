import md5 from "blueimp-md5";

class MarvelService {
    _url = 'https://gateway.marvel.com/v1/public/characters';
    _apikey = '1a52cb7d60fa7704cf0638d5fb3ca8f4';

    getResources = async(url) => {
        let response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Could not fetch ${url}, status: ${response.status}`);
        }

        return await response.json();
    }

    getHash = (timeStamp) => {
        return md5(timeStamp + '34e8350864fdfff1b14ed01f74023423dc2a3d80' + '1a52cb7d60fa7704cf0638d5fb3ca8f4');
    }

    getAllCharacters = async () => {
        const timeStamp = +new Date();
        const hash = this.getHash(timeStamp);

        const res = await this.getResources(
            this._url + '?' +
            'limit=20&offset=210' +
            '&ts=' + timeStamp +
            '&apikey=' + this._apikey +
            '&hash=' + hash
        );
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const timeStamp = +new Date();
        const hash = this.getHash(timeStamp);

        const result = await this.getResources(
            this._url + '/' + id + '?' +
            '&ts=' + timeStamp +
            '&apikey=' + this._apikey +
            '&hash=' + hash
        );

        return this._transformCharacter(result.data.results[0]);
    }

    _transformCharacter = (response) => {
        return {
            id: response.id,
            name: response.name,
            description: response.description,
            thumbnail: `${response.thumbnail.path}.${response.thumbnail.extension}`,
            homepage: response.urls[0].url,
            wiki: response.urls[1].url,
            comics: response.comics.items
        }
    }
}

export default MarvelService;