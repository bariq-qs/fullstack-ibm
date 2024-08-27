import { productService } from "~/server/app/services/products";
import { ZodError } from "zod"
import sendZodErrorResponse from "~/server/app/errors/response/zodErrors";
import sendDefaultErrorResponse from "~/server/app/errors/response/defaultError";

export default eventHandler(async (event) => {
  try {
    const id = event.context?.params?.id ?? '';
    return await productService.delete(Number(id))
  } catch (err: any) {
    if (err?.data instanceof ZodError) {
      return await sendZodErrorResponse(event, err.data)
    }
    return await sendError(event, err)
  }
})