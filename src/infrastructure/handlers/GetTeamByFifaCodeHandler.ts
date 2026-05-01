 import { Context } from "hono";
 import { teams } from "infrastructure/mock/teams";


 export class GetTeamByFifaCodeHandler {
   async  handle(c: Context) {
   const fifaCode = String(c.req.param("fifaCode"));
           if (!/^[A-Z]{3}$/.test(fifaCode)) {
      return c.json({
      success: false,
      error: `Invalid FIFA code: "${fifaCode}"`
    }, 400)
  }
          const team = teams.find(t => t.code.value === fifaCode);
              if (!team) {
                return c.json({
                  success: false,
                  error: "Team " + fifaCode + " does not exist"
                }, 404);
              }

              return c.json({
                success: true,
                message: "Team " + fifaCode,
                data: team
              }, 200);
            }
    
}
