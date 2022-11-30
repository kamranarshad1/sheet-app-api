export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message

  return 'something went wrong'
}
