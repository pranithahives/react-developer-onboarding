import {useState} from 'react'

function UserProfile() {
    const [name,Setname] = useState("Guests")
    const [age,Setage] = useState(18)
  return (
    <>
    <h2>Name : {name}</h2>
    <h2>Age : {age}</h2>
    <button onClick={()=>Setname("Pranitha")}> Change Name   </button>
    <button onClick={()=>Setage(age + 1)}> Change Age   </button>
    </>
  )
}

export default UserProfile