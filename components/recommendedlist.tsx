import { forwardRef } from 'react';


type content = {
  rec: any,
  hover: any,
  audio:any,
  pause:any
}

const RecommendedList=forwardRef<HTMLDivElement,content>(({rec,hover,audio,pause},ref)=>{

  const listItem = rec && rec.map(person =>(
    <li className="recommendedLi" onMouseEnter={()=>hover(person)} onMouseLeave={pause}>
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
