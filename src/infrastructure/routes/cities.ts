import { Hono } from "hono"
import { GetCitiesHandler } from "infrastructure/handlers/GetCitiesHandler"

export const citiesRouter = new Hono()

citiesRouter.get("/", (c) => new GetCitiesHandler().handle(c))