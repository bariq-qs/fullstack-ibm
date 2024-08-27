import {defineNuxtRouteMiddleware, useNuxtApp} from "#app";
import {useAuthCookie} from "~/composables/useAuth";
import { isEmpty } from "lodash";

export default defineNuxtRouteMiddleware(async(to) => {
  const auth = await useAuthCookie()
  if (isEmpty(auth.value)) {
    return navigateTo('/login')
  }
})
