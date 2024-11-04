export const clogger = (message: string, ...rest: unknown[]) => {
  console.log(`[${new Date().toISOString()}] ${message} ${rest}`);
}
