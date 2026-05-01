import { Match } from "../domain/entities/Match"
import { teams } from "./teams"
import { Stadium } from "../domain/entities/Stadium"
import { stadiums } from "./stadiums"
import { MatchStage } from "../domain/enum/MatchStage"
import { MatchStatus } from "../domain/enum/MatchStatus"





export const matchs = [

    new Match(
        1,
        2,
        1,
        teams[0],
        teams[1],
        stadiums[0],
        MatchStage.GROUP,
        MatchStatus.SCHEDULED,
        new Date("2026-06-15"),
        null,
        null,
        null,
        null
    ),

    new Match(
        2,
        0,
        0,
        teams[2],
        teams[3],
        stadiums[1],
        MatchStage.GROUP,
        MatchStatus.SCHEDULED,
        new Date("2026-06-16"),
        null,
        null,
        null,
        null
    ),

    new Match(
        3,
        3,
        2,
        teams[4],
        teams[5],
        stadiums[2],
        MatchStage.GROUP,
        MatchStatus.FINISHED,
        new Date("2026-06-17"),
        null,
        null,
        null,
        null
    )

]