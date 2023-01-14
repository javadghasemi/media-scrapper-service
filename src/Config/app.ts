export const app: {
  mode: string,
  http: {
    port: string
  }
} = {
  mode: process.env["MODE"] || 'dev',
  http: {
    port: process.env["PORT"] || '81'
  }
}
