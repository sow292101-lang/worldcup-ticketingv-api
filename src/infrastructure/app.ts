import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { matchs } from './mock/matchs'
import { matchsRouter } from './routes/matchs'
import { homeRouter } from './routes/home'
import { TeamsRouter } from './routes/teams'
import { citiesRouter } from "./routes/cities"
import { countriesRouter } from "./routes/countries"
import { stadiumsRouter } from "./routes/stadiums"
import { ticketsRouter } from './routes/tickets'
export const app = new Hono()

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return c.json({
      success: false,
      error: err.message
    }, err.status)
  }
  return c.json({
    success: false,
    error: "Internal Server Error"
  }, 500)
})
app.route('/matchs', matchsRouter)
app.route("/", homeRouter);
app.route("/teams", TeamsRouter)
app.route("/cities", citiesRouter)
app.route("/countries", countriesRouter)
app.route("/stadiums", stadiumsRouter)
app.route("/tickets", ticketsRouter)