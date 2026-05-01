import { Context } from "hono";

export class GetHomeHandler {
  handle(c: Context) {
    return c.json({
      success: true,
      message: "World Cup Ticketing API"
      
    }, );
  }
}