const rupiahFormat = (nominal: number): string => `Rp. ${Number(nominal).toLocaleString('id-ID')}`

export {
  rupiahFormat
}