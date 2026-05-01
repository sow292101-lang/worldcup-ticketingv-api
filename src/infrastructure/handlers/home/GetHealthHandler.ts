import { Context } from "hono";

export class GetHealthHandler {
  handle(c: Context) {
    return c.json({
      "success": true,
      "message": "World Cup Ticketing API",
      "uptime": "",
      "environment": ""
    },);
  }
}