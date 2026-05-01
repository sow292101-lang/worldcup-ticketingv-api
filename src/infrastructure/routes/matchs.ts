import { matchs } from 'infrastructure/mock/matchs'
import { GetMatchsHandler } from 'infrastructure/handlers/GetMatchsHandler'
import { GetMatchByIdHandler } from 'infrastructure/handlers/GetMatchByIdHandler'
import { Hono } from 'hono'


export const matchsRouter = new Hono()


matchsRouter.get('/', (c) => new GetMatchsHandler().handle(c))
matchsRouter.get('/:id', (c) => new GetMatchByIdHandler().handle(c))