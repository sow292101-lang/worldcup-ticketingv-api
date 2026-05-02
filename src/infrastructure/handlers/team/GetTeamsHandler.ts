import { Context } from "hono"
import { teams } from "infrastructure/mock/teams"
import { HTTPException } from "hono/http-exception"

export class GetTeamsHandler {
  async handle(c: Context) {
  const sort = c.req.query("sort")
  const name = c.req.query("name")
    if (sort && sort !== "name" && sort !== "-name") {
     throw new HTTPException(400, { message: `Invalid sort value: "${sort}"` })
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