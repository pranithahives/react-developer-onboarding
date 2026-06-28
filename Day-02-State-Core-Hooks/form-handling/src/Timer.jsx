import {useState, useEffect} from 'react'

function Timer() {
    const [seconds, setSeconds] = useState(0)
    
    

    useEffect(()=>{
        const Interval = setInterval(()=>{
            setSeconds((prev)=> prev+1)
        }, 1000)

        return()=>{
            clearInterval(Interval)
            console.log("Timer Cleared")
        }
    },[])

  return (
    <div>\
        <h2>Seconds: {seconds}</h2>
        
    </div>
  )
}

export default Timer