import spinnerImg from '../../resources/img/ghost-preloader.gif';

const Spinner = () => {
    return (
        <div className="preloader">
                <img className="preloader__img" src={spinnerImg} alt="Loading"/>
        </div>
    )
}

export default Spinner;