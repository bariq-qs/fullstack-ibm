export class PaginationOptionsRequest {
  limit?: number;
  page?: number;

  constructor(paginationOptions: any) {
    this.limit = paginationOptions?.limit ? Number(paginationOptions.limit) : 10;
    this.page = paginationOptions?.page ? Number(paginationOptions.page) : 1;
  }
}