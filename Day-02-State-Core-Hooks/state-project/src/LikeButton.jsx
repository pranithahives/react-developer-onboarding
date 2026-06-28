import {useState} from 'react'

function LikeButton() {
    const [liked,SetLiked] = useState(false)
  return (
    <>
    <button onClick={()=>SetLiked(!liked)}>
        {liked ? "❤️Liked" : "💗Like"} Text
    </button>
    </>
  )
}

export default LikeButton