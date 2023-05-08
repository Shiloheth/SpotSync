"use client";

import { useState,useEffect } from "react";
import { getAccessToken } from "../utils/supabase";
import { fetchAccessToken } from "../utils/authUtils";
import { useRef } from 'react';
import { RecommendedList } from "../components/recommendedlist";
import SearchResultList from "../components/searchresults";


export default function Page() {
  const[query,setQuery]=useState<string>('')
  const[searchResults,setSearchResults]=useState([])
  const [recommendations,setRecommendations]=useState([])
  const divRef = useRef(null);
  const blurRef = useRef(null)
  const audioRef = useRef(null)


  // run the search function whenever the query is updated
  function handleInput(e) {
    setQuery(e.target.value)
    search(query)
  }

  
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
   

  async function getRecommendations(artistId, trackId) {
    const accesstoken = await getAccessToken()
    const headers = {
      headers: {
        'Authorization': 'Bearer ' + accesstoken
      }
    }
    const request = await fetch(`https://api.spotify.com/v1/recommendations?seed_artists=${artistId}&seed_genres=classical%2Ccountry&seed_tracks=${trackId}`,headers)
    const result = await request.json()
    setRecommendations(result.tracks)
  }
     

  function handleClick(person) {
    setQuery('')
    getRecommendations(person.artists[0].id,person.id)
    
  }


  function handleAudioPlay(audioUrl) {
  const audioElement = new Audio(audioUrl);
  console.log(audioElement.currentSrc)
  audioElement.play();
  }


  function hover(person) {
    console.log(person)
    divRef.current.style.backgroundImage = `url(${person.album.images[0].url})`;
    blurRef.current.style.backgroundImage = `url(${person.album.images[1].url})`;
    handleAudioPlay(person.preview_url);
  }
  


  return (
    <>

      <div className="wrapper">
        <div className="searchcontent">
          <div className="searchmain">
          <div className="searchinput">
          {/* <button onClick={getRecommendations}></button> */}
          <input value={query} onChange={handleInput}/>
         
        </div>
        </div>
        </div>
      </div>
      {query.length>0?<SearchResultList searchResults={searchResults} handleClick={handleClick}/>:null}
      <div className="container">{<RecommendedList rec={recommendations} hover={hover}/>}<div className="test"><div className="blurry-bg"  ><div className="background" ref={blurRef}></div><div className="musicImage" ref={divRef}></div></div></div></div>

    </>
  )
}