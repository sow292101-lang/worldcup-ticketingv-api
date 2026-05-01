import { Hono } from 'hono'
import { matchs } from './mock/matchs'
export const app = new Hono()

app.get('/', (c) => {
  return c.json({
    success: true,
    message: "World Cup Ticketing API"
  })
})

app.get('/matchs', (c) => {
  return c.json({
    success: true,
    message: "All matchs",
    data: matchs
  })
})

app.get('/matchs/:id', (c) => {
  const id = Number(c.req.param("id"))
  const match = matchs[id -1];

  if (!match) {
    return c.json({
      success: false,
      error: "Match " + id + " does not exist"
    }, 404)
  }

  return c.json({
    success: true,
    data: match,
    message: "Match 1"
  }, 200)
})