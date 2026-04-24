const logger = {
  info: (message: string) => console.log(`[${new Date().toISOString()}] INFO: ${message}`),
  error: (message: string) => console.error(`[${new Date().toISOString()}] ERROR: ${message}`),
  warn: (message: string) => console.warn(`[${new Date().toISOString()}] WARN: ${message}`),
  debug: (message: string) => console.log(`[${new Date().toISOString()}] DEBUG: ${message}`),
};

export default logger;