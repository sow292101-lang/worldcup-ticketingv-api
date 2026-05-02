import { matchs } from 'infrastructure/mock/matchs'
import { GetMatchsHandler } from 'infrastructure/handlers/matchs/GetMatchsHandler'
import { GetMatchByIdHandler } from 'infrastructure/handlers/matchs/GetMatchByIdHandler'
import { GetMatchsByStageHandler } from 'infrastructure/handlers/matchs/GetMatchsByStageHandler'
import { GetMatchsByStatusHandler } from 'infrastructure/handlers/matchs/GetMatchByStatusHandler'


import { Hono } from 'hono'


export const matchsRouter = new Hono()

matchsRouter.get("/stages/:stage", (c) => new GetMatchsByStageHandler().handle(c));
matchsRouter.get("/status/:status", (c) => new GetMatchsByStatusHandler().handle(c));
matchsRouter.get('/', (c) => new GetMatchsHandler().handle(c))
matchsRouter.get('/:id', (c) => new GetMatchByIdHandler().handle(c))