import useToggle from "./hooks/useToggle";

function ToggleTest(){
    const[isOpen, toggleOpen]= useToggle()

    return(
        <>
            <button onClick={toggleOpen}>Toggle</button>
            {isOpen && <p>visible</p>}
        </>
    )
}

export default ToggleTest;