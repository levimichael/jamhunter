import { getTracks } from '~/lib/spotify'
export default defineEventHandler(async () => {
  const tracks = Promise.all([getTracks(), getTracks(), getTracks()])
  return tracks.flat()
})
