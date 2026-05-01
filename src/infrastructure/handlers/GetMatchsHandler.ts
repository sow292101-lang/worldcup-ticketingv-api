import { Context } from "hono"
import { matchs } from "../mock/matchs"

export class GetMatchsHandler {
  async handle(c: Context) {
    const teamCode = c.req.query("team[code]")

    let result = [...matchs]

    if (teamCode) {
      if (!/^[A-Z]{3}$/.test(teamCode.toUpperCase())) {
        return c.json({
          success: false,
          error: `Invalid FIFA code: "${teamCode}"`
        }, 400)
      }

      result = result.filter(m =>
         m.homeTeam.code.value === teamCode.toUpperCase() ||
    m.awayTeam.code.value === teamCode.toUpperCase()
      )

      return c.json({
        success: true,
        message: `Matchs filtered by team[code]: ${teamCode.toUpperCase()}`,
        data: result
      }, 200)
    }

    return c.json({
      success: true,
      message: "All matchs",
      data: result
    }, 200)
  }
}