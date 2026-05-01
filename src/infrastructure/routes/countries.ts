import { Hono } from "hono"
import { GetCountriesHandler } from "infrastructure/handlers/GetCountriesHandler"

export const countriesRouter = new Hono()

countriesRouter.get("/", (c) => new GetCountriesHandler().handle(c))