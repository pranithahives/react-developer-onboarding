export default function Button((label, handleClick)){
    return <button onClick={handleClick}>{label}</button>
}