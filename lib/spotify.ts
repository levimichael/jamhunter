export const getAccessToken = async () => {
  const { clientId, clientSecret } = useRuntimeConfig()
  const code = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

  interface TokenResponse {
    access_token: string
    token_type: string
    expires_in: number
  }

  const { access_token } = await $fetch<TokenResponse>(
    'https://accounts.spotify.com/api/token',
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${code}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials'
    }
  )
  return access_token
}

export const getTracks = async () => {
  const token = await getAccessToken()
  const data = await $fetch(
    'https://api.spotify.com/v1/search?type=track&include_external=audio&q=year:2024&limit=50&market=US&popularity=100',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
  

  return data.tracks.items.map(item => {
    return {
      id: item.id,
      name: item.name,
      artists: item.artists.map(artist => {
        return {
          name: artist.name,
          href: artist.href
        }
      }),
      album: item.album.name,
      image: item.album.images[0].url,
      preview: item.preview_url,
      releaseDate: item.album.release_date,
      href: item.href,
      duration: item.duration_ms,
      popularity: item.popularity
    }
  })
}
