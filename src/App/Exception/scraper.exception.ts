export class ScraperException extends Error {
  constructor(message: string, public code: string) {
    super(message);
  }
}