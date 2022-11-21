import { getTracks } from '~/lib/spotify'
export default defineEventHandler(async () => {
  return getTracks()
})
