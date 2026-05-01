import { Hono } from "hono";
import { teams} from 'infrastructure/mock/teams'
import { GetTeamByFifaCodeHandler } from "infrastructure/handlers/GetTeamByFifaCodeHandler";
import { GetTeamsHandler } from "infrastructure/handlers/GetTeamsHandler";


export const TeamsRouter = new Hono()


TeamsRouter.get("/", (c) => new GetTeamsHandler().handle(c))
TeamsRouter.get('/:fifaCode', (c) => new GetTeamByFifaCodeHandler ().handle(c))
