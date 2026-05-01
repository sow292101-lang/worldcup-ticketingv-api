import { Context } from "hono"
import { matchs } from "../mock/matchs"
import { MatchStage } from "domain/enum/MatchStage"

export class GetMatchsHandler {
  async handle(c: Context) {
    const teamCode = c.req.query("team[code]")
    const stage = c.req.query("stage")
    let result = [...matchs]
    if(stage){
      if(Object.values(MatchStage).includes(stage as MatchStage)){
        return c.json({
          success: false,
          error: 'Invalid stage: "${stage}"`'
        }, 400)
      }
      result = result.filter(m=>m.stage === stage)
      return c.json({
        success: true,
        message: 'Matchs filtered by stage: ${stage}',
        data: result
      }, 200)
    }

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