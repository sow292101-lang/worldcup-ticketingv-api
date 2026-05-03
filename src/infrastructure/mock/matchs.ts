import { Match } from "../../domain/entities/Match"
import { teams } from "./teams"
import { Stadium } from "../../domain/entities/Stadium"
import { stadiums } from "./stadiums"
import { MatchStage } from "../../domain/enum/MatchStage"
import { MatchStatus } from "../../domain/enum/MatchStatus"





export const matchs = [

   
    new Match(
        1,
        teams[0],
        teams[1],
        2,
        1,
        stadiums[0],
        MatchStage.GROUP,
        MatchStatus.SCHEDULED,
        new Date("2026-06-15"),
        50,
        null,
        null,
        null,
        null
    ),
    new Match(
        2,
        teams[2],
        teams[3],
        0,
        0,
        stadiums[1],
        MatchStage.GROUP,
        MatchStatus.SCHEDULED,
        new Date("2026-06-16"),
        40,
        null,
        null,
        null,
        null
    ),
    new Match(
        3,
        teams[4],
        teams[5],
        3,
        2,
        stadiums[2],
        MatchStage.GROUP,
        MatchStatus.FINISHED,
        new Date("2026-06-17"),
        50,
        null,
        null,
        null,
        null
    )
]