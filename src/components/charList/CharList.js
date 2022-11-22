import { Component } from 'react';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';


import './charList.scss';

class CharList extends Component {

    state = {
        charList: [],
        page: 1,
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.marvelService.getAllCharacters()
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoaded = (charList) => {
        this.setState({
            charList,
            loading: false
        })
    }

    onCharListLazy = (charListPage) => {
        const newChars = [...this.state.charList, ...charListPage];

        this.setState(state => ({
            charList: newChars,
            page: state.page + 1,
            loading: false
        }))
    }

    updatePage = () => {
        const page = this.state.page;

        this.marvelService
            .getPageCharacters(page)
            .then(this.onCharListLazy)
            .catch(this.onError)
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

        const { charList, loading, error } = this.state;

        const items = this.renderItems(charList);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button onClick={this.updatePage} className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;