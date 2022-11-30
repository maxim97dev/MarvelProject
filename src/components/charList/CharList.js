import { Component } from 'react';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import CardSkeleton from "../cardSkeleton/CardSkeleton";

import './charList.scss';


class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false,
        lazyLoad: false,
        offset: 10
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({
            lazyLoad: true
        })
    }

    onCharListLoaded = (charListNew) => {
        this.setState(({offset, charList}) => ({
            charList: [...charList, ...charListNew],
            loading: false,
            lazyLoad: false,
            offset: offset + 10
        }));
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    renderItems(arr) {
        const items =  arr.map((item) => {
            let imgStyle = '';

            if (item.thumbnail.match('image_not_available')) {
                imgStyle = 'no__img';
            }

            return (
                <li
                    className="char__item"
                    key={item.id}
                    onClick={() => this.props.onCharSelected(item.id)}>

                    <div className="char__item-image">
                        <img src={item.thumbnail} alt={item.name} className={`${imgStyle}`}/>
                    </div>
                    <div className="char__item-name">{item.name}</div>
                </li>
            )
        });

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    render() {

        const { charList, loading, error, offset, lazyLoad } = this.state;

        const items = this.renderItems(charList);

        const errorMessage = error ? <ErrorMessage/> : null;
        const content = !(loading || error) ? items : <CardSkeleton/>;
        const contentLazy = lazyLoad ? <CardSkeleton/> : null;

        return (
            <div className="char__list">
                {errorMessage}
                {content}
                {contentLazy}
                <button className="button button__main button__long"
                        disabled={lazyLoad}
                        onClick={() => this.onRequest(offset)}
                >
                    <div className="inner">{lazyLoad ? 'Wait' : 'Load More'}</div>
                </button>
            </div>
        )
    }
}

export default CharList;