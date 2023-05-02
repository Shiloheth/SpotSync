import { supabase } from '../lib/supabaseClient';

export async function getAccessToken() {
  let { data } = await supabase.from('SpotSync').select()
  console.log(data)
  return data[0].tokens
}


export async function updateAccessToken (id, newToken) {
  const { error } = await supabase
  .from('SpotSync')
  .update({ tokens: newToken })
  .eq('id', id)
}