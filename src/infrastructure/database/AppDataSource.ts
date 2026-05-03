import "reflect-metadata"
import { DataSource } from "typeorm"
import { Country } from "domain/entities/Country"
import { City } from "domain/entities/City"
import { Customer } from "domain/entities/Customer"
import { Ticket } from "domain/entities/Ticket"
import { Match } from "domain/entities/Match"
import { Team } from "domain/entities/Team"
import { Stadium } from "domain/entities/Stadium"
export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Country, City, Match, Ticket, Customer,Team, Stadium ]
})