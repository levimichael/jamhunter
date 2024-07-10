import { getTracks } from '~/lib/spotify'
export default defineEventHandler(async () => {
  const tracks = await Promise.all([getTracks(0), getTracks(50), getTracks(100)])
  return tracks.flat()
})
