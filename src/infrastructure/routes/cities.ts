import { Hono } from "hono"
import { GetCitiesHandler } from "infrastructure/handlers/cities/GetCitiesHandler"
import { GetCityMatchsHandler } from "infrastructure/handlers/cities/GetCityMatchsHandler";
import { GetCityByNameHandler } from "infrastructure/handlers/cities/GetCityByNameHandler";
export const citiesRouter = new Hono()
citiesRouter.get("/:name/matchs", (c) => new GetCityMatchsHandler().handle(c));
citiesRouter.get("/:name", (c) => new GetCityByNameHandler().handle(c));
citiesRouter.get("/", (c) => new GetCitiesHandler().handle(c))