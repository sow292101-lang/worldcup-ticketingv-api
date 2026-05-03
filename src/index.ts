import "reflect-metadata"
import { AppDataSource } from "./infrastructure/database/AppDataSource"
import { app } from "./infrastructure/app"

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected")
    console.log(`Server running on port ${process.env.PORT}`)
  })
  .catch((err) => {
    console.error("Can't connect database")
    console.error(err)
    process.exit(1)
  })

export default {
  port: process.env.PORT ? Number(process.env.PORT) : 3000,
  fetch: app.fetch
}