import {
  addProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
  getProductById
} from "~/server/app/repositories/products";
import { TProductSchema } from "~/utils/schema/products";
import { PaginationOptionsRequest } from "~/utils/types/Pagination";

class ProductsService {
  async create(data: TProductSchema) {
    return await addProduct(data)
  }

  async editProduct(id: number, data: TProductSchema) {
    const findProduct = await getProductById(id)
    if (!findProduct) {
      throw createError({
        statusCode: 404,
        message: 'Product not found.'
      });
    }
    return await editProduct(id, data)
  }

  async getAll(paginate?: PaginationOptionsRequest) {
    return await getAllProducts(paginate)
  }

  async delete(id: number) {
    const findProduct = await getProductById(id)
    if (!findProduct) {
      throw (createError({
        statusCode: 404,
        message: 'Product not found.'
      }));
    }
    return await deleteProduct(id)
  }

  async getDetail(id: number) {
    const response = await getProductById(id)
    if (response) {
      return response
    }
    throw createError({
      statusCode: 404,
      message: 'Product not found.'
    });
  }
}

export const productService = new ProductsService()