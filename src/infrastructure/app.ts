import { Hono } from 'hono'
import { matchs } from './mock/matchs'
import { matchsRouter } from './routes/matchs'
import { homeRouter } from './routes/home'
import { TeamsRouter } from './routes/teams'
import { citiesRouter } from "./routes/cities"
import { countriesRouter } from "./routes/countries"
import { stadiumsRouter } from "./routes/stadiums"
export const app = new Hono()


app.route('/matchs', matchsRouter)
app.route("/", homeRouter);
app.route("/teams", TeamsRouter)
app.route("/cities", citiesRouter)
app.route("/countries", countriesRouter)
app.route("/stadiums", stadiumsRouter)