import { Hono } from "hono";
import { teams} from 'infrastructure/mock/teams'
import { GetTeamByFifaCodeHandler } from "infrastructure/handlers/team/GetTeamByFifaCodeHandler";
import { GetTeamsHandler } from "infrastructure/handlers/team/GetTeamsHandler";
import { GetTeamMatchsByFifaCodeHandler } from "infrastructure/handlers/team/GetTeamMatchsByFifaCodeHandler";
import { GetTeamMatchsByStageHandler } from "infrastructure/handlers/team/GetTeamMatchsByStageHandler";
export const TeamsRouter = new Hono()

TeamsRouter.get("/:fifaCode/matchs/:stage", (c) => new GetTeamMatchsByStageHandler().handle(c))
TeamsRouter.get("/", (c) => new GetTeamsHandler().handle(c))
TeamsRouter.get('/:fifaCode', (c) => new GetTeamByFifaCodeHandler ().handle(c))
TeamsRouter.get("/:fifaCode/matchs", (c) => new GetTeamMatchsByFifaCodeHandler().handle(c))
