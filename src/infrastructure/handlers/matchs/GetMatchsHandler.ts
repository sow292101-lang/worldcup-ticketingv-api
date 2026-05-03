import { Context } from "hono"
import { matchs } from "../../mock/matchs"
import { Match } from "domain/entities/Match"
import { MatchStage } from "domain/enum/MatchStage"
import { HTTPException } from "hono/http-exception"
import { AppDataSource } from "infrastructure/database/AppDataSource"

export class GetMatchsHandler {
  async handle(c: Context) {
    const teamCode = c.req.query("team[code]")
    const stage = c.req.query("stage")
    const date = c.req.query("date")
  
     const matchRepository = AppDataSource.getRepository(Match)
    if(stage){
         if (!Object.values(MatchStage).includes(stage as MatchStage)) {
        throw new HTTPException(400, { message: `Invalid stage: "${stage}"` })
      }
      const result = await matchRepository.find({
          where: { stage: stage as MatchStage },
        relations: ["homeTeam", "awayTeam", "stadium", "stadium.city", "stadium.city.country"]
      })
      
      return c.json({
        success: true,
        message: `Matchs filtered by stage: ${stage}`,
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

      const allMatchs = await matchRepository.find({ 
        relations: ["homeTeam", "awayTeam", "stadium", "stadium.city", "stadium.city.country"]
      })
      const result = allMatchs.filter(m =>
        m.homeTeam.code.value === teamCode.toUpperCase() || 
        m.awayTeam.code.value === teamCode.toUpperCase() 
      )

      return c.json({
        success: true,
        message: `Matchs filtered by team[code]: ${teamCode.toUpperCase()}`,
        data: result
      }, 200)
    }
      if (date) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return c.json({
          success: false,
          error: `Invalid date format: "${date}"`
        }, 400)
      }

       const allMatchs = await matchRepository.find({ 
        relations: ["homeTeam", "awayTeam", "stadium", "stadium.city", "stadium.city.country"]
      })
      const result = allMatchs.filter(m =>
        m.date.toISOString().split("T")[0] === date
      )
    
    

      return c.json({
        success: true,
        message: `Matchs filtered by date: ${date}`,
        data: result
      }, 200)
    }
        const result = await matchRepository.find({ 
      relations: ["homeTeam", "awayTeam", "stadium", "stadium.city", "stadium.city.country"]
    })

    return c.json({
      success: true,
      message: "All matchs",
      data: result
    }, 200)
  }
}