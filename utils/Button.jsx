export const Button = ({onClick,label}) => {
    return(
        <button
        onClick={onClick}
        className="fixed top-4 right-4"
        >{label}</button>
    )
}