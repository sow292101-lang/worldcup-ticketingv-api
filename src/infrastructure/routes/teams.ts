import { Hono } from "hono";
import { teams} from 'infrastructure/mock/teams'
import { GetTeamByFifaCodeHandler } from "infrastructure/handlers/home/GetTeamByFifaCodeHandler";



export const TeamsRouter = new Hono()



TeamsRouter.get('/:fifacode', (c) => new GetTeamByFifaCodeHandler ().handle(c))