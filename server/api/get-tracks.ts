import { getTracks } from '~/lib/spotify'
export default defineEventHandler(async () => {
  const tracks = await Promise.all([getTracks(0), getTracks(50), getTracks(100),getTracks(150), getTracks(200), getTracks(250), getTracks(300), getTracks(350), getTracks(400), getTracks(450)])
  return tracks.flat()
})
