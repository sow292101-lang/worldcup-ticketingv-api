import { Stadium } from "./Stadium";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Team } from "./Team";
import { MatchStage } from "../enum/MatchStage"
import { MatchStatus } from "../enum/MatchStatus";
@Entity()

export class Match {
    @PrimaryGeneratedColumn()
    id: number
    @ManyToOne(() => Team)
    homeTeam: Team
    @ManyToOne(() => Team)
    awayTeam: Team
    @Column({ default: 0 })
    homeScore: number
    @Column({ default: 0 })
    awayScore: number
    @Column({ nullable: true })
    homeScoreExtraTime: number | null
    @Column({ nullable: true })
    awayScoreExtraTime: number | null
    @Column({ nullable: true })
    homeScoreShootOut: number | null
    @Column({ nullable: true })
    awayScoreShootOut: number | null
    @ManyToOne(() => Stadium)
    stadium: Stadium
   @Column({ type: "varchar" })
status: MatchStatus

@Column({ type: "varchar" })
stage: MatchStage
     @Column()
    date: Date
    @Column({ default: 0 })
    price: number

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
        price: number,
        homeScoreExtraTime: number | null,
        awayScoreExtraTime: number | null,
        homeScoreShootOut: number | null,
        awayScoreShootOut: number | null
    ) {
      if (id && id <= 0) throw new Error("l'id doit être supérieur à 0")
    if (homeTeam && awayTeam && homeTeam.name === awayTeam.name) throw new Error("les deux équipes doivent être différentes")
    if (homeScore !== undefined && awayScore !== undefined && (homeScore < 0 || awayScore < 0)) throw new Error("le score doit être positif ou 0")

        this.id = id
        this.homeTeam = homeTeam
        this.awayTeam = awayTeam
        this.homeScore = homeScore
        this.awayScore = awayScore
        this.stadium = stadium
        this.stage = stage
        this.status = status
        this.date = date
        this.price = price 
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