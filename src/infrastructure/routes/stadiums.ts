import { Hono } from "hono"
import { GetStadiumsHandler } from "infrastructure/handlers/GetStadiumsHandler"

export const stadiumsRouter = new Hono()

stadiumsRouter.get("/", (c) => new GetStadiumsHandler().handle(c))