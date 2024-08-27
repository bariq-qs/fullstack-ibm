const ERROR_MSG = {
  FORM_REQUIRED: 'harus diisi.',
  FORM_MAX_CHAR: (limit: string | number) => `maksimal diisi sebanyak ${limit} karakter`,
  FORM_MIN_NUMBER: (limit: string | number) => `harus lebih dari ${limit}.`,
}

export default ERROR_MSG
