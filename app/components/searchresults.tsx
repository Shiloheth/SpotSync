export default function SearchResultList({ searchResults }) {
  function handleClick(arg) {
    console.log(arg);
  }
  const listItems =
    searchResults &&
    searchResults.map((person) => (
      <li
        className="flex items-center text-white bg-[#424242] p-2 rounded mt-2"
        onClick={() => {
          handleClick(person);
        }}
      >
        <img src={person.album.images[2].url} />
        <div className="flex flex-col p-2">
          <div className="font-semibold">{person.name}</div>
          <div className="text-xs">{person.artists[0].name}</div>
        </div>
      </li>
    ));

  return (
    <div>
      <ul className="pb-2">{listItems}</ul>
    </div>
  );
}
