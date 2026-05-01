import { Context } from "hono"
import { cities } from "../../mock/cities"

export class GetCitiesHandler {
  async handle(c: Context) {
    return c.json({
      success: true,
      message: "All cities",
      data: cities
      
    }, 200)
  }
}