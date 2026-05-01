import { Context } from "hono"
import { stadiums } from "infrastructure/mock/stadiums"

export class GetStadiumsHandler {
  async handle(c: Context) {
    return c.json({
      success: true,
      message:  "All stadiums",
      data: stadiums
    }, 200)
  }
}