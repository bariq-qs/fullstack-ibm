import { productService } from "~/server/app/services/products";
import { PaginationOptionsRequest } from "~/utils/types/Pagination";

export default eventHandler(async (event) => {
  try {
    const id = event.context?.params?.id ?? '';
    return await productService.getDetail(Number(id))
  } catch (err) {
    return await sendError(event, err)
  }

})