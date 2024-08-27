import { productService } from "~/server/app/services/products";
import { ProductSchema } from "~/utils/schema/products";
import { parseBodyAs, } from "@sidebase/nuxt-parse"
import { ZodError } from "zod"
import sendZodErrorResponse from "~/server/app/errors/response/zodErrors";
import sendDefaultErrorResponse from "~/server/app/errors/response/defaultError";

export default eventHandler(async (event) => {
  try {
    const data = await parseBodyAs(event, ProductSchema)
    return await productService.create(data)
  } catch (err: any) {
    if (err?.data instanceof ZodError) {
      return await sendZodErrorResponse(event, err.data)
    }
    return await sendDefaultErrorResponse(event, 'oops', 500, err)
  }
})