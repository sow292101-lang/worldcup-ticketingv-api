import { Context } from "hono"
import { HTTPException } from "hono/http-exception"
import { AppDataSource } from "infrastructure/database/AppDataSource"
import { Team } from "domain/entities/Team"

export class GetTeamsHandler {
  async handle(c: Context) {
    const sort = c.req.query("sort")
    const name = c.req.query("name")

    if (sort && sort !== "name" && sort !== "-name") {
      throw new HTTPException(400, { message: `Invalid sort value: "${sort}"` })
    }

    const teamRepository = AppDataSource.getRepository(Team)

    const order = sort === "-name" ? "DESC" : "ASC"

    if (name) {
      const result = await teamRepository
        .createQueryBuilder("team")
        .where("LOWER(team.name) LIKE LOWER(:name)", { name: `%${name}%` })
        .orderBy("team.name", order)
        .getMany()
      return c.json({
        success: true,
        message: `Teams filtered by name: ${name}`,
        data: result
      }, 200)
    }

    const result = await teamRepository
      .createQueryBuilder("team")
      .orderBy("team.name", order)
      .getMany()

    return c.json({
      success: true,
      message: "All teams",
      data: result
    }, 200)
  }
}