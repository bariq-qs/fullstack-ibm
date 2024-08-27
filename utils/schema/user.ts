import { z } from 'zod'
import ERROR_MSG from "~/utils/constant/errorMsg";

export const LoginSchema = z.object({
  username: z.string()
      .min(1, `Username ${ERROR_MSG.FORM_REQUIRED}`),
  password: z
      .string()
      .min(8, `Password ${ERROR_MSG.FORM_MAX_CHAR(8)}`)
})

export type TLoginSchema = z.infer<typeof LoginSchema>

export const initialValueLogin: TLoginSchema = {
  username: '',
  password: ''
}