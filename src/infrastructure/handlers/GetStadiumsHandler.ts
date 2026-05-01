import { Context } from "hono"
import { stadiums } from "infrastructure/mock/stadiums"

export class GetStadiumsHandler {
  async handle(c: Context) {
    const name = c.req.query("name")

    let result = [...stadiums]

    if (name) {
      result = result.filter(s => 
        s.name.toLowerCase().includes(name.toLowerCase())
      )
      return c.json({
        success: true,
        message: `Stadiums filtered by name: ${name}`,
        data: result
      }, 200)
    }
    return c.json({
      success: true,
      message:  "All stadiums",
      data: stadiums
    }, 200)
  }
}