import "reflect-metadata"
import { AppDataSource } from "./AppDataSource"
import { Country } from "domain/entities/Country"
import { City } from "../../domain/entities/City"
import { Stadium } from "../../domain/entities/Stadium"
import { Team } from "../../domain/entities/Team"
import { Match } from "../../domain/entities/Match"
import { countries } from "../mock/contries"
import { cities } from "../mock/cities"
import { stadiums } from "../mock/stadiums"
import { teams } from "../mock/teams"
import { matchs } from "../mock/matchs"
import { Ticket } from "domain/entities/Ticket"

// async function clear(): Promise<void> {
//     try {
//         if (!AppDataSource.isInitialized) {
//             await AppDataSource.initialize()
//         }
//         const gestticket = AppDataSource.getRepository(Ticket)
//         const gestmatch = AppDataSource.getRepository(Match)
//         const gestteam = AppDataSource.getRepository(Team)
//         const geststad = AppDataSource.getRepository(Stadium)
//         const gestcity = AppDataSource.getRepository(City)
//         const gestcontry = AppDataSource.getRepository(Country)
//         await gestticket.delete({})
//         await gestmatch.delete({})
//         await gestteam.delete({})
//         await geststad.delete({})
//         await gestcity.delete({})
//         await gestcontry.delete({})
//         //on ferme la base de donnée
//         await AppDataSource.destroy()
//         console.log("base de donnée a été fermer")
//     } catch (error) {
//         console.error(error)
//         console.error("impossible de videe la base de donnée")
//     }
// }




async function clear(): Promise<void> {
    try {
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize()
        }
        
        await AppDataSource.dropDatabase()
        await AppDataSource.synchronize()
        
        await AppDataSource.destroy()
        console.log("base de donnée a été fermer")
    } catch (error) {
        console.error(error)
        console.error("impossible de videe la base de donnée")
    }
}
async function seed(): Promise<void> {
    try {
        await clear()

        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize()
        }
        const gestticket = AppDataSource.getRepository(Ticket)
        const gestcontry = AppDataSource.getRepository(Country)
        const gestcity = AppDataSource.getRepository(City)
        const geststad = AppDataSource.getRepository(Stadium)
        const gestteam = AppDataSource.getRepository(Team)
        const gestmatch = AppDataSource.getRepository(Match)

        
        for (const country of countries) {
            await gestcontry.save(
                gestcontry.create({ name: country.name, code: country.code })
            )
        }
        console.log("Countries inserer")

       
        for (const city of cities) {
            const country = await gestcontry.findOneBy({ name: city.country.name })
            await gestcity.save(
                gestcity.create({ name: city.name, country: country !})
            )
        }
        console.log("Cities inserer")

        
        for (const stadium of stadiums) {
            const city = await gestcity.findOneBy({ name: stadium.city.name })
            await geststad.save(
                geststad.create({ name: stadium.name, city: city!, capacity: stadium.capacity })
            )
        }
        console.log("Stadiums inserer")

       
        for (const team of teams) {
            await gestteam.save(
                gestteam.create({ name: team.name, code: team.code, country: team.country })
            )
        }
        console.log("Teams inserer")

        
        for (const match of matchs) {
            const homeTeam = await gestteam.findOneBy({ name: match.homeTeam.name })
            const awayTeam = await gestteam.findOneBy({ name: match.awayTeam.name })
            const stadium = await geststad.findOneBy({ name: match.stadium.name })
            await gestmatch.save(
                gestmatch.create({
                    homeTeam: homeTeam!,
                    awayTeam: awayTeam!,
                    homeScore: match.homeScore,
                    awayScore: match.awayScore,
                    stadium: stadium!,
                    stage: match.stage,
                    status: match.status,
                    date: match.date
                })
            )
        }
        console.log("Matchs inserer")

        await AppDataSource.destroy()
        console.log("la base de donnée a été initialiser")
    } catch (error) {
        console.error(error)
    }
}

seed()