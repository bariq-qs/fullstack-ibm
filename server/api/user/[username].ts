import { authService } from '~/server/app/services'

export default eventHandler(async (event) => {
  const username = event.context?.params?.username ?? '';
  return await authService.getDetailUserByUsername(username)
})