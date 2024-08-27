import prisma from "~/lib/prisma";
import { PaginationOptionsRequest } from "~/utils/types/Pagination";
import { TProductSchema } from "~/utils/schema/products";

export async function getAllProducts(paginate?: PaginationOptionsRequest) {
  const data = await prisma.products.findMany({
    take: (paginate?.limit ?? 10) + 1,
    skip: paginate?.page && paginate?.limit
        ? paginate.page * paginate.limit - paginate.limit
        : undefined,
  })
  const length = await prisma.products.count();
  const totalPage = paginate?.limit ? Math.ceil(length / paginate?.limit) : 1;
  return {
    data,
    meta: {
      total: length,
      page: paginate?.page,
      totalPage,
    }
  }
}

export async function getProductById(id: number) {
  return await prisma.products.findFirst({
    where: {id}
  })
}

export async function addProduct(data: TProductSchema) {
  const response = await prisma.$transaction(async () => {
    const newProduct = prisma.products.create({
      data
    });
    return newProduct
  })
  return response
}

export async function editProduct(id: number, data: TProductSchema) {
  const response = await prisma.$transaction(async () => {
    return await prisma.products.update({
      where: {id},
      data
    })
  })
}

export async function deleteProduct(id: number) {
  return await prisma.products.delete({
    where: {
      id,
    }
  })
}