
export default function SearchResultList({ searchResults,handleClick}) {
   
    const listItems = searchResults && searchResults.map(person => (
      <li className="searchresultsli" onClick={()=>{handleClick(person)}}>
        <img src={person.album.images[2].url}/>
        <div className="listitems">
          <div  className="song">{person.name}</div>
          <div className="artist">{person.artists[0].name}</div>
        </div>
      </li>
    ));
  
    return (
      <div className="searchboxmain">
        <ul className="searchbox">{listItems}</ul>
      </div>
      
    );
}
