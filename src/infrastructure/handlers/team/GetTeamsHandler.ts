import { Context } from "hono"
import { HTTPException } from "hono/http-exception"
import { AppDataSource } from "../../database/AppDataSource"
import { Team } from "../../../domain/entities/Team"
import { TeamService } from "../../../application/services/TeamService"
import { ValidationError } from "../../../domain/errors/ValidationError"

export class GetTeamsHandler {
  async handle(c: Context) {
    const sort = c.req.query("sort")
    const name = c.req.query("name")
    const teamRepository = AppDataSource.getRepository(Team)
    const teamService = new TeamService(teamRepository)

    try {
      if (sort && sort !== "name" && sort !== "-name") {
        throw new ValidationError(`Invalid sort value: "${sort}"`)
      }

      let teams = await teamService.findAll()

      if (name) {
        teams = teams.filter(t =>
          t.name.toLowerCase().includes(name.toLowerCase())
        )
        return c.json({
          success: true,
          message: `Teams filtered by name: ${name}`,
          data: teams
        }, 200)
      }

      if (sort === "-name") {
        teams = teams.sort((a, b) => b.name.localeCompare(a.name))
      } else {
        teams = teams.sort((a, b) => a.name.localeCompare(b.name))
      }

      return c.json({
        success: true,
        message: "All teams",
        data: teams
      }, 200)

    } catch (e) {
      if (e instanceof ValidationError) {
        throw new HTTPException(400, { message: e.message })
      }
      throw e
    }
  }
}