import img from './error.gif'

const ErrorMessage = () => {
    return (
        <div className="error">
            <img className="error__img" src={img}  alt="Error"/>
        </div>

    )
}

export default ErrorMessage;