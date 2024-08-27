import { productService } from "~/server/app/services/products";
import { ProductSchema } from "~/utils/schema/products";
import { z, parseBodyAs, } from "@sidebase/nuxt-parse"
import { ZodError } from "zod"
import sendZodErrorResponse from "~/server/app/errors/response/zodErrors";

export default eventHandler(async (event) => {
  try {
    const id = event.context?.params?.id ?? '';
    const data = await parseBodyAs(event, ProductSchema)
    return await productService.editProduct(Number(id), data)
  } catch (err: any) {
    if (err?.data instanceof ZodError) {
      return await sendZodErrorResponse(event, err.data)
    }
    return await sendError(event, err)
  }
})