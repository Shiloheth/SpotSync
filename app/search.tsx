"use client";

import { useState,useEffect } from "react";
import { getAccessToken } from "../utils/supabase";
import { fetchAccessToken } from "../utils/authUtils";
import { MouseEventHandler } from 'react';
import Image from "next/image";

export default function Page() {
  const[query,setQuery]=useState<string>('')
  const[searchResults,setSearchResults]=useState([])
  const[artistId,setArtistId] = useState('')
  const[trackId,setTrackId] = useState('')



  function assignIdState(object){
  setArtistId(object.artists[0].id)
  setTrackId(object.id)
  }

  // run the search function whenever the query is updated
  function handleInput(e){
    setQuery(e.target.value)
    search(query)
  }
  // fetch a new access token every hour
  useEffect(() => {
  const intervalId = setInterval(() => {
    fetchAccessToken()
    }, 3600000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);


  async function search(query:string) {
    const accesstoken = await getAccessToken()
    const headers = {
      headers: {
        'Authorization': 'Bearer ' + accesstoken
      }
    }
    try{
      const request = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, headers)
      console.log(request)
      if(!request.ok){
        const text = await request.json()
        throw new Error(text.error.message)}
      else{
        const result = await request.json()
        setSearchResults(result.tracks?.items)
      }

    }
    catch(error){
      console.log(error)
      if(error.message==='The access token expired'){
        fetchAccessToken()}
      }
    }

    async function getRecommendations(){
      const accesstoken = await getAccessToken()
      const headers = {
        headers: {
          'Authorization': 'Bearer ' + accesstoken
        }
      
    }
    const request = await fetch(`https://api.spotify.com/v1/recommendations?seed_artists=${artistId}&seed_genres=classical%2Ccountry&seed_tracks=${trackId}`,headers)
    const result = await request.json()
    console.log(result)
  }

    function SearchResultList({ searchResults,}) {




    
      
    
    
      const listItems = searchResults && searchResults.map(person => (
        <li  onClick={()=>assignIdState(person)}>
          <img src={person.album.images[2].url}/>
          <div className="listitems">
            <div  className="song">{person.name}</div>
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

    return(
    <>
      <div className="header">
      <div className="headerName">SpotSync</div>
      <div className="svg"><div className="svgText">Powered by Spotify</div><Image src='/SpotifyBlack.svg' alt="my svg" height={30} width={30}/></div>
      </div>
      <div className="content">
        <h1>Explore new <span className="musicSpan">music</span> recommendations</h1>
        <h2>Use the tunes you love to find the tunes you'll love.</h2>
        </div>
      <div className="wrapper">
        <div className="searchinput">
          {/* <button onClick={getRecommendations}></button> */}
          <input onChange={handleInput}/>
          {query.length>0?<SearchResultList searchResults={searchResults}/>:null}
        </div>
      </div>
    </>
    )
  }