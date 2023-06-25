"use client";

export function Header({ setSearchModal }) {
  //get search results from Spotify api

  function openmodal() {
    setSearchModal(true);
  }
  return (
    <>
      <header className="flex text-sm bg-[#000000] text-white w-full pt-8">
        <div className=" flex items-center justify-start w-full px-4">
          <div className="flex flex-1 text-xl">SpotSync</div>
          <div className="flex items-center" onClick={openmodal}>
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m19 19-3.5-3.5"></path>
              <circle cx="11" cy="11" r="6"></circle>
            </svg>
            {/* <div className="">
                <input
                  className="bg-[#323232] flex flex-1"
                  value={query}
                  onChange={handleInput}
                  placeholder="Search..."
                />
              </div> */}
          </div>

          {/* <div className="flex items-center flex-shrink-0">
            Powered by Spotify
            <img
              height="12px"
              width="12px"
              src="Spotify_Icon_RGB_Black.png"
            ></img>
          </div> */}
        </div>
      </header>
    </>
  );
}
