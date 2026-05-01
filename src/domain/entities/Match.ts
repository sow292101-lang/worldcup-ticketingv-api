import { Stadium } from "./Stadium";
import { Team } from "./Team";
import {MatchStage} from "../enum/MatchStage"
import { MatchStatus } from "../enum/MatchStatus";
export class Match {
    id : number 
    scoreequipelocale : number 
    scorevisiteuse : number 
    equipelocale : Team
    equipevisiteuse : Team 
    stadium : Stadium
    stage : MatchStage
    status : MatchStatus
    date : Date 
    scoreprolongationlocale : number | null
    scoreprolongationvisiteuse : number | null
    scoretiraubutlocale : number | null
    scoretireaubutvisiteuse : number | null
    
    
    
    
    constructor( id : number, 
    scoreequipelocale : number, 
    scorevisiteuse : number , 
    equipelocale : Team,
    equipevisiteuse : Team, 
    stade : Stadium,
    stage : MatchStage,
    status : MatchStatus,
    date : Date ,
    scoreprolongationlocale : number | null,
    scoreprolongationvisiteuse : number | null,
    scoretiraubutlocale : number | null,
    scoretireaubutvisiteuse : number | null,){


     this.id = id
    this.scoreequipelocale = scoreequipelocale
    this.scorevisiteuse = scorevisiteuse
    this.equipelocale = equipelocale
    this.equipevisiteuse = equipevisiteuse
    this.stadium = stade
    this.stage = stage
    this.status = status
    this.date = date
    this.scoreprolongationlocale = scoreprolongationlocale
    this.scoreprolongationvisiteuse = scoreprolongationvisiteuse
    this.scoretiraubutlocale = scoretiraubutlocale
    this.scoretireaubutvisiteuse = scoretireaubutvisiteuse
     


    if(this.id <= 0){
       throw new Error("l'id dois être superieur a 0")
    }
    if(this.equipelocale.name == this.equipevisiteuse.name){
        throw new Error("le nom des deux equipes doivent être différent")
    }
    if (this.scoreequipelocale < 0 || this.scorevisiteuse < 0){
        throw new Error ("le score de l'equipe doit être positive ou 0")
    }

    }
    isDraw(): boolean{
        return (this.scoreequipelocale == this.scorevisiteuse)
    }
    winner() :Team |null {
        if(this.scoreequipelocale > this.scorevisiteuse){
            return this.equipelocale
        } else if (this.scorevisiteuse > this.scoreequipelocale){
            return this.equipevisiteuse
        } else 
            return null
    }

}