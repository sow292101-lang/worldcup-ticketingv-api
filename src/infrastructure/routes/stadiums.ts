import { Hono } from "hono"
import { GetStadiumsHandler } from "infrastructure/handlers/stadium/GetStadiumsHandler"
import { GetStadiumMatchsHandler } from "infrastructure/handlers/stadium/GetStadiumMatchsHandler";
import { GetStadiumByNameHandler } from "infrastructure/handlers/stadium/GetStadiumByNameHandler";



export const stadiumsRouter = new Hono()
stadiumsRouter.get("/:name/matchs", (c) => new GetStadiumMatchsHandler().handle(c));
stadiumsRouter.get("/:name", (c) => new GetStadiumByNameHandler().handle(c));
stadiumsRouter.get("/", (c) => new GetStadiumsHandler().handle(c))
