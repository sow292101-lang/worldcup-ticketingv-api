import { Context } from "hono"
import { matchs } from "../mock/matchs"

export class GetMatchsHandler {
  async handle(c: Context) {
    return c.json({
      success: true,
      message: "All matchs",
      data: matchs
    })
  }
}