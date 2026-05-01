import { Context } from "hono"
import { countries } from "infrastructure/mock/contries"

export class GetCountriesHandler {
  async handle(c: Context) {
    return c.json({
      success: true,
      message:"All countries",
      data: countries
    }, 200)
  }
}