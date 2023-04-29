import { useState } from "react"
import { getAccessToken, getRefresh, updateAccessToken } from "../utils/supabase"




 



function HomePage() {
   const[inputText,setInputText]=useState('')
   const[searchResults,setSearchResults]=useState([])
   const[trackId,setTrackId]=useState('')
   const[genre,setGenres]=useState('')
   const[artistId,setArtistId]=useState('')
   const listItems = searchResults&&searchResults.map(person =>
    <li onClick={()=>{setTrackId(person.id);setArtistId(person.artists[0].id);console.log(trackId);console.log((artistId))}}><img src={person.album.images[2].url}/><div className="listitems"><div className="artist">{person.artists[0].name}</div><div className="song">{person.name}</div></div></li>
  );
  const accesstoken = 'BQBmVroGpQiD--SwfN1o74Dq6JPoHY9mfsNp88S7ZmvDl4VVikVgMCPbJlsnfYmpYGezxEjMbY1lBW_kJ6zgxS_eJsohYnX6-FzzlRAAgx2GyCqhZmyf3hJhfyLt4CvrJx05jxIlTY2ldJsYCr4WPnttzOIKi1pI21T5_ViJ4YX8E1VtnKfI-a9cCb-NCaWNgANpx0GIaThUgaaZPBu1HbQtKnDSwRPWty2rQUbp6Ec2E3-0c1D3fVyf51kvh5wG4C4iuFG5aOHCMFGv32zVv4Y'


  function handleInput(e) {
    const searchText = e.target.value
    setInputText(searchText)
    search(searchText)
  }
  
  async function search(query) {
    const headers = {
      headers: {
        'Authorization': 'Bearer ' + accesstoken
      }
    }
    const request = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, headers)
    const result = await request.json()
    setSearchResults(result.tracks?.items)
  }
  

   function requestUserAuthorization(){
    
      const response_type = 'code'
      const client_id = process.env.NEXT_PUBLIC_CLIENT_ID
      const scope = 'user-top-read playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public'
      const  redirect_uri = 'http://localhost:3000/'
      
      const url = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=${scope}`
      console.log(url)
      window.location.href=url
    }



    async function getAccess(){
      const tokenUrl = "https://accounts.spotify.com/api/token";
      const code = process.env.NEXT_PUBLIC_CODE
      const client_id = process.env.NEXT_PUBLIC_CLIENT_ID
      const client_secret = process.env.NEXT_PUBLIC_CLIENT_SECRET
      const  redirect_uri = 'http://localhost:3000/'
      const auth = Buffer.from(client_id + ':' + client_secret).toString('base64');
      const options = {
         method: "POST",
         headers: {
           "Content-Type": "application/x-www-form-urlencoded",
           Authorization: `Basic ${auth}`,
         },
         body: `grant_type=authorization_code&redirect_uri=${redirect_uri}&code=${code}`
       };
     
       const response = await fetch(tokenUrl,options);
       const data = await response.json();
       console.log(data)

     }
    
     async function data(){
      
      const headers = {
        headers: {
          'Authorization': 'Bearer ' + accesstoken
        }
      }
    
        const request = await fetch("https://api.spotify.com/v1/recommendations?seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical%2Ccountry&seed_tracks=0c6xIDDpzE81m2q797ordA",headers )
        console.log(await request.json())
    
    }

    async function track(){
      const headers = {
        headers: {
          'Authorization': 'Bearer ' + accesstoken
        }
      }
    const request = await fetch(`https://api.spotify.com/v1/tracks/${id}`,headers )
    const result = await request.json()
    console.log(result)
   
    }

    
    return <div><button onClick={requestUserAuthorization}>authorize</button>
    <button onClick={getAccessToken}>access</button>
    <button onClick={data}>data</button>
    <button onClick={search}>search</button>
    <button onClick={track}>track</button>
    <button onClick={getAccessToken}>supabase</button>
    <div className="inputstyle"><input onChange={handleInput}/></div>
    {inputText.length>0?<div style={{height:'200px',width:'600px',backgroundColor:'#222',color:'white',overflow:'auto'}}><ul>{listItems}</ul></div>:null}
    </div>
  }
  
  export default HomePage