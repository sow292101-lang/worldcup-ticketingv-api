import { Context } from "hono"
import { teams } from "infrastructure/mock/teams"

export class GetTeamsHandler {
  async handle(c: Context) {
  const sort = c.req.query("sort")

    if (sort && sort !== "name" && sort !== "-name") {
      return c.json({
        success: false,
        error: "Invalid sort value"
      }, 400)
    }

    let result = [...teams]

    if (sort === "-name") {
      result = result.sort((a, b) => b.name.localeCompare(a.name))
    } else {
    
      result = result.sort((a, b) => a.name.localeCompare(b.name))
    } 
    return c.json({
      message: "All teams",
      success: true,
      data: result
    }, 200)
  }
}