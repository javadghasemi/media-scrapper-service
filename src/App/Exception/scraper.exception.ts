export class ScraperException extends Error {
  constructor(message: string, public code: string, public statusCode: number = 500) {
    super(message);
  }
}