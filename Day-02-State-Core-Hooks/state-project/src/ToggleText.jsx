import {useState} from 'react'

function ToggleText() {
    const [isVisible,SetIsVisible] = useState(false)
  return (
    <>
    <button onClick={()=>SetIsVisible(!isVisible)}>
        {isVisible ? "Hide" : "Show"} Text
    </button>

    {isVisible && <p>This is Exercise 3: Build a toggle component: show/hide a paragraph using a button </p>}
    </>
  )
}

export default ToggleText