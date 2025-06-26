class AppError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export default AppError;