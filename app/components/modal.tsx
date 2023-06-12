import { useEffect, useState } from "react";
import { getAccessToken } from "../../utils/supabase";
import { fetchAccessToken } from "../../utils/authUtils";
import SearchResultList from "./searchresults";
import Loader from "./loader";

export default function Modal({ searchModal }) {
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => {
      clearTimeout(debounceTimer); // Clear the debounce timer on component unmount or when the input value changes
    };
  }, [isLoading]);

  function handleInput(e) {
    setQuery(e.target.value);
    search(query);
    setIsLoading(true);
  }

  async function search(query: string) {
    const accesstoken = await getAccessToken();
    const headers = {
      headers: {
        Authorization: "Bearer " + accesstoken,
      },
    };
    try {
      const request = await fetch(
        `https://api.spotify.com/v1/search?q=${query}&type=track`,
        headers
      );

      if (!request.ok) {
        const text = await request.json();
        throw new Error(text.error.message);
      } else {
        const result = await request.json();
        setSearchResults(result.tracks?.items);
      }
    } catch (error) {
      console.log(error);
      if (error.message === "The access token expired") {
        fetchAccessToken();
      }
    }
  }

  return (
    <>
      {searchModal ? (
        <div className="absolute top-0 bg-[#808080] w-full p-6 backdrop-blur">
          <div className="bg-[#000000] rounded-lg">
            <header className="h-16 overflow-y-auto rounded-lg items-center justify-center flex w-full">
              <div className="flex items-center px-2 bg-[#323232] rounded w-full mx-4">
                <div className="text-gray-950	pr-2 absolute">
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m19 19-3.5-3.5"></path>
                    <circle cx="11" cy="11" r="6"></circle>
                  </svg>
                </div>
                <input
                  className="flex flex-1 bg-[#323232] h-12 pl-8"
                  placeholder="Search..."
                  value={query}
                  onChange={handleInput}
                />
              </div>
            </header>

            <div className=" mx-4">
              {isLoading ? (
                <Loader />
              ) : (
                <SearchResultList searchResults={searchResults} />
              )}
              {query.length === 0 ? (
                <p className="text-white px-6 py-14 text-center	r">
                  No Recent Searches
                </p>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
