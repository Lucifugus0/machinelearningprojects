const Button = ({ onClick, children}) => {
    return (
    <button className="btn btn-primary m-2" onClick={onClick}>
        {children}
    </button>
    );
};

export default Button;
