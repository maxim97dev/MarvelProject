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

    getAllCharacters = () => {
        const timeStamp = +new Date();
        const hash = this.getHash(timeStamp);

        return this.getResources(
             this._url + '?' +
            'limit=9&offset=210' +
            '&ts=' + timeStamp +
            '&apikey=' + this._apikey +
            '&hash=' + hash
        );
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

        return this._transformCharacter(result);
    }

    _transformCharacter = (response) => {
        return {
            name: response.data.results[0].name,
            description: response.data.results[0].description,
            thumbnail: `${response.data.results[0].thumbnail.path}.${response.data.results[0].thumbnail.extension}`,
            homepage: response.data.results[0].urls[0].url,
            wiki: response.data.results[0].urls[1].url
        }
    }
}

export default MarvelService;