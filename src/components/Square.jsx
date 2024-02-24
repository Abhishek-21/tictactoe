import './css/Square.css';

function Square({ displayValue, buttonId, className }) {
    return <button className={`square ${className}`} data-button-id={buttonId}>
        {displayValue}
    </button>;
}

export default Square;