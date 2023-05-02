
function SearchResultList({ searchResults, setTrackId, setArtistId }) {
  const listItems = searchResults && searchResults.map(person => (
    <li onClick={() => {setTrackId(person.id);setArtistId(person.artists[0].id);console.log(person.album.images[1]);}}>
      <img src={person.album.images[2].url}/>
      <div className="listitems">
        <div className="song">{person.name}</div>
        <div className="artist">{person.artists[0].name}</div>
      </div>
    </li>
  ));

  return (
    <>
      <ul className="searchbox">{listItems}</ul>
    </>
    
  );
}


export default SearchResultList;
