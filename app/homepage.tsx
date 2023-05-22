"use client";

import { useState,useEffect } from "react";
import { getAccessToken } from "../utils/supabase";
import { fetchAccessToken } from "../utils/authUtils";
import { useRef } from 'react';
import SearchResultList from "../components/searchresults";
import RecommendedList from "../components/recommendedlist";

export default function Page() {
  const[query,setQuery]=useState<string>('')
  const[searchResults,setSearchResults]=useState([])
  const [recommendations,setRecommendations]=useState([])
  const divRef = useRef(null);
  const blurRef = useRef(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  //use a useEffect hook to clear the searchlist items when the body of the page is clicked
  useEffect(() => {
    const handleClick = () => {
      setQuery('')
    };

    document.addEventListener('click', handleClick);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []); // Empty dependency array to run the effect only once

  // run the search function whenever the query is updated
  function handleInput(e) {
    setQuery(e.target.value)
    search(query)
  }

  //get search results from Spotify api
  async function search(query:string) {
    const accesstoken = await getAccessToken()
    const headers = {
      headers: {
        'Authorization': 'Bearer ' + accesstoken
      }
    }
    try{
      const request = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, headers)
     
      if(!request.ok){
        const text = await request.json()
        throw new Error(text.error.message)
      }
      else{
        const result = await request.json()
        setSearchResults(result.tracks?.items)
      }

    }
    catch(error){
      console.log(error)
      if(error.message === 'The access token expired') {
        fetchAccessToken()
      }
    }
  }
   

  // get song recommendations from spotify api
  async function getRecommendations(artistId, trackId) {
    const accesstoken = await getAccessToken()
    const headers = {
      headers: {
        'Authorization': 'Bearer ' + accesstoken
      }
    }
    const request = await fetch(`https://api.spotify.com/v1/recommendations?limit=30&seed_artists=${artistId}&seed_genres=pop&seed_tracks=${trackId}`,headers)
    const result = await request.json()
    setRecommendations(result.tracks)
  }
     

  function handleClick(person) {
    setQuery('')
    getRecommendations(person.artists[0].id,person.id)
  
  }


  function hover(person:any) {
    console.log(audioRef.current)
    divRef.current.style.backgroundImage = `url(${person.album.images[0].url})`;
    blurRef.current.style.backgroundImage = `url(${person.album.images[1].url})`;
    audioRef.current.src =  person.preview_url
    audioRef.current.play()
  }
  
  function pauseAudio(){
    audioRef.current.pause()
  }


  return (
    <>
      <div className="intro">Expand your musical horizons by using your favorite songs to find new songs</div>
      <div className="wrapper">
        <div className="searchcontent">
          <div className="searchmain">
            <div className="searchinput">
              <input value={query} onChange={handleInput} placeholder="Search..."/>
            </div>
          </div>
        </div>
      </div>
      {query.length>0&&searchResults.length>0?<SearchResultList searchResults={searchResults} handleClick={handleClick}/>:null}
      <div className="container">{<RecommendedList rec={recommendations} hover={hover} audio={audioRef} pause={pauseAudio}/>}<div className="blurry-bg"  ><div className="background" ref={blurRef}></div><div className="musicImage" ref={divRef}></div></div></div>

    </>
  )
}