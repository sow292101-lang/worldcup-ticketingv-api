import { Hono } from "hono";
import { GetHomeHandler } from "infrastructure/handlers/home/GetHomeHandlers";
import { GetHealthHandler } from "infrastructure/handlers/home/GetHealthHandler";

export const homeRouter = new Hono();

homeRouter.get("/", (c) => new GetHomeHandler().handle(c));
homeRouter.get("/health", (c) => new GetHealthHandler().handle(c));