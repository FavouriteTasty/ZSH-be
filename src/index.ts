import { Hono } from 'hono'
import * as dotenv from "dotenv";

dotenv.config(); 

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/api/hello', (c) => {
  return c.json({
    ok: true,
    message: 'Hello Hono!',
  })
})

export default app
