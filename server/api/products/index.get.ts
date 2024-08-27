import { productService } from "~/server/app/services/products";
import { PaginationOptionsRequest } from "~/utils/types/Pagination";

export default eventHandler(async (event) => {
  const queries = getQuery(event)
  const paginate = new PaginationOptionsRequest({
    limit: queries?.limit,
    page: queries?.page
  })
  return await productService.getAll(paginate)
})