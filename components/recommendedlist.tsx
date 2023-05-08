



export function RecommendedList({rec,hover}){

  const listItem = rec && rec.map(person =>(
    <li className="recommendedLi" onMouseEnter={()=>hover(person)} >
      <img src={person.album.images[2].url}/>
      <div className="listitems">
        <div  className="song">{person.name}</div>
        <div className="artist">{person.artists[0].name}</div>
        <audio></audio>
      </div>
    </li>
  ))

  return(
 
      <div className="recommendedList">
            <ul className="rf">{listItem}</ul> 
      </div>
  )
}
