export const handleError = (res: any, error: any, message: string) => {
  console.error(error);
  res.status(500).json({ error: message });
};
