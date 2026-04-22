export const imagePath = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
