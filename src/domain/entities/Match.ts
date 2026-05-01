import { Stadium } from "./Stadium";
import { Team } from "./Team";
import { MatchStage } from "../enum/MatchStage"
import { MatchStatus } from "../enum/MatchStatus";

export class Match {
    id: number
    homeTeam: Team
    awayTeam: Team
    homeScore: number
    awayScore: number
    homeScoreExtraTime: number | null
    awayScoreExtraTime: number | null
    homeScoreShootOut: number | null
    awayScoreShootOut: number | null
    stadium: Stadium
    stage: MatchStage
    status: MatchStatus
    date: Date

    constructor(
        id: number,
        homeTeam: Team,
        awayTeam: Team,
        homeScore: number,
        awayScore: number,
        stadium: Stadium,
        stage: MatchStage,
        status: MatchStatus,
        date: Date,
        homeScoreExtraTime: number | null,
        awayScoreExtraTime: number | null,
        homeScoreShootOut: number | null,
        awayScoreShootOut: number | null
    ) {
        if (id <= 0) {
            throw new Error("l'id doit être supérieur à 0")
        }
        if (homeTeam.name === awayTeam.name) {
            throw new Error("les deux équipes doivent être différentes")
        }
        if (homeScore < 0 || awayScore < 0) {
            throw new Error("le score doit être positif ou 0")
        }

        this.id = id
        this.homeTeam = homeTeam
        this.awayTeam = awayTeam
        this.homeScore = homeScore
        this.awayScore = awayScore
        this.stadium = stadium
        this.stage = stage
        this.status = status
        this.date = date
        this.homeScoreExtraTime = homeScoreExtraTime
        this.awayScoreExtraTime = awayScoreExtraTime
        this.homeScoreShootOut = homeScoreShootOut
        this.awayScoreShootOut = awayScoreShootOut
    }

    isDraw(): boolean {
        return this.homeScore === this.awayScore
    }

    winner(): Team | null {
        if (this.homeScore > this.awayScore) {
            return this.homeTeam
        } else if (this.awayScore > this.homeScore) {
            return this.awayTeam
        }
        return null
    }
}