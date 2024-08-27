export const useAuthCookie = () => useCookie('auth_token')
export const useProfileCookie = () => {
  return useCookie('profile').value
}