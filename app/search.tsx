"use client";

import { useState } from "react";
import { getAccessToken } from "../utils/supabase";
import { fetchAccessToken } from "../utils/authUtils";


export default function Page() {
  const[query,setQuery]=useState<string>('')
  const[searchResults,setSearchResults]=useState<string[]>([])
  
  function handleInput(e){
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

    return <div>
    <div className="wrapper">
      <div className="searchinput">
        <input onChange={handleInput}/>
       
      </div>
      
    </div>

    </div>
  }