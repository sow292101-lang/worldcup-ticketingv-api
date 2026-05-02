import { Hono } from "hono"
import { GetCountriesHandler } from "infrastructure/handlers/country/GetCountriesHandler"
import { GetCountryCitiesHandler } from "infrastructure/handlers/country/GetCountryCitiesHandler";
export const countriesRouter = new Hono()

countriesRouter.get("/:code/cities", (c) => new GetCountryCitiesHandler().handle(c));
countriesRouter.get("/", (c) => new GetCountriesHandler().handle(c))