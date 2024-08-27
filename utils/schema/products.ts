import { z } from 'zod'
import ERROR_MSG from "~/utils/constant/errorMsg";

export const ProductSchema = z.object({
  name: z.string()
      .min(1, `Nama ${ERROR_MSG.FORM_REQUIRED}`),
  price: z
      .number()
      .min(0, `Harga ${ERROR_MSG.FORM_MIN_NUMBER(0)}`),
  description: z.string().optional(),
  image_url: z.string().optional(),
  latitude: z.number().optional(),
  longtitude: z.number().optional()
})

export type TProductSchema = z.infer<typeof ProductSchema>

export const initialProduct: TProductSchema = {
  name: '',
  price: 0,
  description: '',
  image_url: '',
  latitude: 0,
  longtitude: 0,
}