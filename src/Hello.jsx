//import styles from "./Hello.module.css"
import './App.css'
function Hello(props){
    const{name,age,city} = props
    return (
        <>
            <h2>Hello, {name}</h2>
            <h2>Hello, {age}</h2>
            <h2>Hello, {city}</h2>
        </>
    )

    /*const isVisible = true;

    return(
        <div>
            <h1 className={isVisible ? "visible" : "invisible"}>Conditional</h1>
            <p>hi hi hi hi hi hi hi</p>
        </div>
    )
     let message;

    if(isLoggedIn){
        message= <h1>WELCOME</h1>
    }
    else{
        message= <h2>please login</h2>
    }
return <div>{message}</div>

   const fruits =["Apple", "Banana", "Orange"]

    return(
        <div>
            <h2>Fruits List</h2>
            <ul>
                {fruits.map((fruit, index)=>(
                    <li>{index}- {fruit}</li>
                ))}
            </ul>
        </div>
    ) */

}

export default Hello

