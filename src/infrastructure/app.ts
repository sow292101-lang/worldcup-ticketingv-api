import { Hono } from 'hono'
import { matchs } from './mock/matchs'
import { matchsRouter } from './routes/matchs'
import { homeRouter } from './routes/home'
export const app = new Hono()


app.route('/matchs', matchsRouter)
app.route("/", homeRouter);