import { forwardRef } from 'react';

type content = {
  rec: any,
  hover: any,
  audio:any,
  pause:any
}

//use the forwardRef hook to receive ref from parent
const RecommendedList = forwardRef<HTMLDivElement,content>(({rec,hover,audio,pause},ref) => {
  console.log(rec)
  const listItem = rec && rec.map(person => (
    person.preview_url && <li className="recommendedLi" onMouseEnter={()=>hover(person)} onMouseLeave={pause}>
      <img src={person.album.images[2].url}/>
      <div className="listitems">
        <div  className="song">{person.name}</div>
        <div className="artist">{person.artists[0].name}</div>
        <audio ref={audio}></audio>
      </div>
    </li>
  ))
 
  return(
    <div className="recommendedList">
      <ul className="rf">{listItem}</ul> 
    </div>
  )
})

export default RecommendedList
