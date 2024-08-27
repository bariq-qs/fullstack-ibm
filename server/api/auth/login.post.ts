import { parseBodyAs, } from "@sidebase/nuxt-parse"
import { ZodError } from "zod"
import sendZodErrorResponse from "~/server/app/errors/response/zodErrors";
import { authService } from "~/server/app/services";
import { LoginSchema } from "~/utils/schema/user";

export default eventHandler(async (event) => {
  try {
    const data = await parseBodyAs(event, LoginSchema)
    return await authService.login(event, data)
  } catch (err: any) {
    if (err?.data instanceof ZodError) {
      return await sendZodErrorResponse(event, err.data)
    }
    return await sendError(event, err)
  }
})