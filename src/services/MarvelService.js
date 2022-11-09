import md5 from "blueimp-md5";

class MarvelService {
    getResources = async(url) => {
        let response = await(url);

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
            'https://gateway.marvel.com/v1/public/characters?' +
            '&ts=' + timeStamp +
            '&apikey=1a52cb7d60fa7704cf0638d5fb3ca8f4' +
            '&hash=' + hash);
    }
}

export default MarvelService;