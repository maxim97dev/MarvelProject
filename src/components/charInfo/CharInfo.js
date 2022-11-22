import { Component } from "react";

import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton'

import './charInfo.scss';

class CharInfo extends Component {
    state = {
        character: null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService();

    updateChar = () => {
        const {charId} = this.props;
        if (!charId) {
            return;
        }

        this.onCharLoading();

        this.marvelService
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
        this.setState({error: true})
    }

    onCharLoaded = (character) => {
        this.setState({
            character,
            loading: false,
            error: false
        })
    }

    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    render() {
        const {character, loading, error} = this.state;

        const skeleton = character || loading || error ? null : <Skeleton/>;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !character) ? <View character={character}/> : null;


        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}

const View = ({character}) => {
    const { name, description, thumbnail, homepage, wiki, comics } = character;

    const comicsLength = (comics.length) ? 'Comics:' : '';
    const comicsList = comics.slice(0, 10).map((item, i) => {
        return (
            <li key={i} className="char__comics-item">{item.name}</li>
        )
    })

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__buttons">
                        <a href={homepage} className="button button__main">
                            <div className="inner">Homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__description">{description}</div>
            <div className="char__comics">{comicsLength}</div>
            <ul className="char__comics-list">{comicsList}</ul>
        </>
    )
}

export default CharInfo;