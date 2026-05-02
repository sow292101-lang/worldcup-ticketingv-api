import { Context } from "hono"
import { countries } from "infrastructure/mock/contries"

export class GetCountriesHandler {
  async handle(c: Context) {
    const name = c.req.query("name")

    let result = [...countries]

    if (name) {
      result = result.filter(c => 
        c.name.toLowerCase().includes(name.toLowerCase())
      )
      return c.json({
        success: true,
        message: `Countries filtered by name: ${name}`,
        data: result
      }, 200)
    }
    return c.json({
      success: true,
      message:"All countries",
      data: countries
    }, 200)
  }
}