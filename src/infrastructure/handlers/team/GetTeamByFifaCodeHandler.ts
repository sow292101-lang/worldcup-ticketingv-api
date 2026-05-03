import { Context } from "hono"
import { HTTPException } from "hono/http-exception"
import { AppDataSource } from "../../database/AppDataSource"
import { Team } from "../../../domain/entities/Team"
import { TeamService } from "../../../application/services/TeamService"
import { NotFoundError } from "../../../domain/errors/NotFoundError"
import { ValidationError } from "../../../domain/errors/ValidationError"

export class GetTeamByFifaCodeHandler {
  async handle(c: Context) {
    const fifaCode = String(c.req.param("fifaCode")).toUpperCase()
    const teamRepository = AppDataSource.getRepository(Team)
    const teamService = new TeamService(teamRepository)

    try {
      if (!/^[A-Z]{3}$/.test(fifaCode)) {
        throw new ValidationError(`Invalid FIFA code: "${fifaCode}"`)
      }

      const team = await teamService.findByFifaCode(fifaCode)
      return c.json({
        success: true,
        message: "Team " + fifaCode,
        data: team
      }, 200)

    } catch (e) {
      if (e instanceof ValidationError) {
        throw new HTTPException(400, { message: e.message })
      }
      if (e instanceof NotFoundError) {
        throw new HTTPException(404, { message: e.message })
      }
      throw e
    }
  }
}