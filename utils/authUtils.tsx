import { updateAccessToken } from "./supabase";

export async function fetchAccessToken() {
    const refresh_token = process.env.NEXT_PUBLIC_REFRESH_TOKEN
    const client_id = process.env.NEXT_PUBLIC_CLIENT_ID
    const client_secret = process.env.NEXT_PUBLIC_CLIENT_SECRET   
    const url = 'https://accounts.spotify.com/api/token';
  
    const authOptions = {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=refresh_token&refresh_token=${refresh_token}`
    };
  
    
    const res = await fetch(url, authOptions);
    const data = await res.json();
    console.log(data)
    updateAccessToken(1,data.access_token)
     
}
  